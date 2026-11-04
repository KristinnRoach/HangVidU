import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';

// --- mock the transport so no real WebSocket is opened ---
let socket;

vi.mock('../signaling-socket', () => ({
  createSignalingSocket: vi.fn(() => {
    const messageHandlers = new Set();
    const openHandlers = new Set();
    socket = {
      sent: [],
      emit: (m) => messageHandlers.forEach((h) => h(m)),
      isOpen: true,
      open: () => {
        socket.isOpen = true;
        openHandlers.forEach((h) => h());
      },
      closed: false,
    };
    return {
      send: (m) => socket.sent.push(m),
      isOpen: () => socket.isOpen,
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

vi.mock('../../auth/index.js', () => ({
  getLoggedInUserToken: vi.fn(async () => 'test-token'),
}));

const { createDoRoomSignaling } = await import('./do-room-signaling.ts');

describe('createDoRoomSignaling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('join-request');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('sends join and re-joins on reconnect', async () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const joined = signaling.join('peer-a');
    socket.emit({ t: 'joined', peerId: 'peer-a', requestId: 'join-request' });
    await joined;
    expect(socket.sent).toEqual([
      { t: 'join', peerId: 'peer-a', requestId: 'join-request' },
    ]);

    socket.sent.length = 0;
    socket.open(); // simulate (re)connect
    expect(socket.sent).toEqual([
      { t: 'join', peerId: 'peer-a', requestId: 'join-request' },
    ]);
  });

  it('waits for socket admission instead of trusting another socket presence', async () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    let admitted = false;
    const joined = signaling.join('peer-a').then(() => {
      admitted = true;
    });
    socket.emit({ t: 'peers', peers: [{ peerId: 'peer-a' }] });
    socket.emit({ t: 'joined', peerId: 'other' });
    await Promise.resolve();
    expect(admitted).toBe(false);
    socket.emit({ t: 'joined', peerId: 'peer-a', requestId: 'join-request' });
    await joined;
    expect(admitted).toBe(true);
  });

  it('ignores a cancelled attempt acknowledgment when joining the same ID again', async () => {
    vi.spyOn(crypto, 'randomUUID')
      .mockReturnValueOnce('first')
      .mockReturnValueOnce('second');
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const cancelled = expect(signaling.join('peer-a')).rejects.toThrow();
    await signaling.leave();
    await cancelled;
    let admitted = false;
    const joined = signaling.join('peer-a').then(() => {
      admitted = true;
    });
    socket.emit({ t: 'joined', peerId: 'peer-a', requestId: 'first' });
    socket.emit({ t: 'error', message: 'stale rejection', requestId: 'first' });
    await Promise.resolve();
    expect(admitted).toBe(false);
    socket.emit({ t: 'joined', peerId: 'peer-a', requestId: 'second' });
    await joined;
    expect(admitted).toBe(true);
  });

  it('rejects denied admissions and does not reassert them on reconnect', async () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const joined = signaling.join('peer-a');
    const rejected = expect(joined).rejects.toThrow('unauthorized peerId');
    socket.emit({
      t: 'error',
      message: 'unauthorized peerId',
      requestId: 'join-request',
    });
    await rejected;
    socket.sent.length = 0;
    socket.open();
    expect(socket.sent).toEqual([]);
  });

  it('rejects an admission timeout and withdraws queued membership', async () => {
    vi.useFakeTimers();
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const rejected = expect(signaling.join('peer-a')).rejects.toThrow(
      'timed out',
    );
    await vi.advanceTimersByTimeAsync(5_000);
    await rejected;
    expect(socket.sent.at(-1)).toEqual({ t: 'leave' });
    socket.sent.length = 0;
    socket.open();
    expect(socket.sent).toEqual([]);
  });

  it('sends a join made before connect only once, from onOpen', async () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    socket.isOpen = false;
    const joined = signaling.join('peer-a');
    expect(socket.sent).toEqual([]);
    socket.open();
    expect(socket.sent).toEqual([
      { t: 'join', peerId: 'peer-a', requestId: 'join-request' },
    ]);
    socket.emit({ t: 'joined', peerId: 'peer-a', requestId: 'join-request' });
    await joined;
  });

  it('never sends a join that timed out before connect', async () => {
    vi.useFakeTimers();
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    socket.isOpen = false;
    const rejected = expect(signaling.join('peer-a')).rejects.toThrow(
      'timed out',
    );
    await vi.advanceTimersByTimeAsync(5_000);
    await rejected;
    socket.open();
    expect(socket.sent).toEqual([{ t: 'leave' }]);
  });

  it.each(['leave', 'cleanupSignaling'])(
    'cancels a pending join on %s',
    async (method) => {
      vi.useFakeTimers();
      const signaling = createDoRoomSignaling({ roomId: 'room-1' });
      const rejected = expect(signaling.join('peer-a')).rejects.toThrow();
      signaling[method]();
      await rejected;
      socket.emit({ t: 'joined', peerId: 'peer-a', requestId: 'join-request' });
      expect(vi.getTimerCount()).toBe(0);
      socket.sent.length = 0;
      socket.open();
      expect(socket.sent).toEqual([]);
    },
  );

  it('maps presence members onto onPeers subscribers', () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const seen = [];
    signaling.onPeers((snapshot) => seen.push(snapshot));

    socket.emit({
      t: 'peers',
      peers: [
        { peerId: 'peer-a', data: { muted: true } },
        { peerId: 'peer-b' },
      ],
    });
    // No `departed` on the wire → bare `{ members }` envelope.
    expect(seen).toEqual([
      {
        members: [
          { memberId: 'peer-a', data: { muted: true } },
          { memberId: 'peer-b', data: undefined },
        ],
      },
    ]);
  });

  it('maps wire `departed` onto snapshot departures tagged `left`', () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const seen = [];
    signaling.onPeers((snapshot) => seen.push(snapshot));

    // An explicit leave: peer-b is gone from members and listed in departed.
    socket.emit({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }],
      departed: ['peer-b'],
    });
    expect(seen).toEqual([
      {
        members: [{ memberId: 'peer-a', data: undefined }],
        departed: [{ memberId: 'peer-b', reason: 'left' }],
      },
    ]);
  });

  it('sends presence data on join and restores it on reconnect', async () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const joined = signaling.join('peer-a', { muted: true });
    socket.emit({ t: 'joined', peerId: 'peer-a', requestId: 'join-request' });
    await joined;
    expect(socket.sent).toEqual([
      {
        t: 'join',
        peerId: 'peer-a',
        requestId: 'join-request',
        data: { muted: true },
      },
    ]);

    socket.sent.length = 0;
    socket.open(); // reconnect re-asserts peerId + latest data
    expect(socket.sent).toEqual([
      {
        t: 'join',
        peerId: 'peer-a',
        requestId: 'join-request',
        data: { muted: true },
      },
    ]);
  });

  it('updatePresenceData sends a presence message and is restored on reconnect', async () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const joined = signaling.join('peer-a');
    socket.emit({ t: 'joined', peerId: 'peer-a', requestId: 'join-request' });
    await joined;
    socket.sent.length = 0;

    void signaling.updatePresenceData('peer-a', { muted: true });
    expect(socket.sent).toEqual([{ t: 'presence', data: { muted: true } }]);

    socket.sent.length = 0;
    socket.open(); // re-join carries the latest data set via updatePresenceData
    expect(socket.sent).toEqual([
      {
        t: 'join',
        peerId: 'peer-a',
        requestId: 'join-request',
        data: { muted: true },
      },
    ]);
  });

  it('maps offer/answer/ICE onto addressed relay messages', () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const peer = signaling.createPeerSignaling({
      localPeerId: 'peer-a',
      remotePeerId: 'peer-b',
    });

    void peer.sendOffer({ type: 'offer', sdp: 'x' });
    void peer.sendCandidate({ candidate: 'c' });

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

  it('sends and receives addressed ICE-restart requests', () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const peer = signaling.createPeerSignaling({
      localPeerId: 'peer-a',
      remotePeerId: 'peer-b',
    });
    const requests = [];
    peer.onIceRestartRequest((request) => requests.push(request));

    void peer.sendIceRestartRequest({ requestId: 'restart-1' });
    socket.emit({
      t: 'relay',
      from: 'peer-b',
      channel: 'ice-restart',
      data: { requestId: 'restart-2' },
    });
    socket.emit({
      t: 'relay',
      from: 'peer-z',
      channel: 'ice-restart',
      data: { requestId: 'wrong-peer' },
    });
    for (const data of [{}, { requestId: 42 }, { requestId: '' }]) {
      socket.emit({
        t: 'relay',
        from: 'peer-b',
        channel: 'ice-restart',
        data,
      });
    }

    expect(socket.sent).toEqual([
      {
        t: 'relay',
        to: 'peer-b',
        channel: 'ice-restart',
        data: { requestId: 'restart-1' },
      },
    ]);
    expect(requests).toEqual([{ requestId: 'restart-2' }]);
  });

  it('does not re-join on reconnect after leave', async () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const joined = signaling.join('peer-a');
    socket.emit({ t: 'joined', peerId: 'peer-a', requestId: 'join-request' });
    await joined;
    socket.sent.length = 0;

    void signaling.leave('peer-a');
    expect(socket.sent).toEqual([{ t: 'leave' }]);

    // Local join state must be cleared so a reconnect doesn't re-assert it.
    socket.sent.length = 0;
    socket.open();
    expect(socket.sent).toEqual([]);
  });

  it('closes the socket on cleanup', async () => {
    const signaling = createDoRoomSignaling({ roomId: 'room-1' });
    const joined = signaling.join('peer-a');
    socket.emit({ t: 'joined', peerId: 'peer-a', requestId: 'join-request' });
    await joined;
    socket.sent.length = 0;

    void signaling.cleanupSignaling();
    expect(socket.sent).toEqual([{ t: 'leave' }]);
    expect(socket.closed).toBe(true);
  });
});
