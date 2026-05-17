import {
  For,
  Match,
  Show,
  Switch,
  createEffect,
  on,
  onCleanup,
  onMount,
} from 'solid-js';
import { handleCommand } from '../../shared/events/index.js';
import { getLoggedInUserId, getUserName } from '../../auth/auth-state.js';
import { LoadBoundary } from '../../shared/components/LoadBoundary.jsx';
import { createConversationState } from './conversation.state.js';
import { createConversationActions } from './conversation.actions.js';
import {
  loadConversationMessages,
  useConversation,
} from './use-conversation.js';
import {
  clearLocalDraft,
  loadLocalDraft,
  saveLocalDraft,
} from './local-drafts.js';
import { createMessagingRuntime } from './messaging-runtime.js';
import type { ConversationId, UserId } from './types.js';
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

export default function ConversationPanel(props: { onFocus?: () => void }) {
  const store = createConversationState();
  const actions = createConversationActions(store);
  const { state } = store;
  const { send } = useConversation({
    repository: runtime.messageRepository,
    store,
    actions,
    getSenderName: getUserName,
  });

  let messagesEl: HTMLDivElement | undefined;
  let loadVersion = 0;
  let suppressScroll = false;
  let draftSaveTimer: ReturnType<typeof setTimeout> | undefined;
  let pendingDraft:
    | { userId: UserId; conversationId: ConversationId; text: string }
    | undefined;

  function scrollToEnd() {
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function focusInput() {
    const input = messagesEl?.parentElement?.querySelector('input');
    input?.focus();
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

  createEffect(
    on(
      () => state.messages.length,
      () => {
        if (suppressScroll) return;
        queueMicrotask(scrollToEnd);
      },
    ),
  );

  onMount(() => {
    const ac = new AbortController();

    handleCommand(
      'cmd:messaging:conversation:select',
      async ({ conversationId }: { conversationId: ConversationId }) => {
        const myUserId = getLoggedInUserId();
        if (!myUserId) return;

        props.onFocus?.();
        suppressScroll = true;
        flushDraftSave();

        const version = ++loadVersion;
        const typedMyUserId = myUserId as UserId;
        actions.openConversation(conversationId, typedMyUserId);
        actions.setDraft(loadLocalDraft(typedMyUserId, conversationId));
        await loadConversationMessages(
          runtime.messageRepository,
          conversationId,
          actions,
          () => version === loadVersion,
        );

        if (version === loadVersion) {
          actions.setLoading(false);
          suppressScroll = false;
          queueMicrotask(scrollToEnd);
        }

        focusInput();
      },
      { signal: ac.signal },
    );

    onCleanup(() => {
      loadVersion++;
      flushDraftSave();
      ac.abort();
    });
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
        fallback={
          <div class={styles.empty}>Select a contact to start chatting</div>
        }
      >
        <LoadBoundary
          loading={state.isLoading}
          fallback={<MessageHistorySkeleton />}
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
