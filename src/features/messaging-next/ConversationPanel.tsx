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
import { getUserName } from '../../auth/index.js';

import { useI18n } from '../../shared/i18n';
import { LoadBoundary } from '../../components/app/LoadBoundary';
import { showImagePreview } from '../../components/base-legacy/imagePreview.js';
import { downloadUrl } from '@lib/utils/download-url.js';

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

function isAllowedRemoteUrl(url: string | null) {
  return Boolean(url?.startsWith('https://'));
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
  const { t } = useI18n();

  let messagesEl: HTMLDivElement | undefined;
  let inputTextAreaEl: HTMLTextAreaElement | undefined;
  let suppressScroll = false;
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

  createEffect(
    on(
      () => state.messages.length,
      () => {
        if (suppressScroll) return;
        queueMicrotask(scrollToEnd);
      },
    ),
  );

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
  });

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const { conversationId, myUserId } = state;
    if (conversationId && myUserId && state.draft.trim()) {
      clearDraftSaveTimer();
      pendingDraft = undefined;
      clearLocalDraft(myUserId, conversationId);
    }
    void send();
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
                {(msg) => (
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
                        classList={{
                          [styles.msgOwn]: msg.senderId === state.myUserId,
                          [styles.msgFailed]: msg.status === 'failed',
                        }}
                      >
                        <span class={styles.msgText}>{msg.text}</span>
                        <Show when={msg.attachment}>
                          {(attachment) => {
                            const file = attachment();
                            const attachmentUrl = getAttachmentUrl(file);
                            const allowedDataUrl = hasAllowedDataUrl(file);
                            const canPreview =
                              Boolean(attachmentUrl) &&
                              (allowedDataUrl ||
                                isAllowedRemoteUrl(attachmentUrl)) &&
                              isImageAttachment(file);
                            const canDownload =
                              Boolean(attachmentUrl) &&
                              (allowedDataUrl ||
                                attachmentUrl?.startsWith('blob:') ||
                                isAllowedRemoteUrl(attachmentUrl));

                            return (
                              <span class={styles.fileMessage}>
                                <Show when={canPreview}>
                                  <img
                                    class={styles.filePreviewImg}
                                    src={attachmentUrl ?? undefined}
                                    alt={file.fileName}
                                    role='button'
                                    tabIndex={0}
                                    aria-label={`Open preview for ${file.fileName}`}
                                    onClick={() =>
                                      attachmentUrl &&
                                      showImagePreview(
                                        attachmentUrl,
                                        file.fileName,
                                      )
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key !== 'Enter' && e.key !== ' ') {
                                        return;
                                      }
                                      e.preventDefault();
                                      if (attachmentUrl) {
                                        showImagePreview(
                                          attachmentUrl,
                                          file.fileName,
                                        );
                                      }
                                    }}
                                  />
                                </Show>
                                <span class={styles.fileMessageMeta}>
                                  <Show
                                    when={canDownload}
                                    fallback={
                                      <span class={styles.fileMessageName}>
                                        {file.fileName}
                                      </span>
                                    }
                                  >
                                    <a
                                      href={attachmentUrl ?? undefined}
                                      download={file.fileName}
                                      class={styles.fileMessageName}
                                      onClick={(event) => {
                                        if (!attachmentUrl) return;
                                        event.preventDefault();
                                        void downloadUrl(
                                          attachmentUrl,
                                          file.fileName,
                                        );
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
                )}
              </For>
            </div>
          </Show>
        </LoadBoundary>

        <form class={styles.form} onSubmit={onSubmit}>
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
            disabled={state.sending}
          />
          <button
            class={styles.send}
            type='submit'
            disabled={!state.draft.trim() || state.sending}
          >
            Send
          </button>
        </form>
      </Show>
    </div>
  );
}
