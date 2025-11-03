// src/webrtc/tests/member-listener-fresh-join.test.js
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
    addListener(childAddedListeners, fbRef.path, cb)
  );
  const onChildRemoved = vi.fn((fbRef, cb) =>
    addListener(childRemovedListeners, fbRef.path, cb)
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

  return {
    getDatabase,
    ref,
    set,
    get,
    update,
    remove,
    onChildAdded,
    onChildRemoved,
    off,
  };
});

// Provide a minimal app export for rtdb initialization
vi.mock('../../firebase/firebase', () => ({ app: {} }));

// Import the RoomService singleton under test
import RoomService from '../../room.js';

describe('Incoming-call member listener fires once with fresh joinedAt', () => {
  const roomId = 'room-test-1';

  beforeEach(() => {
    vi.clearAllMocks();
    // Ensure no lingering listeners stored internally
    RoomService.cleanupListeners();
  });

  afterEach(() => {
    RoomService.cleanupListeners();
  });

  it('fires only the active listener (not disposed) and joinedAt is fresh', async () => {
    const oldCb = vi.fn();
    const unsubscribeOld = RoomService.onIncomingCall(roomId, oldCb);

    // Simulate disposed PC by unsubscribing old listener
    unsubscribeOld();

    const newCb = vi.fn();
    const unsubscribeNew = RoomService.onIncomingCall(roomId, newCb);

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
