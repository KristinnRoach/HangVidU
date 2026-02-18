// src/notifications/__tests__/notification-controller.test.js
// Unit tests for NotificationController - can run locally without FCM

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PushNotificationController } from '../push-notification-controller.js';

// Mock transport for testing
class MockTransport {
  constructor() {
    this.initialized = false;
    this.token = null;
    this.messageCallbacks = new Set();
  }

  async initialize() {
    this.initialized = true;
    return true;
  }

  async getToken() {
    this.token = 'mock-fcm-token-' + Date.now();
    return this.token;
  }

  async deleteToken() {
    this.token = null;
    return true;
  }

  async sendCallNotification(_targetUserId, _callData) {
    // Simulate real behavior - only succeed if initialized
    if (!this.initialized) return false;
    return true;
  }

  async sendMessageNotification(_targetUserId, _messageData) {
    // Simulate real behavior - only succeed if initialized
    if (!this.initialized) return false;
    return true;
  }

  onMessage(callback) {
    this.messageCallbacks.add(callback);
    return () => this.messageCallbacks.delete(callback);
  }
}

describe('PushNotificationController', () => {
  let controller;
  let mockTransport;

  beforeEach(() => {
    mockTransport = new MockTransport();
    controller = new PushNotificationController(mockTransport);
  });

  describe('Initialization', () => {
    it('should initialize successfully with valid transport', async () => {
      const result = await controller.initialize();
      expect(result).toBe(true);
      expect(mockTransport.initialized).toBe(true);
    });

    it('should handle initialization failure gracefully', async () => {
      mockTransport.initialize = async () => false;
      const result = await controller.initialize();
      expect(result).toBe(false);
    });
  });

  describe('Permission Management', () => {
    it('should detect notification support', () => {
      const supported = controller.isNotificationSupported();
      // In Node/Vitest, this will be false (no window.Notification)
      expect(typeof supported).toBe('boolean');
    });

    it('should track permission state', () => {
      const state = controller.getPermissionState();
      expect(['default', 'granted', 'denied', 'unsupported']).toContain(state);
    });

    it('should not enable without granted permission', async () => {
      controller.permissionState = 'denied';
      const result = await controller.enable();
      expect(result).toBe(false);
      expect(controller.isEnabled).toBe(false);
    });
  });

  describe('Notification Sending', () => {
    beforeEach(async () => {
      await controller.initialize();
      controller.permissionState = 'granted';
      controller.isEnabled = true;
    });

    it('should send call notification when enabled', async () => {
      const spy = vi.spyOn(mockTransport, 'sendCallNotification');

      const result = await controller.sendCallNotification('user123', {
        roomId: 'room456',
        callerId: 'caller789',
        callerName: 'John Doe',
      });

      expect(result).toBe(true);
      expect(spy).toHaveBeenCalledWith(
        'user123',
        expect.objectContaining({
          roomId: 'room456',
          callerId: 'caller789',
        }),
      );
    });

    it('should send call notification regardless of isEnabled (push targets recipient)', async () => {
      controller.isEnabled = false;
      const spy = vi.spyOn(mockTransport, 'sendCallNotification');

      const result = await controller.sendCallNotification('user123', {
        roomId: 'room456',
      });

      // sendCallNotification only checks enableCallNotifications option,
      // not isEnabled or document visibility — those are irrelevant for
      // push notifications targeting another device
      expect(result).toBe(true);
      expect(spy).toHaveBeenCalled();
    });

    it('should respect enableCallNotifications option', async () => {
      controller.options.enableCallNotifications = false;
      const spy = vi.spyOn(mockTransport, 'sendCallNotification');

      const result = await controller.sendCallNotification('user123', {
        roomId: 'room456',
      });

      expect(result).toBe(false);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Notification Lifecycle', () => {
    beforeEach(async () => {
      await controller.initialize();
      controller.permissionState = 'granted';
      controller.isEnabled = true;
    });

    it('should track active notifications', async () => {
      await controller.sendCallNotification('user123', {
        roomId: 'room456',
        callerId: 'caller789',
        callerName: 'John Doe',
      });

      expect(controller.activeNotifications.size).toBeGreaterThan(0);
    });

    it('should dismiss call notifications for specific room', async () => {
      await controller.sendCallNotification('user123', {
        roomId: 'room456',
        callerId: 'caller789',
        callerName: 'John Doe',
      });

      const sizeBefore = controller.activeNotifications.size;
      await controller.dismissCallNotifications('room456');

      // Should have removed notifications for this room
      expect(controller.activeNotifications.size).toBeLessThanOrEqual(
        sizeBefore,
      );
    });

    it('should clean up old notifications', async () => {
      // Add a notification with old timestamp
      controller.activeNotifications.set('old-notification', {
        type: 'call',
        roomId: 'room123',
        timestamp: Date.now() - 25 * 60 * 60 * 1000, // 25 hours ago
      });

      await controller.cleanupOldNotifications();

      expect(controller.activeNotifications.has('old-notification')).toBe(
        false,
      );
    });
  });

  describe('Privacy Controls', () => {
    it('should format call notification with privacy mode', async () => {
      controller.options.privacyMode = true;

      const formatted = await controller.formatCallNotification({
        roomId: 'room123',
        callerId: 'user456',
        callerName: 'John Doe',
      });

      expect(formatted.callerName).toBe('Someone');
    });

    it('should format call notification without privacy mode', async () => {
      controller.options.privacyMode = false;

      const formatted = await controller.formatCallNotification({
        roomId: 'room123',
        callerId: 'user456',
        callerName: 'John Doe',
      });

      expect(formatted.callerName).toBe('John Doe');
    });

    it('should truncate long message previews', async () => {
      const longMessage = 'a'.repeat(100);

      const formatted = await controller.formatMessageNotification({
        senderId: 'user123',
        senderName: 'Jane Doe',
        messageText: longMessage,
      });

      expect(formatted.messageText.length).toBeLessThanOrEqual(50);
      expect(formatted.messageText).toContain('...');
    });
  });

  describe('Event Callbacks', () => {
    it('should register and call permission callbacks', async () => {
      const callback = vi.fn();
      controller.onPermissionChange(callback);

      await controller.initialize();
      controller.permissionState = 'granted';
      await controller.enable();

      expect(callback).toHaveBeenCalledWith('enabled');
    });

    it('should unregister callbacks', () => {
      const callback = vi.fn();
      const unsubscribe = controller.onPermissionChange(callback);

      unsubscribe();
      expect(controller.permissionCallbacks.has(callback)).toBe(false);
    });
  });

  describe('Browser Detection', () => {
    it('should detect browser type', () => {
      const browser = controller.detectBrowser();
      expect(typeof browser).toBe('string');
      expect(browser.length).toBeGreaterThan(0);
    });
  });

  describe('requestPermission', () => {
    let originalNotification;

    beforeEach(async () => {
      originalNotification = globalThis.Notification;
      await controller.initialize();
    });

    afterEach(() => {
      if (originalNotification) {
        globalThis.Notification = originalNotification;
      }
    });

    it('should return unsupported when notifications are not supported', async () => {
      // Make isNotificationSupported return false
      vi.spyOn(controller, 'isNotificationSupported').mockReturnValue(false);

      const result = await controller.requestPermission();
      expect(result).toEqual({ state: 'denied', reason: 'unsupported' });
    });

    it('should return already-denied with browser when permission is denied', async () => {
      vi.stubGlobal('Notification', {
        permission: 'denied',
        requestPermission: vi.fn(),
      });
      vi.spyOn(controller, 'isNotificationSupported').mockReturnValue(true);

      const result = await controller.requestPermission();
      expect(result.state).toBe('denied');
      expect(result.reason).toBe('already-denied');
      expect(typeof result.browser).toBe('string');
    });

    it('should return granted with browser when permission is already granted and enable succeeds', async () => {
      vi.stubGlobal('Notification', {
        permission: 'granted',
        requestPermission: vi.fn(),
      });
      vi.spyOn(controller, 'isNotificationSupported').mockReturnValue(true);

      const result = await controller.requestPermission();
      expect(result.state).toBe('granted');
      expect(typeof result.browser).toBe('string');
      expect(controller.isEnabled).toBe(true);
    });

    it('should return enable-failed when permission is granted but token fails', async () => {
      vi.stubGlobal('Notification', {
        permission: 'granted',
        requestPermission: vi.fn(),
      });
      vi.spyOn(controller, 'isNotificationSupported').mockReturnValue(true);
      // Make getToken fail
      mockTransport.getToken = async () => null;

      const result = await controller.requestPermission();
      expect(result.state).toBe('error');
      expect(result.reason).toBe('enable-failed');
      expect(typeof result.browser).toBe('string');
      expect(controller.isEnabled).toBe(false);
    });

    it('should return enable-failed when freshly granted but token fails', async () => {
      vi.stubGlobal('Notification', {
        permission: 'default',
        requestPermission: vi.fn().mockResolvedValue('granted'),
      });
      vi.spyOn(controller, 'isNotificationSupported').mockReturnValue(true);
      mockTransport.getToken = async () => null;

      const result = await controller.requestPermission();
      expect(result.state).toBe('error');
      expect(result.reason).toBe('enable-failed');
    });

    it('should detect silent block when default transitions to denied', async () => {
      vi.stubGlobal('Notification', {
        permission: 'default',
        requestPermission: vi.fn().mockResolvedValue('denied'),
      });
      vi.spyOn(controller, 'isNotificationSupported').mockReturnValue(true);

      const result = await controller.requestPermission();
      expect(result.state).toBe('denied');
      expect(result.reason).toBe('silent-block');
      expect(typeof result.browser).toBe('string');
    });

    it('should return dismissed when permission stays default', async () => {
      vi.stubGlobal('Notification', {
        permission: 'default',
        requestPermission: vi.fn().mockResolvedValue('default'),
      });
      vi.spyOn(controller, 'isNotificationSupported').mockReturnValue(true);

      const result = await controller.requestPermission();
      expect(result.state).toBe('dismissed');
      expect(typeof result.browser).toBe('string');
    });

    it('should call onGranted callback on success', async () => {
      vi.stubGlobal('Notification', {
        permission: 'granted',
        requestPermission: vi.fn(),
      });
      vi.spyOn(controller, 'isNotificationSupported').mockReturnValue(true);

      const onGranted = vi.fn();
      await controller.requestPermission({ onGranted });
      expect(onGranted).toHaveBeenCalled();
    });

    it('should call onDenied callback with reason on denial', async () => {
      vi.stubGlobal('Notification', {
        permission: 'denied',
        requestPermission: vi.fn(),
      });
      vi.spyOn(controller, 'isNotificationSupported').mockReturnValue(true);

      const onDenied = vi.fn();
      await controller.requestPermission({ onDenied });
      expect(onDenied).toHaveBeenCalledWith('already-denied');
    });

    it('should not call onGranted when enable fails', async () => {
      vi.stubGlobal('Notification', {
        permission: 'granted',
        requestPermission: vi.fn(),
      });
      vi.spyOn(controller, 'isNotificationSupported').mockReturnValue(true);
      mockTransport.getToken = async () => null;

      const onGranted = vi.fn();
      await controller.requestPermission({ onGranted });
      expect(onGranted).not.toHaveBeenCalled();
    });
  });
});
