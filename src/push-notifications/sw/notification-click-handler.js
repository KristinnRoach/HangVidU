import { isIncomingCallType } from './notification-presentation.js';

/**
 * Maps normalized notification payload data to the app navigation path.
 */
export function getNotificationNavigationPath(data, action) {
  const { type, roomId, senderId, callerId } = data || {};

  if (isIncomingCallType(type)) {
    return roomId ? `/?room=${encodeURIComponent(roomId)}` : '/';
  }

  if (type === 'missed_call') {
    if (callerId) {
      return `/?contact=${encodeURIComponent(callerId)}`;
    }

    if (roomId) {
      return `/?room=${encodeURIComponent(roomId)}`;
    }

    return '/';
  }

  if (type === 'message') {
    if (senderId) {
      return `/?contact=${encodeURIComponent(senderId)}`;
    }

    return '/';
  }

  if (action === 'view') {
    return '/';
  }

  return '/';
}

export function selectWindowClient(clients) {
  if (!Array.isArray(clients) || clients.length === 0) {
    return null;
  }

  return (
    clients.find(
      (client) => client?.focused && client?.visibilityState === 'visible',
    ) ||
    clients.find((client) => client?.visibilityState === 'visible') ||
    clients[0]
  );
}

/**
 * Focuses an existing app window when possible, otherwise opens a new one.
 * Prefers a focused visible client, then any visible client, then falls back
 * to the first matched window client.
 */
export async function openApp(path = '/') {
  const clients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  if (clients.length > 0) {
    const client = selectWindowClient(clients);
    await client.focus();

    if (path !== '/') {
      client.postMessage({
        type: 'NAVIGATE',
        path,
      });
    }

    return client;
  }

  const relativePath = path.startsWith('/') ? path.slice(1) : path;
  const url = new URL(relativePath, self.registration.scope).href;
  return self.clients.openWindow(url);
}

/**
 * Resolves the intended navigation target for a notification click.
 */
export async function handleNotificationClick(data, action) {
  const path = getNotificationNavigationPath(data, action);
  return openApp(path);
}

/**
 * Service-worker notificationclick entrypoint.
 */
export function handleNotificationClickEvent(event) {
  console.log('[SW] Notification clicked:', event);

  const { notification, action } = event;
  const { data } = notification;

  notification.close();

  event.waitUntil(
    handleNotificationClick(data, action).catch(async (error) => {
      console.error('[SW] Error handling notification click:', error);
      await openApp();
    }),
  );
}
