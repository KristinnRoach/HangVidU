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

/**
 * Focuses an existing app window when possible, otherwise opens a new one.
 * Current V1 behavior reuses the first matched window client.
 */
export async function openApp(path = '/') {
  const clients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  if (clients.length > 0) {
    const client = clients[0];
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
