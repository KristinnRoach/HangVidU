import { describe, expect, it } from 'vitest';
import { createConversationActions } from './conversation.actions.js';
import { createConversationState } from './conversation.state.js';

function message(overrides) {
  return {
    id: 'msg-1',
    conversationId: 'conversation-1',
    senderId: 'user-a',
    text: 'hello',
    sentAt: 1,
    source: 'persisted',
    delivery: 'persistent',
    reactions: {},
    ...overrides,
  };
}

describe('messaging-next conversation actions', () => {
  it('keeps messages ordered by sentAt when replay and history arrive out of order', () => {
    const store = createConversationState();
    const actions = createConversationActions(store);

    actions.openConversation('conversation-1', 'me');
    actions.receiveMessage(
      message({ id: 'remote-2', senderId: 'other', sentAt: 2 }),
    );
    actions.receiveMessage(
      message({ id: 'remote-4', senderId: 'other', sentAt: 4 }),
    );
    actions.receiveMessage(
      message({ id: 'own-1', senderId: 'me', sentAt: 1 }),
    );
    actions.receiveMessage(
      message({ id: 'own-3', senderId: 'me', sentAt: 3 }),
    );

    expect(store.state.messages.map((msg) => msg.id)).toEqual([
      'own-1',
      'remote-2',
      'own-3',
      'remote-4',
    ]);
  });

  it('re-sorts an existing message when canonical metadata changes', () => {
    const store = createConversationState();
    const actions = createConversationActions(store);

    actions.openConversation('conversation-1', 'me');
    actions.receiveMessage(message({ id: 'msg-a', sentAt: 10 }));
    actions.receiveMessage(message({ id: 'msg-b', sentAt: 20 }));
    actions.receiveMessage(message({ id: 'msg-b', sentAt: 5 }));

    expect(store.state.messages.map((msg) => msg.id)).toEqual([
      'msg-b',
      'msg-a',
    ]);
  });

  it('keeps optimistic messages ordered after their canonical id is assigned', () => {
    const store = createConversationState();
    const actions = createConversationActions(store);

    actions.openConversation('conversation-1', 'me');
    actions.addOptimisticMessage({
      ...message({ id: 'temp-z', senderId: 'me', sentAt: 10 }),
      status: 'sending',
    });
    actions.receiveMessage(message({ id: 'msg-z', sentAt: 10 }));

    actions.markSent('temp-z', 'msg-a');

    expect(store.state.messages.map((msg) => msg.id)).toEqual([
      'msg-a',
      'msg-z',
    ]);
  });
});
