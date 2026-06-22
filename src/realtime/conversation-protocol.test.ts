import { describe, expect, it } from 'vitest';
import { isConversationServerEvent } from './conversation-protocol';

describe('conversation reaction protocol', () => {
  it('accepts authoritative reaction broadcasts and rejects malformed counts', () => {
    const event = {
      t: 'reaction',
      messageId: 'm1',
      actorUserId: 'user-a',
      actorReactionKey: 'heart',
      reactions: [{ key: 'heart', count: 2 }],
    };

    expect(isConversationServerEvent(event)).toBe(true);
    expect(
      isConversationServerEvent({
        ...event,
        reactions: [{ key: 'heart', count: 0 }],
      }),
    ).toBe(false);
  });
});
