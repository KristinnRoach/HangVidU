import { describe, expect, it, vi, beforeEach } from 'vite-plus/test';
import { createSignal } from 'solid-js';
import { render, cleanup } from '@solidjs/testing-library';

const mocks = vi.hoisted(() => ({
  init: vi.fn(),
  cleanup: vi.fn(),
  showIncomingCallFromNotification: vi.fn(),
  acceptIncoming: vi.fn(),
  subscribe: vi.fn(),
  subscriptions: new Map(),
  user: () => null,
}));

vi.mock('./call-handshake-controller.js', () => ({
  CallHandshakeController: vi.fn(function () {
    return {
      init: mocks.init,
      cleanup: mocks.cleanup,
      showIncomingCallFromNotification: mocks.showIncomingCallFromNotification,
      exitActiveRoom: vi.fn(),
      cancelOutgoing: vi.fn(),
      acceptIncoming: mocks.acceptIncoming,
      declineIncoming: vi.fn(),
    };
  }),
}));
vi.mock('../../shared/p2p-context.js', () => ({ useP2PContext: () => ({}) }));
vi.mock('@realtime', () => ({ createRoomSignaling: vi.fn() }));
vi.mock('@auth', () => ({
  getAuthProviderProfileSeed: vi.fn(() => null),
  getAuthState: vi.fn(() => ({ isLoggedIn: false })),
  getLoggedInUserToken: vi.fn(() => null),
  useAuth: () => ({ user: (...args) => mocks.user(...args) }),
}));
vi.mock('@shared/events/index.js', () => ({
  subscribe: mocks.subscribe,
}));

describe('CallHandshakeProvider', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    mocks.subscriptions.clear();
    mocks.subscribe.mockImplementation((name, handler) => {
      mocks.subscriptions.set(name, handler);
      return vi.fn();
    });
    mocks.user = () => null;
    window.history.replaceState(null, '', '/');
  });

  it('attaches the incoming-call listener when auth becomes authenticated after mount', async () => {
    const { CallHandshakeProvider } = await import('./call-handshake');
    const [user, setUser] = createSignal(null);
    mocks.user = user;

    render(() => <CallHandshakeProvider>{null}</CallHandshakeProvider>);

    // Logged out at mount: no listener attached.
    expect(mocks.init).not.toHaveBeenCalled();

    // Login completes after mount -> listener (re)attaches.
    setUser({ uid: 'u1' });
    expect(mocks.init).toHaveBeenCalledTimes(1);
  });

  it('does not re-attach or clean up when reactive state read inside the controller changes', async () => {
    const { CallHandshakeProvider } = await import('./call-handshake');
    const [user] = createSignal({ uid: 'u1' });
    mocks.user = user;

    // init()/cleanup() read reactive p2p room state in the real controller.
    // Simulate that read; the effect must stay keyed on the uid only, so a
    // p2p state change (e.g. joining a room) must NOT re-run init and tear
    // the call down.
    const [p2pState, setP2pState] = createSignal('idle');
    mocks.init.mockImplementation(() => {
      p2pState();
    });

    render(() => <CallHandshakeProvider>{null}</CallHandshakeProvider>);
    expect(mocks.init).toHaveBeenCalledTimes(1);
    expect(mocks.cleanup).not.toHaveBeenCalled();

    setP2pState('connected');
    expect(mocks.init).toHaveBeenCalledTimes(1);
    expect(mocks.cleanup).not.toHaveBeenCalled();
  });

  it('uses the app bus incoming-call notification event after auth is ready', async () => {
    const { CallHandshakeProvider } = await import('./call-handshake');
    const [user] = createSignal({ uid: 'u1' });
    mocks.user = user;

    render(() => <CallHandshakeProvider>{null}</CallHandshakeProvider>);

    const handler = mocks.subscriptions.get('evt:call:notification:opened');
    handler?.({
      roomId: 'room-1',
      callerId: 'caller-1',
      callerName: 'Caller',
      accept: true,
    });

    expect(mocks.showIncomingCallFromNotification).toHaveBeenCalledWith({
      roomId: 'room-1',
      callerId: 'caller-1',
      callerName: 'Caller',
      audioOnly: false,
      startedAt: undefined,
    });
  });

  it('keeps a missing notification URL timestamp undefined', async () => {
    window.history.replaceState(
      null,
      '',
      '/?conversationRoom=room-1&callerId=caller-1',
    );
    const { CallHandshakeProvider } = await import('./call-handshake');
    const [user] = createSignal({ uid: 'u1' });
    mocks.user = user;

    render(() => <CallHandshakeProvider>{null}</CallHandshakeProvider>);

    expect(mocks.showIncomingCallFromNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        roomId: 'room-1',
        callerId: 'caller-1',
        startedAt: undefined,
      }),
    );
  });
});
