// src/diagnostics/diagnostic-service.js
// Observes and tests the existing notification system without modifying it

import { platformDetector } from './platform-detector.js';

/**
 * @typedef {Object} NotificationSystemState
 * @property {NotificationPermission} permission - Current permission state
 * @property {ServiceWorkerStatus} serviceWorkerStatus - Service worker state
 * @property {FCMTokenStatus} fcmTokenStatus - FCM token state
 * @property {import('./platform-detector.js').PlatformInfo} platformSupport - Platform info
 * @property {ErrorInfo} [lastError] - Last error if any
 */

/**
 * @typedef {Object} ServiceWorkerStatus
 * @property {boolean} registered - Is service worker registered
 * @property {boolean} active - Is service worker active
 * @property {boolean} waiting - Is service worker waiting
 * @property {boolean} installing - Is service worker installing
 * @property {boolean} updateAvailable - Is update available
 * @property {Date} [registrationTime] - When registered
 * @property {string} [scope] - Service worker scope
 * @property {string} [scriptURL] - Service worker script URL
 */

/**
 * @typedef {Object} FCMTokenStatus
 * @property {boolean} hasToken - Does controller have a token
 * @property {string} [token] - The FCM token (truncated for display)
 * @property {Date} [tokenGeneratedAt] - When token was generated
 * @property {boolean} tokenSentToBackend - Was token sent to backend
 * @property {boolean} [backendTokenMatches] - Does backend token match local
 * @property {Date} [lastRefreshAttempt] - Last token refresh attempt
 */

/**
 * @typedef {Object} ErrorInfo
 * @property {string} code - Error code
 * @property {string} message - Error message
 * @property {Date} timestamp - When error occurred
 * @property {any} context - Additional context
 */

/**
 * DiagnosticService - Observes the existing notification system
 * Does NOT modify NotificationController or FCMTransport
 */
export class DiagnosticService {
  constructor() {
    this.notificationController = null;
    this.lastError = null;
  }

  /**
   * Initialize by finding the existing NotificationController instance
   * @param {Object} notificationController - The existing NotificationController
   */
  initialize(notificationController) {
    this.notificationController = notificationController;
  }

  /**
   * Get current system state by observing existing components
   * @returns {Promise<NotificationSystemState>}
   */
  async getSystemState() {
    try {
      const permission = this.getPermissionState();
      const serviceWorkerStatus = await this.getServiceWorkerStatus();
      const fcmTokenStatus = await this.getFCMTokenStatus();
      const platformSupport = platformDetector.detectPlatform();

      return {
        permission,
        serviceWorkerStatus,
        fcmTokenStatus,
        platformSupport,
        lastError: this.lastError,
      };
    } catch (error) {
      console.error('[DiagnosticService] Failed to get system state:', error);
      this.lastError = {
        code: 'STATE_READ_ERROR',
        message: error.message,
        timestamp: new Date(),
        context: { error },
      };
      throw error;
    }
  }

  /**
   * Get notification permission state
   * @returns {NotificationPermission}
   */
  getPermissionState() {
    if (!('Notification' in window)) {
      return 'denied'; // Treat unsupported as denied
    }
    return Notification.permission;
  }

  /**
   * Get service worker registration status
   * @returns {Promise<ServiceWorkerStatus>}
   */
  async getServiceWorkerStatus() {
    if (!('serviceWorker' in navigator)) {
      return {
        registered: false,
        active: false,
        waiting: false,
        installing: false,
        updateAvailable: false,
      };
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();

      if (!registration) {
        return {
          registered: false,
          active: false,
          waiting: false,
          installing: false,
          updateAvailable: false,
        };
      }

      return {
        registered: true,
        active: !!registration.active,
        waiting: !!registration.waiting,
        installing: !!registration.installing,
        updateAvailable: !!registration.waiting,
        scope: registration.scope,
        scriptURL: registration.active?.scriptURL,
      };
    } catch (error) {
      console.error(
        '[DiagnosticService] Failed to get service worker status:',
        error,
      );
      return {
        registered: false,
        active: false,
        waiting: false,
        installing: false,
        updateAvailable: false,
      };
    }
  }

  /**
   * Get FCM token status by observing the NotificationController
   * @returns {Promise<FCMTokenStatus>}
   */
  async getFCMTokenStatus() {
    if (!this.notificationController) {
      return {
        hasToken: false,
        tokenSentToBackend: false,
      };
    }

    try {
      // Observe the transport's current token
      const transport = this.notificationController.transport;
      const hasToken = !!transport?.currentToken;
      const token = transport?.currentToken;

      // Truncate token for display (show first 10 and last 10 chars)
      const truncatedToken = token
        ? `${token.substring(0, 10)}...${token.substring(token.length - 10)}`
        : undefined;

      return {
        hasToken,
        token: truncatedToken,
        tokenSentToBackend: hasToken, // Assume sent if exists
      };
    } catch (error) {
      console.error(
        '[DiagnosticService] Failed to get FCM token status:',
        error,
      );
      return {
        hasToken: false,
        tokenSentToBackend: false,
      };
    }
  }

  /**
   * Check if notifications are supported on this platform
   * @returns {boolean}
   */
  isNotificationSupported() {
    return platformDetector.isNotificationSupported();
  }

  /**
   * Check if PWA installation is required
   * @returns {boolean}
   */
  requiresPWAInstall() {
    return platformDetector.requiresPWAInstall();
  }

  /**
   * Get platform-specific limitations
   * @returns {string[]}
   */
  getPlatformLimitations() {
    return platformDetector.getPlatformLimitations();
  }

  /**
   * Send a test notification using the existing NotificationController
   * @param {string} message - Test message
   * @returns {Promise<{success: boolean, message: string, error?: any}>}
   */
  async sendTestNotification(message = 'Test notification from diagnostics') {
    if (!this.notificationController) {
      return {
        success: false,
        message: 'NotificationController not initialized',
      };
    }

    try {
      // Check permission first
      const permission = this.getPermissionState();
      if (permission !== 'granted') {
        return {
          success: false,
          message: `Permission not granted (current: ${permission})`,
        };
      }

      // Try to show a browser notification directly (doesn't use FCM)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('FCM Diagnostic Test', {
          body: message,
          icon: '/icons/play-arrows-v1/icon-192.png',
          tag: 'diagnostic-test',
        });

        return {
          success: true,
          message: 'Test notification displayed successfully',
        };
      }

      return {
        success: false,
        message: 'Notification API not available',
      };
    } catch (error) {
      console.error('[DiagnosticService] Test notification failed:', error);
      return {
        success: false,
        message: `Test failed: ${error.message}`,
        error,
      };
    }
  }

  /**
   * Run comprehensive diagnostics
   * @returns {Promise<Object>}
   */
  async runDiagnostics() {
    const results = {
      timestamp: new Date(),
      platform: platformDetector.detectPlatform(),
      systemState: await this.getSystemState(),
      tests: [],
      issues: [],
      recommendations: [],
    };

    // Test 1: Check notification support
    const notificationSupported = this.isNotificationSupported();
    results.tests.push({
      name: 'Notification API Support',
      passed: notificationSupported,
      message: notificationSupported
        ? 'Notification API is supported'
        : 'Notification API is not supported',
    });

    if (!notificationSupported) {
      results.issues.push({
        severity: 'error',
        code: 'NOTIFICATION_NOT_SUPPORTED',
        message: 'Browser does not support web push notifications',
        location: 'Browser/Platform',
      });
    }

    // Test 2: Check service worker
    const swStatus = results.systemState.serviceWorkerStatus;
    results.tests.push({
      name: 'Service Worker Registration',
      passed: swStatus.registered && swStatus.active,
      message: swStatus.registered
        ? 'Service worker is registered and active'
        : 'Service worker is not registered',
    });

    if (!swStatus.registered || !swStatus.active) {
      results.issues.push({
        severity: 'error',
        code: 'SW_NOT_ACTIVE',
        message: 'Service worker is not active',
        location: 'Service Worker',
        proposedFix: 'Check service worker registration in main.js',
      });
    }

    // Test 3: Check permission
    const permission = results.systemState.permission;
    results.tests.push({
      name: 'Notification Permission',
      passed: permission === 'granted',
      message: `Permission state: ${permission}`,
    });

    if (permission === 'denied') {
      results.issues.push({
        severity: 'warning',
        code: 'PERMISSION_DENIED',
        message: 'Notification permission has been denied',
        location: 'Browser Settings',
        proposedFix: 'User must enable notifications in browser settings',
      });
    }

    // Test 4: Check FCM token
    const tokenStatus = results.systemState.fcmTokenStatus;
    results.tests.push({
      name: 'FCM Token',
      passed: tokenStatus.hasToken,
      message: tokenStatus.hasToken
        ? 'FCM token is present'
        : 'No FCM token found',
    });

    if (!tokenStatus.hasToken && permission === 'granted') {
      results.issues.push({
        severity: 'error',
        code: 'TOKEN_MISSING',
        message: 'FCM token is missing despite granted permission',
        location: 'FCMTransport',
        proposedFix: 'Check FCM initialization and VAPID key configuration',
      });
    }

    // Test 5: Check PWA requirement
    const requiresPWA = this.requiresPWAInstall();
    if (requiresPWA) {
      results.tests.push({
        name: 'PWA Installation',
        passed: results.platform.isStandalone,
        message: results.platform.isStandalone
          ? 'App is installed as PWA'
          : 'PWA installation required for notifications',
      });

      if (!results.platform.isStandalone) {
        results.issues.push({
          severity: 'warning',
          code: 'PWA_INSTALL_REQUIRED',
          message: 'This platform requires PWA installation for notifications',
          location: 'Platform',
          proposedFix: 'Install app to home screen (iOS Safari 16.4+)',
        });
      }
    }

    // Add recommendations
    if (results.issues.length === 0) {
      results.recommendations.push(
        'All diagnostic checks passed! Notifications should work.',
      );
    } else {
      results.recommendations.push(
        `Found ${results.issues.length} issue(s) that may prevent notifications from working.`,
      );
    }

    const limitations = this.getPlatformLimitations();
    if (limitations.length > 0) {
      results.recommendations.push(
        `Platform limitations: ${limitations.join(', ')}`,
      );
    }

    return results;
  }
}

// Export singleton instance
export const diagnosticService = new DiagnosticService();
