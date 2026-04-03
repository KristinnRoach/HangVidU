import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const listeners = new Map();

  return {
    listeners,
    authBus: {
      on: vi.fn((eventName, handler) => {
        listeners.set(eventName, handler);
        return () => listeners.delete(eventName);
      }),
    },
    appBus: {
      emitAsync: vi.fn().mockResolvedValue(undefined),
    },
  };
});

vi.mock('./auth-bus.js', () => ({
  AUTH_EVENTS: {
    READY: 'auth:ready',
    LOGGED_IN: 'auth:logged-in',
    LOGGED_OUT: 'auth:logged-out',
  },
  authBus: mocks.authBus,
}));

vi.mock('../app/app-bus.js', () => ({
  appBus: mocks.appBus,
}));

describe('setupAuthAppBusBridge', () => {
  beforeEach(() => {
    mocks.listeners.clear();
    mocks.authBus.on.mockClear();
    mocks.appBus.emitAsync.mockReset().mockResolvedValue(undefined);
  });

  it('forwards auth ready events to appBus', async () => {
    const { setupAuthAppBusBridge } = await import('./setupAuthAppBusBridge.js');

    const teardown = setupAuthAppBusBridge();

    await mocks.listeners.get('auth:ready')({
      state: { status: 'authenticated', isLoggedIn: true },
    });

    expect(mocks.appBus.emitAsync).toHaveBeenCalledWith('auth:ready', {
      state: { status: 'authenticated', isLoggedIn: true },
    });

    teardown();
  });

  it('forwards auth login events to appBus', async () => {
    const { setupAuthAppBusBridge } = await import('./setupAuthAppBusBridge.js');

    const teardown = setupAuthAppBusBridge();

    await mocks.listeners.get('auth:logged-in')({
      state: { isLoggedIn: true },
      previousState: { isLoggedIn: false },
      isInitialResolution: true,
    });

    expect(mocks.appBus.emitAsync).toHaveBeenCalledWith('auth:login', {
      state: { isLoggedIn: true },
      previousState: { isLoggedIn: false },
      isInitialResolution: true,
    });

    teardown();
  });

  it('forwards auth logout events to appBus', async () => {
    const { setupAuthAppBusBridge } = await import('./setupAuthAppBusBridge.js');

    const teardown = setupAuthAppBusBridge();

    await mocks.listeners.get('auth:logged-out')({
      state: { isLoggedIn: false },
      previousState: { isLoggedIn: true },
      isInitialResolution: false,
    });

    expect(mocks.appBus.emitAsync).toHaveBeenCalledWith('auth:logout', {
      state: { isLoggedIn: false },
      previousState: { isLoggedIn: true },
      isInitialResolution: false,
    });

    teardown();
  });
});
