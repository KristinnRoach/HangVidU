import { createRoot, createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { createConversationActions } from '../conversation.actions.js';
import { createConversationState } from '../conversation.state.js';
import {
  ensureDirectConversation,
  loadConversationHistory,
  useConversation,
} from '../use-conversation.js';

function envelope(overrides) {
  return {
    messageId: 'msg-1',
    conversationId: 'conversation-1',
    senderId: 'user-a',
    sentAt: 1,
    delivery: 'persistent',
    payload: {
      type: 'text',
      text: 'hello',
    },
    ...overrides,
  };
}

describe('messaging-next useConversation', () => {
  it('loads message history in chronological order regardless of repository order', async () => {
    const repository = {
      loadMessages: () => [
        envelope({ messageId: 'msg-3', sentAt: 3 }),
        envelope({ messageId: 'msg-1', sentAt: 1 }),
        envelope({ messageId: 'msg-2', sentAt: 2 }),
      ],
    };

    const loaded = await loadConversationHistory(repository, 'conversation-1');

    expect(loaded.map((msg) => msg.id)).toEqual(['msg-1', 'msg-2', 'msg-3']);
  });

  it('starts live subscriptions only after history is ready', async () => {
    const store = createConversationState();
    const actions = createConversationActions(store);
    actions.startConversation({ conversationId: 'conversation-1' }, 'me');

    const repository = {
      subscribe: vi.fn(() => () => {}),
      subscribeReactions: vi.fn(() => () => {}),
      send: vi.fn(),
    };

    await new Promise((resolve) => {
      createRoot((dispose) => {
        const [historyReady, setHistoryReady] = createSignal(false);
        useConversation({
          repository,
          store,
          actions,
          historyReady,
        });

        queueMicrotask(() => {
          expect(repository.subscribe).not.toHaveBeenCalled();
          expect(repository.subscribeReactions).not.toHaveBeenCalled();

          setHistoryReady(true);

          queueMicrotask(() => {
            expect(repository.subscribe).toHaveBeenCalledWith(
              'conversation-1',
              'me',
              expect.any(Function),
            );
            expect(repository.subscribeReactions).toHaveBeenCalledWith(
              'conversation-1',
              expect.any(Function),
            );
            dispose();
            resolve();
          });
        });
      });
    });
  });

  it('creates missing direct conversation metadata from the selected contact', async () => {
    const upserts = [];
    const repository = {
      loadConversation: () => null,
      upsertConversation: (conversation) => {
        upserts.push(conversation);
        return conversation;
      },
    };

    await ensureDirectConversation(repository, 'user-a_user-b', 'user-a', [
      'user-b',
    ]);

    expect(upserts).toHaveLength(1);
    expect(upserts[0].kind).toBe('direct');
    expect(Object.keys(upserts[0].participants)).toEqual(['user-a', 'user-b']);
  });
});
