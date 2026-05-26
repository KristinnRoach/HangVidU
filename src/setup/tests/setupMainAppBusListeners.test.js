import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const handlers = new Map();

  return {
    handlers,
    events: {
      handleCommand: vi.fn((eventName, handler) => {
        handlers.set(eventName, handler);
        return () => handlers.delete(eventName);
      }),
    },
    setUserOffline: vi.fn(() => Promise.resolve()),
    getPushNotifications: vi.fn(() => ({ disable: vi.fn(() => Promise.resolve()) })),
  };
});

vi.mock('../../shared/events/index.js', () => ({
  handleCommand: mocks.events.handleCommand,
}));

vi.mock('../../features/presence/index.js', () => ({
  setUserOffline: mocks.setUserOffline,
}));

vi.mock('../../features/push-notifications/index.js', () => ({
  getPushNotifications: mocks.getPushNotifications,
}));

describe('setupMainAppBusListeners', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
  });

  it('handles the presence offline command through setup wiring', async () => {
    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('cmd:user:presence:set-offline');

    await handler?.({ userId: 'user-1' });

    expect(mocks.setUserOffline).toHaveBeenCalledWith('user-1');
  });

  it('delegates push subscription disable through getPushNotifications', async () => {
    const disable = vi.fn(() => Promise.resolve());
    mocks.getPushNotifications.mockReturnValue({ disable });

    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('cmd:push:subscription:disable');

    await handler?.();

    expect(disable).toHaveBeenCalled();
  });
});
