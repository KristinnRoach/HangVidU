import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const emitAsync = vi.fn().mockResolvedValue(undefined);
  return {
    authBus: {
      emitAsync,
      emitAsyncSequential: vi.fn(async (events) => {
        for (const [eventName, data] of events) {
          await emitAsync(eventName, data);
        }
      }),
    },
  };
});

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
  mocks.authBus.emitAsyncSequential.mockReset().mockImplementation(async (events) => {
    for (const [eventName, data] of events) {
      await mocks.authBus.emitAsync(eventName, data);
    }
  });
});

describe('auth-state authBus events', () => {
  it('emits auth:ready and auth:logged-in on first stable authenticated state', async () => {
    const { setState } = await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'u1', displayName: 'User 1' },
    });
    // Flush the void async emission chain
    await new Promise((r) => setTimeout(r, 0));

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
    await new Promise((r) => setTimeout(r, 0));
    mocks.authBus.emitAsync.mockClear();

    setState({
      status: 'unauthenticated',
      isLoggedIn: false,
      user: null,
    });
    await new Promise((r) => setTimeout(r, 0));

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
