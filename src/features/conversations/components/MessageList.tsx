import { For, Show, createEffect, createSignal, on, onCleanup } from 'solid-js';
import { Download } from 'lucide-solid';
import { useI18n } from '@shared/i18n';
// eslint-disable-next-line no-unused-vars -- consumed by the Solid `use:reactions` directive
import { reactions } from '@lib/reactions/solid/solid.js';
import { showImagePreview } from '@components/base-legacy/imagePreview.js';
import { downloadUrl } from '@lib/utils/download-url.js';
import { detectDoubleClick } from '@shared/utils/ui-utils/detectDoubleClick.js';

import {
  displayAttachmentFileName,
  formatFileSize,
  isImageAttachment,
  isR2FileAttachment,
} from '@stores/conversation/attachments';
import {
  getConversationState,
  persistMyReaction,
  selectedConversation,
} from '@stores/conversation/conversation-store';
import type {
  ChatMessage,
  MessageAttachment,
  SystemChatMessage,
} from '@stores/conversation/types.js';
import type { ConversationId } from '@stores/conversation/types';
import { createConversationFileObjectUrl } from '@stores/files-store';

import { linkifyText } from '../utils/linkifyText';
import {
  formatTimestamp,
  TIMESTAMP_THRESHOLD_MS,
} from '../utils/format-timestamp.js';

import { StartCallButton } from '@features/call';

import styles from './ConversationPanel.module.css';

/**
 * The scrollable message history for the active conversation. Mounted only
 * while a loaded conversation has messages, so scroll position and attachment
 * object URLs reset naturally on conversation switch.
 */
export function MessageList() {
  const state = getConversationState();
  const { locale } = useI18n();

  let messagesEl: HTMLDivElement | undefined;
  // True once the user scrolls away from the bottom to read earlier messages.
  // While set, new messages do not yank the view back down. Scroll events also
  // fire on layout changes (clamping, scroll anchoring), so only upward
  // movement may latch it — see onMessagesScroll.
  let userHasScrolledUp = false;
  let lastScrollTop = 0;
  const pendingR2Loads = new Map<string, AbortController>();
  const [r2AttachmentUrls, setR2AttachmentUrls] = createSignal<
    Record<string, string>
  >({});

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
      if (!messagesEl || userHasScrolledUp) return;
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
  // read history.
  function followIfPinned() {
    if (userHasScrolledUp) return;
    scrollToEnd();
  }

  function shouldShowTimestamp(message: ChatMessage, index: number) {
    const previous = state.messages[index - 1];
    return (
      !previous || message.sentAt - previous.sentAt > TIMESTAMP_THRESHOLD_MS
    );
  }

  const attachmentUrl = (msg: ChatMessage) => {
    const conversationId = state.conversationId;
    if (!conversationId) return null;
    return (
      r2AttachmentUrls()[makeAttachmentKey(conversationId, msg.id)] ?? null
    );
  };

  createEffect(on(() => state.messages.length, followIfPinned));

  createEffect(() => {
    const conversationId = state.conversationId;
    const currentUrls = r2AttachmentUrls();
    const neededKeys = new Set<string>();

    for (const msg of state.messages) {
      if (msg.type === 'system') continue;
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
                message.type === 'user' &&
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

  onCleanup(() => {
    for (const objectUrl of Object.values(r2AttachmentUrls())) {
      URL.revokeObjectURL(objectUrl);
    }
    for (const controller of pendingR2Loads.values()) {
      controller.abort();
    }
    pendingR2Loads.clear();
  });

  return (
    <div class={styles.messages} ref={messagesEl} onScroll={onMessagesScroll}>
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
            <Show
              when={msg.type === 'user' ? msg : undefined}
              fallback={<SystemMessageRow message={msg as SystemChatMessage} />}
            >
              {(userMessage) => (
                <div
                  use:reactions={{
                    messageId: userMessage().id,
                    userId: state.myUserId,
                    reactions: userMessage().reactions,
                    onChange: persistMyReaction,
                  }}
                  class={styles.msg}
                  data-timestamp={userMessage().sentAt}
                  classList={{
                    [styles.msgOwn]: userMessage().senderId === state.myUserId,
                    [styles.msgFailed]: userMessage().status === 'failed',
                  }}
                >
                  <span class={styles.msgText}>
                    {linkifyText(userMessage().text)}
                  </span>
                  <Show when={userMessage().attachment}>
                    {(attachment) => (
                      <FileAttachment
                        file={attachment()}
                        url={attachmentUrl(userMessage())}
                        onImageLoad={followIfPinned}
                      />
                    )}
                  </Show>
                  <Show when={userMessage().status === 'sending'}>
                    <span class={styles.msgStatus}>…</span>
                  </Show>
                  <Show when={userMessage().status === 'failed'}>
                    <span class={styles.msgStatus}>!</span>
                  </Show>
                </div>
              )}
            </Show>
          </>
        )}
      </For>
    </div>
  );
}

function SystemMessageRow(props: { message: SystemChatMessage }) {
  const state = getConversationState();
  const { t } = useI18n();
  const callerName = () =>
    selectedConversation()?.members.find(
      (member) => member.user_id === props.message.senderId,
    )?.display_name ?? t('conversation.unknown_caller');
  const text = () =>
    props.message.callerUId === state.myUserId
      ? t('conversation.call_unanswered_outgoing')
      : t('conversation.call_unanswered_incoming', {
          name: callerName().split(' ')[0],
        });

  return (
    <div class={styles.systemMessage} data-timestamp={props.message.sentAt}>
      <span class={styles.systemMessageText}>{text()}</span>
      <Show
        when={
          props.message.systemType === 'call.unanswered' &&
          props.message.callerUId !== state.myUserId
        }
      >
        <div class={styles.callBackAction}>
          <span class={styles.systemMessageText}>
            {t('notification.missed.call_back')}
          </span>
          <StartCallButton
            calleeId={props.message.callerUId}
            calleeName={callerName()}
            audioOnly={true}
          />
          <StartCallButton
            calleeId={props.message.callerUId}
            calleeName={callerName()}
            audioOnly={false}
          />
        </div>
      </Show>
    </div>
  );
}

function FileAttachment(props: {
  file: MessageAttachment;
  url: string | null;
  onImageLoad: () => void;
}) {
  const state = getConversationState();
  const { t } = useI18n();

  const canPreview = () =>
    Boolean(props.url?.startsWith('blob:')) && isImageAttachment(props.file);

  function openPreview(url: string) {
    showImagePreview(url, props.file.fileName, null, {
      revokeOnClose: false,
    });
  }

  async function downloadAttachment() {
    if (props.url?.startsWith('blob:')) {
      await downloadUrl(props.url, props.file.fileName);
      return;
    }

    const conversationId = state.conversationId;
    if (!conversationId) return;

    const objectUrl = await createConversationFileObjectUrl(
      conversationId,
      props.file.storage,
    );
    try {
      await downloadUrl(objectUrl, props.file.fileName);
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  return (
    <span class={styles.fileMessage}>
      <Show when={canPreview()}>
        <img
          class={styles.filePreviewImg}
          src={props.url ?? undefined}
          width={props.file.width}
          height={props.file.height}
          alt={props.file.fileName}
          onLoad={() => props.onImageLoad()}
          role='button'
          tabIndex={0}
          aria-label={t('conversation.open_preview', {
            name: props.file.fileName,
          })}
          ref={(el) => {
            // Single tap opens preview; double tap is left to the reaction
            // gesture so it adds a reaction instead of opening.
            const dc = detectDoubleClick(
              el,
              () => {
                if (props.url) openPreview(props.url);
              },
              () => {},
            );
            onCleanup(dc.destroy);
          }}
          onKeyDown={(e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            if (props.url) openPreview(props.url);
          }}
        />
      </Show>
      <span class={styles.fileMessageMeta}>
        <a
          href={props.url ?? '#'}
          download={props.file.fileName}
          class={styles.fileMessageName}
          title={props.file.fileName}
          onClick={(event) => {
            event.preventDefault();
            void downloadAttachment().catch((error) => {
              console.warn(
                '[conversation] failed to download attachment',
                error,
              );
            });
          }}
        >
          {displayAttachmentFileName(props.file.fileName)}
          <Download
            size={14}
            aria-hidden='true'
            class={styles.fileMessageDownloadIcon}
          />
        </a>
        <span class={styles.fileMessageSize}>
          ({formatFileSize(props.file.fileSize)})
        </span>
      </span>
    </span>
  );
}
