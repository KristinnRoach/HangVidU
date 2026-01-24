// firebase-messaging-sw.js
// Firebase Cloud Messaging Service Worker
// This file is in /src and uses import.meta.env for environment variables
// Vite will bundle it and output to root during build

importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js',
);

// Firebase configuration using Vite environment variables
// These values are replaced at build time by Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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
