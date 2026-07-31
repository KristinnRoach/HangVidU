import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';
import { createSignal } from 'solid-js';
import { render, cleanup } from '@solidjs/testing-library';

const mocks = vi.hoisted(() => ({
  init: vi.fn(),
  cleanup: vi.fn(),
  showIncomingCallFromNotification: vi.fn(),
  acceptIncoming: vi.fn(),
  publish: vi.fn(),
  subscribe: vi.fn(),
  subscriptions: new Map(),
  user: () => null,
  p2pState: () => 'idle',
  controllerOptions: undefined,
}));

vi.mock('./call-handshake-controller.js', () => ({
  CallHandshakeController: vi.fn(function (options) {
    mocks.controllerOptions = options;
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
vi.mock('../../shared/p2p-context.js', () => ({
  useP2PContext: () => ({ state: (...args) => mocks.p2pState(...args) }),
}));
vi.mock('@realtime', () => ({ createRoomSignaling: vi.fn() }));
vi.mock('@auth', () => ({
  getAuthProviderProfileSeed: vi.fn(() => null),
  getAuthState: vi.fn(() => ({ isLoggedIn: false })),
  getLoggedInUserToken: vi.fn(() => null),
  useAuth: () => ({ user: (...args) => mocks.user(...args) }),
}));
vi.mock('@shared/events/index.js', () => ({
  publish: (...args) => mocks.publish(...args),
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
    mocks.publish.mockImplementation((name, payload) => {
      mocks.subscriptions.get(name)?.(payload);
    });
    mocks.user = () => null;
    mocks.p2pState = () => 'idle';
    mocks.controllerOptions = undefined;
    window.history.replaceState(null, '', '/');
  });

  afterEach(() => cleanup());

  it('holds app reloads from an incoming invite through call teardown', async () => {
    const { whenAppReloadAllowed } =
      await import('../../shared/app-reload/index.js');
    const { CallHandshakeProvider } = await import('./call-handshake');
    const allowed = vi.fn();

    render(() => <CallHandshakeProvider>{null}</CallHandshakeProvider>);
    mocks.controllerOptions?.onStateChange({
      direction: 'incoming',
      call: { roomId: 'room-1' },
    });

    void whenAppReloadAllowed().then(allowed);
    await Promise.resolve();
    expect(allowed).not.toHaveBeenCalled();

    mocks.controllerOptions?.onStateChange(null);
    await vi.waitFor(() => expect(allowed).toHaveBeenCalledOnce());
  });

  it('holds app reloads while a P2P call is active', async () => {
    const [p2pState, setP2pState] = createSignal('connected');
    mocks.p2pState = p2pState;
    const { whenAppReloadAllowed } =
      await import('../../shared/app-reload/index.js');
    const { CallHandshakeProvider } = await import('./call-handshake');
    const allowed = vi.fn();

    render(() => <CallHandshakeProvider>{null}</CallHandshakeProvider>);
    void whenAppReloadAllowed().then(allowed);
    await Promise.resolve();
    expect(allowed).not.toHaveBeenCalled();

    setP2pState('idle');
    await vi.waitFor(() => expect(allowed).toHaveBeenCalledOnce());
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
      '/?call=1&conversationId=room-1&callerId=caller-1',
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
