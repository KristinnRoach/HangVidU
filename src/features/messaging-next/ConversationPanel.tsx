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
import { getLoggedInUserId } from '../../auth/auth-state.js';
import { createConversationState } from './conversation.state.js';
import { createConversationActions } from './conversation.actions.js';
import {
  loadConversationMessages,
  useConversation,
} from './use-conversation.js';
import { createRTDBMessageRepository } from './adapters/rtdb.js';
import type { ConversationId, UserId } from './types.js';
import styles from './ConversationPanel.module.css';

const repository = createRTDBMessageRepository();

export default function ConversationPanel(props: { onFocus?: () => void }) {
  const store = createConversationState();
  const actions = createConversationActions(store);
  const { state } = store;
  const { send } = useConversation({ repository, store, actions });

  let messagesEl: HTMLDivElement | undefined;
  let loadVersion = 0;
  let suppressScroll = false;

  function scrollToEnd() {
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
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

        const version = ++loadVersion;
        actions.openConversation(conversationId, myUserId as UserId);
        await loadConversationMessages(
          repository,
          conversationId,
          actions,
          () => version === loadVersion,
        );

        if (version === loadVersion) {
          actions.setLoading(false);
          suppressScroll = false;
          queueMicrotask(scrollToEnd);
        }
      },
      { signal: ac.signal },
    );

    onCleanup(() => {
      loadVersion++;
      ac.abort();
    });
  });

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
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
        <div class={styles.messages} ref={messagesEl} hidden={state.isLoading}>
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

        <form class={styles.form} onSubmit={onSubmit}>
          <input
            class={styles.input}
            type='text'
            placeholder='Message…'
            value={state.draft}
            onInput={(e) => actions.setDraft(e.currentTarget.value)}
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
