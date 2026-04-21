// src/call/tests/member-listener-fresh-join.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Firebase RTDB mock with child_added propagation when setting a member node
vi.mock('firebase/database', () => {
  const childAddedListeners = new Map(); // path -> Set<cb>
  const childRemovedListeners = new Map(); // path -> Set<cb>

  const getDatabase = vi.fn(() => ({}));
  const ref = vi.fn((/* db */ _db, path) => ({ path }));

  function addListener(map, path, cb) {
    if (!map.has(path)) map.set(path, new Set());
    map.get(path).add(cb);
  }
  function removeListener(map, path, cb) {
    if (!map.has(path)) return;
    map.get(path).delete(cb);
    if (map.get(path).size === 0) map.delete(path);
  }

  const onChildAdded = vi.fn((fbRef, cb) =>
    addListener(childAddedListeners, fbRef.path, cb),
  );
  const onChildRemoved = vi.fn((fbRef, cb) =>
    addListener(childRemovedListeners, fbRef.path, cb),
  );

  const off = vi.fn((fbRef, type, cb) => {
    if (type === 'child_added')
      removeListener(childAddedListeners, fbRef.path, cb);
    if (type === 'child_removed')
      removeListener(childRemovedListeners, fbRef.path, cb);
  });

  const get = vi.fn();
  const update = vi.fn();
  const remove = vi.fn();
  const runTransaction = vi.fn(async (_fbRef, updateFn) => {
    const value = updateFn(null);
    return {
      committed: value !== undefined,
      snapshot: {
        val: () => value,
      },
    };
  });

  const set = vi.fn((fbRef, value) => {
    // If setting a member path rooms/<roomId>/members/<userId>, fire child_added on parent members path
    const path = fbRef.path;
    const parts = path.split('/');
    const isMemberPath =
      parts.length >= 4 && parts[0] === 'rooms' && parts[2] === 'members';
    if (isMemberPath) {
      const userId = parts[3];
      const parentPath = parts.slice(0, 3).join('/'); // rooms/<roomId>/members
      const listeners = childAddedListeners.get(parentPath);
      if (listeners && listeners.size) {
        const snapshot = {
          key: userId,
          val: () => value,
        };
        listeners.forEach((cb) => cb(snapshot));
      }
    }
    return Promise.resolve();
  });

  const onValue = vi.fn();

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
import {
  removeRTDBListenersForRoom,
  removeAllRTDBListeners,
} from '../../../shared/storage/fb-rtdb/rtdb.js';

describe('Incoming-call member listener fires once with fresh joinedAt', () => {
  const roomId = 'room-test-1';
  const localUserId = 'local-user-123'; // User attaching the incoming-call listener

  beforeEach(() => {
    vi.clearAllMocks();
    // Ensure no lingering listeners stored internally
    removeAllRTDBListeners();
  });

  afterEach(() => {
    removeRTDBListenersForRoom(roomId);
  });

  it('fires only the active listener (not disposed) and joinedAt is fresh', async () => {
    const oldCb = vi.fn();
    const unsubscribeOld = RoomService.onIncomingCall(
      roomId,
      localUserId,
      oldCb,
    );

    // Simulate disposed PC by unsubscribing old listener
    unsubscribeOld();

    const newCb = vi.fn();
    const unsubscribeNew = RoomService.onIncomingCall(
      roomId,
      localUserId,
      newCb,
    );

    const t0 = Date.now();
    // Simulate a remote member joining this room
    const newUserId = 'callee-123';
    await RoomService.joinRoom(roomId, newUserId);

    // Old listener should not fire
    expect(oldCb).not.toHaveBeenCalled();

    // New listener should fire once with join event
    expect(newCb).toHaveBeenCalledTimes(1);
    const [eventType, userId, memberData] = newCb.mock.calls[0];
    expect(eventType).toBe('join');
    expect(userId).toBe(newUserId);

    // joinedAt should be reasonably fresh (within 2 seconds of now)
    const now = Date.now();
    expect(typeof memberData.joinedAt).toBe('number');
    expect(memberData.joinedAt).toBeGreaterThanOrEqual(t0);
    expect(memberData.joinedAt).toBeLessThanOrEqual(now);

    // Further safety: disposing new listener prevents future calls
    unsubscribeNew();
    await RoomService.joinRoom(roomId, 'another-user');
    expect(newCb).toHaveBeenCalledTimes(1);
  });
});

describe('Room creation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates offer rooms and creator membership in a single transaction', async () => {
    const t0 = Date.now();

    await RoomService.createNewRoom(
      { type: 'offer', sdp: 'test-sdp' },
      'creator-user',
      'custom-room',
      { audioOnly: true },
    );

    expect(set).not.toHaveBeenCalled();
    expect(runTransaction).toHaveBeenCalledTimes(1);

    const [roomRef, updateFn] = runTransaction.mock.calls[0];
    expect(roomRef.path).toBe('rooms/custom-room');

    const roomData = updateFn(null);
    expect(roomData).toMatchObject({
      offer: {
        type: 'offer',
        sdp: 'test-sdp',
      },
      createdBy: 'creator-user',
      audioOnly: true,
      members: {
        'creator-user': {
          userName: 'Guest User',
        },
      },
    });
    expect(roomData.members['creator-user'].joinedAt).toBeGreaterThanOrEqual(
      t0,
    );
    expect(updateFn({ createdBy: 'other-user' })).toBeUndefined();
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
});
