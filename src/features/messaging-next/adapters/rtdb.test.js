import { beforeEach, describe, expect, it, vi } from 'vitest';
import { get, serverTimestamp, set, update } from 'firebase/database';
import {
  createRTDBConversationRepository,
  createRTDBMessageRepository,
} from './rtdb.js';

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
  onValue: vi.fn(),
  off: vi.fn(),
  serverTimestamp: vi.fn(() => ({ '.sv': 'timestamp' })),
  update: vi.fn(),
}));

describe('messaging-next RTDB adapter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('persists drafts as conversation metadata without changing message rows', async () => {
    vi.mocked(get).mockResolvedValue({
      exists: () => true,
      val: () => ({
        conversationId: 'user-a_user-b',
        kind: 'direct',
        participants: {
          'user-a': { userId: 'user-a', joinedAt: 1 },
          'user-b': { userId: 'user-b', joinedAt: 1 },
        },
        deliveryPolicy: 'persistent',
        createdAt: 1,
        updatedAt: 10,
        draft: {
          text: 'typed but not sent',
          updatedAt: 10,
        },
      }),
    });

    const repository = createRTDBConversationRepository();

    const conversation = await repository.setDraft('user-a_user-b', {
      text: 'typed but not sent',
      updatedAt: 10,
    });

    expect(set).toHaveBeenCalledWith(
      { path: 'conversations/user-a_user-b/draft' },
      {
        text: 'typed but not sent',
        updatedAt: 10,
      },
    );
    expect(update).toHaveBeenCalledWith(
      { path: 'conversations/user-a_user-b' },
      { updatedAt: 10 },
    );
    expect(conversation.draft.text).toBe('typed but not sent');
  });
});
