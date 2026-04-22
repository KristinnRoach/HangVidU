// src/call/tests/room-creation.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('firebase/database', () => {
  const getDatabase = vi.fn(() => ({}));
  const ref = vi.fn((/* db */ _db, path) => ({ path }));
  const set = vi.fn(() => Promise.resolve());
  const get = vi.fn();
  const update = vi.fn();
  const remove = vi.fn();
  const onChildAdded = vi.fn();
  const onChildRemoved = vi.fn();
  const onValue = vi.fn();
  const off = vi.fn();
  const runTransaction = vi.fn(async (_fbRef, updateFn) => {
    const value = updateFn(null);
    return {
      committed: value !== undefined,
      snapshot: {
        val: () => value,
      },
    };
  });

  return {
    getDatabase,
    ref,
    set,
    get,
    update,
    remove,
    runTransaction,
    onChildAdded,
    onChildRemoved,
    onValue,
    off,
  };
});

// Provide a minimal app export for rtdb initialization
vi.mock('../../../shared/vendors/firebase.js', () => ({ app: {} }));

// Mock the diagnostic logger
vi.mock('../../../shared/utils/dev/diagnostic-logger.js', () => ({
  getDiagnosticLogger: () => ({
    logFirebaseOperation: vi.fn(),
    log: vi.fn(),
  }),
}));

// Import the RoomService singleton under test
import RoomService from '../room.js';
import { set, runTransaction } from 'firebase/database';

describe('Room creation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates metadata-only rooms and creator membership in a single transaction', async () => {
    await RoomService.createRoomMetadata('creator-user', 'metadata-room');

    expect(set).not.toHaveBeenCalled();
    expect(runTransaction).toHaveBeenCalledTimes(1);

    const [roomRef, updateFn] = runTransaction.mock.calls[0];
    expect(roomRef.path).toBe('rooms/metadata-room');
    expect(updateFn(null)).toMatchObject({
      createdBy: 'creator-user',
      audioOnly: false,
      members: {
        'creator-user': {
          userName: 'Guest User',
        },
      },
    });
  });

  it('reclaims stale empty room nodes when creating metadata', async () => {
    runTransaction.mockImplementationOnce(async (_fbRef, updateFn) => {
      const value = updateFn({
        cancellation: { by: 'creator-user', reason: 'auto_timeout' },
        answer: { type: 'answer', sdp: 'stale' },
      });
      return {
        committed: value !== undefined,
        snapshot: {
          val: () => value,
        },
      };
    });

    await RoomService.createRoomMetadata('creator-user', 'metadata-room');

    const [, updateFn] = runTransaction.mock.calls[0];
    expect(updateFn({ cancellation: { reason: 'stale' } })).toMatchObject({
      createdBy: 'creator-user',
      members: {
        'creator-user': {
          userName: 'Guest User',
        },
      },
    });
  });

  it('still rejects metadata creation when the room has active members', async () => {
    runTransaction.mockImplementationOnce(async (_fbRef, updateFn) => {
      const value = updateFn({
        members: {
          'other-user': {
            userName: 'Other User',
            joinedAt: 123,
          },
        },
      });
      return {
        committed: value !== undefined,
        snapshot: {
          val: () => value,
        },
      };
    });

    await expect(
      RoomService.createRoomMetadata('creator-user', 'metadata-room'),
    ).rejects.toThrow('Room already exists');
  });
});
