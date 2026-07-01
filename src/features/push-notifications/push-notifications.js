// Public app-facing push notifications facade.

import { dispatchCommand, subscribe } from '../../shared/events/index.js';
import { getContactByConversationId } from '../../stores/contactsStore.js';
import { callCloudFunction } from './cloud-functions.js';

const PERMISSION_REQUEST_TIMEOUT_MS = 8000;

function resolveCallNotificationType(type) {
  if (!type) {
    return 'incoming_call';
  }

  if (type === 'incoming_call' || type === 'missed_call') {
    return type;
  }

  throw new Error(`Unsupported call notification type: ${type}`);
}

function isIncomingCallType(type) {
  return type === 'incoming_call';
}

function isQuietPushNonDelivery(response) {
  return response.payload?.delivered === false;
}

function buildCallNotificationTag(notificationId, roomId) {
  if (notificationId) {
    return `call_${notificationId}`;
  }

  if (roomId) {
    return `call_${roomId}`;
  }

  return 'default';
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
}

export class PushNotifications {
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
    if (!this.vapidKey.length) {
      console.error('[Push Notifications] VAPID key is not set');
    }
  }

  // Runtime setup used by app bootstrap. This is intentionally separate from
  // the smaller public app-facing permission and send API.
  async initialize() {
    if (!this.isNotificationSupported()) {
      console.warn('[Push Notifications] Notifications not supported');
      return false;
    }

    this.permissionState = this.getPermissionState();
    if (import.meta.env.DEV) {
      console.log('[Push Notifications] Initialized');
    }
    return true;
  }

  async requestPermission(options = {}) {
    const { onGranted = null, onDenied = null, onDismissed = null } = options;

    if (!this.isNotificationSupported()) {
      console.warn('[Push Notifications] Notifications not supported');
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

    try {
      const permissionStatus = await navigator.permissions?.query?.({
        name: 'notifications',
      });
      if (permissionStatus?.state === 'denied') {
        this.permissionState = 'denied';
        onDenied?.('already-denied');
        return { state: 'denied', reason: 'already-denied', browser };
      }
    } catch (_) {
      // Best-effort hint only; browsers may not support querying notification permission.
    }

    let permission;
    try {
      permission = await Promise.race([
        Notification.requestPermission(),
        new Promise((resolve) => {
          window.setTimeout(() => {
            resolve('__timeout__');
          }, PERMISSION_REQUEST_TIMEOUT_MS);
        }),
      ]);
    } catch (error) {
      console.error('[Push Notifications] Permission request failed:', error);
      permission = Notification.permission;
    }

    if (permission === '__timeout__') {
      const finalPermission = Notification.permission;
      console.warn(
        '[Push Notifications] Permission request timed out; final permission state:',
        finalPermission,
      );
      this.permissionState = finalPermission;
      if (finalPermission === 'denied') {
        onDenied?.('silent-block');
        return { state: 'denied', reason: 'silent-block', browser };
      }
      return { state: 'error', reason: 'permission-timeout', browser };
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

  async ensureEnabledIfGranted() {
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
        '[Push Notifications] Cannot enable: permission not granted',
      );
      return false;
    }

    if (!this.vapidKey) {
      console.warn('[Push Notifications] VAPID key is missing');
      return false;
    }

    try {
      this.subscription = await this.ensureSubscription();
      this.isEnabled = true;
      this.notifyPermissionCallbacks('enabled');
      if (import.meta.env.DEV) {
        console.info('[Push Notifications] Notifications enabled');
      }
      return true;
    } catch (error) {
      console.error(
        '[Push Notifications] Failed to enable notifications:',
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
            '[Push Notifications] Failed to unsubscribe from push manager:',
            error,
          );
        }

        try {
          await this.unregisterSubscription(subscription);
        } catch (error) {
          console.warn(
            '[Push Notifications] Failed to unregister subscription from backend:',
            error,
          );
        }
      }
    } finally {
      this.subscription = null;
      this.isEnabled = false;
      this.activeNotifications.clear();
      this.notifyPermissionCallbacks('disabled');
      if (import.meta.env.DEV) {
        console.log('[Push Notifications] Notifications disabled');
      }
    }
    return success;
  }

  async registerCurrentClient() {
    return this.enable();
  }

  async unregisterCurrentClient() {
    return this.disable();
  }

  /**
   * Sends an authenticated direct call push to one target user.
   */
  async sendIncomingCall(callData) {
    const { targetUserId, ...notificationData } = callData || {};

    if (!this.options.enableCallNotifications) {
      if (import.meta.env.DEV) {
        console.log('[Push Notifications] Call notifications disabled');
      }
      return {
        ok: false,
        status: null,
        error: 'call-notifications-disabled',
        targetUserId,
        roomId: notificationData?.roomId || null,
      };
    }

    try {
      const payload = await this.formatCallNotification(notificationData);
      const response = await callCloudFunction('sendCallNotification', {
        targetUserId,
        callData: payload,
      });

      if (isQuietPushNonDelivery(response)) {
        return {
          ok: false,
          status: response.status,
          reason: response.payload.reason,
          body: response.payload,
          targetUserId,
          roomId: payload.roomId,
          notificationId: payload.notificationId,
        };
      }

      this.trackNotification(
        buildCallNotificationTag(payload.notificationId, payload.roomId),
        {
          type: 'incoming_call',
          roomId: payload.roomId,
          notificationId: payload.notificationId,
          targetUserId,
        },
      );
      return {
        ok: true,
        status: response.status,
        body: response.payload,
        targetUserId,
        roomId: payload.roomId,
        notificationId: payload.notificationId,
      };
    } catch (error) {
      console.error(
        '[Push Notifications] Failed to send call notification:',
        error,
      );
      return {
        ok: false,
        status: error.status ?? null,
        error: error.message,
        body: error.payload ?? null,
        targetUserId,
        roomId: notificationData?.roomId || null,
      };
    }
  }

  /**
   * Sends the missed-call follow-up for an existing call attempt.
   * Reuses the tracked notification identity when available so the
   * missed-call notification can replace the ringing notification.
   */
  async sendMissedCall(callData) {
    const { targetUserId, ...notificationData } = callData || {};

    if (!this.options.enableCallNotifications) {
      if (import.meta.env.DEV) {
        console.log(
          '[Push Notifications] Call notifications disabled (missed call masked)',
        );
      }
      return {
        ok: false,
        status: null,
        error: 'call-notifications-disabled',
        targetUserId,
        roomId: notificationData?.roomId || null,
      };
    }

    try {
      const payload = await this.formatCallNotification({
        ...notificationData,
        type: 'missed_call',
      });
      const response = await callCloudFunction('sendCallNotification', {
        targetUserId,
        callData: payload,
      });
      if (isQuietPushNonDelivery(response)) {
        return {
          ok: false,
          status: response.status,
          reason: response.payload.reason,
          body: response.payload,
          targetUserId,
          roomId: payload.roomId,
          notificationId: payload.notificationId,
        };
      }

      this.trackNotification(
        buildCallNotificationTag(payload.notificationId, payload.roomId),
        {
          type: 'missed_call',
          roomId: payload.roomId,
          notificationId: payload.notificationId,
          targetUserId,
        },
      );
      return {
        ok: true,
        status: response.status,
        body: response.payload,
        targetUserId,
        roomId: payload.roomId,
        notificationId: payload.notificationId,
      };
    } catch (error) {
      console.error(
        '[Push Notifications] Failed to send missed call notification:',
        error,
      );
      return {
        ok: false,
        status: error.status ?? null,
        error: error.message,
        body: error.payload ?? null,
        targetUserId,
        roomId: notificationData?.roomId || null,
      };
    }
  }

  /**
   * Sends a message push to each recipient via the authenticated cloud function.
   * Best-effort, fire-and-forget from the sender's client. Recipients come from
   * the conversation's remoteParticipantIds.
   */
  async sendMessageNotification(messageData) {
    const { recipientIds, conversationId, ...rest } = messageData || {};

    if (!this.options.enableMessageNotifications) {
      return false;
    }
    if (!Array.isArray(recipientIds) || recipientIds.length === 0) {
      return false;
    }
    if (
      typeof conversationId !== 'string' ||
      !conversationId.trim() ||
      typeof rest.senderId !== 'string' ||
      !rest.senderId.trim()
    ) {
      return false;
    }

    try {
      const formatted = await this.formatMessageNotification(rest);
      return await callCloudFunction('sendMessageNotification', {
        recipientIds,
        conversationId,
        senderId: rest.senderId,
        senderName: formatted.senderName,
        messagePreview: formatted.messageText,
      });
    } catch (error) {
      console.error(
        '[Push Notifications] Failed to send message notification:',
        error,
      );
      return false;
    }
  }

  /**
   * Closes visible incoming-call notifications for a room in the current client.
   */
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

  /**
   * Closes visible message notifications associated with one sender.
   */
  async dismissMessageNotifications(senderId) {
    if (!senderId) return;
    await this.closeNotificationsByTag(`message_${senderId}`);
  }

  /**
   * Removes locally tracked notification metadata after it becomes stale.
   */
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

  handleForegroundMessage(payload) {
    this.notificationCallbacks.forEach((callback) => {
      try {
        callback(payload);
      } catch (error) {
        console.error(
          '[Push Notifications] Error in notification callback:',
          error,
        );
      }
    });
  }

  /**
   * Returns whether foreground app state should suppress native push UI.
   */
  shouldSendNotification() {
    return document.hidden || !document.hasFocus();
  }

  getPermissionState() {
    if (!this.isNotificationSupported()) return 'unsupported';
    return Notification.permission;
  }

  /**
   * True only when browser permission is granted and a subscription is active.
   */
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
    if (import.meta.env.DEV) {
      console.log('[Push Notifications] Options updated:', this.options);
    }
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
    const type = resolveCallNotificationType(rawType);
    const trackedNotificationId = this.getTrackedCallNotificationId(roomId);

    let callerLabel = callerName || callerId || 'Unknown caller';

    if (!callerName) {
      try {
        const contact = getContactByConversationId(roomId);
        callerLabel = contact?.nickname || callerId || 'Unknown caller';
      } catch (error) {
        console.warn(
          '[Push Notifications] Failed to resolve caller name:',
          error,
        );
      }
    }

    if (this.options.privacyMode) {
      callerLabel = 'Someone';
    }

    return {
      roomId,
      callerId,
      callerName: callerLabel,
      notificationId:
        callData.notificationId ||
        trackedNotificationId ||
        `${roomId || 'call'}-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
      type,
    };
  }

  async formatMessageNotification(messageData) {
    const { senderId, senderName, messageText } = messageData;

    let senderLabel = senderName || senderId || 'Unknown sender';
    let displayText = messageText;

    if (this.options.privacyMode) {
      senderLabel = 'Someone';
      displayText = 'New message';
    } else if (displayText && displayText.length > 50) {
      displayText = displayText.substring(0, 47) + '...';
    }

    return {
      ...messageData,
      senderName: senderLabel,
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
    return callCloudFunction('registerPushSubscription', {
      subscription: subscription.toJSON(),
      deviceInfo: {
        platform: navigator.platform || 'unknown',
        userAgent: navigator.userAgent,
        language: navigator.language,
        origin: window.location.origin,
      },
    });
  }

  async unregisterSubscription(subscription) {
    return callCloudFunction('removePushSubscription', {
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

  trackNotification(tag, data) {
    this.activeNotifications.set(tag, {
      ...data,
      timestamp: Date.now(),
    });
  }

  getTrackedCallNotificationId(roomId) {
    if (!roomId) {
      return null;
    }

    for (const data of this.activeNotifications.values()) {
      if (data?.roomId === roomId && data?.notificationId) {
        return data.notificationId;
      }
    }

    return null;
  }

  notifyPermissionCallbacks(state) {
    this.permissionCallbacks.forEach((callback) => {
      try {
        callback(state);
      } catch (error) {
        console.error(
          '[Push Notifications] Error in permission callback:',
          error,
        );
      }
    });
  }
}

let instance = null;

export const initPushNotifications = async (options = {}) => {
  if (!instance) {
    instance = new PushNotifications(options);
    try {
      const pushInitialized = await instance.initialize();
      // TODO: Re-enable in a decoupled way if needed / when notifications get migrated to solidjs
      // if (!pushInitialized && !instance.isNotificationSupported()) {
      //   const { showPushUnsupportedNotification } = await import(
      //     '../notifications/index.js'
      //   );
      //   showPushUnsupportedNotification();
      // }
    } catch (error) {
      console.error('[Push Notifications] init failed:', error);
    }
    subscribe('evt:auth:session:logged-in', async () => {
      const result = await instance.ensureEnabledIfGranted().catch((e) => {
        console.warn('[Push Notifications] setup failed:', e);
        return { state: 'error' };
      });
      if (result.state === 'prompt-needed') {
        dispatchCommand('cmd:app-notifications:show:enable-push');
      }
    });

    // The SW re-subscribes on pushsubscriptionchange but can't authenticate to the
    // backend itself; it pings us to re-register the new endpoint via enable().
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'PUSH_SUBSCRIPTION_CHANGED') {
          instance.enable().catch((e) => {
            console.warn('[Push Notifications] re-register failed:', e);
          });
        }
      });
    }
  }

  return instance;
};

/**
 * Returns the singleton push facade used by app code.
 */
export const getPushNotifications = () => {
  if (!instance) {
    console.warn(
      '[Push Notifications] getPushNotifications called before initialization',
    );
  }
  return instance;
};
