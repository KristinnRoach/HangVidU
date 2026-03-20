import { buildNotificationPresentation } from './notification-presentation.js';

function parsePushPayload(event) {
  try {
    return event.data?.json() || {};
  } catch {
    return { title: 'Notification', body: event.data?.text() || '' };
  }
}

async function findFocusedVisibleWindowClient() {
  const clients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  return (
    clients.find(
      (client) => client?.focused && client?.visibilityState === 'visible',
    ) || null
  );
}

export async function handlePushEvent(event) {
  const payload = parsePushPayload(event);
  const presentation = buildNotificationPresentation(
    payload,
    import.meta.env.BASE_URL,
  );

  const focusedVisibleClient = await findFocusedVisibleWindowClient();
  if (focusedVisibleClient) {
    return;
  }

  try {
    await self.registration.showNotification(
      presentation.title,
      presentation.options,
    );
  } catch (error) {
    console.error('[SW] showNotification failed', error);
    throw error;
  }
}
