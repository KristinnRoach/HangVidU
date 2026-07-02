// src/sw.js
// Custom Service Worker with Web Push support and Workbox integration

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { handlePushEvent } from './features/push-notifications/sw/push-event-handler.js';
import { handleNotificationClickEvent } from './features/push-notifications/sw/notification-click-handler.js';

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

// The browser can rotate/expire the push subscription (common on Android over
// time). Without re-subscribing, delivery silently stops until the next app open
// re-registers — a prime suspect for notifications "suddenly stopping".
// Re-subscribe immediately so the browser-side subscription persists, then ping
// any open client to re-register the new endpoint via the authenticated path
// (the SW has no Firebase token of its own). With no client open, the next app
// open self-heals through ensureEnabledIfGranted.
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  return Uint8Array.from(raw, (char) => char.charCodeAt(0));
}

self.addEventListener('pushsubscriptionchange', (event) => {
  const vapidKey = import.meta.env.VITE_PUSH_VAPID_KEY;
  event.waitUntil(
    (async () => {
      if (vapidKey) {
        try {
          await self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidKey),
          });
        } catch (error) {
          console.error(
            '[SW] pushsubscriptionchange re-subscribe failed',
            error,
          );
        }
      }
      const clients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      for (const client of clients) {
        client.postMessage({ type: 'PUSH_SUBSCRIPTION_CHANGED' });
      }
    })(),
  );
});

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

    default:
      // Ignore valid Workbox messages or other known internal messages
      if (type !== undefined) {
        if (import.meta.env.DEV)
          console.log('[SW] Unknown message type:', type);
      } else {
        // Log full data for debugging undefined types (often benign)
        if (import.meta.env.DEV) {
          console.debug('[SW] Message received without type:', event.data);
        }
      }
  }
});

// ============================================================================
// SERVICE WORKER LIFECYCLE
// ============================================================================

self.addEventListener('install', () => {
  if (import.meta.env.DEV) console.log('[SW] Service worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  if (import.meta.env.DEV) console.log('[SW] Service worker activated');
  // Take control of all clients immediately
  event.waitUntil(self.clients.claim());
});

if (import.meta.env.DEV) {
  console.log('[SW] HangVidU Service Worker with Web Push support loaded');
}
