// src/sw.js
// Custom Service Worker with FCM support and Workbox integration

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { VIBRATION_PATTERNS } from './media/haptic/vibration-patterns.js';

// Import Firebase messaging for service worker context
// Note: Using compat version for service worker compatibility
importScripts(
  'https://www.gstatic.com/firebasejs/12.8.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/12.8.0/firebase-messaging-compat.js',
);

// ============================================================================
// WORKBOX PWA FUNCTIONALITY
// ============================================================================

// Precache and route static assets
precacheAndRoute(self.__WB_MANIFEST);

// Clean up outdated caches
cleanupOutdatedCaches();

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

// ============================================================================
// FIREBASE FCM CONFIGURATION
// ============================================================================

// Initialize Firebase in service worker context
// These values should match your main Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
let messaging = null;

// Validate config to prevent crashes if env vars are missing
const isValidConfig = Object.values(firebaseConfig).every(
  (val) => val && val.length > 0 && !val.includes('your-project'),
);

if (isValidConfig) {
  try {
    firebase.initializeApp(firebaseConfig);
    messaging = firebase.messaging();
  } catch (error) {
    console.error('[SW] Failed to initialize Firebase:', error);
  }
} else {
  console.warn('[SW] Firebase config missing or invalid. FCM disabled.');
}

// ============================================================================
// FCM BACKGROUND MESSAGE HANDLING
// ============================================================================

/**
 * Handle background messages when app is not in foreground
 * This is the core FCM functionality for push notifications
 */
if (messaging) {
  messaging.onBackgroundMessage((payload) => {
    console.log('[SW] Background message received:', payload);

    const { notification, data } = payload;
    const notificationTitle = notification?.title || 'New notification';
    // Use fully qualified path for icons in SW
    const baseUrl = self.registration.scope; // This is the robust way in SW: scope covers base path
    // OR use import.meta.env.BASE_URL if we trust the build to replace it correctly.
    // Given VitePWA injectManifest, import.meta.env.BASE_URL is reliable.
    const iconBase = import.meta.env.BASE_URL;

    const notificationOptions = {
      body: notification?.body || 'You have a new message',
      icon: `${iconBase}icons/play-arrows-v1/icon-192.png`,
      badge: `${iconBase}icons/play-arrows-v1/icon-192.png`,
      data: data || {},
      tag: getNotificationTag(data),
      requireInteraction: data?.type === 'call',
      actions: getNotificationActions(data?.type),
      silent: false,
      vibrate: getVibrationPattern(data?.type),
    };

    // Show the notification
    return self.registration.showNotification(
      notificationTitle,
      notificationOptions,
    );
  });
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
  if (data?.type === 'call' && data?.roomId) {
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
  if (type === 'call') {
    // Urgent pattern for incoming calls: vibrate-pause-vibrate-pause-vibrate
    return [200, 100, 200, 100, 200];
  } else if (type === 'message') {
    // Single short vibration for messages
    return [200];
  }
  // Default: single short vibration
  return [200];
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

  // Open new window (handle scope-relative path)
  // Ensure path is relative to scope by removing leading slash
  // (critical for GH Pages subdirectory deployment vs Firebase Hosting root)
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
      // Skip waiting and activate new service worker immediately
      self.skipWaiting();
      break;

    case 'GET_VERSION':
      // Send version info back to main thread
      event.ports[0]?.postMessage({
        version: '1.0.0',
        timestamp: Date.now(),
      });
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

self.addEventListener('install', (event) => {
  console.log('[SW] Service worker installing...');
  // Force activation of new service worker
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Service worker activated');
  // Take control of all clients immediately
  event.waitUntil(self.clients.claim());
});

console.log('[SW] HangVidU Service Worker with FCM support loaded');
