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
}
