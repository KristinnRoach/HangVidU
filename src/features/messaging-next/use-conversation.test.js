import { describe, expect, it } from 'vitest';
import { loadConversationMessages } from './use-conversation.js';

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
  it('applies loaded messages in chronological order regardless of repository order', async () => {
    const received = [];
    const repository = {
      loadMessages: () => [
        envelope({ messageId: 'msg-3', sentAt: 3 }),
        envelope({ messageId: 'msg-1', sentAt: 1 }),
        envelope({ messageId: 'msg-2', sentAt: 2 }),
      ],
    };

    await loadConversationMessages(
      repository,
      'conversation-1',
      {
        receiveMessage: (message) => received.push(message),
      },
      () => true,
    );

    expect(received.map((msg) => msg.id)).toEqual(['msg-1', 'msg-2', 'msg-3']);
  });
});
