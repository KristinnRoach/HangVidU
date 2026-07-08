import { describe, expect, it, vi } from 'vite-plus/test';
import { createMessageSyncRepository } from './message-sync.js';

function wireMessage(reactions = []) {
  return {
    id: 'm1',
    conversationId: 'c1',
    senderId: 'other',
    senderName: null,
    kind: 'text',
    body: 'hello',
    sentAt: 1,
    attachments: [],
    reactions,
  };
}

describe('message sync reactions', () => {
  it('hydrates history and folds shared reaction events into the same window', async () => {
    let onEvent;
    const client = {
      getUserId: () => 'me',
      loadMessages: vi.fn(async () => [
        wireMessage([{ key: 'heart', count: 1, reactedByMe: true }]),
      ]),
      sendMessage: vi.fn(),
      setMyReaction: vi.fn(),
      subscribe: vi.fn((_conversationId, handler) => {
        onEvent = handler;
        return () => {};
      }),
    };
    const repository = createMessageSyncRepository(client);
    const snapshots = [];

    await repository.watchRecentMessages('c1', (messages) =>
      snapshots.push(messages),
    );
    onEvent({
      t: 'reaction',
      messageId: 'm1',
      actorUserId: 'other',
      actorReactionKey: 'heart',
      reactions: [{ key: 'heart', count: 2 }],
    });
    onEvent({
      t: 'reaction',
      messageId: 'm1',
      actorUserId: 'me',
      actorReactionKey: null,
      reactions: [{ key: 'heart', count: 1 }],
    });

    expect(snapshots.map((messages) => messages[0].reactions)).toEqual([
      [{ key: 'heart', count: 1, reactedByMe: true }],
      [{ key: 'heart', count: 2, reactedByMe: true }],
      [{ key: 'heart', count: 1, reactedByMe: false }],
    ]);
    expect(client.subscribe).toHaveBeenCalledTimes(1);
  });

  it('persists the desired reaction key without sending user identity', async () => {
    const client = {
      getUserId: () => 'me',
      loadMessages: vi.fn(),
      sendMessage: vi.fn(),
      setMyReaction: vi.fn(async () => []),
      subscribe: vi.fn(),
    };
    const repository = createMessageSyncRepository(client);

    await repository.setMyReaction('c1', 'm1', 'me', 'laugh');

    expect(client.setMyReaction).toHaveBeenCalledWith('c1', 'm1', 'laugh');
  });

  it('persists a read marker via the client', async () => {
    const client = {
      getUserId: () => 'me',
      loadMessages: vi.fn(),
      sendMessage: vi.fn(),
      setMyReaction: vi.fn(),
      markRead: vi.fn(async () => {}),
      subscribe: vi.fn(),
    };
    const repository = createMessageSyncRepository(client);

    await repository.markConversationRead('c1', 'me');

    expect(client.markRead).toHaveBeenCalledWith('c1');
  });
});
