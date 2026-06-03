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
import { ImagePlus } from 'lucide-solid';
import { getUserName } from '../../auth/index.js';

import { useI18n } from '../../shared/i18n';
import { LoadBoundary } from '../../components/app/LoadBoundary';
import { showImagePreview } from '../../components/base-legacy/imagePreview.js';
import { compressImage } from '@lib/media/image-compress.js';
import { downloadUrl } from '@lib/utils/download-url.js';
import { isIOSOrAndroidDevice } from '@lib/utils/detect-device.js';
import { keepVirtualKeyboardOpenOnTap } from '@shared/utils/ui-utils/keepVirtualKeyboardOpenOnTap.js';
import {
  createConversationFileObjectUrl,
  deleteConversationFile,
  uploadConversationImage,
} from '../../stores/filesStore.js';

import { createMessagingRuntime } from './messaging-runtime.js';

import { createConversationState } from './conversation.state.js';
import { createConversationActions } from './conversation.actions.js';
import { envelopeToChatMessage, useConversation } from './use-conversation.js';
import { sortMessagesBySentAt } from './message-ordering.js';
import { clearLocalDraft, saveLocalDraft } from './local-drafts.js';
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
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

type TimestampFormatters = {
  time: Intl.DateTimeFormat;
  day: Intl.DateTimeFormat;
};

const timestampFormattersByLocale = new Map<string, TimestampFormatters>();

function dataUrlMimeType(url: string) {
  const match = /^data:([^;,]+)[;,]/i.exec(url);
  return match?.[1]?.toLowerCase() ?? 'text/plain';
}

function hasAllowedDataUrl(attachment: MessageAttachment) {
  if (!attachment.data) return false;
  if (!attachment.data.startsWith('data:')) return false;

  const declaredMimeType = attachment.mimeType.trim().toLowerCase();
  const actualMimeType = dataUrlMimeType(attachment.data);
  return (
    actualMimeType === declaredMimeType &&
    actualMimeType !== 'text/html' &&
    actualMimeType !== 'image/svg+xml'
  );
}

function isImageAttachment(attachment: MessageAttachment) {
  return attachment.mimeType.trim().toLowerCase().startsWith('image/');
}

function getAttachmentUrl(attachment: MessageAttachment) {
  return attachment.url ?? attachment.data ?? null;
}

function isR2ImageAttachment(
  attachment: MessageAttachment,
): attachment is MessageAttachment & {
  storage: NonNullable<MessageAttachment['storage']>;
} {
  return (
    isImageAttachment(attachment) &&
    !attachment.data &&
    !attachment.url &&
    attachment.storage?.provider === 'r2'
  );
}

function isAllowedRemoteUrl(url: string | null) {
  return Boolean(url?.startsWith('https://'));
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
  let imageInputEl: HTMLInputElement | undefined;
  let sendButtonCleanup: (() => void) | undefined;
  let suppressScroll = false;
  const pendingR2Loads = new Map<string, AbortController>();
  let draftSaveTimer: ReturnType<typeof setTimeout> | undefined;
  let pendingDraft:
    | { userId: UserId; conversationId: ConversationId; text: string }
    | undefined;

  function scrollToEnd() {
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
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
  const [imagePreparing, setImagePreparing] = createSignal(false);
  const [r2AttachmentUrls, setR2AttachmentUrls] = createSignal<
    Record<string, string>
  >({});

  function shouldShowTimestamp(message: ChatMessage, index: number) {
    const previous = state.messages[index - 1];
    return (
      !previous || message.sentAt - previous.sentAt > TIMESTAMP_THRESHOLD_MS
    );
  }

  createEffect(
    on(
      () => state.messages.length,
      () => {
        if (suppressScroll) return;
        queueMicrotask(scrollToEnd);
      },
    ),
  );

  createEffect(() => {
    const conversationId = state.conversationId;
    const currentUrls = r2AttachmentUrls();
    const neededIds = new Set<string>();

    for (const msg of state.messages) {
      const attachment = msg.attachment;
      if (!conversationId || !attachment || !isR2ImageAttachment(attachment)) {
        continue;
      }

      neededIds.add(msg.id);
      if (currentUrls[msg.id] || pendingR2Loads.has(msg.id)) continue;

      const controller = new AbortController();
      pendingR2Loads.set(msg.id, controller);

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
                isR2ImageAttachment(message.attachment),
            );

          if (!stillNeeded) {
            URL.revokeObjectURL(objectUrl);
            return;
          }

          setR2AttachmentUrls((urls) => ({
            ...urls,
            [msg.id]: objectUrl,
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
          if (pendingR2Loads.get(msg.id) === controller) {
            pendingR2Loads.delete(msg.id);
          }
        });
    }

    for (const [messageId, controller] of pendingR2Loads) {
      if (neededIds.has(messageId)) continue;
      controller.abort();
      pendingR2Loads.delete(messageId);
    }

    setR2AttachmentUrls((urls) => {
      let changed = false;
      const next = { ...urls };
      for (const [messageId, objectUrl] of Object.entries(urls)) {
        if (neededIds.has(messageId)) continue;
        URL.revokeObjectURL(objectUrl);
        delete next[messageId];
        pendingR2Loads.get(messageId)?.abort();
        pendingR2Loads.delete(messageId);
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
        setHistoryReady(false);
        suppressScroll = true;

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

        const result = runtime.messageRepository.watchRecentMessages(
          source.conversationId,
          (messages) => {
            if (source.conversationId !== state.conversationId) return;

            const latestMessageId = messages.at(-1)?.messageId;
            const loadedMessages = sortMessagesBySentAt(
              messages
                .map((msg) => envelopeToChatMessage(msg, 'persisted'))
                .filter(isChatMessage),
            );
            actions.mergeLoadedMessages(loadedMessages);
            setHistoryReady(true);
            setHistoryLoading(false);
            suppressScroll = false;
            queueMicrotask(scrollToEnd);
            queueMicrotask(focusInput);
            if (latestMessageId) {
              void Promise.resolve(
                runtime.messageRepository.markConversationRead(
                  source.conversationId,
                  source.myUserId,
                ),
              ).catch((error) => {
                console.warn(
                  '[conversation] failed to mark conversation read',
                  {
                    conversationId: source.conversationId,
                    error,
                  },
                );
              });
            }
          },
          (error) => {
            if (source.conversationId !== state.conversationId) return;
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
    if (state.sending || imagePreparing()) return;

    clearPersistedDraftIfNeeded();
    void send();
  }

  async function onImageInput(e: Event & { currentTarget: HTMLInputElement }) {
    const file = e.currentTarget.files?.[0];
    e.currentTarget.value = '';
    if (!file || state.sending || imagePreparing()) return;

    const conversationId = state.conversationId;
    if (!conversationId) return;

    const mimeType = file.type.trim().toLowerCase();
    if (!mimeType.startsWith('image/') || mimeType === 'image/svg+xml') {
      window.alert('Choose a PNG, JPEG, GIF, WebP, or similar image.');
      return;
    }

    setImagePreparing(true);
    try {
      let image = file;
      if (file.size > MAX_IMAGE_BYTES) {
        const compressed = await compressImage(file, {
          maxBytes: MAX_IMAGE_BYTES,
        });
        if (!compressed) {
          window.alert('Choose a smaller image.');
          return;
        }
        image = compressed;
      }

      if (image.size > MAX_IMAGE_BYTES) {
        window.alert('Choose a smaller image.');
        return;
      }

      const storage = await uploadConversationImage(conversationId, image);
      if (state.conversationId !== conversationId) {
        void deleteConversationFile(conversationId, storage).catch((error) => {
          console.warn('[conversation] failed to clean up orphaned image', {
            conversationId,
            key: storage.key,
            error,
          });
        });
        return;
      }

      const caption = state.draft.trim();
      clearPersistedDraftIfNeeded();
      const sent = await send({
        type: 'file',
        fileName: image.name || file.name || 'image',
        mimeType: image.type || file.type || 'image/*',
        fileSize: image.size,
        storage,
        text: caption || undefined,
      });
      if (!sent) {
        void deleteConversationFile(conversationId, storage).catch((error) => {
          console.warn('[conversation] failed to clean up orphaned image', {
            conversationId,
            key: storage.key,
            error,
          });
        });
        window.alert('Image send failed.');
      }
    } catch (error) {
      console.warn('[conversation] failed to send image attachment', error);
      window.alert('Image send failed.');
    } finally {
      setImagePreparing(false);
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
    if (state.sending || imagePreparing()) return;

    e.currentTarget.form?.requestSubmit();
  }

  return (
    <div class={styles.panel}>
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
            <div class={styles.messages} ref={messagesEl}>
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
                              const attachmentUrl = () =>
                                getAttachmentUrl(file) ??
                                r2AttachmentUrls()[msg.id] ??
                                null;
                              const allowedDataUrl = () =>
                                hasAllowedDataUrl(file);
                              const canPreview = () => {
                                const url = attachmentUrl();
                                return (
                                  Boolean(url) &&
                                  (allowedDataUrl() ||
                                    url?.startsWith('blob:') ||
                                    isAllowedRemoteUrl(url)) &&
                                  isImageAttachment(file)
                                );
                              };
                              const canDownload = () => {
                                const url = attachmentUrl();
                                return (
                                  Boolean(url) &&
                                  (allowedDataUrl() ||
                                    url?.startsWith('blob:') ||
                                    isAllowedRemoteUrl(url))
                                );
                              };
                              function openPreview(url: string) {
                                showImagePreview(url, file.fileName, null, {
                                  revokeOnClose: false,
                                });
                              }

                              return (
                                <span class={styles.fileMessage}>
                                  <Show when={canPreview()}>
                                    <img
                                      class={styles.filePreviewImg}
                                      src={attachmentUrl() ?? undefined}
                                      alt={file.fileName}
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
                                    <Show
                                      when={canDownload()}
                                      fallback={
                                        <span class={styles.fileMessageName}>
                                          {file.fileName}
                                        </span>
                                      }
                                    >
                                      <a
                                        href={attachmentUrl() ?? undefined}
                                        download={file.fileName}
                                        class={styles.fileMessageName}
                                        onClick={(event) => {
                                          const url = attachmentUrl();
                                          if (!url) return;
                                          event.preventDefault();
                                          void downloadUrl(url, file.fileName);
                                        }}
                                      >
                                        {file.fileName}
                                      </a>
                                    </Show>
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
            ref={imageInputEl}
            class={styles.fileInput}
            type='file'
            accept='image/*'
            onChange={onImageInput}
          />
          <button
            class={styles.attach}
            type='button'
            aria-label='Attach image'
            title='Attach image'
            disabled={state.sending || imagePreparing()}
            onClick={() => imageInputEl?.click()}
          >
            <ImagePlus size={20} aria-hidden='true' />
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
            disabled={!state.draft.trim() || state.sending || imagePreparing()}
          >
            Send
          </button>
        </form>
      </Show>
    </div>
  );
}
