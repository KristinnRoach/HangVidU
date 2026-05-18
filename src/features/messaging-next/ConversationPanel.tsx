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
import { getUserName } from '../../auth/auth-state.js';
import { LoadBoundary } from '../../shared/components/LoadBoundary.jsx';
import { createConversationState } from './conversation.state.js';
import { createConversationActions } from './conversation.actions.js';
import {
  loadConversationHistory,
  useConversation,
} from './use-conversation.js';
import { clearLocalDraft, saveLocalDraft } from './local-drafts.js';
import { createMessagingRuntime } from './messaging-runtime.js';
import type { ConversationId, UserId } from './types.js';
import type { ConversationSelection } from './interfaces.js';
import styles from './ConversationPanel.module.css';

const runtime = createMessagingRuntime();
const DRAFT_SAVE_DELAY_MS = 250;

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

export default function ConversationPanel(props: ConversationPanelProps) {
  const store = createConversationState();
  const actions = createConversationActions(store);
  const { state } = store;

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

  const historySource = createMemo(() => {
    const selection = props.selection;
    const myUserId = props.myUserId;
    if (!selection || !myUserId) return null;
    return {
      conversationId: selection.conversationId,
      myUserId,
    };
  });

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
      <div class={styles.header}>
        {/* <Show when={state.conversationName} fallback={'Select a conversation'}>
          {state.conversationName}
        </Show> */}
      </div>

      <Show
        when={state.conversationId}
        fallback={
          <div class={styles.empty}>Select a contact to start chatting</div>
        }
      >
        <LoadBoundary
          loading={history.loading}
          fallback={<MessageHistorySkeleton />}
          error={history.error}
          errorFallback={
            <div class={styles.empty}>Unable to load message history</div>
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
