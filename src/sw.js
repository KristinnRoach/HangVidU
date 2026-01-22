// src/sw.js
// Custom Service Worker with FCM support and Workbox integration

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

// Import Firebase messaging for service worker context
// Note: Using compat version for service worker compatibility
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js',
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
  apiKey: 'AIzaSyBxqKJWJWJWJWJWJWJWJWJWJWJWJWJWJWJ', // Will be replaced by build process
  authDomain: 'your-project.firebaseapp.com', // Will be replaced by build process
  projectId: 'your-project-id', // Will be replaced by build process
  storageBucket: 'your-project.appspot.com', // Will be replaced by build process
  messagingSenderId: '123456789012', // Will be replaced by build process
  appId: '1:123456789012:web:abcdef123456789012345678', // Will be replaced by build process
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
    const notificationOptions = {
      body: notification?.body || 'You have a new message',
      icon: '/icons/play-arrows-v1/icon-192.png',
      badge: '/icons/play-arrows-v1/icon-192.png',
      data: data || {},
      tag: getNotificationTag(data),
      requireInteraction: data?.type === 'call',
      actions: getNotificationActions(data?.type),
      silent: false,
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

  // Open new window
  return self.clients.openWindow(path);
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
      console.log('[SW] Unknown message type:', type);
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
