import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  ref: vi.fn((_database, path) => ({ path })),
  remove: vi.fn(),
  runTransaction: vi.fn(),
  set: vi.fn(),
}));

vi.mock('firebase/database', () => ({
  get: mocks.get,
  ref: mocks.ref,
  remove: mocks.remove,
  runTransaction: mocks.runTransaction,
  set: mocks.set,
}));

import { ContactsRTDBAdapter } from './contacts-rtdb-adapter.js';

describe('ContactsRTDBAdapter', () => {
  let adapter;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    adapter = new ContactsRTDBAdapter({
      database: {},
      getOwnerId: () => 'owner-1',
    });
  });

  it('patches a contact through one RTDB transaction', async () => {
    mocks.runTransaction.mockImplementation(async (_refArg, updateFn) => {
      const nextValue = updateFn({
        contactId: 'u1',
        contactNickName: 'Alice',
        roomId: 'room-1',
        savedAt: 10,
        lastInteractionAt: 20,
      });

      return {
        committed: true,
        snapshot: {
          val: () => nextValue,
        },
      };
    });

    const result = await adapter.patch('u1', {
      roomId: 'room-2',
      lastInteractionAt: 30,
    });

    expect(mocks.runTransaction).toHaveBeenCalledTimes(1);
    expect(mocks.runTransaction).toHaveBeenCalledWith(
      { path: 'users/owner-1/contacts/u1' },
      expect.any(Function),
      { applyLocally: false },
    );
    expect(result).toEqual({
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-2',
      conversationId: null,
      savedAt: 10,
      lastInteractionAt: 30,
    });
  });

  it('returns null when the transaction target does not exist', async () => {
    mocks.runTransaction.mockImplementation(async (_refArg, updateFn) => {
      updateFn(null);
      return {
        committed: false,
        snapshot: {
          val: () => null,
        },
      };
    });
    mocks.get.mockResolvedValue({
      exists: () => false,
      val: () => null,
    });

    await expect(adapter.patch('missing', { roomId: 'room-2' })).resolves.toBeNull();
    expect(mocks.set).not.toHaveBeenCalled();
  });

  it('does not promote legacy contactName on get', async () => {
    mocks.get.mockResolvedValue({
      exists: () => true,
      val: () => ({
        contactId: 'u1',
        contactName: ' Legacy Alice ',
        roomId: 'room-1',
        savedAt: 10,
        lastInteractionAt: 20,
      }),
    });

    await expect(adapter.get('u1')).resolves.toEqual({
      contactId: 'u1',
      contactNickName: '',
      roomId: 'room-1',
      conversationId: null,
      savedAt: 10,
      lastInteractionAt: 20,
    });
    expect(mocks.set).not.toHaveBeenCalled();
  });

  it('returns null when contactId is missing from an RTDB record', async () => {
    mocks.get.mockResolvedValue({
      exists: () => true,
      val: () => ({
        contactNickName: 'Legacy No Id',
        roomId: 'room-1',
        savedAt: 10,
        lastInteractionAt: 20,
      }),
    });

    await expect(adapter.get('u1')).resolves.toBeNull();
    expect(mocks.set).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('skips invalid records during list', async () => {
    mocks.get.mockResolvedValue({
      exists: () => true,
      val: () => ({
        u1: {
          contactId: 'u1',
          contactNickName: 'Alice',
          roomId: 'room-1',
          savedAt: 10,
          lastInteractionAt: 20,
        },
        broken: {
          contactNickName: 'Missing Id',
          roomId: 'room-2',
          savedAt: 11,
          lastInteractionAt: 21,
        },
      }),
    });

    await expect(adapter.list()).resolves.toEqual([
      {
        contactId: 'u1',
        contactNickName: 'Alice',
        roomId: 'room-1',
        conversationId: null,
        savedAt: 10,
        lastInteractionAt: 20,
      },
    ]);
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('falls back to get+set when transaction is not committed but record exists', async () => {
    mocks.runTransaction.mockResolvedValue({
      committed: false,
      snapshot: {
        val: () => null,
      },
    });
    mocks.get.mockResolvedValue({
      exists: () => true,
      val: () => ({
        contactId: 'u1',
        contactNickName: 'Alice',
        roomId: 'room-1',
        savedAt: 10,
        lastInteractionAt: 20,
      }),
    });

    const result = await adapter.patch('u1', {
      roomId: 'room-2',
      lastInteractionAt: 30,
    });

    expect(mocks.get).toHaveBeenCalledWith({ path: 'users/owner-1/contacts/u1' });
    expect(mocks.set).toHaveBeenCalledWith(
      { path: 'users/owner-1/contacts/u1' },
      {
        contactId: 'u1',
        contactNickName: 'Alice',
        roomId: 'room-2',
        conversationId: null,
        savedAt: 10,
        lastInteractionAt: 30,
      },
    );
    expect(result).toEqual({
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-2',
      conversationId: null,
      savedAt: 10,
      lastInteractionAt: 30,
    });
  });

  it('returns the committed snapshot when transaction retries from null current', async () => {
    mocks.runTransaction.mockImplementation(async (_refArg, updateFn) => {
      updateFn(null);
      const nextValue = updateFn({
        contactId: 'u1',
        contactNickName: 'Alice',
        roomId: 'room-1',
        savedAt: 10,
        lastInteractionAt: 20,
      });

      return {
        committed: true,
        snapshot: {
          val: () => nextValue,
        },
      };
    });

    const result = await adapter.patch('u1', {
      roomId: 'room-2',
      lastInteractionAt: 30,
    });

    expect(result).toEqual({
      contactId: 'u1',
      contactNickName: 'Alice',
      roomId: 'room-2',
      conversationId: null,
      savedAt: 10,
      lastInteractionAt: 30,
    });
  });
});
