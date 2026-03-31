import { describe, it, expect } from 'vitest';
import { parseConversation } from './schema.js';

describe('ConversationSchema', () => {
  it('parses the current RTDB conversation shape', () => {
    expect(
      parseConversation({
        members: { me: true, you: true },
        messages: {
          msg1: {
            type: 'text',
            text: 'hello',
            from: 'me',
            fromName: 'Me',
            sentAt: 123,
            read: false,
            reactions: {
              heart: { you: true },
            },
          },
        },
      }),
    ).toEqual({
      members: { me: true, you: true },
      messages: {
        msg1: {
          type: 'text',
          text: 'hello',
          from: 'me',
          fromName: 'Me',
          sentAt: 123,
          read: false,
          reactions: {
            heart: { you: true },
          },
        },
      },
    });
  });

  it('rejects non-RTDB member values', () => {
    expect(() =>
      parseConversation({
        members: { me: true, you: false },
      }),
    ).toThrow();
  });
});
