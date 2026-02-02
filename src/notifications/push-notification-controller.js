// src/notifications/push-notification-controller.js
// Unified notification API with transport abstraction

import { FCMTransport } from './transports/fcm-transport.js';
import { getLoggedInUserId } from '../firebase/auth.js';

/**
 * PushNotificationController - Core notification API
 *
 * Provides a clean, minimal interface for push notification operations:
 * - Manage notification permissions with excellent UX
 * - Send call and message notifications
 * - Handle notification lifecycle and cleanup
 * - Abstract transport layer (FCM, etc.)
 *
 * Design principles:
 * - Transport-agnostic: Easy to swap implementations
 * - UI-decoupled: Controller doesn't know about UI components
 * - Permission-aware: Graceful handling of permission states
 * - Following MessagingController pattern for consistency
 *
 * UX Reference: /Users/kristinnroachgunnarsson/Desktop/Dev/PoCs/web-push-notifications/web-push-poc/src/notify-permission.js
 * This reference provides browser-aware UX for handling silent permission blocking
 */
export class PushNotificationController {
  /**
   * Create a push notification controller
   * @param {Object} transport - Transport implementation for notifications (FCMTransport, etc.)
   * @param {Object} options - Configuration options
   */
  constructor(transport = null, options = {}) {
    this.transport = transport || new FCMTransport();
    this.isEnabled = false;
    this.permissionState = 'default';
    this.options = {
      enableCallNotifications: true,
      enableMessageNotifications: true,
      privacyMode: false,
      autoHideSuccessMs: 6000,
      ...options,
    };

    // Track active notifications for cleanup
    this.activeNotifications = new Map(); // notificationId -> notification data
    this.permissionCallbacks = new Set();
    this.notificationCallbacks = new Set();
  }

  /**
   * Initialize the push notification controller
   * @returns {Promise<boolean>} True if initialization successful
   */
  async initialize() {
    try {
      // Initialize transport
      const transportReady = await this.transport.initialize();
      if (!transportReady) {
        console.warn(
          '[PushNotificationController] Transport initialization failed',
        );
        return false;
      }

      // Check current permission state
      this.permissionState = this.getPermissionState();

      // Set up transport message handling
      this.transport.onMessage((payload) => {
        this.handleForegroundMessage(payload);
      });

      console.log('[PushNotificationController] Initialized successfully');
      return true;
    } catch (error) {
      console.error(
        '[PushNotificationController] Initialization failed:',
        error,
      );
      return false;
    }
  }

  /**
   * Request notification permission with excellent UX
   * Uses browser detection and handles silent blocking gracefully
   * @param {Object} options - Permission request options
   * @returns {Promise<Object>} Permission result with state and reason
   */
  async requestPermission(options = {}) {
    const {
      title = 'Enable notifications',
      explain = 'Get notified of incoming calls and messages even when the app is closed.',
      onGranted = null,
      onDenied = null,
      onDismissed = null,
    } = options;

    // Check if notifications are supported
    if (!this.isNotificationSupported()) {
      console.warn('[PushNotificationController] Notifications not supported');
      return { state: 'denied', reason: 'unsupported' };
    }

    const browser = this.detectBrowser(); // Todo: use / integrate
    const before = Notification.permission;

    // Sync internal state to ensure enable() works if permission was already granted
    this.permissionState = before;

    // If already granted, enable and return success
    if (before === 'granted') {
      await this.enable();
      onGranted?.();
      return { state: 'granted' };
    }

    // If previously denied, provide guidance
    if (before === 'denied') {
      onDenied?.('already-denied');
      return { state: 'denied', reason: 'already-denied' };
    }

    // Request permission (must be called from user gesture)
    let permission;
    try {
      permission = await Notification.requestPermission();
    } catch (error) {
      console.error(
        '[PushNotificationController] Permission request failed:',
        error,
      );
      permission = Notification.permission;
    }

    // Update internal state
    this.permissionState = permission;

    // Handle permission result
    if (permission === 'granted') {
      await this.enable();
      onGranted?.();
      return { state: 'granted' };
    }

    // Detect silent block (permission denied without visible prompt)
    if (before === 'default' && permission === 'denied') {
      onDenied?.('silent-block');
      return { state: 'denied', reason: 'silent-block' };
    }

    // Handle dismissed/default state
    if (permission === 'default') {
      onDismissed?.();
      return { state: 'dismissed' };
    }

    // Generic denied
    onDenied?.();
    return { state: 'denied' };
  }

  /**
   * Enable notifications (get FCM token and set up)
   * @returns {Promise<boolean>} True if enabled successfully
   */
  async enable() {
    if (this.permissionState !== 'granted') {
      console.warn(
        '[PushNotificationController] Cannot enable: permission not granted',
      );
      return false;
    }

    try {
      // Get FCM token
      const token = await this.transport.getToken();
      if (!token) {
        console.warn('[PushNotificationController] Failed to get FCM token');
        return false;
      }

      this.isEnabled = true;
      console.log('[PushNotificationController] Notifications enabled');

      // Notify callbacks
      this.permissionCallbacks.forEach((callback) => {
        try {
          callback('enabled');
        } catch (error) {
          console.error(
            '[PushNotificationController] Error in permission callback:',
            error,
          );
        }
      });

      return true;
    } catch (error) {
      console.error(
        '[PushNotificationController] Failed to enable notifications:',
        error,
      );
      return false;
    }
  }

  /**
   * Disable notifications (remove FCM token)
   * @returns {Promise<boolean>} True if disabled successfully
   */
  async disable() {
    try {
      await this.transport.deleteToken();
      this.isEnabled = false;

      // Clear active notifications
      this.activeNotifications.clear();

      console.log('[PushNotificationController] Notifications disabled');

      // Notify callbacks
      this.permissionCallbacks.forEach((callback) => {
        try {
          callback('disabled');
        } catch (error) {
          console.error(
            '[PushNotificationController] Error in permission callback:',
            error,
          );
        }
      });

      return true;
    } catch (error) {
      console.error(
        '[PushNotificationController] Failed to disable notifications:',
        error,
      );
      return false;
    }
  }

  /**
   * Send a call notification
   * @param {string} targetUserId - User to send notification to
   * @param {Object} callData - Call information
   * @returns {Promise<boolean>} True if notification sent
   */
  async sendCallNotification(targetUserId, callData) {
    if (!this.options.enableCallNotifications) {
      console.log('[PushNotificationController] Call notifications disabled');
      return false;
    }

    // We skip shouldSendNotification() (visibility check) here because this
    // sends a push to the RECIPIENT's device — the sender's foreground state
    // is irrelevant. Only enableCallNotifications gates this.

    try {
      const success = await this.transport.sendCallNotification(
        targetUserId,
        callData,
      );

      if (success) {
        // Track notification for cleanup
        const notificationId = `call_${callData.roomId}_${Date.now()}`;
        this.activeNotifications.set(notificationId, {
          type: 'call',
          roomId: callData.roomId,
          targetUserId,
          timestamp: Date.now(),
        });

        console.log(
          `[PushNotificationController] Call notification sent to ${targetUserId}`,
        );
      }

      return success;
    } catch (error) {
      console.error(
        '[PushNotificationController] Failed to send call notification:',
        error,
      );
      return false;
    }
  }

  /**
   * Send a missed call notification
   * @param {string} targetUserId - User to send notification to
   * @param {Object} callData - Call information
   * @returns {Promise<boolean>} True if notification sent
   */
  async sendMissedCallNotification(targetUserId, callData) {
    if (!this.options.enableCallNotifications) {
      console.log(
        '[PushNotificationController] Call notifications disabled (missed call masked)',
      );
      return false;
    }

    try {
      const success = await this.transport.sendMissedCallNotification(
        targetUserId,
        callData,
      );

      if (success) {
        console.log(
          `[PushNotificationController] Missed call notification sent to ${targetUserId}`,
        );
      }
      return success;
    } catch (error) {
      console.error(
        '[PushNotificationController] Failed to send missed call notification:',
        error,
      );
      return false;
    }
  }

  /**
   * Send a message notification
   * @param {string} targetUserId - User to send notification to
   * @param {Object} messageData - Message information
   * @returns {Promise<boolean>} True if notification sent
   */
  async sendMessageNotification(targetUserId, messageData) {
    if (!this.options.enableMessageNotifications) {
      console.log(
        '[PushNotificationController] Message notifications disabled',
      );
      return false;
    }

    if (!this.shouldSendNotification()) {
      console.log(
        '[PushNotificationController] Not sending message notification (app in foreground)',
      );
      return false;
    }

    try {
      const success = await this.transport.sendMessageNotification(
        targetUserId,
        messageData,
      );

      if (success) {
        // Track notification for cleanup
        const notificationId = `message_${targetUserId}_${Date.now()}`;
        this.activeNotifications.set(notificationId, {
          type: 'message',
          senderId: messageData.senderId,
          targetUserId,
          timestamp: Date.now(),
        });

        console.log(
          `[PushNotificationController] Message notification sent to ${targetUserId}`,
        );
      }

      return success;
    } catch (error) {
      console.error(
        '[PushNotificationController] Failed to send message notification:',
        error,
      );
      return false;
    }
  }

  /**
   * Dismiss call notifications for a specific room
   * @param {string} roomId - Room ID to dismiss notifications for
   */
  async dismissCallNotifications(roomId) {
    try {
      // Find and remove call notifications for this room
      const toRemove = [];
      for (const [notificationId, data] of this.activeNotifications) {
        if (data.type === 'call' && data.roomId === roomId) {
          toRemove.push(notificationId);
        }
      }

      toRemove.forEach((id) => this.activeNotifications.delete(id));

      if (toRemove.length > 0) {
        console.log(
          `[PushNotificationController] Dismissed ${toRemove.length} call notifications for room ${roomId}`,
        );
      }
    } catch (error) {
      console.error(
        '[PushNotificationController] Failed to dismiss call notifications:',
        error,
      );
    }
  }

  /**
   * Dismiss message notifications from a specific sender
   * @param {string} senderId - Sender ID to dismiss notifications for
   */
  async dismissMessageNotifications(senderId) {
    try {
      // Find and remove message notifications from this sender
      const toRemove = [];
      for (const [notificationId, data] of this.activeNotifications) {
        if (data.type === 'message' && data.senderId === senderId) {
          toRemove.push(notificationId);
        }
      }

      toRemove.forEach((id) => this.activeNotifications.delete(id));

      if (toRemove.length > 0) {
        console.log(
          `[PushNotificationController] Dismissed ${toRemove.length} message notifications from ${senderId}`,
        );
      }
    } catch (error) {
      console.error(
        '[PushNotificationController] Failed to dismiss message notifications:',
        error,
      );
    }
  }

  /**
   * Clean up old notifications (older than 24 hours)
   */
  async cleanupOldNotifications() {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    const toRemove = [];
    for (const [notificationId, data] of this.activeNotifications) {
      if (now - data.timestamp > maxAge) {
        toRemove.push(notificationId);
      }
    }

    toRemove.forEach((id) => this.activeNotifications.delete(id));

    if (toRemove.length > 0) {
      console.log(
        `[PushNotificationController] Cleaned up ${toRemove.length} old notifications`,
      );
    }
  }

  /**
   * Handle foreground messages (when app is active)
   * @param {Object} payload - Message payload
   */
  handleForegroundMessage(payload) {
    console.log(
      '[PushNotificationController] Foreground message received:',
      payload,
    );

    // Ignore notifications about the current user's own actions
    const senderId = payload?.data?.senderId || payload?.data?.callerId;
    const currentUserId = getLoggedInUserId();
    if (senderId && currentUserId && senderId === currentUserId) {
      console.log(
        '[PushNotificationController] Ignoring self-notification',
      );
      return;
    }

    // Notify callbacks
    this.notificationCallbacks.forEach((callback) => {
      try {
        callback(payload);
      } catch (error) {
        console.error(
          '[PushNotificationController] Error in notification callback:',
          error,
        );
      }
    });
  }

  /**
   * Check if we should send a push notification
   * @returns {boolean} True if should send notification
   */
  shouldSendNotification() {
    // Don't send if app is in foreground and visible
    return document.hidden || !document.hasFocus();
  }

  /**
   * Get current notification permission state
   * @returns {string} Permission state
   */
  getPermissionState() {
    if (!this.isNotificationSupported()) return 'unsupported';
    return Notification.permission;
  }

  /**
   * Check if notifications are enabled
   * @returns {boolean} True if enabled
   */
  isNotificationEnabled() {
    return this.isEnabled && this.permissionState === 'granted';
  }

  /**
   * Check if notifications are supported
   * @returns {boolean} True if supported
   */
  isNotificationSupported() {
    return FCMTransport.isSupported();
  }

  /**
   * Update controller options
   * @param {Object} newOptions - New options to merge
   */
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    console.log('[PushNotificationController] Options updated:', this.options);
  }

  /**
   * Listen for permission state changes
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  onPermissionChange(callback) {
    this.permissionCallbacks.add(callback);
    return () => this.permissionCallbacks.delete(callback);
  }

  /**
   * Listen for notification events
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  onNotification(callback) {
    this.notificationCallbacks.add(callback);
    return () => this.notificationCallbacks.delete(callback);
  }

  /**
   * Detect browser type for UX customization
   * @returns {string} Browser name
   */
  detectBrowser() {
    // Prefer userAgentData when available (Chromium-based browsers)
    if (navigator.userAgentData && navigator.userAgentData.brands) {
      const brands = navigator.userAgentData.brands.map((b) => b.brand);
      if (brands.some((b) => b.includes('Microsoft Edge'))) return 'Edge';
      if (brands.some((b) => b.includes('Google Chrome'))) return 'Chrome';
      if (brands.some((b) => b.includes('Chromium'))) return 'Chromium';
    }

    // Fallback to UA sniffing
    const ua = navigator.userAgent;
    if (ua.includes('Edg/')) return 'Edge';
    if (ua.includes('Chrome/')) return 'Chrome';
    if (ua.includes('Safari/') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Firefox/')) return 'Firefox';
    return 'Your browser';
  }

  /**
   * Format call notification content with privacy controls
   * Integrates with existing resolveCallerName() function
   * @param {Object} callData - Raw call data
   * @returns {Promise<Object>} Formatted call data
   */
  async formatCallNotification(callData) {
    const { roomId, callerId, callerName } = callData;

    let displayName = callerName || callerId || 'Unknown caller';

    // Only try to resolve caller name if not already provided
    if (!callerName) {
      try {
        // Import resolveCallerName dynamically to avoid circular dependencies
        const { resolveCallerName } =
          await import('../components/contacts/contacts.js');
        displayName = await resolveCallerName(roomId, callerId);
      } catch (error) {
        console.warn(
          '[PushNotificationController] Failed to resolve caller name:',
          error,
        );
        // Fallback already set above
      }
    }

    // Apply privacy mode if enabled
    if (this.options.privacyMode) {
      displayName = 'Someone';
    }

    return {
      ...callData,
      callerName: displayName,
    };
  }

  /**
   * Format message notification content with privacy controls
   * @param {Object} messageData - Raw message data
   * @returns {Promise<Object>} Formatted message data
   */
  async formatMessageNotification(messageData) {
    const { senderId, senderName, messageText } = messageData;

    let displayName = senderName;
    let displayText = messageText;

    // Try to resolve sender name using existing contact system
    try {
      // Import getContacts dynamically to avoid circular dependencies
      const { getContacts } =
        await import('../components/contacts/contacts.js');
      const contacts = await getContacts();

      if (contacts && contacts[senderId]) {
        displayName = contacts[senderId].name || senderName;
      }
    } catch (error) {
      console.warn(
        '[PushNotificationController] Failed to resolve sender name:',
        error,
      );
      // Fallback to provided name or user ID
      displayName = senderName || senderId || 'Unknown sender';
    }

    // Apply privacy mode if enabled
    if (this.options.privacyMode) {
      displayName = 'Someone';
      displayText = 'New message';
    } else {
      // Truncate message for preview (max 50 chars)
      if (displayText && displayText.length > 50) {
        displayText = displayText.substring(0, 47) + '...';
      }
    }

    return {
      ...messageData,
      senderName: displayName,
      messageText: displayText,
    };
  }
}

/**
 * Default push notification controller instance using FCM transport
 * Can be replaced with a different transport for testing
 */
export const pushNotificationController = new PushNotificationController();

// Backward compatibility: export as notificationController
export const notificationController = pushNotificationController;
