// src/notifications/transports/fcm-transport.js
// FCM Transport implementation for push notifications

import {
  getMessaging,
  getToken,
  onMessage,
  deleteToken,
} from 'firebase/messaging';
import { ref, set, remove, get, push } from 'firebase/database';
import { app, fcmVapidKey } from '../../firebase/firebase.js';
import { rtdb } from '../../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId } from '../../firebase/auth.js';

/**
 * FCMTransport - Firebase Cloud Messaging transport for push notifications
 *
 * Handles FCM token management, notification sending, and RTDB integration
 * following the transport abstraction pattern used in MessagingTransport.
 */
export class FCMTransport {
  constructor() {
    this.messaging = null;
    this.currentToken = null;
    this.vapidKey = fcmVapidKey;
    this.isInitialized = false;
    this.messageCallbacks = new Set();
    this.tokenRefreshCallbacks = new Set();
  }

  /**
   * Initialize FCM messaging and set up token refresh handling
   * @returns {Promise<boolean>} True if initialization successful
   */
  async initialize() {
    if (this.isInitialized) return true;

    try {
      // Check if FCM is supported
      if (!('serviceWorker' in navigator) || !('Notification' in window)) {
        console.warn('[FCMTransport] FCM not supported in this environment');
        return false;
      }

      if (!this.vapidKey) {
        console.warn('[FCMTransport] VAPID key not configured');
        return false;
      }

      this.messaging = getMessaging(app);

      // Set up foreground message handling
      onMessage(this.messaging, (payload) => {
        console.log('[FCMTransport] Foreground message received:', payload);
        this.messageCallbacks.forEach((callback) => {
          try {
            callback(payload);
          } catch (error) {
            console.error('[FCMTransport] Error in message callback:', error);
          }
        });
      });

      this.isInitialized = true;
      console.log('[FCMTransport] Initialized successfully');
      return true;
    } catch (error) {
      console.error('[FCMTransport] Initialization failed:', error);
      return false;
    }
  }

  /**
   * Get FCM token for this device
   * @returns {Promise<string|null>} FCM token or null if failed
   */
  async getToken() {
    if (!this.isInitialized) {
      const initialized = await this.initialize();
      if (!initialized) return null;
    }

    try {
      const token = await getToken(this.messaging, {
        vapidKey: this.vapidKey,
      });

      if (token) {
        this.currentToken = token;
        console.log(
          '[FCMTransport] Token obtained:',
          token.substring(0, 20) + '...',
        );

        // Store token in RTDB for the current user
        await this.storeUserToken(token);
        return token;
      } else {
        console.warn('[FCMTransport] No registration token available');
        return null;
      }
    } catch (error) {
      console.error('[FCMTransport] Failed to get token:', error);
      return null;
    }
  }

  /**
   * Refresh the current FCM token
   * @returns {Promise<string|null>} New token or null if failed
   */
  async refreshToken() {
    console.log('[FCMTransport] Refreshing token...');

    // Delete current token first
    if (this.currentToken) {
      try {
        await deleteToken(this.messaging);
        await this.removeUserToken(this.currentToken);
      } catch (error) {
        console.warn('[FCMTransport] Failed to delete old token:', error);
      }
    }

    // Get new token
    this.currentToken = null;
    const newToken = await this.getToken();

    if (newToken) {
      // Notify callbacks about token refresh
      this.tokenRefreshCallbacks.forEach((callback) => {
        try {
          callback(newToken);
        } catch (error) {
          console.error(
            '[FCMTransport] Error in token refresh callback:',
            error,
          );
        }
      });
    }

    return newToken;
  }

  /**
   * Delete the current FCM token
   * @returns {Promise<boolean>} True if deletion successful
   */
  async deleteToken() {
    if (!this.messaging || !this.currentToken) return true;

    try {
      await deleteToken(this.messaging);
      await this.removeUserToken(this.currentToken);
      this.currentToken = null;
      console.log('[FCMTransport] Token deleted successfully');
      return true;
    } catch (error) {
      console.error('[FCMTransport] Failed to delete token:', error);
      return false;
    }
  }

  /**
   * Store FCM token in RTDB for the current user
   * @param {string} token - FCM token to store
   * @returns {Promise<void>}
   */
  async storeUserToken(token) {
    const userId = getLoggedInUserId();
    if (!userId) {
      console.warn('[FCMTransport] Cannot store token: user not logged in');
      return;
    }

    try {
      const tokenRef = ref(
        rtdb,
        `users/${userId}/fcmTokens/${this.getTokenId(token)}`,
      );
      const tokenData = {
        token,
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: this.getPlatform(),
          timestamp: Date.now(),
        },
        createdAt: Date.now(),
        lastUsed: Date.now(),
      };

      await set(tokenRef, tokenData);
      console.log('[FCMTransport] Token stored in RTDB');
    } catch (error) {
      console.error('[FCMTransport] Failed to store token in RTDB:', error);
    }
  }

  /**
   * Remove FCM token from RTDB for the current user
   * @param {string} token - FCM token to remove
   * @returns {Promise<void>}
   */
  async removeUserToken(token) {
    const userId = getLoggedInUserId();
    if (!userId) return;

    try {
      const tokenRef = ref(
        rtdb,
        `users/${userId}/fcmTokens/${this.getTokenId(token)}`,
      );
      await remove(tokenRef);
      console.log('[FCMTransport] Token removed from RTDB');
    } catch (error) {
      console.error('[FCMTransport] Failed to remove token from RTDB:', error);
    }
  }

  /**
   * Get all FCM tokens for a specific user
   * @param {string} userId - User ID to get tokens for
   * @returns {Promise<Array<Object>>} Array of token objects
   */
  async getUserTokens(userId) {
    try {
      const tokensRef = ref(rtdb, `users/${userId}/fcmTokens`);
      const snapshot = await get(tokensRef);

      if (snapshot.exists()) {
        const tokensData = snapshot.val();
        return Object.values(tokensData);
      }

      return [];
    } catch (error) {
      console.error('[FCMTransport] Failed to get user tokens:', error);
      return [];
    }
  }

  /**
   * Send a call notification to a specific user
   * @param {string} targetUserId - User ID to send notification to
   * @param {Object} callData - Call notification data
   * @returns {Promise<boolean>} True if notification sent successfully
   */
  async sendCallNotification(targetUserId, callData) {
    const { roomId, callerId, callerName } = callData;

    const notificationData = {
      type: 'call',
      roomId,
      callerId,
      callerName,
      timestamp: Date.now().toString(),
    };

    const payload = {
      notification: {
        title: `Incoming call from ${callerName}`,
        body: 'Tap to answer or decline',
        icon: '/icons/play-arrows-v1/icon-192.png',
        badge: '/icons/play-arrows-v1/icon-192.png',
      },
      data: notificationData,
    };

    return this.sendNotification(targetUserId, payload);
  }

  /**
   * Send a message notification to a specific user
   * @param {string} targetUserId - User ID to send notification to
   * @param {Object} messageData - Message notification data
   * @returns {Promise<boolean>} True if notification sent successfully
   */
  async sendMessageNotification(targetUserId, messageData) {
    const { senderId, senderName, messageText } = messageData;

    // Truncate message for preview (max 50 chars)
    const messagePreview =
      messageText.length > 50
        ? messageText.substring(0, 47) + '...'
        : messageText;

    const notificationData = {
      type: 'message',
      senderId,
      senderName,
      messagePreview,
      timestamp: Date.now().toString(),
    };

    const payload = {
      notification: {
        title: `New message from ${senderName}`,
        body: messagePreview,
        icon: '/icons/play-arrows-v1/icon-192.png',
        badge: '/icons/play-arrows-v1/icon-192.png',
      },
      data: notificationData,
    };

    return this.sendNotification(targetUserId, payload);
  }

  /**
   * Send a generic notification to a specific user
   * @param {string} targetUserId - User ID to send notification to
   * @param {Object} payload - Notification payload
   * @returns {Promise<boolean>} True if notification sent successfully
   */
  async sendNotification(targetUserId, payload) {
    try {
      // Get all tokens for the target user
      const tokens = await this.getUserTokens(targetUserId);

      if (tokens.length === 0) {
        console.warn(`[FCMTransport] No tokens found for user ${targetUserId}`);
        return false;
      }

      // For now, we'll store the notification in RTDB and let the client handle it
      // In a production app, you'd use Firebase Functions to send via FCM Admin SDK
      const notificationRef = ref(rtdb, `notifications/${targetUserId}`);
      const notificationId = push(notificationRef).key;

      const notificationData = {
        id: notificationId,
        payload,
        createdAt: Date.now(),
        delivered: false,
      };

      await set(
        ref(rtdb, `notifications/${targetUserId}/${notificationId}`),
        notificationData,
      );

      console.log(
        `[FCMTransport] Notification queued for user ${targetUserId}`,
      );
      return true;
    } catch (error) {
      console.error('[FCMTransport] Failed to send notification:', error);
      return false;
    }
  }

  /**
   * Listen for foreground messages
   * @param {Function} callback - Callback function for messages
   * @returns {Function} Unsubscribe function
   */
  onMessage(callback) {
    this.messageCallbacks.add(callback);
    return () => this.messageCallbacks.delete(callback);
  }

  /**
   * Listen for token refresh events
   * @param {Function} callback - Callback function for token refresh
   * @returns {Function} Unsubscribe function
   */
  onTokenRefresh(callback) {
    this.tokenRefreshCallbacks.add(callback);
    return () => this.tokenRefreshCallbacks.delete(callback);
  }

  /**
   * Get a unique ID for a token (for RTDB storage)
   * @param {string} token - FCM token
   * @returns {string} Token ID
   */
  getTokenId(token) {
    // Use a hash of the token for the ID
    return btoa(token)
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 20);
  }

  /**
   * Get platform information
   * @returns {string} Platform type
   */
  getPlatform() {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
    if (/Android/.test(ua)) return 'android';
    if (/Macintosh/.test(ua)) return 'macos';
    if (/Windows/.test(ua)) return 'windows';
    return 'unknown';
  }

  /**
   * Check if FCM is supported in current environment
   * @returns {boolean} True if FCM is supported
   */
  static isSupported() {
    return 'serviceWorker' in navigator && 'Notification' in window;
  }
}
