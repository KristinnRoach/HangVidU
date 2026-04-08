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
      conversationId: null,
      roomId: 'room-1',
      savedAt: 10,
      lastInteractionAt: 30,
    });

    await expect(adapter.get('u1')).resolves.toEqual(result);
  });

  it('returns null when patching a missing record', async () => {
    await expect(adapter.patch('missing', { roomId: 'room-2' })).resolves.toBeNull();
  });

  it('promotes legacy contactName to contactNickName on get and persists it', async () => {
    let raw = JSON.stringify({
      u2: {
        contactId: 'u2',
        contactName: ' Legacy Bob ',
        roomId: 'room-2',
        savedAt: 11,
        lastInteractionAt: 22,
      },
    });

    const writes = [];
    const legacyAdapter = new ContactsLocalAdapter({
      storage: {
        getItem: () => raw,
        setItem: (_key, value) => {
          writes.push(value);
          raw = value;
        },
      },
      storageKey: 'contacts',
    });

    const result = await legacyAdapter.get('u2');

    expect(result).toEqual({
      contactId: 'u2',
      contactNickName: 'Legacy Bob',
      roomId: 'room-2',
      savedAt: 11,
      lastInteractionAt: 22,
    });
    expect(writes.length).toBe(1);
    expect(JSON.parse(raw).u2.contactNickName).toBe('Legacy Bob');
  });
});
