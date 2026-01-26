// firebase-messaging-sw.js
// Firebase Cloud Messaging Service Worker (Development Version)
// This is a static file for dev mode - production uses the bundled version from src/

importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js',
);

// Firebase configuration - hardcoded for dev mode
// In production, these values come from Vite's import.meta.env
const firebaseConfig = {
  apiKey: 'AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA',
  authDomain: 'vidu-aae11.firebaseapp.com',
  projectId: 'vidu-aae11',
  storageBucket: 'vidu-aae11.firebasestorage.app',
  messagingSenderId: '765724787439',
  appId: '1:765724787439:web:61a3b5dd538149564c911a',
  measurementId: 'G-EGJ53HLGY4',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[FCM-SW] Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'HangVidU';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message',
    icon: payload.notification?.icon || '/icon-192.png',
    badge: payload.notification?.badge || '/icon-192.png',
    tag:
      payload.data?.type === 'call' ? `call_${payload.data.roomId}` : undefined,
    requireInteraction: true,
    data: payload.data,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[FCM-SW] Notification click received:', event);

  event.notification.close();

  // Handle call notifications
  if (
    event.notification.data?.type === 'call' &&
    event.notification.data?.roomId
  ) {
    const roomId = event.notification.data.roomId;
    const url = `/?room=${roomId}`;

    event.waitUntil(
      clients
        .matchAll({ type: 'window', includeUncontrolled: true })
        .then((windowClients) => {
          // Check if there is already a window/tab open with the target URL
          for (let client of windowClients) {
            if (client.url.includes(roomId) && 'focus' in client) {
              return client.focus();
            }
          }
          // If not, open a new window/tab with the target URL
          if (clients.openWindow) {
            return clients.openWindow(url);
          }
        }),
    );
  }
});
