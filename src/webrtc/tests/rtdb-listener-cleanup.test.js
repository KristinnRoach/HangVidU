// src/webrtc/tests/rtdb-listener-cleanup.test.js

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Firebase database APIs used across modules
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
    Promise.resolve({ exists: () => false, val: () => null })
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

vi.mock('../../firebase/firebase', () => ({
  app: {},
}));

vi.mock('../../utils/dev-utils.js', () => ({
  devDebug: vi.fn(),
}));

// Import modules under test AFTER mocks are applied
import { setupIceCandidates } from '../ice.js';
import {
  onDataChange,
  removeAllRTDBListeners,
  rtdb,
} from '../../storage/fb-rtdb/rtdb.js';

import { off, onChildAdded, onValue } from 'firebase/database';

describe('RTDB listener tracking and cleanup', () => {
  let mockPc;

  beforeEach(() => {
    vi.clearAllMocks();

    mockPc = {
      signalingState: 'stable',
      remoteDescription: null,
      onicecandidate: null,
      addIceCandidate: vi.fn().mockResolvedValue(undefined),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
  });

  afterEach(() => {
    // Ensure we clear any tracked listeners between tests
    removeAllRTDBListeners();
    vi.clearAllMocks();
  });

  it('removes tracked child_added and value listeners via removeAllRTDBListeners', () => {
    // Arrange: attach an ICE remote candidate listener (child_added)
    setupIceCandidates(mockPc, 'initiator', 'room-abc');

    // Arrange: attach a value listener via onDataChange
    const anyRef = { path: 'rooms/room-abc/answer' };
    onDataChange(anyRef, vi.fn());

    // Sanity: listeners should have been registered
    expect(onChildAdded).toHaveBeenCalledTimes(1);
    expect(onValue).toHaveBeenCalledTimes(1);

    // Act: remove all tracked listeners
    removeAllRTDBListeners();

    // Assert: off called to unsubscribe both listener types
    // We don't know exact callback instances here, but we know the types
    const offCalls = off.mock.calls.map((args) => args[1]);

    expect(off).toHaveBeenCalled();
    expect(offCalls).toContain('child_added');
    expect(offCalls).toContain('value');
  });
});
