// src/notifications/push-notification-controller.js
// Minimal Web Push controller used by the deployed PWA notification flow.

import { getLoggedInUserId, getUser } from '../auth/auth-state.js';
import { getLoggedInUserToken } from '../auth/index.js';

const FUNCTION_REGION = 'europe-west1';

function normalizeCallNotificationType(type) {
  if (!type || type === 'call') {
    return 'incoming_call';
  }
  return type;
}

function isIncomingCallType(type) {
  return type === 'incoming_call' || type === 'call';
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
}

export class PushNotificationController {
  constructor(options = {}) {
    this.permissionState = 'default';
    this.isEnabled = false;
    this.subscription = null;
    this.permissionCallbacks = new Set();
    this.notificationCallbacks = new Set();
    this.activeNotifications = new Map();
    this.options = {
      enableCallNotifications: true,
      enableMessageNotifications: true,
      privacyMode: false,
      autoHideSuccessMs: 6000,
      ...options,
    };
    this.vapidKey = import.meta.env.VITE_PUSH_VAPID_KEY;
  }

  async initialize() {
    if (!this.isNotificationSupported()) {
      console.warn('[PushNotificationController] Notifications not supported');
      return false;
    }

    this.permissionState = this.getPermissionState();
    await this.syncDebugIdentityToServiceWorker();
    console.log('[PushNotificationController] Initialized');
    return true;
  }

  async requestPermission(options = {}) {
    const { onGranted = null, onDenied = null, onDismissed = null } = options;

    if (!this.isNotificationSupported()) {
      console.warn('[PushNotificationController] Notifications not supported');
      return { state: 'denied', reason: 'unsupported' };
    }

    const browser = this.detectBrowser();
    const before = Notification.permission;
    this.permissionState = before;

    if (before === 'granted') {
      const enabled = await this.enable();
      if (!enabled) {
        return { state: 'error', reason: 'enable-failed', browser };
      }
      onGranted?.();
      return { state: 'granted', browser };
    }

    if (before === 'denied') {
      onDenied?.('already-denied');
      return { state: 'denied', reason: 'already-denied', browser };
    }

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

    this.permissionState = permission;

    if (permission === 'granted') {
      const enabled = await this.enable();
      if (!enabled) {
        return { state: 'error', reason: 'enable-failed', browser };
      }
      onGranted?.();
      return { state: 'granted', browser };
    }

    if (before === 'default' && permission === 'denied') {
      onDenied?.('silent-block');
      return { state: 'denied', reason: 'silent-block', browser };
    }

    if (permission === 'default') {
      onDismissed?.();
      return { state: 'dismissed', browser };
    }

    onDenied?.();
    return { state: 'denied', browser };
  }

  async enableIfGranted() {
    if (!this.isNotificationSupported()) {
      return { state: 'unsupported' };
    }

    this.permissionState = Notification.permission;

    if (this.permissionState === 'granted') {
      const enabled = await this.enable();
      return enabled
        ? { state: 'enabled' }
        : { state: 'error', reason: 'enable-failed' };
    }

    if (this.permissionState === 'denied') {
      return { state: 'denied' };
    }

    return { state: 'prompt-needed' };
  }

  async enable() {
    if (this.permissionState !== 'granted') {
      console.warn(
        '[PushNotificationController] Cannot enable: permission not granted',
      );
      return false;
    }

    if (!this.vapidKey) {
      console.warn('[PushNotificationController] VAPID key is missing');
      return false;
    }

    try {
      await this.syncDebugIdentityToServiceWorker();
      this.subscription = await this.ensureSubscription();
      this.isEnabled = true;
      this.notifyPermissionCallbacks('enabled');
      console.info('[PushNotificationController] Notifications enabled');
      return true;
    } catch (error) {
      console.error(
        '[PushNotificationController] Failed to enable notifications:',
        error,
      );
      return false;
    }
  }

  async disable() {
    let success = true;

    try {
      const registration = await this.getServiceWorkerRegistration();
      const subscription =
        this.subscription || (await registration.pushManager.getSubscription());

      if (subscription) {
        try {
          await subscription.unsubscribe();
        } catch (error) {
          console.warn(
            '[PushNotificationController] Failed to unsubscribe from push manager:',
            error,
          );
        }

        try {
          await this.unregisterSubscription(subscription);
        } catch (error) {
          console.warn(
            '[PushNotificationController] Failed to unregister subscription from backend:',
            error,
          );
        }
      }
    } finally {
      this.subscription = null;
      this.isEnabled = false;
      this.activeNotifications.clear();
      this.notifyPermissionCallbacks('disabled');
      console.log('[PushNotificationController] Notifications disabled');
    }
    return success;
  }

  async sendCallNotification(targetUserId, callData) {
    if (!this.options.enableCallNotifications) {
      console.log('[PushNotificationController] Call notifications disabled');
      return {
        ok: false,
        status: null,
        error: 'call-notifications-disabled',
        targetUserId,
        roomId: callData?.roomId || null,
      };
    }

    try {
      await this.syncDebugIdentityToServiceWorker();
      const payload = await this.formatCallNotification(callData);
      this.logPushSendDiagnostics(
        'incoming_call',
        targetUserId,
        callData,
        payload,
      );
      const response = await this.callFunction('sendCallNotification', {
        targetUserId,
        callData: payload,
      });

      this.trackNotification(`call_${payload.roomId}`, {
        type: 'incoming_call',
        roomId: payload.roomId,
        notificationId: payload.notificationId,
        targetUserId,
      });

      console.log(
        `[PushNotificationController] Call notification sent to ${targetUserId}`,
        response,
      );
      return {
        ok: true,
        status: response.status,
        body: response.payload,
        targetUserId,
        roomId: payload.roomId,
      };
    } catch (error) {
      console.error(
        '[PushNotificationController] Failed to send call notification:',
        error,
      );
      return {
        ok: false,
        status: error.status ?? null,
        error: error.message,
        body: error.payload ?? null,
        targetUserId,
        roomId: callData?.roomId || null,
      };
    }
  }

  async sendMissedCallNotification(targetUserId, callData) {
    if (!this.options.enableCallNotifications) {
      console.log(
        '[PushNotificationController] Call notifications disabled (missed call masked)',
      );
      return {
        ok: false,
        status: null,
        error: 'call-notifications-disabled',
        targetUserId,
        roomId: callData?.roomId || null,
      };
    }

    try {
      await this.syncDebugIdentityToServiceWorker();
      const payload = await this.formatCallNotification({
        ...callData,
        type: 'missed_call',
      });
      this.logPushSendDiagnostics(
        'missed_call',
        targetUserId,
        callData,
        payload,
      );
      const response = await this.callFunction('sendCallNotification', {
        targetUserId,
        callData: payload,
      });

      console.log(
        `[PushNotificationController] Missed call notification sent to ${targetUserId}`,
        response,
      );
      return {
        ok: true,
        status: response.status,
        body: response.payload,
        targetUserId,
        roomId: payload.roomId,
      };
    } catch (error) {
      console.error(
        '[PushNotificationController] Failed to send missed call notification:',
        error,
      );
      return {
        ok: false,
        status: error.status ?? null,
        error: error.message,
        body: error.payload ?? null,
        targetUserId,
        roomId: callData?.roomId || null,
      };
    }
  }

  async sendDebugCallNotification(callData = {}) {
    try {
      const defaults = {
        roomId: `debug-${Date.now()}`,
        callerId: getLoggedInUserId() || 'debug-caller',
        callerName: 'Debug Caller',
        type: 'incoming_call',
      };
      const payload = await this.formatCallNotification({
        ...defaults,
        ...callData,
      });
      const response = await this.callFunction('sendDebugCallNotification', {
        callData: payload,
      });
      console.log('[PushNotificationController] Debug call notification sent');
      return response;
    } catch (error) {
      console.error(
        '[PushNotificationController] Failed to send debug call notification:',
        error,
      );
      throw error;
    }
  }

  async sendDebugCallNotificationToUser(targetUserId, callData = {}) {
    if (!targetUserId) {
      console.warn(
        '[PushNotificationController] Missing target user for debug call notification',
      );
      return false;
    }

    const { uid, displayName } = getUser() || {};

    const defaults = {
      roomId: `debug-${Date.now()}`,
      callerId: uid || getLoggedInUserId() || 'debug-caller',
      callerName: displayName || 'Debug Caller',
      type: 'incoming_call',
    };

    return this.sendCallNotification(targetUserId, {
      ...defaults,
      ...callData,
    });
  }

  async sendMessageNotification(_targetUserId, _messageData) {
    console.warn(
      '[PushNotificationController] Message notifications are not implemented in this phase',
    );
    return false;
  }

  async dismissCallNotifications(roomId) {
    if (!roomId) return;
    const registration = await this.getServiceWorkerRegistration();
    const notifications = await registration.getNotifications();
    notifications
      .filter(
        (notification) =>
          isIncomingCallType(notification?.data?.type) &&
          notification?.data?.roomId === roomId,
      )
      .forEach((notification) => notification.close());
    this.activeNotifications.delete(`call_${roomId}`);
  }

  async dismissMessageNotifications(senderId) {
    if (!senderId) return;
    await this.closeNotificationsByTag(`message_${senderId}`);
  }

  async cleanupOldNotifications() {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000;
    const toRemove = [];

    for (const [tag, data] of this.activeNotifications) {
      if (now - data.timestamp > maxAge) {
        toRemove.push(tag);
      }
    }

    await Promise.all(toRemove.map((tag) => this.closeNotificationsByTag(tag)));
  }

  // TODO: Foreground/focused suppression or in-app-only handling not currently implemented
  handleForegroundMessage(payload) {
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

  shouldSendNotification() {
    return document.hidden || !document.hasFocus();
  }

  getPermissionState() {
    if (!this.isNotificationSupported()) return 'unsupported';
    return Notification.permission;
  }

  isNotificationEnabled() {
    return this.isEnabled && this.permissionState === 'granted';
  }

  isNotificationSupported() {
    return (
      'Notification' in window &&
      'serviceWorker' in navigator &&
      'PushManager' in window
    );
  }

  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    console.log('[PushNotificationController] Options updated:', this.options);
  }

  onPermissionChange(callback) {
    this.permissionCallbacks.add(callback);
    return () => this.permissionCallbacks.delete(callback);
  }

  onNotification(callback) {
    this.notificationCallbacks.add(callback);
    return () => this.notificationCallbacks.delete(callback);
  }

  detectBrowser() {
    if (navigator.userAgentData && navigator.userAgentData.brands) {
      const brands = navigator.userAgentData.brands.map((brand) => brand.brand);
      if (brands.some((brand) => brand.includes('Microsoft Edge')))
        return 'Edge';
      if (brands.some((brand) => brand.includes('Google Chrome')))
        return 'Chrome';
      if (brands.some((brand) => brand.includes('Chromium'))) return 'Chromium';
    }

    const ua = navigator.userAgent;
    if (ua.includes('Edg/')) return 'Edge';
    if (ua.includes('Chrome/')) return 'Chrome';
    if (ua.includes('Safari/') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Firefox/')) return 'Firefox';
    return 'Your browser';
  }

  async formatCallNotification(callData) {
    const {
      roomId,
      callerId,
      callerName,
      type: rawType = 'incoming_call',
    } = callData;
    const type = normalizeCallNotificationType(rawType);

    let displayName = callerName || callerId || 'Unknown caller';

    if (!callerName) {
      try {
        const { resolveCallerName } =
          await import('../ui/components/contacts/contacts.js');
        displayName = await resolveCallerName(roomId, callerId);
      } catch (error) {
        console.warn(
          '[PushNotificationController] Failed to resolve caller name:',
          error,
        );
      }
    }

    if (this.options.privacyMode) {
      displayName = 'Someone';
    }

    return {
      roomId,
      callerId,
      callerName: displayName,
      notificationId:
        callData.notificationId ||
        `${roomId || 'call'}-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
      type,
    };
  }

  async formatMessageNotification(messageData) {
    const { senderId, senderName, messageText } = messageData;

    let displayName = senderName || senderId || 'Unknown sender';
    let displayText = messageText;

    if (this.options.privacyMode) {
      displayName = 'Someone';
      displayText = 'New message';
    } else if (displayText && displayText.length > 50) {
      displayText = displayText.substring(0, 47) + '...';
    }

    return {
      ...messageData,
      senderName: displayName,
      messageText: displayText,
    };
  }

  async ensureSubscription() {
    const registration = await this.getServiceWorkerRegistration();
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(this.vapidKey),
      });
    }

    await this.registerSubscription(subscription);
    return subscription;
  }

  async registerSubscription(subscription) {
    return this.callFunction('registerPushSubscription', {
      subscription: subscription.toJSON(),
      deviceInfo: {
        platform: navigator.platform || 'unknown',
        userAgent: navigator.userAgent,
        language: navigator.language,
      },
    });
  }

  async unregisterSubscription(subscription) {
    return this.callFunction('removePushSubscription', {
      endpoint: subscription.endpoint,
    });
  }

  async closeNotificationsByTag(tag) {
    const registration = await this.getServiceWorkerRegistration();
    const notifications = await registration.getNotifications({ tag });
    notifications.forEach((notification) => notification.close());
    this.activeNotifications.delete(tag);
  }

  async getServiceWorkerRegistration() {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service workers are not available');
    }

    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      throw new Error('No active service worker registration');
    }

    return registration;
  }

  logPushSendDiagnostics(notificationKind, targetUserId, rawCallData, payload) {
    console.log('[PushNotificationController] Push send diagnostics', {
      localUser: this.getLocalDebugIdentity(),
      notificationKind,
      targetUserId,
      rawCallData,
      formattedPayload: payload,
      payloadKeys: Object.keys(payload || {}),
      derivedNotificationTag:
        isIncomingCallType(payload?.type) && payload?.notificationId
          ? `call_${payload.notificationId}`
          : null,
      payloadNotificationId: payload?.notificationId ?? null,
      hasRoomId: Boolean(payload?.roomId),
      hasCallerId: Boolean(payload?.callerId),
      hasCallerName: Boolean(payload?.callerName),
      payloadType: payload?.type ?? null,
      typeMatchesExpected: payload?.type === notificationKind,
    });
  }

  getLocalDebugIdentity() {
    const user = getUser?.() || {};
    const userId = user.uid || getLoggedInUserId?.() || null;
    return {
      userId,
      displayName: user.displayName || user.email || userId || 'unknown-user',
    };
  }

  async syncDebugIdentityToServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const identity = this.getLocalDebugIdentity();
    if (!identity.userId && !identity.displayName) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      const messenger =
        registration?.active ||
        registration?.waiting ||
        registration?.installing ||
        navigator.serviceWorker.controller;

      if (!messenger?.postMessage) {
        return;
      }

      messenger.postMessage({
        type: 'SYNC_PUSH_DEBUG_IDENTITY',
        data: {
          ...identity,
          syncedAt: Date.now(),
        },
      });
    } catch (error) {
      console.warn(
        '[PushNotificationController] Failed to sync debug identity to service worker:',
        error,
      );
    }
  }

  trackNotification(tag, data) {
    this.activeNotifications.set(tag, {
      ...data,
      timestamp: Date.now(),
    });
  }

  notifyPermissionCallbacks(state) {
    this.permissionCallbacks.forEach((callback) => {
      try {
        callback(state);
      } catch (error) {
        console.error(
          '[PushNotificationController] Error in permission callback:',
          error,
        );
      }
    });
  }

  getFunctionUrl(functionName) {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    return `https://${FUNCTION_REGION}-${projectId}.cloudfunctions.net/${functionName}`;
  }

  async callFunction(functionName, body) {
    const idToken = await getLoggedInUserToken();
    const response = await fetch(this.getFunctionUrl(functionName), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(
        payload?.message ||
          payload?.error ||
          `Function ${functionName} failed with status ${response.status}`,
      );
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

    return {
      status: response.status,
      payload,
    };
  }
}

let instance = null;

export const getPushNotificationController = () => {
  if (!instance) {
    instance = new PushNotificationController();
  }
  return instance;
};
