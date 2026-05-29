import { beforeEach, describe, expect, it, vi } from 'vitest';

// --- mock the transport so no real WebSocket is opened ---
let socket;

vi.mock('../../../realtime/signaling-socket', () => ({
  createSignalingSocket: vi.fn(() => {
    const messageHandlers = new Set();
    const openHandlers = new Set();
    socket = {
      sent: [],
      emit: (m) => messageHandlers.forEach((h) => h(m)),
      open: () => openHandlers.forEach((h) => h()),
      closed: false,
    };
    return {
      send: (m) => socket.sent.push(m),
      onMessage: (h) => {
        messageHandlers.add(h);
        return () => messageHandlers.delete(h);
      },
      onOpen: (h) => {
        openHandlers.add(h);
        return () => openHandlers.delete(h);
      },
      close: () => {
        socket.closed = true;
      },
    };
  }),
}));

vi.mock('../../../auth/index.js', () => ({
  getLoggedInUserToken: vi.fn(async () => 'test-token'),
}));

const { createDoRoomSignaling } = await import('./do-room-signaling.ts');

describe('createDoRoomSignaling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends join and re-joins on reconnect', () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    signaling.join('peer-a');
    expect(socket.sent).toEqual([{ t: 'join', peerId: 'peer-a' }]);

    socket.sent.length = 0;
    socket.open(); // simulate (re)connect
    expect(socket.sent).toEqual([{ t: 'join', peerId: 'peer-a' }]);
  });

  it('forwards presence to onPeers subscribers', () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const seen = [];
    signaling.onPeers((peers) => seen.push(peers));

    socket.emit({ t: 'peers', peers: ['peer-a', 'peer-b'] });
    expect(seen).toEqual([['peer-a', 'peer-b']]);
  });

  it('maps offer/answer/ICE onto addressed relay messages', () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const peer = signaling.createPeerSignaling({
      localPeerId: 'peer-a',
      remotePeerId: 'peer-b',
    });

    peer.sendOffer({ type: 'offer', sdp: 'x' });
    peer.sendCandidate({ candidate: 'c' });

    expect(socket.sent).toEqual([
      {
        t: 'relay',
        to: 'peer-b',
        channel: 'sdp',
        data: { kind: 'offer', payload: { type: 'offer', sdp: 'x' } },
      },
      { t: 'relay', to: 'peer-b', channel: 'ice', data: { candidate: 'c' } },
    ]);
  });

  it('routes inbound relays by peer + channel, discriminating offer vs answer', () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const peer = signaling.createPeerSignaling({
      localPeerId: 'peer-a',
      remotePeerId: 'peer-b',
    });

    const offers = [];
    const answers = [];
    const candidates = [];
    peer.onOffer((o) => offers.push(o));
    peer.onAnswer((a) => answers.push(a));
    peer.onRemoteCandidate((c) => candidates.push(c));

    const relay = (channel, data, from = 'peer-b') => ({
      t: 'relay',
      from,
      channel,
      data,
    });

    socket.emit(relay('sdp', { kind: 'answer', payload: { type: 'answer' } }));
    socket.emit(relay('sdp', { kind: 'offer', payload: { type: 'offer' } }));
    socket.emit(relay('ice', { candidate: 'c1' }));
    // a different peer's traffic must not leak into this pair
    socket.emit(relay('ice', { candidate: 'nope' }, 'peer-z'));

    expect(offers).toEqual([{ type: 'offer' }]);
    expect(answers).toEqual([{ type: 'answer' }]);
    expect(candidates).toEqual([{ candidate: 'c1' }]);
  });

  it('closes the socket on cleanup', () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    signaling.join('peer-a');
    socket.sent.length = 0;

    signaling.cleanupSignaling();
    expect(socket.sent).toEqual([{ t: 'leave' }]);
    expect(socket.closed).toBe(true);
  });
});
