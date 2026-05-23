import { handleCommand, subscribe } from '../shared/events/index.js';
import { getContactByRoomId } from '../stores/contactsStore.js';
import { getPushNotifications } from '../features/push-notifications/index.js';
import { setUserOffline } from '../features/presence/index.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts registered event handlers/subscriptions
 *
 * @returns {Promise<() => void>}
 */
export function setupMainAppBusListeners() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = Promise.resolve()
    .then(() => {
      const ac = new AbortController();

      handleCommand(
        'cmd:user:presence:set-offline',
        async ({ userId } = {}) => {
          try {
            await setUserOffline(userId);
          } catch (e) {
            console.warn('Failed to set user presence offline:', e);
          }
        },
        { signal: ac.signal },
      );

      handleCommand(
        'cmd:push:subscription:disable',
        async () => {
          try {
            await getPushNotifications()?.disable?.();
          } catch (e) {
            console.warn('[push] Failed to disable notifications:', e);
          }
        },
        { signal: ac.signal },
      );

      handleCommand(
        'cmd:contacts:contact:get-by-room-id',
        ({ roomId } = {}) => {
          if (!roomId) {
            return null;
          }
          return getContactByRoomId(roomId);
        },
        { signal: ac.signal },
      );

      cleanup = () => {
        try {
          ac.abort();
        } catch (error) {
          console.warn(
            '[setupMainAppBusListeners] cleanup failed to abort listeners:',
            error,
          );
        } finally {
          isReady = false;
        }
      };

      isReady = true;
      return cleanup;
    })
    .finally(() => {
      initPromise = null;
    });

  return initPromise;
}
