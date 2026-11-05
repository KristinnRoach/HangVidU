import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';

// Real `createSignalingSocket` + real DO adapter; only the browser WebSocket
// and the token provider are faked. Covers admission, reconnect replay and
// cancellation without replacing the socket's real send queue.

vi.mock('../../auth/index.js', () => ({
  getLoggedInUserToken: vi.fn(async () => 'test-token'),
}));

class FakeWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSED = 3;
  static instances = [];

  readyState = FakeWebSocket.CONNECTING;
  sent = [];
  listeners = new Map();

  constructor(url, protocols) {
    this.url = url;
    this.protocols = protocols;
    FakeWebSocket.instances.push(this);
  }

  addEventListener(type, handler) {
    const set = this.listeners.get(type) ?? new Set();
    set.add(handler);
    this.listeners.set(type, set);
  }

  dispatch(type, event = {}) {
    this.listeners.get(type)?.forEach((h) => h(event));
  }

  send(data) {
    this.sent.push(JSON.parse(data));
  }

  open() {
    this.readyState = FakeWebSocket.OPEN;
    this.dispatch('open');
  }

  receive(message) {
    this.dispatch('message', { data: JSON.stringify(message) });
  }

  close() {
    if (this.readyState === FakeWebSocket.CLOSED) return;
    this.readyState = FakeWebSocket.CLOSED;
    this.dispatch('close');
  }
}

const { createDoRoomSignaling } = await import('./do-room-signaling.ts');

const joins = (ws) => ws.sent.filter((m) => m.t === 'join');

describe('createDoRoomSignaling over the real signaling socket', () => {
  let signaling;

  // Flush the async token lookup so the socket is constructed.
  async function connected() {
    await vi.advanceTimersByTimeAsync(0);
    return FakeWebSocket.instances.at(-1);
  }

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('WebSocket', FakeWebSocket);
    FakeWebSocket.instances = [];
    signaling = createDoRoomSignaling({ roomId: 'room-1' });
  });

  afterEach(() => {
    signaling.cleanupSignaling();
    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('sends a join made before open exactly once', async () => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('req-1');
    const ws = await connected();
    expect(ws.protocols).toEqual(['bearer', 'test-token']);

    const joined = signaling.join('peer-a');
    ws.open();
    expect(ws.sent).toEqual([
      { t: 'join', peerId: 'peer-a', requestId: 'req-1' },
    ]);
    ws.receive({ t: 'joined', peerId: 'peer-a', requestId: 'req-1' });
    await joined;
  });

  it.each([
    ['timeout', () => vi.advanceTimersByTimeAsync(5_000)],
    ['leave', () => signaling.leave('peer-a')],
  ])('sends no stale join after a %s before open', async (_, cancel) => {
    const ws = await connected();
    const rejected = expect(signaling.join('peer-a')).rejects.toThrow();
    await cancel();
    await rejected;
    ws.open();
    expect(ws.sent).toEqual([]);
  });

  it('retries after cancellation with only the current request ID', async () => {
    vi.spyOn(crypto, 'randomUUID')
      .mockReturnValueOnce('first')
      .mockReturnValueOnce('second');
    const ws = await connected();
    const cancelled = expect(signaling.join('peer-a')).rejects.toThrow();
    signaling.leave('peer-a');
    await cancelled;

    const joined = signaling.join('peer-a');
    ws.open();
    expect(joins(ws)).toEqual([
      { t: 'join', peerId: 'peer-a', requestId: 'second' },
    ]);
    ws.receive({ t: 'joined', peerId: 'peer-a', requestId: 'second' });
    await joined;
  });

  it('re-joins an admitted registration with current presence on reconnect', async () => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('req-1');
    const first = await connected();
    first.open();
    const joined = signaling.join('peer-a', { muted: false });
    first.receive({ t: 'joined', peerId: 'peer-a', requestId: 'req-1' });
    await joined;
    signaling.updatePresenceData('peer-a', { muted: true });

    first.close();
    await vi.advanceTimersByTimeAsync(500);
    const second = FakeWebSocket.instances.at(-1);
    expect(second).not.toBe(first);
    second.open();
    expect(second.sent).toEqual([
      {
        t: 'join',
        peerId: 'peer-a',
        requestId: 'req-1',
        data: { muted: true },
      },
    ]);
  });

  it('re-joins before replaying queued SDP, ICE and restart requests', async () => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('req-1');
    const first = await connected();
    first.open();
    const joined = signaling.join('peer-a');
    first.receive({ t: 'joined', peerId: 'peer-a', requestId: 'req-1' });
    await joined;
    first.close();

    const peer = signaling.createPeerSignaling({ remotePeerId: 'peer-b' });
    peer.sendOffer({ type: 'offer', sdp: 'restart-offer' });
    peer.sendCandidate({ candidate: 'restart-candidate' });
    peer.sendIceRestartRequest({ requestId: 'restart-1' });
    await vi.advanceTimersByTimeAsync(500);
    const second = FakeWebSocket.instances.at(-1);
    second.open();

    expect(second.sent).toEqual([
      { t: 'join', peerId: 'peer-a', requestId: 'req-1' },
      {
        t: 'relay',
        to: 'peer-b',
        channel: 'sdp',
        data: {
          kind: 'offer',
          payload: { type: 'offer', sdp: 'restart-offer' },
        },
      },
      {
        t: 'relay',
        to: 'peer-b',
        channel: 'ice',
        data: { candidate: 'restart-candidate' },
      },
      {
        t: 'relay',
        to: 'peer-b',
        channel: 'ice-restart',
        data: { requestId: 'restart-1' },
      },
    ]);
  });

  it('discards queued relays, presence and leave before a new registration', async () => {
    vi.spyOn(crypto, 'randomUUID')
      .mockReturnValueOnce('first')
      .mockReturnValueOnce('second');
    const first = await connected();
    first.open();
    const joined = signaling.join('peer-a');
    first.receive({ t: 'joined', peerId: 'peer-a', requestId: 'first' });
    await joined;
    first.close();

    signaling
      .createPeerSignaling({ remotePeerId: 'peer-b' })
      .sendOffer({ type: 'offer', sdp: 'cancelled-offer' });
    signaling.updatePresenceData('peer-a', { muted: true });
    signaling.leave('peer-a');
    const rejoined = signaling.join('peer-a', { muted: false });
    await vi.advanceTimersByTimeAsync(500);
    const second = FakeWebSocket.instances.at(-1);
    second.open();

    second.receive({ t: 'joined', peerId: 'peer-a', requestId: 'second' });
    await rejoined;
    expect(second.sent).toEqual([
      {
        t: 'join',
        peerId: 'peer-a',
        requestId: 'second',
        data: { muted: false },
      },
    ]);
  });
});
