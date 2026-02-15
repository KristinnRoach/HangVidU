// src/webrtc/tests/member-listener-fresh-join.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Stateful listener storage - must be outside vi.mock factory for Vitest hoisting
const mockListenerState = {
  childAddedListeners: new Map(),
  childRemovedListeners: new Map(),
};

// Firebase RTDB mock with child_added propagation when setting a member node
vi.mock('firebase/database', () => {
  const getDatabase = vi.fn(() => ({}));
  const ref = vi.fn((/* db */ _db, path) => ({ path }));

  const addListener = (map, path, cb) => {
    if (!map.has(path)) map.set(path, new Set());
    map.get(path).add(cb);
  };

  const removeListener = (map, path, cb) => {
    if (!map.has(path)) return;
    map.get(path).delete(cb);
    if (map.get(path).size === 0) map.delete(path);
  };

  const onChildAdded = vi.fn((fbRef, cb) =>
    addListener(mockListenerState.childAddedListeners, fbRef.path, cb),
  );

  const onChildRemoved = vi.fn((fbRef, cb) =>
    addListener(mockListenerState.childRemovedListeners, fbRef.path, cb),
  );

  const off = vi.fn((fbRef, type, cb) => {
    if (type === 'child_added')
      removeListener(mockListenerState.childAddedListeners, fbRef.path, cb);
    if (type === 'child_removed')
      removeListener(mockListenerState.childRemovedListeners, fbRef.path, cb);
  });

  const get = vi.fn();
  const update = vi.fn();
  const remove = vi.fn();

  const set = vi.fn((fbRef, value) => {
    // If setting a member path rooms/<roomId>/members/<userId>, fire child_added on parent members path
    const path = fbRef.path;
    const parts = path.split('/');
    const isMemberPath =
      parts.length >= 4 && parts[0] === 'rooms' && parts[2] === 'members';
    if (isMemberPath) {
      const userId = parts[3];
      const parentPath = parts.slice(0, 3).join('/'); // rooms/<roomId>/members
      const listeners = mockListenerState.childAddedListeners.get(parentPath);
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
    onChildAdded,
    onChildRemoved,
    onValue,
    off,
  };
});

// Provide a minimal app export for rtdb initialization
vi.mock('../../firebase/firebase', () => ({ app: {} }));

// Mock the diagnostic logger
vi.mock('../../utils/dev/diagnostic-logger.js', () => ({
  getDiagnosticLogger: () => ({
    logFirebaseOperation: vi.fn(),
    log: vi.fn(),
  }),
}));

// Import the RoomService singleton under test
import RoomService from '../../room.js';
import {
  removeRTDBListenersForRoom,
  removeAllRTDBListeners,
} from '../../storage/fb-rtdb/rtdb.js';

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
