import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    events: {
      publish: vi.fn(),
      publishAndAwait: vi.fn().mockResolvedValue(undefined),
    },
  };
});

vi.mock('../../shared/events/index.js', () => ({
  publish: mocks.events.publish,
  publishAndAwait: mocks.events.publishAndAwait,
}));

beforeEach(() => {
  vi.resetModules();
  mocks.events.publish.mockReset();
  mocks.events.publishAndAwait.mockReset().mockResolvedValue(undefined);
});

describe('auth-state shared auth events', () => {
  it('emits evt:auth:session:ready and evt:auth:session:logged-in on first stable authenticated state', async () => {
    const { setState } = await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'u1', email: null },
    });
    // Flush the void async emission chain
    await new Promise((r) => setTimeout(r, 0));

    expect(mocks.events.publishAndAwait).toHaveBeenNthCalledWith(
      1,
      'evt:auth:session:ready',
      {
        state: expect.objectContaining({
          status: 'authenticated',
          isLoggedIn: true,
        }),
      },
    );
    expect(mocks.events.publishAndAwait).toHaveBeenNthCalledWith(
      2,
      'evt:auth:session:logged-in',
      expect.objectContaining({
        state: expect.objectContaining({
          status: 'authenticated',
          isLoggedIn: true,
        }),
        previousState: expect.objectContaining({
          status: 'uninitialized',
          isLoggedIn: false,
        }),
        isInitialResolution: true,
      }),
    );
  });

  it('emits evt:auth:session:logged-out on authenticated to unauthenticated transition', async () => {
    const { setState } = await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'u1', email: null },
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
      'evt:auth:session:logged-out',
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
