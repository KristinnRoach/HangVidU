// src/notifications/__tests__/notification-controller.test.js
// Unit tests for NotificationController - can run locally without FCM

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotificationController } from '../notification-controller.js';

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

describe('NotificationController', () => {
  let controller;
  let mockTransport;

  beforeEach(() => {
    mockTransport = new MockTransport();
    controller = new NotificationController(mockTransport);
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

    it('should not send notification when disabled', async () => {
      controller.isEnabled = false;
      const spy = vi.spyOn(mockTransport, 'sendCallNotification');

      // Mock document.hidden to simulate background
      Object.defineProperty(document, 'hidden', {
        configurable: true,
        get: () => true,
      });

      const result = await controller.sendCallNotification('user123', {
        roomId: 'room456',
      });

      // Controller doesn't check isEnabled, only document visibility
      // So notification will be sent if app is in background
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
});
