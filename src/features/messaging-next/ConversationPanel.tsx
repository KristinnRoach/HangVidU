import {
  For,
  Match,
  Show,
  Switch,
  createEffect,
  createMemo,
  createSignal,
  on,
  onCleanup,
} from 'solid-js';
import { Paperclip, Download } from 'lucide-solid';
import { getUserName } from '../../auth/index.js';

import { useI18n } from '../../shared/i18n';
import { LoadBoundary } from '../../components/app/LoadBoundary';
import { fileDrop } from '@shared/utils/ui-utils/fileDrop/onFileDrop.solid.js';
import { showImagePreview } from '../../components/base-legacy/imagePreview.js';
import { compressImage } from '@lib/media/image-compress.js';
import { downloadUrl } from '@lib/utils/download-url.js';
import { isIOSOrAndroidDevice } from '@lib/utils/detect-device.js';
import { keepVirtualKeyboardOpenOnTap } from '@shared/utils/ui-utils/keepVirtualKeyboardOpenOnTap.js';
import {
  createConversationFileObjectUrl,
  deleteConversationFile,
  uploadConversationFile,
} from '../../stores/filesStore.js';

import { createMessagingRuntime } from './messaging-runtime.js';
// Boundary note (spike): feature -> stores import; consolidate in refine pass.
import {
  markConversationRead,
  recordConversationActivity,
} from '../../stores/conversation-activity';
import { cacheContactConversationId } from '../../stores/contactsStore.js';
import { openDirectConversation } from '../../stores/selectedConversationStore';

import { createConversationState } from './conversation.state.js';
import { createConversationActions } from './conversation.actions.js';
import { envelopeToChatMessage, useConversation } from './use-conversation.js';
import { sortMessagesBySentAt } from './message-ordering.js';
import { clearLocalDraft, saveLocalDraft } from './local-drafts.js';
// TODO: Pass reactions an onChange callback when persistence is wired.
import { reactions } from './reactions/solid.js';
import type { ConversationId, UserId } from './types.js';
import type {
  ChatMessage,
  ConversationSelection,
  MessageAttachment,
} from './interfaces.js';

import styles from './ConversationPanel.module.css';

const runtime = createMessagingRuntime();
const DRAFT_SAVE_DELAY_MS = 250;
const TIMESTAMP_THRESHOLD_MS = 5 * 60 * 1000;
const MAX_R2_FILE_UPLOAD_BYTES = 5 * 1024 * 1024;
const DISPLAY_ATTACHMENT_FILE_NAME_LENGTH = 24;
const IMAGE_COMPRESSION_THRESHOLD_BYTES = Math.round(1.5 * 1024 * 1024);

type TimestampFormatters = {
  time: Intl.DateTimeFormat;
  day: Intl.DateTimeFormat;
};

const timestampFormattersByLocale = new Map<string, TimestampFormatters>();

function isImageAttachment(attachment: MessageAttachment) {
  return attachment.mimeType.trim().toLowerCase().startsWith('image/');
}

function isR2FileAttachment(attachment: MessageAttachment) {
  return attachment.storage.provider === 'r2';
}

function isImageFile(file: File) {
  return file.type.trim().toLowerCase().startsWith('image/');
}

// Strip control chars and path separators for a safe optimistic display +
// download name. Length is the worker's concern (it truncates authoritatively).
function attachmentFileName(file: File) {
  return file.name.replace(/[\x00-\x1f\x7f/\\]/g, '_').trim() || 'attachment';
}

function displayAttachmentFileName(fileName: string) {
  if (fileName.length <= DISPLAY_ATTACHMENT_FILE_NAME_LENGTH) return fileName;

  const extension = shortFileExtension(fileName);
  const stemLength = DISPLAY_ATTACHMENT_FILE_NAME_LENGTH - extension.length - 3;
  return `${fileName.slice(0, Math.max(1, stemLength))}...${extension}`;
}

function shortFileExtension(fileName: string) {
  const extensionStart = fileName.lastIndexOf('.');
  return extensionStart > 0 && fileName.length - extensionStart <= 16
    ? fileName.slice(extensionStart)
    : '';
}

/**
 * Natural pixel dimensions of an image file, captured at send so the receiver's
 * renderer can reserve layout space before the image loads. Best-effort —
 * resolves undefined on decode failure rather than blocking the send.
 */
async function readImageDimensions(
  file: File,
): Promise<{ width: number; height: number } | undefined> {
  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    bitmap.close();
    return width > 0 && height > 0 ? { width, height } : undefined;
  } catch {
    return undefined;
  }
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isSameLocalDate(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function getTimestampFormatters(locale: string) {
  const cached = timestampFormattersByLocale.get(locale);
  if (cached) return cached;

  const formatters = {
    time: new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      // Product choice: keep message timestamps in 24-hour time for now.
      hour12: false,
    }),
    day: new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric',
    }),
  };

  timestampFormattersByLocale.set(locale, formatters);
  return formatters;
}

function formatTimestamp(timestamp: number, locale: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const formatters = getTimestampFormatters(locale);
  const time = formatters.time.format(date);

  if (isSameLocalDate(date, now)) return time;

  const day = formatters.day.format(date);

  return `${day} - ${time}`;
}

function MessageHistorySkeleton() {
  return (
    <div
      class={`${styles.messages} ${styles.messageSkeleton}`}
      aria-busy='true'
      aria-label='Loading message history'
    >
      <div class={`${styles.skeletonBubble} ${styles.skeletonIncoming}`} />
      <div class={`${styles.skeletonBubble} ${styles.skeletonOwn}`} />
      <div class={`${styles.skeletonBubble} ${styles.skeletonIncoming}`} />
      <div class={`${styles.skeletonBubble} ${styles.skeletonOwn}`} />
    </div>
  );
}

function isChatMessage(message: ChatMessage | null): message is ChatMessage {
  return Boolean(message);
}

type ConversationPanelProps = {
  selection: ConversationSelection | null;
  myUserId: UserId | null;
  /**
   * Whether the messaging view is the one on screen. The panel stays mounted
   * (and watching) when nav switches away, so this gates marking-read: an
   * incoming message must not clear the unread badge while you're looking at
   * the contacts list.
   */
  visible: boolean;
};

type HistorySource = {
  conversationId: ConversationId;
  myUserId: UserId;
} | null;

export default function ConversationPanel(props: ConversationPanelProps) {
  const store = createConversationState();
  const actions = createConversationActions(store);
  const { state } = store;
  const { t, locale } = useI18n();

  let messagesEl: HTMLDivElement | undefined;
  let inputTextAreaEl: HTMLTextAreaElement | undefined;
  let fileInputEl: HTMLInputElement | undefined;
  let sendButtonCleanup: (() => void) | undefined;
  let suppressScroll = false;
  // True once the user scrolls away from the bottom to read earlier messages.
  // While set, new messages do not yank the view back down. Scroll events also
  // fire on layout changes (clamping, scroll anchoring), so only upward
  // movement may latch it — see onMessagesScroll.
  let userHasScrolledUp = false;
  let lastScrollTop = 0;
  const pendingR2Loads = new Map<string, AbortController>();
  let draftSaveTimer: ReturnType<typeof setTimeout> | undefined;
  let pendingDraft:
    | { userId: UserId; conversationId: ConversationId; text: string }
    | undefined;

  function makeAttachmentKey(
    conversationId: ConversationId,
    messageId: string,
  ) {
    return `${conversationId}:${messageId}`;
  }

  const NEAR_BOTTOM_PX = 80;

  function isNearBottom() {
    if (!messagesEl) return true;
    const distance =
      messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight;
    return distance <= NEAR_BOTTOM_PX;
  }

  function scrollToEnd() {
    userHasScrolledUp = false;
    // Run after layout so late-sized content (e.g. images) is measured. Re-check
    // the pinned state: the user may have scrolled up before this frame ran.
    requestAnimationFrame(() => {
      if (!messagesEl || suppressScroll || userHasScrolledUp) return;
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  function onMessagesScroll() {
    const scrollTop = messagesEl?.scrollTop ?? 0;
    const movedUp = scrollTop < lastScrollTop;
    lastScrollTop = scrollTop;
    if (movedUp) userHasScrolledUp = !isNearBottom();
    else if (isNearBottom()) userHasScrolledUp = false;
  }

  // Follow new/grown content to the bottom, unless the user has scrolled up to
  // read history or we're mid conversation-switch.
  function followIfPinned() {
    if (suppressScroll || userHasScrolledUp) return;
    scrollToEnd();
  }

  function focusInput() {
    inputTextAreaEl?.focus();
  }

  function attachSendButton(el: HTMLButtonElement) {
    sendButtonCleanup?.();
    sendButtonCleanup = isIOSOrAndroidDevice()
      ? keepVirtualKeyboardOpenOnTap(el, (event) => {
          event.preventDefault();
          el.form?.requestSubmit();
        })
      : undefined;
  }

  function clearDraftSaveTimer() {
    if (draftSaveTimer) {
      clearTimeout(draftSaveTimer);
      draftSaveTimer = undefined;
    }
  }

  function flushDraftSave() {
    clearDraftSaveTimer();
    if (!pendingDraft) return;

    saveLocalDraft(
      pendingDraft.userId,
      pendingDraft.conversationId,
      pendingDraft.text,
    );
    pendingDraft = undefined;
  }

  function queueDraftSave(text: string) {
    const conversationId = state.conversationId;
    const myUserId = state.myUserId;
    if (!conversationId || !myUserId) return;

    clearDraftSaveTimer();
    pendingDraft = { userId: myUserId, conversationId, text };
    draftSaveTimer = setTimeout(() => {
      flushDraftSave();
    }, DRAFT_SAVE_DELAY_MS);
  }

  const historySource = createMemo<HistorySource>(() => {
    const conversationId = props.selection?.conversationId;
    const myUserId = props.myUserId;
    if (!conversationId || !myUserId) return null;
    return {
      conversationId,
      myUserId,
    };
  }, null);

  const [historyLoading, setHistoryLoading] = createSignal(false);
  const [historyError, setHistoryError] = createSignal<unknown>(null);
  const [historyReady, setHistoryReady] = createSignal(false);
  const [latestReadCandidate, setLatestReadCandidate] = createSignal<{
    conversationId: ConversationId;
    myUserId: UserId;
    sentAt: number;
  } | null>(null);
  const [filePreparing, setFilePreparing] = createSignal(false);
  const [r2AttachmentUrls, setR2AttachmentUrls] = createSignal<
    Record<string, string>
  >({});

  function shouldShowTimestamp(message: ChatMessage, index: number) {
    const previous = state.messages[index - 1];
    return (
      !previous || message.sentAt - previous.sentAt > TIMESTAMP_THRESHOLD_MS
    );
  }

  createEffect(on(() => state.messages.length, followIfPinned));

  createEffect(() => {
    const candidate = latestReadCandidate();
    if (
      !props.visible ||
      !candidate ||
      candidate.conversationId !== state.conversationId
    ) {
      return;
    }

    markConversationRead(candidate.conversationId, candidate.sentAt);
    void Promise.resolve(
      runtime.messageRepository.markConversationRead(
        candidate.conversationId,
        candidate.myUserId,
      ),
    ).catch((error) => {
      console.warn('[conversation] failed to mark conversation read', {
        conversationId: candidate.conversationId,
        error,
      });
    });
  });

  createEffect(() => {
    const conversationId = state.conversationId;
    const currentUrls = r2AttachmentUrls();
    const neededKeys = new Set<string>();

    for (const msg of state.messages) {
      const attachment = msg.attachment;
      if (
        !conversationId ||
        !attachment ||
        !isR2FileAttachment(attachment) ||
        !isImageAttachment(attachment)
      ) {
        continue;
      }

      const key = makeAttachmentKey(conversationId, msg.id);
      neededKeys.add(key);
      if (currentUrls[key] || pendingR2Loads.has(key)) continue;

      const controller = new AbortController();
      pendingR2Loads.set(key, controller);

      void createConversationFileObjectUrl(
        conversationId,
        attachment.storage,
        controller.signal,
      )
        .then((objectUrl) => {
          const stillNeeded =
            state.conversationId === conversationId &&
            state.messages.some(
              (message) =>
                message.id === msg.id &&
                message.attachment &&
                isR2FileAttachment(message.attachment) &&
                isImageAttachment(message.attachment),
            );

          if (!stillNeeded) {
            URL.revokeObjectURL(objectUrl);
            return;
          }

          setR2AttachmentUrls((urls) => ({
            ...urls,
            [key]: objectUrl,
          }));
        })
        .catch((error) => {
          if (!controller.signal.aborted) {
            console.warn('[conversation] failed to load R2 attachment', {
              messageId: msg.id,
              error,
            });
          }
        })
        .finally(() => {
          if (pendingR2Loads.get(key) === controller) {
            pendingR2Loads.delete(key);
          }
        });
    }

    for (const [attachmentKey, controller] of pendingR2Loads) {
      if (neededKeys.has(attachmentKey)) continue;
      controller.abort();
      pendingR2Loads.delete(attachmentKey);
    }

    setR2AttachmentUrls((urls) => {
      let changed = false;
      const next = { ...urls };
      for (const [attachmentKey, objectUrl] of Object.entries(urls)) {
        if (neededKeys.has(attachmentKey)) continue;
        URL.revokeObjectURL(objectUrl);
        delete next[attachmentKey];
        pendingR2Loads.get(attachmentKey)?.abort();
        pendingR2Loads.delete(attachmentKey);
        changed = true;
      }
      return changed ? next : urls;
    });
  });

  createEffect(
    on(
      () => historySource(),
      (source) => {
        flushDraftSave();
        setLatestReadCandidate(null);
        setHistoryReady(false);
        suppressScroll = true;
        // The messages container remounts on switch; drop the old position so
        // the first scroll comparison isn't against the previous conversation.
        lastScrollTop = 0;

        const selection = props.selection;
        if (!source || !selection) {
          actions.resetConversation();
          suppressScroll = false;
          setHistoryLoading(false);
          setHistoryError(null);
          return;
        }

        actions.startConversation(selection, source.myUserId);

        setHistoryLoading(true);
        setHistoryError(null);

        // The watch fires once on open, then again for every later message. Only
        // the first emission force-scrolls; later ones leave following to the
        // length effect, which respects userHasScrolledUp.
        let isInitialLoad = true;

        const result = runtime.messageRepository.watchRecentMessages(
          source.conversationId,
          (messages) => {
            if (source.conversationId !== state.conversationId) return;

            const loadedMessages = sortMessagesBySentAt(
              messages
                .map((msg) => envelopeToChatMessage(msg, 'persisted'))
                .filter(isChatMessage),
            );
            actions.mergeLoadedMessages(loadedMessages);
            setHistoryReady(true);
            setHistoryLoading(false);
            suppressScroll = false;
            if (isInitialLoad) {
              isInitialLoad = false;
              scrollToEnd();
              queueMicrotask(focusInput);
            }
            const latest = loadedMessages.at(-1);
            if (latest) {
              // Only persisted watcher messages carry authoritative server time.
              setLatestReadCandidate({
                conversationId: source.conversationId,
                myUserId: source.myUserId,
                sentAt: latest.sentAt,
              });
              // Keep the contact-list row ordered for the open conversation —
              // covers the user's own send (never echoed over the mailbox). DM
              // only: peer uid is the activity map key.
              const peers = selection.remoteParticipantIds;
              if (peers?.length === 1) {
                recordConversationActivity(
                  peers[0],
                  source.conversationId,
                  latest.sentAt,
                  latest.senderId,
                );
              }
            }
          },
          (error) => {
            if (source.conversationId !== state.conversationId) return;
            // Stale cached conversationId (env switch, deleted conversation):
            // clear the cache and re-resolve once. resolve-direct is
            // resolve-or-create, so the retry can't 404 again in a loop.
            const contactId = selection.remoteParticipantIds?.[0];
            if (
              (error as { status?: number })?.status === 404 &&
              selection.remoteParticipantIds?.length === 1 &&
              contactId
            ) {
              void cacheContactConversationId(contactId, null).then(() =>
                openDirectConversation(contactId, {
                  contactNickName: selection.contactNickName,
                  displayUI: selection.displayUI,
                }),
              );
              return;
            }
            setHistoryError(error);
            setHistoryLoading(false);
            suppressScroll = false;
          },
        );

        let cleanup: (() => void) | undefined;
        let disposed = false;

        if (typeof result === 'function') {
          cleanup = result;
        } else {
          void result
            .then((unsub) => {
              if (disposed) unsub();
              else cleanup = unsub;
            })
            .catch((error) => {
              if (disposed || source.conversationId !== state.conversationId) {
                return;
              }
              setHistoryError(error);
              setHistoryLoading(false);
              suppressScroll = false;
            });
        }

        onCleanup(() => {
          disposed = true;
          cleanup?.();
        });
      },
    ),
  );

  const { send } = useConversation({
    repository: runtime.messageRepository,
    store,
    actions,
    getSenderName: getUserName,
    historyReady,
  });

  onCleanup(() => {
    flushDraftSave();
    sendButtonCleanup?.();
    for (const objectUrl of Object.values(r2AttachmentUrls())) {
      URL.revokeObjectURL(objectUrl);
    }
    for (const controller of pendingR2Loads.values()) {
      controller.abort();
    }
    pendingR2Loads.clear();
  });

  function clearPersistedDraftIfNeeded() {
    const { conversationId, myUserId } = state;
    if (!conversationId || !myUserId || !state.draft.trim()) return;

    clearDraftSaveTimer();
    pendingDraft = undefined;
    clearLocalDraft(myUserId, conversationId);
  }

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (state.sending || filePreparing()) return;

    clearPersistedDraftIfNeeded();
    void send();
    // Defensive refocus within the tap gesture so the iOS virtual keyboard
    // stays open across sends even if something downstream steals focus.
    inputTextAreaEl?.focus();
  }

  function onFileInput(e: Event & { currentTarget: HTMLInputElement }) {
    const file = e.currentTarget.files?.[0];
    e.currentTarget.value = '';
    void handleFile(file);
  }

  // Option A: fan out a multi-file drop into one message per file. Sequential
  // so optimistic messages stay ordered and the shared sending/preparing guards
  // in handleFile don't trip each other. The text draft becomes a caption on the
  // first message only (send() clears it), matching the single-file behavior.
  // TODO: switch to a single message carrying a MessageAttachment[] (Option B).
  async function handleFiles(files: File[]) {
    for (const file of files) {
      await handleFile(file);
    }
  }

  async function handleFile(file: File | undefined) {
    if (!file || state.sending || filePreparing()) return;
    if (file.size === 0) {
      window.alert('Choose a non-empty file.');
      inputTextAreaEl?.focus();
      return;
    }

    const conversationId = state.conversationId;
    if (!conversationId) return;
    const uploadConversationId = conversationId;

    let uploadedStorage:
      | Awaited<ReturnType<typeof uploadConversationFile>>
      | undefined;
    function cleanupUploadedFile() {
      if (!uploadedStorage) return;
      void deleteConversationFile(uploadConversationId, uploadedStorage).catch(
        (error) => {
          console.warn('[conversation] failed to clean up orphaned file', {
            conversationId: uploadConversationId,
            key: uploadedStorage?.key,
            error,
          });
        },
      );
    }

    setFilePreparing(true);
    try {
      let attachmentFile = file;
      const shouldReadImageMetadata = isImageFile(file);
      if (
        shouldReadImageMetadata &&
        file.size > IMAGE_COMPRESSION_THRESHOLD_BYTES
      ) {
        const compressed = await compressImage(file, {
          maxBytes: IMAGE_COMPRESSION_THRESHOLD_BYTES,
        });
        if (compressed) attachmentFile = compressed;
      }

      if (attachmentFile.size > MAX_R2_FILE_UPLOAD_BYTES) {
        window.alert('Choose a smaller file.');
        return;
      }

      const dimensions = shouldReadImageMetadata
        ? await readImageDimensions(attachmentFile)
        : undefined;
      uploadedStorage = await uploadConversationFile(
        conversationId,
        attachmentFile,
      );
      if (state.conversationId !== conversationId) {
        cleanupUploadedFile();
        return;
      }

      const caption = state.draft.trim();
      clearPersistedDraftIfNeeded();
      const sent = await send({
        type: 'file',
        fileName: attachmentFileName(attachmentFile),
        mimeType:
          attachmentFile.type || file.type || 'application/octet-stream',
        fileSize: attachmentFile.size,
        width: dimensions?.width,
        height: dimensions?.height,
        storage: uploadedStorage,
        text: caption || undefined,
      });
      if (!sent) {
        cleanupUploadedFile();
        window.alert('File send failed.');
      }
    } catch (error) {
      cleanupUploadedFile();
      console.warn('[conversation] failed to send file attachment', error);
      window.alert('File send failed.');
    } finally {
      setFilePreparing(false);
      inputTextAreaEl?.focus();
    }
  }

  function onDraftKeyDown(
    e: KeyboardEvent & { currentTarget: HTMLTextAreaElement },
  ) {
    if (
      e.isComposing ||
      e.key !== 'Enter' ||
      e.shiftKey ||
      isIOSOrAndroidDevice()
    )
      return;

    e.preventDefault();
    if (state.sending || filePreparing()) return;

    e.currentTarget.form?.requestSubmit();
  }

  return (
    <div
      class={styles.panel}
      use:fileDrop={{
        onDrop: (files) => void handleFiles(files),
      }}
    >
      <Show
        when={state.conversationId}
        fallback={<div class={styles.empty}>Conversation not found</div>}
      >
        <LoadBoundary
          loading={historyLoading()}
          fallback={<MessageHistorySkeleton />}
          error={historyError()}
          errorFallback={
            <div class={styles.empty}>{t('conversation.load_error')}</div>
          }
        >
          <Show
            when={state.messages.length > 0}
            fallback={
              <div class={styles.messagesEmpty}>{t('conversation.empty')}</div>
            }
          >
            <div
              class={styles.messages}
              ref={messagesEl}
              onScroll={onMessagesScroll}
            >
              <For each={state.messages}>
                {(msg, index) => (
                  <>
                    <Show when={shouldShowTimestamp(msg, index())}>
                      <time
                        class={styles.messageTimestamp}
                        dateTime={new Date(msg.sentAt).toISOString()}
                      >
                        {formatTimestamp(msg.sentAt, locale())}
                      </time>
                    </Show>
                    <Switch>
                      <Match when={msg.source === 'system'}>
                        <div class={`${styles.msg} ${styles.msgSystem}`}>
                          <span>{msg.text}</span>
                          <Show when={msg.actions?.length}>
                            <span class={styles.msgActions}>
                              <For each={msg.actions}>
                                {(action) => (
                                  <button
                                    type='button'
                                    class={styles.msgActionBtn}
                                    onClick={action.onClick}
                                  >
                                    {action.label}
                                  </button>
                                )}
                              </For>
                            </span>
                          </Show>
                        </div>
                      </Match>
                      <Match when={msg.source !== 'system'}>
                        <div
                          use:reactions={{
                            messageId: msg.id,
                            userId: state.myUserId,
                          }}
                          class={styles.msg}
                          data-timestamp={msg.sentAt}
                          classList={{
                            [styles.msgOwn]: msg.senderId === state.myUserId,
                            [styles.msgFailed]: msg.status === 'failed',
                          }}
                        >
                          <span class={styles.msgText}>{msg.text}</span>
                          <Show when={msg.attachment}>
                            {(attachment) => {
                              const file = attachment();
                              const attachmentUrl = () => {
                                const conversationId = state.conversationId;
                                if (!conversationId) return null;
                                return (
                                  r2AttachmentUrls()[
                                    makeAttachmentKey(conversationId, msg.id)
                                  ] ?? null
                                );
                              };
                              const canPreview = () => {
                                const url = attachmentUrl();
                                return (
                                  Boolean(url) &&
                                  url?.startsWith('blob:') &&
                                  isImageAttachment(file)
                                );
                              };
                              function openPreview(url: string) {
                                showImagePreview(url, file.fileName, null, {
                                  revokeOnClose: false,
                                });
                              }
                              async function downloadAttachment() {
                                const url = attachmentUrl();
                                if (url?.startsWith('blob:')) {
                                  await downloadUrl(url, file.fileName);
                                  return;
                                }

                                const conversationId = state.conversationId;
                                if (!conversationId) return;

                                const objectUrl =
                                  await createConversationFileObjectUrl(
                                    conversationId,
                                    file.storage,
                                  );
                                try {
                                  await downloadUrl(objectUrl, file.fileName);
                                } finally {
                                  URL.revokeObjectURL(objectUrl);
                                }
                              }

                              return (
                                <span class={styles.fileMessage}>
                                  <Show when={canPreview()}>
                                    <img
                                      class={styles.filePreviewImg}
                                      src={attachmentUrl() ?? undefined}
                                      width={file.width}
                                      height={file.height}
                                      alt={file.fileName}
                                      onLoad={followIfPinned}
                                      role='button'
                                      tabIndex={0}
                                      aria-label={`Open preview for ${file.fileName}`}
                                      onClick={() => {
                                        const url = attachmentUrl();
                                        if (url) openPreview(url);
                                      }}
                                      onKeyDown={(e) => {
                                        if (
                                          e.key !== 'Enter' &&
                                          e.key !== ' '
                                        ) {
                                          return;
                                        }
                                        e.preventDefault();
                                        const url = attachmentUrl();
                                        if (url) openPreview(url);
                                      }}
                                    />
                                  </Show>
                                  <span class={styles.fileMessageMeta}>
                                    <a
                                      href={attachmentUrl() ?? '#'}
                                      download={file.fileName}
                                      class={styles.fileMessageName}
                                      title={file.fileName}
                                      onClick={(event) => {
                                        event.preventDefault();
                                        void downloadAttachment().catch(
                                          (error) => {
                                            console.warn(
                                              '[conversation] failed to download attachment',
                                              error,
                                            );
                                          },
                                        );
                                      }}
                                    >
                                      {displayAttachmentFileName(file.fileName)}
                                      <Download
                                        size={14}
                                        aria-hidden='true'
                                        class={styles.fileMessageDownloadIcon}
                                      />
                                    </a>
                                    <span class={styles.fileMessageSize}>
                                      ({formatFileSize(file.fileSize)})
                                    </span>
                                  </span>
                                </span>
                              );
                            }}
                          </Show>
                          <Show when={msg.status === 'sending'}>
                            <span class={styles.msgStatus}>…</span>
                          </Show>
                          <Show when={msg.status === 'failed'}>
                            <span class={styles.msgStatus}>!</span>
                          </Show>
                        </div>
                      </Match>
                    </Switch>
                  </>
                )}
              </For>
            </div>
          </Show>
        </LoadBoundary>

        <form class={styles.form} onSubmit={onSubmit}>
          <input
            title='Attach file'
            ref={fileInputEl}
            class={styles.fileInput}
            type='file'
            onChange={onFileInput}
          />
          <button
            class={styles.attach}
            type='button'
            aria-label='Attach file'
            title='Attach file'
            disabled={state.sending || filePreparing()}
            onClick={() => fileInputEl?.click()}
          >
            <Paperclip size={20} aria-hidden='true' />
          </button>
          <textarea
            autofocus
            ref={inputTextAreaEl}
            class={styles.growableTextArea}
            placeholder='Message…'
            value={state.draft}
            onInput={(e) => {
              const text = e.currentTarget.value;
              actions.setDraft(text);
              queueDraftSave(text);
            }}
            onKeyDown={onDraftKeyDown}
          />
          <button
            ref={attachSendButton}
            class={styles.send}
            type='submit'
            disabled={!state.draft.trim() || state.sending || filePreparing()}
          >
            Send
          </button>
        </form>
      </Show>
    </div>
  );
}
