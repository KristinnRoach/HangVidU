import { handleCommand } from '../../shared/events/index.js';
import {
  PushNotifications,
  getPushNotifications,
} from './push-notifications.js';

export {
  PushNotifications,
  getPushNotifications,
} from './push-notifications.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts registered command handlers
 *
 * @returns {Promise<() => void>}
 */
export function setup() {
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

      cleanup = () => {
        try {
          ac.abort();
        } catch (error) {
          console.warn(
            '[push-notifications] cleanup failed to abort handlers:',
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
