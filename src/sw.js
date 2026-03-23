// src/sw.js
// Custom Service Worker with Web Push support and Workbox integration

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import {
  registerVideo,
  unregisterVideo,
  isVideoServeRequest,
  handleVideoFetch,
} from './file-transfer/sw-video-handler.js';
import { handlePushEvent } from './push-notifications/sw/push-event-handler.js';
import { handleNotificationClickEvent } from './push-notifications/sw/notification-click-handler.js';

// ============================================================================
// WORKBOX PWA FUNCTIONALITY
// ============================================================================

// Filter out large EAC3 WASM modules from precache manifest; they'll be loaded on demand when needed.
const injectedManifest = self.__WB_MANIFEST;
const manifestEntries = Array.isArray(injectedManifest) ? injectedManifest : [];
const manifest = manifestEntries.filter((entry) => {
  const url = typeof entry === 'string' ? entry : entry?.url;
  if (typeof url !== 'string') return true;
  return !/assets\/mediabunny-ac3-.*$/.test(url);
});

// Precache and route static assets
precacheAndRoute(manifest);

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
self.addEventListener('notificationclick', handleNotificationClickEvent);

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
