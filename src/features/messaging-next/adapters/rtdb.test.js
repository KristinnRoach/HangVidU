import { describe, expect, it, vi } from 'vitest';
import { serverTimestamp, set } from 'firebase/database';
import { createRTDBMessageRepository } from './rtdb.js';

vi.mock('../../../shared/storage/fb-rtdb/rtdb.js', () => ({
  rtdb: {},
}));

vi.mock('firebase/database', () => ({
  ref: vi.fn((_db, path) => ({ path })),
  push: vi.fn(() => ({ key: 'msg-1' })),
  set: vi.fn(),
  get: vi.fn(),
  onChildAdded: vi.fn(),
  onChildChanged: vi.fn(),
  off: vi.fn(),
  serverTimestamp: vi.fn(() => ({ '.sv': 'timestamp' })),
}));

describe('messaging-next RTDB adapter', () => {
  it('writes legacy-compatible text message rows', async () => {
    const repository = createRTDBMessageRepository();

    await repository.send({
      messageId: 'temp-1',
      conversationId: 'user-a_user-b',
      senderId: 'user-a',
      senderName: 'User A',
      sentAt: 10,
      delivery: 'persistent',
      payload: {
        type: 'text',
        text: 'hello',
      },
    });

    expect(set).toHaveBeenCalledWith(
      { key: 'msg-1' },
      {
        from: 'user-a',
        fromName: 'User A',
        text: 'hello',
        type: 'text',
        sentAt: serverTimestamp(),
        read: false,
      },
    );
  });
});
