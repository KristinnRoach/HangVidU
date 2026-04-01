import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  authBus: {
    emitAsync: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock('../auth-bus.js', () => ({
  AUTH_EVENTS: {
    READY: 'auth:ready',
    LOGGED_IN: 'auth:logged-in',
    LOGGED_OUT: 'auth:logged-out',
  },
  authBus: mocks.authBus,
}));

beforeEach(() => {
  vi.resetModules();
  mocks.authBus.emitAsync.mockReset().mockResolvedValue(undefined);
});

describe('auth-state authBus events', () => {
  it('emits auth:ready and auth:logged-in on first stable authenticated state', async () => {
    const { setState } = await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'u1', displayName: 'User 1' },
    });

    expect(mocks.authBus.emitAsync).toHaveBeenNthCalledWith(1, 'auth:ready', {
      state: expect.objectContaining({
        status: 'authenticated',
        isLoggedIn: true,
      }),
    });
    expect(mocks.authBus.emitAsync).toHaveBeenNthCalledWith(
      2,
      'auth:logged-in',
      expect.objectContaining({
        state: expect.objectContaining({
          status: 'authenticated',
          isLoggedIn: true,
        }),
        previousState: expect.objectContaining({
          status: 'idle',
          isLoggedIn: false,
        }),
        isInitialResolution: true,
      }),
    );
  });

  it('emits auth:logged-out on authenticated to unauthenticated transition', async () => {
    const { setState } = await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'u1', displayName: 'User 1' },
    });
    mocks.authBus.emitAsync.mockClear();

    setState({
      status: 'unauthenticated',
      isLoggedIn: false,
      user: null,
    });

    expect(mocks.authBus.emitAsync).toHaveBeenCalledWith(
      'auth:logged-out',
      expect.objectContaining({
        state: expect.objectContaining({
          status: 'unauthenticated',
          isLoggedIn: false,
        }),
        previousState: expect.objectContaining({
          status: 'authenticated',
          isLoggedIn: true,
        }),
        isInitialResolution: false,
      }),
    );
  });
});
