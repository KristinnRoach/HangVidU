import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  get,
  onValue,
  orderByChild,
  push,
  serverTimestamp,
  set,
  startAfter,
  update,
} from 'firebase/database';
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
  onValue: vi.fn(() => vi.fn()),
  off: vi.fn(),
  query: vi.fn((ref, ...constraints) => ({ ref, constraints })),
  limitToLast: vi.fn((count) => ({ count })),
  serverTimestamp: vi.fn(() => ({ '.sv': 'timestamp' })),
  update: vi.fn(),
  orderByChild: vi.fn((key) => ({ orderByChild: key })),
  startAfter: vi.fn((key) => ({ startAfter: key })),
}));

describe('messaging-next RTDB adapter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('writes legacy-compatible text message rows', async () => {
    const repository = createRTDBMessageRepository();

    await repository.send({
      messageId: 'msg-1',
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
      { path: 'conversations/user-a_user-b/messages/msg-1' },
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

  it('writes storage-backed file message rows without inline data or urls', async () => {
    const repository = createRTDBMessageRepository();

    await repository.send({
      messageId: 'file-1',
      conversationId: 'user-a_user-b',
      senderId: 'user-a',
      senderName: 'User A',
      sentAt: 10,
      delivery: 'persistent',
      payload: {
        type: 'file',
        fileName: 'demo.webp',
        mimeType: 'image/webp',
        fileSize: 123,
          storage: {
            provider: 'r2',
            bucket: 'hangvidu-files',
            key: 'conversation-files/user-a_user-b/file-1',
          },
        text: 'caption',
      },
    });

    expect(set).toHaveBeenCalledWith(
      { path: 'conversations/user-a_user-b/messages/file-1' },
      {
        from: 'user-a',
        fromName: 'User A',
        type: 'file',
        fileName: 'demo.webp',
        mimeType: 'image/webp',
        fileSize: 123,
        storage: {
          provider: 'r2',
          bucket: 'hangvidu-files',
          key: 'conversation-files/user-a_user-b/file-1',
        },
        text: 'caption',
        sentAt: serverTimestamp(),
        read: false,
      },
    );
  });

  it('rejects file sends without R2 storage metadata', async () => {
    const repository = createRTDBMessageRepository();

    await expect(
      repository.send({
        messageId: 'file-1',
        conversationId: 'user-a_user-b',
        senderId: 'user-a',
        senderName: 'User A',
        sentAt: 10,
        delivery: 'persistent',
        payload: {
          type: 'file',
          fileName: 'demo.webp',
          mimeType: 'image/webp',
          fileSize: 123,
          data: 'data:image/webp;base64,abc',
        },
      }),
    ).rejects.toThrow('file message payload requires R2 storage metadata');
    expect(set).not.toHaveBeenCalled();
  });

  it('rejects file sends with non-R2 storage metadata', async () => {
    const repository = createRTDBMessageRepository();

    await expect(
      repository.send({
        messageId: 'file-1',
        conversationId: 'user-a_user-b',
        senderId: 'user-a',
        senderName: 'User A',
        sentAt: 10,
        delivery: 'persistent',
        payload: {
          type: 'file',
          fileName: 'demo.webp',
          mimeType: 'image/webp',
          fileSize: 123,
          storage: {
            provider: 'public-url',
            bucket: 'hangvidu-files',
            key: 'conversation-files/user-a_user-b/file-1',
          },
        },
      }),
    ).rejects.toThrow('file message payload requires R2 storage metadata');
    expect(set).not.toHaveBeenCalled();
  });

  it('reserves RTDB push keys before optimistic rendering', () => {
    const repository = createRTDBMessageRepository();

    expect(repository.createMessageId('user-a_user-b')).toBe('msg-1');
    expect(push).toHaveBeenCalledWith({
      path: 'conversations/user-a_user-b/messages',
    });
  });

  it('skips inline file message rows without R2 storage', async () => {
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

    expect(messages).toEqual([]);
  });

  it('loads R2 file message rows for read-side rendering', async () => {
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
            storage: {
              provider: 'r2',
              bucket: 'hangvidu-files',
              key: 'conversation-files/user-a_user-b/file-1',
            },
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
          storage: {
            provider: 'r2',
            bucket: 'hangvidu-files',
            key: 'conversation-files/user-a_user-b/file-1',
          },
          text: undefined,
        },
      }),
    ]);
  });

  it('watches the recent message window as a full snapshot', () => {
    const unsubscribe = vi.fn();
    vi.mocked(onValue).mockImplementationOnce((queryRef, next) => {
      next({
        exists: () => true,
        forEach: (visit) => {
          visit({
            key: 'msg-1',
            val: () => ({
              from: 'user-a',
              fromName: 'User A',
              text: 'hello',
              type: 'text',
              sentAt: 10,
              read: false,
            }),
          });
        },
      });
      return unsubscribe;
    });

    const repository = createRTDBMessageRepository();
    const onMessages = vi.fn();
    const result = repository.watchRecentMessages('user-a_user-b', onMessages);

    expect(result).toBe(unsubscribe);
    expect(onMessages).toHaveBeenCalledWith([
      expect.objectContaining({
        messageId: 'msg-1',
        senderId: 'user-a',
        payload: { type: 'text', text: 'hello' },
      }),
    ]);
  });

  it('marks a conversation read with a server timestamp', async () => {
    const repository = createRTDBMessageRepository();
    await repository.markConversationRead('user-a_user-b', 'user-a');

    expect(update).toHaveBeenCalledWith(
      { path: 'conversations/user-a_user-b/members/user-a' },
      { lastReadAt: serverTimestamp() },
    );
  });

  it('emits conversation activity with latest message and lastReadAt', () => {
    const unsubscribeLatest = vi.fn();
    const unsubscribeRead = vi.fn();
    const calls = [];

    vi.mocked(onValue)
      .mockImplementationOnce((_queryRef, next) => {
        next({
          forEach: (visit) => {
            visit({
              val: () => ({ from: 'user-b', sentAt: 200 }),
            });
          },
        });
        return unsubscribeLatest;
      })
      .mockImplementationOnce((_queryRef, next) => {
        next({ val: () => ({ lastReadAt: 100 }) });
        return unsubscribeRead;
      });

    const repository = createRTDBMessageRepository();
    const unsubscribe = repository.watchConversationActivity(
      'user-a_user-b',
      'user-a',
      (activity) => calls.push(activity),
    );

    expect(calls).toEqual([
      { latestSentAt: 200, latestSenderId: 'user-b', lastReadAt: 100 },
    ]);

    unsubscribe();
    expect(unsubscribeLatest).toHaveBeenCalled();
    expect(unsubscribeRead).toHaveBeenCalled();
  });

  it('emits activity reflecting the users own latest message', () => {
    const calls = [];
    vi.mocked(onValue)
      .mockImplementationOnce((_queryRef, next) => {
        next({
          forEach: (visit) => {
            visit({ val: () => ({ from: 'user-a', sentAt: 200 }) });
          },
        });
        return vi.fn();
      })
      .mockImplementationOnce((_queryRef, next) => {
        next({ val: () => ({ lastReadAt: 0 }) });
        return vi.fn();
      });

    const repository = createRTDBMessageRepository();
    repository.watchConversationActivity('user-a_user-b', 'user-a', (a) =>
      calls.push(a),
    );

    expect(calls).toEqual([
      { latestSentAt: 200, latestSenderId: 'user-a', lastReadAt: 0 },
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
