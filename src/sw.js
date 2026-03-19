// src/sw.js
// Custom Service Worker with Web Push support and Workbox integration

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { VIBRATION_PATTERNS } from './media/haptic/vibration-patterns.js';
import {
  registerVideo,
  unregisterVideo,
  isVideoServeRequest,
  handleVideoFetch,
} from './file-transfer/sw-video-handler.js';

const PUSH_DEBUG_IDENTITY_CACHE = 'push-debug-identity-v1';
const PUSH_DEBUG_IDENTITY_PATH = '/__push_debug_identity__';

// ============================================================================
// WORKBOX PWA FUNCTIONALITY
// ============================================================================

// Precache and route static assets
precacheAndRoute(self.__WB_MANIFEST);

// Clean up outdated caches
cleanupOutdatedCaches();

// Intercept video serve requests (OPFS-backed streaming)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (isVideoServeRequest(url)) {
    event.respondWith(
      handleVideoFetch(event.request).then(
        (response) => response || new Response('Not found', { status: 404 }),
      ),
    );
  }
});

// Navigation fallback for SPA
const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: 'navigations',
  }),
  {
    denylist: [
      /^\/__\//, // Exclude Firebase auth handler paths
      /^\/auth\//, // Exclude other auth-related paths
    ],
  },
);
registerRoute(navigationRoute);

self.addEventListener('push', (event) => {
  event.waitUntil(handlePushEvent(event));
});

async function handlePushEvent(event) {
  let payload;
  try {
    payload = event.data?.json() || {};
  } catch {
    payload = { title: 'Notification', body: event.data?.text() || '' };
  }

  const localIdentity = await readPushDebugIdentity();
  const data = payload.data || {};
  const notificationTitle = payload.title || 'Notification';
  const notificationTag = getNotificationTag(data);
  const notificationActions = getNotificationActions(data.type);
  const options = {
    body: payload.body || 'Tap to open HangVidU',
    icon: `${import.meta.env.BASE_URL}icons/play-arrows-v1/icon-192.png`,
    badge: `${import.meta.env.BASE_URL}icons/play-arrows-v1/icon-192.png`,
    data,
    tag: notificationTag,
    requireInteraction: data.type === 'call',
    actions: notificationActions,
    vibrate: VIBRATION_PATTERNS[data.type] || VIBRATION_PATTERNS.default,
  };

  console.log('[SW] Web push received', {
    hasEventData: Boolean(event.data),
    localIdentity,
    intendedTargetUserId: data.targetUserId || null,
  });

  console.log('[SW] Parsed push payload', {
    localIdentity,
    rawPayload: payload,
    payloadKeys: Object.keys(payload || {}),
    data,
    dataKeys: Object.keys(data || {}),
    title: notificationTitle,
    body: payload.body || null,
    type: data.type || 'unknown',
    roomId: data.roomId || null,
    callerId: data.callerId || null,
    callerName: data.callerName || null,
    senderId: data.senderId || null,
    targetUserId: data.targetUserId || null,
    hasTopLevelType: Object.prototype.hasOwnProperty.call(payload || {}, 'type'),
    topLevelType: payload.type || null,
    hasNestedData: Object.prototype.hasOwnProperty.call(payload || {}, 'data'),
    expectedCallShape: {
      hasRoomId: Boolean(data.roomId),
      hasCallerId: Boolean(data.callerId),
      hasCallerName: Boolean(data.callerName),
      typeIsCall: data.type === 'call',
    },
  });

  console.log('[SW] Derived notification options', {
    localIdentity,
    title: notificationTitle,
    tag: options.tag,
    requireInteraction: options.requireInteraction,
    actionCount: options.actions.length,
    actions: notificationActions,
    vibrate: options.vibrate,
  });

  try {
    await self.registration.showNotification(notificationTitle, options);
    const notifications = await self.registration.getNotifications({
      tag: notificationTag,
    });
    console.log('[SW] showNotification resolved', {
      localIdentity,
      title: notificationTitle,
      tag: notificationTag,
      displayedCountForTag: notifications.length,
      type: data.type || 'unknown',
      roomId: data.roomId || null,
      targetUserId: data.targetUserId || null,
    });
  } catch (error) {
    console.error('[SW] showNotification failed', {
      localIdentity,
      error,
      title: notificationTitle,
      tag: notificationTag,
      rawPayload: payload,
      data,
    });
    throw error;
  }
}

async function persistPushDebugIdentity(identity) {
  const cache = await caches.open(PUSH_DEBUG_IDENTITY_CACHE);
  const request = new Request(PUSH_DEBUG_IDENTITY_PATH);
  await cache.put(
    request,
    new Response(JSON.stringify(identity || {}), {
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}

async function readPushDebugIdentity() {
  try {
    const cache = await caches.open(PUSH_DEBUG_IDENTITY_CACHE);
    const response = await cache.match(new Request(PUSH_DEBUG_IDENTITY_PATH));
    if (!response) {
      return {
        userId: null,
        displayName: 'unknown-user',
      };
    }

    const identity = await response.json().catch(() => ({}));
    return {
      userId: identity.userId || null,
      displayName: identity.displayName || identity.userId || 'unknown-user',
      syncedAt: identity.syncedAt || null,
    };
  } catch (error) {
    console.warn('[SW] Failed to read push debug identity:', error);
    return {
      userId: null,
      displayName: 'unknown-user',
    };
  }
}

/**
 * Get notification actions based on type
 * @param {string} type - Notification type ('call' or 'message')
 * @returns {Array} Notification actions
 */
function getNotificationActions(type) {
  if (type === 'call') {
    return [
      {
        action: 'accept',
        title: 'Accept',
        // TODO: Add icon assets
        // icon: '/icons/call-accept.png',
      },
      {
        action: 'decline',
        title: 'Decline',
        // TODO: Add icon assets
        // icon: '/icons/call-decline.png',
      },
    ];
  } else if (type === 'message') {
    return [
      {
        action: 'view',
        title: 'View',
        // TODO: Add icon assets
        // icon: '/icons/view.png',
      },
    ];
  }
  return [];
}

/**
 * Get notification tag for grouping
 * @param {Object} data - Notification data
 * @returns {string} Notification tag
 */
function getNotificationTag(data) {
  if (data?.type === 'call' && data?.notificationId) {
    return `call_${data.notificationId}`;
  } else if (data?.type === 'call' && data?.roomId) {
    return `call_${data.roomId}`;
  } else if (data?.type === 'message' && data?.senderId) {
    return `message_${data.senderId}`;
  }
  return 'default';
}

/**
 * Get vibration pattern based on notification type
 * @param {string} type - Notification type ('call', 'message', etc.)
 * @returns {Array<number>} Vibration pattern in milliseconds
 */
function getVibrationPattern(type) {
  return VIBRATION_PATTERNS[type] || VIBRATION_PATTERNS.default;
}

// ============================================================================
// NOTIFICATION CLICK HANDLING
// ============================================================================

/**
 * Handle notification clicks and actions
 */
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);

  const { notification, action } = event;
  const { data } = notification;

  // Close the notification
  notification.close();

  // Handle the click based on notification type and action
  event.waitUntil(handleNotificationClick(data, action));
});

/**
 * Handle notification click logic
 * @param {Object} data - Notification data
 * @param {string} action - Action clicked (or undefined for main click)
 */
async function handleNotificationClick(data, action) {
  const { type, roomId, senderId } = data || {};

  try {
    if (type === 'call') {
      await handleCallNotificationClick(roomId, action);
    } else if (type === 'message') {
      await handleMessageNotificationClick(senderId);
    } else {
      // Default: just open the app
      await openApp();
    }
  } catch (error) {
    console.error('[SW] Error handling notification click:', error);
    // Fallback: just open the app
    await openApp();
  }
}

/**
 * Handle call notification clicks
 * @param {string} roomId - Room ID for the call
 * @param {string} action - Action clicked ('accept', 'decline', or undefined)
 */
async function handleCallNotificationClick(roomId, action) {
  // Guard against missing roomId
  if (!roomId) {
    return openApp();
  }

  if (action === 'accept') {
    // Open app and auto-join the call
    await openApp(`/?room=${roomId}&autoJoin=true`);
  } else if (action === 'decline') {
    // Send decline signal to RTDB (would need Firebase Admin SDK in production)
    console.log('[SW] Call declined via notification');
    // For now, just dismiss - the decline logic would be handled by Firebase Functions
  } else {
    // Main notification click - open app with call context
    await openApp(`/?room=${roomId}`);
  }
}

/**
 * Handle message notification clicks
 * @param {string} senderId - ID of message sender
 */
async function handleMessageNotificationClick(senderId) {
  // Guard against missing senderId
  if (!senderId) {
    return openApp();
  }

  // Open app and navigate to conversation
  await openApp(`/?contact=${senderId}`);
}

/**
 * Open the app with optional path
 * @param {string} path - Optional path to navigate to
 */
async function openApp(path = '/') {
  const clients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  // If app is already open, focus it and navigate
  if (clients.length > 0) {
    const client = clients[0];
    await client.focus();

    // Navigate to specific path if provided
    if (path !== '/') {
      client.postMessage({
        type: 'NAVIGATE',
        path: path,
      });
    }

    return client;
  }

  // Open new window relative to the service worker scope
  // Ensure path is relative by removing any leading slash.
  const relativePath = path.startsWith('/') ? path.slice(1) : path;
  const url = new URL(relativePath, self.registration.scope).href;

  return self.clients.openWindow(url);
}

// ============================================================================
// MESSAGE HANDLING FROM MAIN THREAD
// ============================================================================

/**
 * Handle messages from the main thread
 */
self.addEventListener('message', (event) => {
  const { type, data } = event.data || {};

  switch (type) {
    case 'SKIP_WAITING':
      // Activate waiting service worker after explicit user action.
      self.skipWaiting();
      break;

    case 'GET_VERSION':
      // Send version info back to main thread
      event.ports[0]?.postMessage({
        version: '1.0.0',
        timestamp: Date.now(),
      });
      break;

    case 'SYNC_PUSH_DEBUG_IDENTITY':
      event.waitUntil(
        persistPushDebugIdentity(data)
          .then(() => {
            console.log('[SW] Synced push debug identity', {
              userId: data?.userId || null,
              displayName:
                data?.displayName || data?.userId || 'unknown-user',
            });
          })
          .catch((error) => {
            console.warn('[SW] Failed to sync push debug identity:', error);
          }),
      );
      break;

    case 'REGISTER_VIDEO':
      registerVideo(data.fileId, data.mimeType);
      break;

    case 'UNREGISTER_VIDEO':
      unregisterVideo(data.fileId);
      break;

    default:
      // Ignore valid Workbox messages or other known internal messages
      if (type !== undefined) {
        console.log('[SW] Unknown message type:', type);
      } else {
        // Log full data for debugging undefined types (often benign)
        console.debug('[SW] Message received without type:', event.data);
      }
  }
});

// ============================================================================
// SERVICE WORKER LIFECYCLE
// ============================================================================

self.addEventListener('install', () => {
  console.log('[SW] Service worker installing...');
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Service worker activated');
  // Take control of all clients immediately
  event.waitUntil(self.clients.claim());
});

console.log('[SW] HangVidU Service Worker with Web Push support loaded');
