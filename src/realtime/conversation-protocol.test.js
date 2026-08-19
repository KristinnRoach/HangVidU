import { describe, expect, it } from 'vite-plus/test';
import { isConversationServerEvent } from './conversation-protocol';

describe('conversation protocol', () => {
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

  it('accepts read markers and rejects non-finite ones', () => {
    expect(
      isConversationServerEvent({ t: 'read', userId: 'user-a', lastReadAt: 5 }),
    ).toBe(true);
    expect(
      isConversationServerEvent({
        t: 'read',
        userId: 'user-a',
        lastReadAt: Number.NaN,
      }),
    ).toBe(false);
    expect(isConversationServerEvent({ t: 'read', lastReadAt: 5 })).toBe(false);
  });
});
