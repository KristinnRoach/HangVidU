import { buildNotificationPresentation } from './notification-presentation.js';

/**
 * Parses incoming push payloads from JSON when possible, with a text fallback.
 */
function parsePushPayload(event) {
  try {
    return event.data?.json() || {};
  } catch {
    return { title: 'Notification', body: event.data?.text() || '' };
  }
}

/**
 * Service-worker push entrypoint for native notification presentation.
 *
 * Always shows the notification — no foreground suppression. Under
 * userVisibleOnly, skipping showNotification consumes Chrome's per-origin
 * silent-push budget, which eventually throttles/stops delivery (a prime suspect
 * for notifications "suddenly stopping" on Android).
 * ponytail: if foreground de-dup is wanted later, do it server-side (skip the
 * push when the recipient has a live ConversationChannel socket), not here.
 */
export async function handlePushEvent(event) {
  const payload = parsePushPayload(event);
  const presentation = buildNotificationPresentation(
    payload,
    import.meta.env.BASE_URL,
  );

  try {
    await self.registration.showNotification(
      presentation.title,
      presentation.options,
    );
  } catch (error) {
    console.error('[SW] showNotification failed', error);
    throw error;
  }

  try {
    const clients = await getWindowClients();
    clients.forEach((client) =>
      client.postMessage({ type: 'PUSH_NOTIFICATION_SHOWN' }),
    );

    // Android can ignore the page's immediate close() and leave the notification
    // in the shade. Close it from the SW after the heads-up/sound has played,
    // only while the app is still focused, so background delivery is unchanged.
    if (!clients.some(isFocusedVisible)) return;
    await new Promise((resolve) =>
      setTimeout(resolve, FOREGROUND_CLOSE_DELAY_MS),
    );
    if (!(await getWindowClients()).some(isFocusedVisible)) return;

    const tag = presentation.tag || '';
    const notifications = await self.registration.getNotifications();
    notifications
      .filter((n) => n.tag === tag && (tag || n.title === presentation.title))
      .forEach((n) => n.close());
  } catch (error) {
    console.warn('[SW] foreground notification cleanup failed', error);
  }
}

const FOREGROUND_CLOSE_DELAY_MS = 4000;

function getWindowClients() {
  return self.clients.matchAll({ type: 'window', includeUncontrolled: true });
}

function isFocusedVisible(client) {
  return client.focused && client.visibilityState === 'visible';
}
