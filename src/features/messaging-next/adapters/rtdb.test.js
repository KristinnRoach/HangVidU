import { beforeEach, describe, expect, it, vi } from 'vitest';
import { get, serverTimestamp, set } from 'firebase/database';
import {
  createRTDBConversationRepository,
  createRTDBMessageRepository,
} from './rtdb.js';

vi.mock('../../../infra/firebase-rtdb.js', () => ({
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
  query: vi.fn((ref) => ref),
  limitToLast: vi.fn((count) => ({ count })),
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

  it('loads legacy file message rows for read-side rendering', async () => {
    vi.mocked(get).mockResolvedValue({
      exists: () => true,
      forEach: (visit) => {
        visit({
          key: 'file-1',
          val: () => ({
            from: 'user-a',
            fromName: 'User A',
            type: 'file',
            fileName: 'demo.png',
            mimeType: 'image/png',
            fileSize: 123,
            data: 'data:image/png;base64,abc',
            sentAt: 10,
            read: false,
          }),
        });
      },
    });

    const repository = createRTDBMessageRepository();
    const messages = await repository.loadMessages('user-a_user-b');

    expect(messages).toEqual([
      expect.objectContaining({
        messageId: 'file-1',
        payload: {
          type: 'file',
          fileName: 'demo.png',
          mimeType: 'image/png',
          fileSize: 123,
          data: 'data:image/png;base64,abc',
          text: undefined,
        },
      }),
    ]);
  });

  it('loads shared conversation metadata without draft state', async () => {
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
      }),
    });

    const repository = createRTDBConversationRepository();

    const conversation = await repository.loadConversation('user-a_user-b');

    expect(conversation?.conversationId).toBe('user-a_user-b');
    expect(conversation).not.toHaveProperty('draft');
  });
});
