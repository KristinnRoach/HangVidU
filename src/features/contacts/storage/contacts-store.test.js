import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ContactsStore } from './contacts-store.js';

describe('ContactsStore', () => {
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
    store = new ContactsStore(adapter);
  });

  it('delegates patch() to the adapter with a normalized patch', async () => {
    adapter.patch.mockResolvedValue({
      contactId: 'u1',
      contactName: 'Alice',
      roomId: 'room-2',
      savedAt: 10,
      lastInteractionAt: 20,
    });

    const result = await store.patch('u1', {
      contactName: '  Alice  ',
      roomId: ' room-2 ',
    });

    expect(adapter.patch).toHaveBeenCalledWith('u1', {
      contactNickName: 'Alice',
      contactName: 'Alice',
      roomId: 'room-2',
    });
    expect(result).toEqual({
      contactId: 'u1',
      contactNickName: 'Alice',
      contactName: 'Alice',
      roomId: 'room-2',
      savedAt: 10,
      lastInteractionAt: 20,
    });
  });

  it('returns null when the adapter patch() reports a missing contact', async () => {
    adapter.patch.mockResolvedValue(null);

    await expect(store.patch('missing', { roomId: 'room-1' })).resolves.toBeNull();
  });
});
