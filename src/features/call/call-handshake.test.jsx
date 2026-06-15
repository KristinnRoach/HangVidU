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
});
