import { persistPushDebugIdentity } from './push-debug-identity-store.js';

export function handlePushServiceWorkerMessage(event) {
  const { type, data } = event.data || {};

  if (type !== 'SYNC_PUSH_DEBUG_IDENTITY') {
    return false;
  }

  event.waitUntil(
    persistPushDebugIdentity(data)
      .then(() => {
        console.log('[SW] Synced push debug identity', {
          userId: data?.userId || null,
          displayName: data?.displayName || data?.userId || 'unknown-user',
        });
      })
      .catch((error) => {
        console.warn('[SW] Failed to sync push debug identity:', error);
      }),
  );

  return true;
}
