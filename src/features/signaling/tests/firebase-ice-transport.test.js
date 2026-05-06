// src/features/call/signaling/tests/firebase-ice-transport.test.js
//
// Verifies that the Firebase ICE adapter registers remote-candidate
// listeners through the tracked listener registry, so room-scoped
// cleanup can purge them later.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('firebase/database', () => {
  const off = vi.fn();
  const onChildAdded = vi.fn();
  const onChildRemoved = vi.fn();
  const onValue = vi.fn();
  const ref = vi.fn(() => ({}));
  const getDatabase = vi.fn(() => ({}));
  const push = vi.fn(() => ({}));
  const set = vi.fn(() => Promise.resolve());
  const get = vi.fn(() =>
    Promise.resolve({ exists: () => false, val: () => null }),
  );
  const update = vi.fn(() => Promise.resolve());
  const remove = vi.fn(() => Promise.resolve());

  return {
    getDatabase,
    ref,
    push,
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

vi.mock('../../../../shared/vendors/firebase.js', () => ({
  app: {},
}));

vi.mock('../../../../shared/utils/dev/dev-utils.js', () => ({
  devDebug: vi.fn(),
}));

import { createFirebaseIceTransport } from '../firebase-ice-transport.js';
import {
  removeAllRTDBListeners,
  removeRTDBListenersForRoom,
} from '../../../shared/storage/fb-rtdb/rtdb.js';
import { off, onChildAdded } from 'firebase/database';

describe('createFirebaseIceTransport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    removeAllRTDBListeners();
    vi.clearAllMocks();
  });

  it('registers remote candidate listener via tracked onChildAdded', () => {
    const transport = createFirebaseIceTransport('room-abc', 'initiator');
    transport.onRemoteCandidate(vi.fn());

    expect(onChildAdded).toHaveBeenCalledTimes(1);
  });

  it('room-scoped cleanup removes the registered listener', () => {
    const transport = createFirebaseIceTransport('room-abc', 'initiator');
    transport.onRemoteCandidate(vi.fn());

    removeRTDBListenersForRoom('room-abc');

    const offCalls = off.mock.calls.map((args) => args[1]);
    expect(off).toHaveBeenCalled();
    expect(offCalls).toContain('child_added');
  });

  it('unwraps snapshot and forwards candidate value to callback', () => {
    const transport = createFirebaseIceTransport('room-abc', 'joiner');
    const userCallback = vi.fn();
    transport.onRemoteCandidate(userCallback);

    // Capture the internal (snapshot) callback passed to onChildAdded
    const internalCb = onChildAdded.mock.calls[0][1];
    const fakeCandidate = {
      candidate: 'candidate:1 1 UDP 1 10.0.0.1 5 typ host',
      sdpMid: '0',
      sdpMLineIndex: 0,
    };
    internalCb({ val: () => fakeCandidate });

    expect(userCallback).toHaveBeenCalledWith(fakeCandidate);
  });

  it('throws on invalid role', () => {
    expect(() => createFirebaseIceTransport('room-abc', 'observer')).toThrow(
      /invalid role/,
    );
  });

  it('requires a roomId', () => {
    expect(() => createFirebaseIceTransport(null, 'initiator')).toThrow(
      /roomId is required/,
    );
  });
});
