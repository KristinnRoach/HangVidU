import { describe, expect, it } from 'vitest';
import { parseMessage } from './schema.js';

describe('messaging schema legacy compatibility', () => {
  it('normalizes legacy call:unanswered eventType to canonical format', () => {
    const parsed = parseMessage(
      {
        type: 'event',
        eventType: 'call:unanswered',
        from: 'user-123',
        sentAt: Date.now(),
        read: false,
      },
      'msg-1',
    );

    expect(parsed.eventType).toBe('evt:call:session:unanswered');
    expect(parsed.messageId).toBe('msg-1');
  });
});
