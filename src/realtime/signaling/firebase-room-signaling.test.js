import { describe, expect, it, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  ref: vi.fn((_db, path) => ({ path })),
  set: vi.fn(() => Promise.resolve()),
  remove: vi.fn(() => Promise.resolve()),
  push: vi.fn((fbRef) => ({ path: `${fbRef.path}/candidate` })),
  onValue: vi.fn(() => vi.fn()),
  onChildAdded: vi.fn(() => vi.fn()),
  onDisconnect: vi.fn(() => ({
    remove: vi.fn(() => Promise.resolve()),
    cancel: vi.fn(() => Promise.resolve()),
  })),
}));

vi.mock('firebase/database', () => mocks);
vi.mock('../../infra/firebase-rtdb.js', () => ({
  rtdb: {},
}));

const { createFirebaseRoomSignaling } = await import(
  './firebase-room-signaling.js'
);

describe('createFirebaseRoomSignaling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('cleans up local presence and tracked pair signaling data on cleanup', async () => {
    const signaling = createFirebaseRoomSignaling({ roomId: 'room-1' });

    await signaling.join('peer-a');
    const pairSignaling = signaling.createPeerSignaling({
      localPeerId: 'peer-a',
      remotePeerId: 'peer-b',
    });
    await pairSignaling.sendOffer({ type: 'offer', sdp: 'sdp' });
    await signaling.cleanupSignaling();

    expect(mocks.remove).toHaveBeenCalledWith({
      path: 'rooms/room-1/p2pSignaling/pairs/peer-a:peer-b',
    });
    expect(mocks.remove).toHaveBeenCalledWith({
      path: 'rooms/room-1/p2pSignaling/presence/peer-a',
    });
  });

  it('removes presence on leave without requiring close', async () => {
    const signaling = createFirebaseRoomSignaling({ roomId: 'room-1' });

    await signaling.join('peer-a');
    await signaling.leave('peer-a');

    expect(mocks.remove).toHaveBeenCalledWith({
      path: 'rooms/room-1/p2pSignaling/presence/peer-a',
    });
  });
});
