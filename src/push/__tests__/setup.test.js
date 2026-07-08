import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => {
  const handlers = new Map();
  return {
    handlers,
    handleCommand: vi.fn((eventName, handler) => {
      handlers.set(eventName, handler);
      return () => handlers.delete(eventName);
    }),
    disable: vi.fn(() => Promise.resolve()),
    getPushNotifications: vi.fn(),
  };
});

vi.mock('../../shared/events/index.js', () => ({
  handleCommand: mocks.handleCommand,
}));

vi.mock('../push-notifications.js', () => ({
  PushNotifications: class {},
  getPushNotifications: mocks.getPushNotifications,
}));

describe('push-notifications setup', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
    mocks.getPushNotifications.mockReturnValue({ disable: mocks.disable });
  });

  it('registers cmd:push:subscription:disable and delegates to PushNotifications.disable', async () => {
    const push = await import('../index.js');

    await push.setup();
    const handler = mocks.handlers.get('cmd:push:subscription:disable');

    await handler?.();

    expect(mocks.disable).toHaveBeenCalled();
  });
});
