// src/features/call/signaling/tests/firebase-call-signaling.test.js
//
// Verifies the main-call Firebase SignalingChannel adapter: SDP send/
// listen writes to rooms/{roomId}/offer|answer, snapshot values are
// unwrapped for callers, and listeners register through the tracked
// registry so room-scoped cleanup can purge them.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('firebase/database', () => {
  const off = vi.fn();
  const onChildAdded = vi.fn();
  const onChildRemoved = vi.fn();
  const onValue = vi.fn();
  const ref = vi.fn((_db, path) => ({ path }));
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

import { createFirebaseCallSignaling } from '../firebase-call-signaling.js';
import {
  removeAllRTDBListeners,
  removeRTDBListenersForRoom,
} from '../../../shared/storage/fb-rtdb/rtdb.js';
import { off, onValue, set } from 'firebase/database';

describe('createFirebaseCallSignaling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    removeAllRTDBListeners();
    vi.clearAllMocks();
  });

  it('requires a roomId', () => {
    expect(() => createFirebaseCallSignaling(null, 'initiator')).toThrow(
      /roomId is required/,
    );
  });

  it('sendOffer writes to rooms/{roomId}/offer', async () => {
    const signaling = createFirebaseCallSignaling('room-abc', 'initiator');
    const offer = { type: 'offer', sdp: 'v=0\n...' };

    await signaling.sendOffer(offer);

    expect(set).toHaveBeenCalledTimes(1);
    const [targetRef, payload] = set.mock.calls[0];
    expect(targetRef.path).toBe('rooms/room-abc/offer');
    expect(payload).toBe(offer);
  });

  it('sendAnswer writes to rooms/{roomId}/answer', async () => {
    const signaling = createFirebaseCallSignaling('room-abc', 'joiner');
    const answer = { type: 'answer', sdp: 'v=0\n...' };

    await signaling.sendAnswer(answer);

    expect(set).toHaveBeenCalledTimes(1);
    const [targetRef, payload] = set.mock.calls[0];
    expect(targetRef.path).toBe('rooms/room-abc/answer');
    expect(payload).toBe(answer);
  });

  it('onOffer registers a tracked value listener and unwraps the snapshot', () => {
    const signaling = createFirebaseCallSignaling('room-abc', 'joiner');
    const userCallback = vi.fn();

    signaling.onOffer(userCallback);

    expect(onValue).toHaveBeenCalledTimes(1);
    const fakeOffer = { type: 'offer', sdp: 'v=0\n...' };
    const internalCb = onValue.mock.calls[0][1];
    internalCb({ val: () => fakeOffer });

    expect(userCallback).toHaveBeenCalledWith(fakeOffer);
  });

  it('onAnswer registers a tracked value listener and unwraps the snapshot', () => {
    const signaling = createFirebaseCallSignaling('room-abc', 'initiator');
    const userCallback = vi.fn();

    signaling.onAnswer(userCallback);

    expect(onValue).toHaveBeenCalledTimes(1);
    const fakeAnswer = { type: 'answer', sdp: 'v=0\n...' };
    const internalCb = onValue.mock.calls[0][1];
    internalCb({ val: () => fakeAnswer });

    expect(userCallback).toHaveBeenCalledWith(fakeAnswer);
  });

  it('room-scoped cleanup removes registered SDP listeners', () => {
    const signaling = createFirebaseCallSignaling('room-abc', 'initiator');
    signaling.onOffer(vi.fn());
    signaling.onAnswer(vi.fn());

    removeRTDBListenersForRoom('room-abc');

    const offEvents = off.mock.calls.map((args) => args[1]);
    expect(off).toHaveBeenCalled();
    expect(
      offEvents.filter((e) => e === 'value').length,
    ).toBeGreaterThanOrEqual(2);
  });

  it('delegates sendCandidate and onRemoteCandidate to the ICE transport', () => {
    const signaling = createFirebaseCallSignaling('room-abc', 'initiator');
    expect(typeof signaling.sendCandidate).toBe('function');
    expect(typeof signaling.onRemoteCandidate).toBe('function');
  });

  it('propagates invalid role errors from the ICE transport', () => {
    expect(() => createFirebaseCallSignaling('room-abc', 'observer')).toThrow(
      /invalid role/,
    );
  });
});
