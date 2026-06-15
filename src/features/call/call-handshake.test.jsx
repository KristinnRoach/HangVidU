import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createSignal } from 'solid-js';
import { render, cleanup } from '@solidjs/testing-library';

const mocks = vi.hoisted(() => ({
  init: vi.fn(),
  cleanup: vi.fn(),
  user: () => null,
}));

vi.mock('./call-handshake-controller.js', () => ({
  CallHandshakeController: vi.fn(function () {
    return {
      init: mocks.init,
      cleanup: mocks.cleanup,
      exitActiveRoom: vi.fn(),
      cancelOutgoing: vi.fn(),
      acceptIncoming: vi.fn(),
      declineIncoming: vi.fn(),
    };
  }),
}));
vi.mock('../../shared/p2p-context.js', () => ({ useP2PContext: () => ({}) }));
vi.mock('../../realtime/index.js', () => ({ createRoomSignaling: vi.fn() }));
vi.mock('../../auth/solid-auth.js', () => ({
  useAuth: () => ({ user: (...args) => mocks.user(...args) }),
}));

describe('CallHandshakeProvider', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    mocks.user = () => null;
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
});
