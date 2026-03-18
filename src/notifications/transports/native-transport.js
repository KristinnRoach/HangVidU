// src/notifications/transports/native-transport.js

export class NativeTransport {
  constructor() {
    this.subscription = null;
    this.messageCallbacks = new Set();
    this.isInitialized = false;
    this.vapidKey = import.meta.env.VITE_PUSH_VAPID_KEY; // Using same VAPID key as FCMTransport
  }

  async initialize() {
    if (this.isInitialized) return true;

    if (!('PushManager' in window)) {
      console.warn('[NativeTransport] Push API not supported');
      return false;
    }

    console.log('[NativeTransport] Initialized (no Firebase SDK)');
    this.isInitialized = true;
    return true;
  }

  async getToken() {
    if (!this.isInitialized) await this.initialize();

    if (!this.vapidKey) {
      console.warn('[NativeTransport] VAPID key not configured');
      return null;
    }

    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();

    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this._urlBase64ToUint8Array(this.vapidKey),
      });

      // Store in existing RTDB (same path as FCMTransport)
      await this.storeUserToken(sub);
      console.log('[NativeTransport] Native subscription created');
    }

    this.subscription = sub;
    return sub; // PushSubscription object (not FCM token string)
  }

  // Stub methods matching FCMTransport interface
  async sendCallNotification() {
    return true;
  }
  async sendMissedCallNotification() {
    return true;
  }
  async sendMessageNotification() {
    return true;
  }

  async deleteToken() {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub =
        this.subscription || (await reg.pushManager.getSubscription());
      if (sub) {
        await sub.unsubscribe();
      }
      this.subscription = null;
      return true;
    } catch (e) {
      console.error('[NativeTransport] Failed to delete subscription:', e);
      return false;
    }
  }

  onMessage(callback) {
    this.messageCallbacks.add(callback);
    return () => this.messageCallbacks.delete(callback);
  }

  // Copy existing RTDB storage methods
  async storeUserToken(sub) {
    const { getLoggedInUserId } = await import('../../auth/auth-state.js');
    const { rtdb } = await import('../../storage/fb-rtdb/rtdb.js');
    const { ref, set } = await import('firebase/database');

    const userId = getLoggedInUserId();
    if (!userId) return;

    try {
      const tokenRef = ref(
        rtdb,
        `users/${userId}/fcmTokens/native_${Date.now()}`,
      );
      await set(tokenRef, {
        endpoint: sub.endpoint,
        keys: sub.toJSON().keys, // p256dh, auth
        deviceInfo: { platform: 'web-native', timestamp: Date.now() },
        createdAt: Date.now(),
      });
      console.log('[NativeTransport] Subscription stored in RTDB');
    } catch (e) {
      console.error('[NativeTransport] Store failed:', e);
    }
  }

  _urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from(rawData, (c) => c.charCodeAt(0));
  }
}
