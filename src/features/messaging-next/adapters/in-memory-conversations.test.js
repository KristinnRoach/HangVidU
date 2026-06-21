import { describe, expect, it, vi } from 'vitest';
import { createInMemoryConversationRepository } from './in-memory-conversations.js';

function participant(userId, joinedAt = 1) {
  return {
    userId,
    joinedAt,
  };
}

function directConversation(overrides = {}) {
  return {
    conversationId: 'conversation-1',
    kind: 'direct',
    participants: {
      'user-a': participant('user-a'),
      'user-b': participant('user-b'),
    },
    ...overrides,
  };
}

describe('messaging-next in-memory conversation repository', () => {
  it('creates conversation nodes with schema defaults and timestamps', () => {
    vi.useFakeTimers();
    vi.setSystemTime(1000);

    try {
      const repository = createInMemoryConversationRepository();

      const conversation = repository.upsertConversation(directConversation());

      expect(conversation.createdAt).toBe(1000);
      expect(conversation.updatedAt).toBe(1000);
      expect(conversation.deliveryPolicy).toBe('persistent');
      expect(conversation.participants['user-a'].role).toBe('member');
    } finally {
      vi.useRealTimers();
    }
  });

  it('preserves createdAt when metadata is updated', () => {
    const repository = createInMemoryConversationRepository();

    repository.upsertConversation(
      directConversation({
        createdAt: 1,
        updatedAt: 1,
      }),
    );

    const updated = repository.upsertConversation(
      directConversation({
        title: 'Direct chat',
        updatedAt: 3,
      }),
    );

    expect(updated.createdAt).toBe(1);
    expect(updated.updatedAt).toBe(3);
    expect(updated.title).toBe('Direct chat');
  });

  it('notifies subscribers and returns defensive copies', () => {
    const repository = createInMemoryConversationRepository();
    const seen = [];

    const unsubscribe = repository.subscribeConversation(
      'conversation-1',
      (conversation) => seen.push(conversation),
    );

    const saved = repository.upsertConversation(directConversation());
    seen[0].title = 'mutated subscriber copy';
    saved.title = 'mutated returned copy';

    expect(repository.loadConversation('conversation-1')?.title).toBeUndefined();

    unsubscribe();
    repository.upsertConversation(directConversation({ title: 'after off' }));

    expect(seen).toHaveLength(1);
  });

  it('emits the current conversation when subscribing after creation', () => {
    const repository = createInMemoryConversationRepository();
    repository.upsertConversation(directConversation({ title: 'Existing' }));

    const seen = [];
    repository.subscribeConversation('conversation-1', (conversation) =>
      seen.push(conversation),
    );

    expect(seen).toHaveLength(1);
    expect(seen[0].title).toBe('Existing');
  });
});
