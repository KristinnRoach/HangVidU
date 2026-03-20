import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../auth/index.js', () => ({
  getLoggedInUserToken: vi.fn().mockResolvedValue('test-id-token'),
}));

vi.mock('../../auth/auth-state.js', () => ({
  getLoggedInUserId: vi.fn().mockReturnValue('user-123'),
  getUser: vi.fn().mockReturnValue({
    uid: 'user-123',
    displayName: 'Test User',
    email: 'test@example.com',
    photoURL: null,
  }),
}));

import { PushNotificationController } from '../push-notification-controller.js';

describe('PushNotificationController', () => {
  let controller;
  let registration;
  let subscription;
  let originalNotification;
  let originalFetch;
  let originalServiceWorker;
  let originalPushManager;

  beforeEach(() => {
    originalNotification = globalThis.Notification;
    originalFetch = globalThis.fetch;
    originalServiceWorker = navigator.serviceWorker;
    originalPushManager = globalThis.PushManager;

    subscription = {
      endpoint: 'https://example.com/push/subscription',
      unsubscribe: vi.fn().mockResolvedValue(true),
      toJSON: vi.fn().mockReturnValue({
        endpoint: 'https://example.com/push/subscription',
        keys: {
          p256dh: 'p256dh-key',
          auth: 'auth-key',
        },
      }),
    };

    registration = {
      pushManager: {
        getSubscription: vi.fn().mockResolvedValue(subscription),
        subscribe: vi.fn().mockResolvedValue(subscription),
      },
      getNotifications: vi.fn().mockResolvedValue([]),
    };

    vi.stubGlobal('Notification', {
      permission: 'granted',
      requestPermission: vi.fn().mockResolvedValue('granted'),
    });

    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: {
        ready: Promise.resolve(registration),
        getRegistration: vi.fn().mockResolvedValue(registration),
      },
    });

    vi.stubGlobal('PushManager', function PushManager() {});
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      }),
    );

    controller = new PushNotificationController();
  });

  afterEach(() => {
    vi.restoreAllMocks();

    if (originalNotification) {
      globalThis.Notification = originalNotification;
    }
    if (originalFetch) {
      globalThis.fetch = originalFetch;
    }
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: originalServiceWorker,
    });
    if (originalPushManager) {
      globalThis.PushManager = originalPushManager;
    }
  });

  it('initializes when notifications are supported', async () => {
    await expect(controller.initialize()).resolves.toBe(true);
    expect(controller.getPermissionState()).toBe('granted');
  });

  it('enables notifications by registering the current subscription', async () => {
    await controller.initialize();
    const result = await controller.enable();

    expect(result).toBe(true);
    expect(registration.pushManager.getSubscription).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/registerPushSubscription'),
      expect.objectContaining({
        method: 'POST',
      }),
    );
    expect(controller.isNotificationEnabled()).toBe(true);
  });

  it('requests permission and enables notifications when granted', async () => {
    globalThis.Notification.permission = 'default';
    globalThis.Notification.requestPermission = vi
      .fn()
      .mockResolvedValue('granted');

    const result = await controller.requestPermission();

    expect(result.state).toBe('granted');
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/registerPushSubscription'),
      expect.any(Object),
    );
  });

  it('returns an error when permission request never resolves', async () => {
    globalThis.Notification.permission = 'default';
    globalThis.Notification.requestPermission = vi.fn(
      () => new Promise(() => {}),
    );

    vi.useFakeTimers();
    const resultPromise = controller.requestPermission();
    await vi.advanceTimersByTimeAsync(8000);
    const result = await resultPromise;
    vi.useRealTimers();

    expect(result).toEqual(
      expect.objectContaining({
        state: 'error',
        reason: 'permission-timeout',
      }),
    );
    expect(fetch).not.toHaveBeenCalledWith(
      expect.stringContaining('/registerPushSubscription'),
      expect.anything(),
    );
  });

  it('sends call notifications through the backend call endpoint', async () => {
    await controller.initialize();

    const result = await controller.sendCallNotification('target-user', {
      roomId: 'room-1',
      callerId: 'caller-1',
      callerName: 'Caller Name',
    });

    expect(result).toEqual(
      expect.objectContaining({
        ok: true,
        status: 200,
        targetUserId: 'target-user',
        roomId: 'room-1',
      }),
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/sendCallNotification'),
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"targetUserId":"target-user"'),
      }),
    );
    expect(fetch).toHaveBeenLastCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.stringContaining('"type":"incoming_call"'),
      }),
    );
  });

  it('sends debug call notifications through the debug endpoint', async () => {
    await controller.initialize();

    await controller.sendDebugCallNotification({
      roomId: 'debug-room',
      callerName: 'Debug Caller',
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/sendDebugCallNotification'),
      expect.objectContaining({
        method: 'POST',
      }),
    );
  });

  it('sends target debug call notifications through the call endpoint', async () => {
    await controller.initialize();

    const result = await controller.sendDebugCallNotificationToUser(
      'target-user',
      {
        roomId: 'debug-room',
      },
    );

    expect(result).toEqual(
      expect.objectContaining({
        ok: true,
        status: 200,
        targetUserId: 'target-user',
        roomId: 'debug-room',
      }),
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/sendCallNotification'),
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"targetUserId":"target-user"'),
      }),
    );
  });

  it('sends missed call notifications with explicit missed_call type', async () => {
    await controller.initialize();

    const result = await controller.sendMissedCallNotification('target-user', {
      roomId: 'room-2',
      callerId: 'caller-1',
      callerName: 'Caller Name',
    });

    expect(result).toEqual(
      expect.objectContaining({
        ok: true,
        status: 200,
        targetUserId: 'target-user',
        roomId: 'room-2',
      }),
    );
    expect(fetch).toHaveBeenLastCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.stringContaining('"type":"missed_call"'),
      }),
    );
  });

  it('rejects legacy call notification types', async () => {
    await controller.initialize();

    const result = await controller.sendCallNotification('target-user', {
      roomId: 'room-legacy',
      callerId: 'caller-1',
      callerName: 'Caller Name',
      type: 'call',
    });

    expect(result).toEqual(
      expect.objectContaining({
        ok: false,
        error: 'Unsupported call notification type: call',
        targetUserId: 'target-user',
        roomId: 'room-legacy',
      }),
    );
  });

  it('dismisses call notifications by service worker tag', async () => {
    const close = vi.fn();
    registration.getNotifications.mockResolvedValue([
      {
        close,
        data: { type: 'incoming_call', roomId: 'room-42' },
      },
      {
        close: vi.fn(),
        data: { type: 'incoming_call', roomId: 'room-other' },
      },
    ]);

    await controller.dismissCallNotifications('room-42');

    expect(registration.getNotifications).toHaveBeenCalledWith();
    expect(close).toHaveBeenCalled();
  });

  it('fails fast when no active service worker registration exists', async () => {
    navigator.serviceWorker.getRegistration.mockResolvedValue(null);

    await expect(controller.dismissCallNotifications('room-42')).rejects.toThrow(
      'No active service worker registration',
    );
  });

  it('disables notifications by removing the subscription and unsubscribing', async () => {
    await controller.initialize();
    controller.permissionState = 'granted';
    controller.isEnabled = true;
    controller.subscription = subscription;

    const result = await controller.disable();

    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/removePushSubscription'),
      expect.objectContaining({
        method: 'POST',
      }),
    );
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  it('disables local notification state even when backend cleanup fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'backend cleanup failed' }),
    });

    await controller.initialize();
    controller.permissionState = 'granted';
    controller.isEnabled = true;
    controller.subscription = subscription;
    controller.trackNotification('call_room-42', { type: 'incoming_call' });

    const callback = vi.fn();
    controller.onPermissionChange(callback);

    const result = await controller.disable();

    expect(result).toBe(true);
    expect(subscription.unsubscribe).toHaveBeenCalled();
    expect(controller.subscription).toBeNull();
    expect(controller.isEnabled).toBe(false);
    expect(controller.activeNotifications.size).toBe(0);
    expect(callback).toHaveBeenCalledWith('disabled');
  });
});
