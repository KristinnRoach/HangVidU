import {
  For,
  Match,
  Show,
  Switch,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  on,
  onCleanup,
} from 'solid-js';
import { getUserName } from '../../auth/index.js';

import { useI18n } from '../../shared/i18n';
import { LoadBoundary } from '../../components/app/LoadBoundary';
import { showImagePreview } from '../../components/base-legacy/imagePreview.js';

import { createMessagingRuntime } from './messaging-runtime.js';

import { createConversationState } from './conversation.state.js';
import { createConversationActions } from './conversation.actions.js';
import {
  loadConversationHistory,
  useConversation,
} from './use-conversation.js';
import { clearLocalDraft, saveLocalDraft } from './local-drafts.js';
import type { ConversationId, UserId } from './types.js';
import type { ConversationSelection, MessageAttachment } from './interfaces.js';

import styles from './ConversationPanel.module.css';

const runtime = createMessagingRuntime();
const DRAFT_SAVE_DELAY_MS = 250;

function dataUrlMimeType(url: string) {
  const match = /^data:([^;,]+)[;,]/i.exec(url);
  return match?.[1]?.toLowerCase() ?? 'text/plain';
}

function hasAllowedDataUrl(attachment: MessageAttachment) {
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
  let inputEl: HTMLInputElement | undefined;
  let suppressScroll = false;
  let draftSaveTimer: ReturnType<typeof setTimeout> | undefined;
  let pendingDraft:
    | { userId: UserId; conversationId: ConversationId; text: string }
    | undefined;

  function scrollToEnd() {
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function focusInput() {
    inputEl?.focus();
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

  const historySource = createMemo<HistorySource>(
    () => {
      const conversationId = props.selection?.conversationId;
      const myUserId = props.myUserId;
      if (!conversationId || !myUserId) return null;
      return {
        conversationId,
        myUserId,
      };
    },
    null,
    {
      equals: (a, b) =>
        a?.conversationId === b?.conversationId && a?.myUserId === b?.myUserId,
    },
  );

  const [history] = createResource(historySource, ({ conversationId }) =>
    loadConversationHistory(runtime.messageRepository, conversationId),
  );

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
          return;
        }

        actions.startConversation(selection, source.myUserId);
      },
    ),
  );

  createEffect(() => {
    const source = historySource();
    const loadedMessages = history();
    if (!source || history.loading || history.error || !loadedMessages) return;
    if (source.conversationId !== state.conversationId) return;

    actions.mergeLoadedMessages(loadedMessages);
    setHistoryReady(true);
    suppressScroll = false;
    queueMicrotask(scrollToEnd);
    queueMicrotask(focusInput); // Not needed with autofocus attribute?
  });

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
          loading={history.loading}
          fallback={<MessageHistorySkeleton />}
          error={history.error}
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
                            const allowedDataUrl = hasAllowedDataUrl(file);
                            const canPreview =
                              allowedDataUrl && isImageAttachment(file);
                            const canDownload =
                              allowedDataUrl || file.data.startsWith('blob:');

                            return (
                              <span class={styles.fileMessage}>
                                <Show when={canPreview}>
                                  <img
                                    class={styles.filePreviewImg}
                                    src={file.data}
                                    alt={file.fileName}
                                    role='button'
                                    tabIndex={0}
                                    aria-label={`Open preview for ${file.fileName}`}
                                    onClick={() =>
                                      showImagePreview(file.data, file.fileName)
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key !== 'Enter' && e.key !== ' ') {
                                        return;
                                      }
                                      e.preventDefault();
                                      showImagePreview(
                                        file.data,
                                        file.fileName,
                                      );
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
                                      href={file.data}
                                      download={file.fileName}
                                      class={styles.fileMessageName}
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
          <input
            autofocus
            ref={inputEl}
            class={styles.input}
            type='text'
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
