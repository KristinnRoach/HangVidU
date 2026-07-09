import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => {
  const handlers = new Map();
  return {
    handlers,
    handleCommand: vi.fn((eventName, handler) => {
      handlers.set(eventName, handler);
      return () => handlers.delete(eventName);
    }),
    dispatchCommand: vi.fn(),
    subscribe: vi.fn((eventName, handler) => {
      handlers.set(eventName, handler);
      return () => handlers.delete(eventName);
    }),
    disable: vi.fn(() => Promise.resolve()),
    ensureEnabledIfGranted: vi.fn(),
    getPushNotifications: vi.fn(),
    initPushNotifications: vi.fn(),
  };
});

vi.mock('../../shared/events/index.js', () => ({
  dispatchCommand: mocks.dispatchCommand,
  handleCommand: mocks.handleCommand,
  subscribe: mocks.subscribe,
}));

vi.mock('../push-notifications.js', () => ({
  PushNotifications: class {},
  getPushNotifications: mocks.getPushNotifications,
  initPushNotifications: mocks.initPushNotifications,
}));

describe('push-notifications setup', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
    mocks.getPushNotifications.mockReturnValue({
      disable: mocks.disable,
      ensureEnabledIfGranted: mocks.ensureEnabledIfGranted,
    });
    mocks.initPushNotifications.mockResolvedValue(mocks.getPushNotifications());
    mocks.ensureEnabledIfGranted.mockResolvedValue({ state: 'enabled' });
  });

  it('registers cmd:push:subscription:disable and delegates to PushNotifications.disable', async () => {
    const push = await import('../index.js');

    await push.setup();
    const handler = mocks.handlers.get('cmd:push:subscription:disable');

    await handler?.();

    expect(mocks.disable).toHaveBeenCalled();
  });

  it('initializes push during setup before auth events can fire', async () => {
    const push = await import('../index.js');

    await push.setup();

    expect(mocks.initPushNotifications).toHaveBeenCalledOnce();
  });

  it('prompts for push when login finds permission is not decided', async () => {
    const push = await import('../index.js');
    mocks.ensureEnabledIfGranted.mockResolvedValue({ state: 'prompt-needed' });

    await push.setup();
    await mocks.handlers.get('evt:auth:session:logged-in')?.();

    expect(mocks.dispatchCommand).toHaveBeenCalledWith(
      'cmd:app-notifications:show:enable-push',
    );
  });

  it('sends incoming call push from call invite events', async () => {
    const sendIncomingCall = vi.fn(() => Promise.resolve());
    mocks.getPushNotifications.mockReturnValue({
      disable: mocks.disable,
      ensureEnabledIfGranted: mocks.ensureEnabledIfGranted,
      sendIncomingCall,
    });
    const push = await import('../index.js');

    await push.setup();
    mocks.handlers.get('evt:call:invite:sent')?.({
      calleeId: 'callee',
      callerId: 'caller',
      callerName: 'Caller',
      roomId: 'room-1',
    });

    expect(sendIncomingCall).toHaveBeenCalledWith({
      targetUserId: 'callee',
      callerId: 'caller',
      callerName: 'Caller',
      roomId: 'room-1',
    });
  });
});
