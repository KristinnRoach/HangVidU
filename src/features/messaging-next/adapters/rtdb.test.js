import { beforeEach, describe, expect, it, vi } from 'vitest';
import { get } from 'firebase/database';
import { createRTDBConversationRepository } from './rtdb.js';

vi.mock('firebase/database', () => ({
  ref: vi.fn((_db, path) => ({ path })),
  get: vi.fn(),
  onValue: vi.fn(() => vi.fn()),
  update: vi.fn(),
}));

const database = {};

function createConversationRepository() {
  return createRTDBConversationRepository({ database });
}

describe('messaging-next RTDB conversation adapter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads shared conversation metadata without draft state', async () => {
    vi.mocked(get).mockResolvedValue({
      exists: () => true,
      val: () => ({
        conversationId: 'conversation-1',
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

    const repository = createConversationRepository();

    const conversation = await repository.loadConversation('conversation-1');

    expect(conversation?.conversationId).toBe('conversation-1');
    expect(conversation).not.toHaveProperty('draft');
  });
});
