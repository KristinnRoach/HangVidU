import { beforeEach, describe, expect, it } from 'vitest';

import { ContactsLocalAdapter } from './contacts-local-adapter.js';

describe('ContactsLocalAdapter', () => {
  let storage;
  let adapter;

  beforeEach(() => {
    let raw = JSON.stringify({
      u1: {
        contactId: 'u1',
        contactNickName: 'Alice',
        roomId: 'room-1',
        savedAt: 10,
        lastInteractionAt: 20,
      },
    });

    storage = {
      getItem: () => raw,
      setItem: (_key, value) => {
        raw = value;
      },
    };

    adapter = new ContactsLocalAdapter({
      storage,
      storageKey: 'contacts',
    });
  });

  it('patches one record without replacing unrelated fields', async () => {
    const result = await adapter.patch('u1', {
      lastInteractionAt: 30,
    });

    expect(result).toEqual({
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-1',
      conversationId: null,
      savedAt: 10,
      lastInteractionAt: 30,
    });

    await expect(adapter.get('u1')).resolves.toEqual(result);
  });

  it('returns null when patching a missing record', async () => {
    await expect(adapter.patch('missing', { roomId: 'room-2' })).resolves.toBeNull();
  });

  it('does not promote legacy contactName on get', async () => {
    let raw = JSON.stringify({
      u2: {
        contactId: 'u2',
        contactName: ' Legacy Bob ',
        roomId: 'room-2',
        savedAt: 11,
        lastInteractionAt: 22,
      },
      u3: {
        contactNickName: 'Legacy No Id',
        roomId: 'room-3',
        savedAt: 13,
        lastInteractionAt: 23,
      },
    });

    const legacyAdapter = new ContactsLocalAdapter({
      storage: {
        getItem: () => raw,
        setItem: (_key, value) => {
          raw = value;
        },
      },
      storageKey: 'contacts',
    });

    await expect(legacyAdapter.get('u2')).resolves.toEqual({
      contactId: 'u2',
      contactNickName: '',
      roomId: 'room-2',
      conversationId: null,
      savedAt: 11,
      lastInteractionAt: 22,
    });
    await expect(legacyAdapter.get('u3')).rejects.toThrow();
  });
});
