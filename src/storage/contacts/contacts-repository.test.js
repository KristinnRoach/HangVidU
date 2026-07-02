import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

import { ContactsRepository } from './contacts-repository.js';

describe('ContactsRepository', () => {
  let adapter;
  let store;

  beforeEach(() => {
    adapter = {
      get: vi.fn(),
      list: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      remove: vi.fn(),
    };
    store = new ContactsRepository(adapter);
  });

  it('delegates patch() to the adapter with a normalized patch', async () => {
    adapter.patch.mockResolvedValue({
      contactId: 'u1',
      nickname: 'Alice',
      displayName: '',
      username: '',
      conversationId: '11111111-1111-4111-8111-111111111111',
      savedAt: 10,
      lastInteractionAt: 20,
    });

    const result = await store.patch('u1', {
      nickname: '  Alice  ',
      conversationId: ' 11111111-1111-4111-8111-111111111111 ',
    });

    expect(adapter.patch).toHaveBeenCalledWith('u1', {
      nickname: 'Alice',
      conversationId: '11111111-1111-4111-8111-111111111111',
    });
    expect(result).toEqual({
      contactId: 'u1',
      nickname: 'Alice',
      displayName: '',
      username: '',
      conversationId: '11111111-1111-4111-8111-111111111111',
      savedAt: 10,
      lastInteractionAt: 20,
    });
  });

  it('returns null when the adapter patch() reports a missing contact', async () => {
    adapter.patch.mockResolvedValue(null);

    await expect(
      store.patch('missing', {
        conversationId: '11111111-1111-4111-8111-111111111111',
      }),
    ).resolves.toBeNull();
  });
});
