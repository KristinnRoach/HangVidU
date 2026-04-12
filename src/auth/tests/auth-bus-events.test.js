import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    events: {
      publishAndAwait: vi.fn().mockResolvedValue(undefined),
    },
  };
});

vi.mock('../../shared/events/index.js', () => ({
  publishAndAwait: mocks.events.publishAndAwait,
}));

beforeEach(() => {
  vi.resetModules();
  mocks.events.publishAndAwait.mockReset().mockResolvedValue(undefined);
});

describe('auth-state shared auth events', () => {
  it('emits auth:ready and auth:login on first stable authenticated state', async () => {
    const { setState } = await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'u1', userName: 'User 1' },
    });
    // Flush the void async emission chain
    await new Promise((r) => setTimeout(r, 0));

    expect(mocks.events.publishAndAwait).toHaveBeenNthCalledWith(
      1,
      'auth:ready',
      {
        state: expect.objectContaining({
          status: 'authenticated',
          isLoggedIn: true,
        }),
      },
    );
    expect(mocks.events.publishAndAwait).toHaveBeenNthCalledWith(
      2,
      'auth:login',
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

  it('emits auth:logout on authenticated to unauthenticated transition', async () => {
    const { setState } = await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'u1', userName: 'User 1' },
    });
    await new Promise((r) => setTimeout(r, 0));
    mocks.events.publishAndAwait.mockClear();

    setState({
      status: 'unauthenticated',
      isLoggedIn: false,
      user: null,
    });
    await new Promise((r) => setTimeout(r, 0));

    expect(mocks.events.publishAndAwait).toHaveBeenCalledWith(
      'auth:logout',
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
