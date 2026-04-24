import { addDebugUpdateButton } from '../features/notifications/index.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup resets readiness
 *
 * Setup lightweight debug chrome that does not require call/session state.
 *
 * @param {{ showDebugUIForNotifications?: boolean }} options
 * @returns {Promise<() => void>}
 */
export function setupTopBarAndLocale(options) {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  const { showDebugUIForNotifications = false } = options;

  initPromise = Promise.resolve()
    .then(() => {
      // Add debug button for testing update notification (dev only)
      showDebugUIForNotifications && addDebugUpdateButton();

      // Special-case stale cleanup guard: this setup owns shared singleton UI
      // state (`inAppNotificationManager`), so an old cleanup must never tear
      // down a newer initialized generation.
      let isCleanedUp = false;
      const activeCleanup = () => {
        if (cleanup !== activeCleanup || isCleanedUp) {
          return;
        }
        isCleanedUp = true;
        cleanup = () => {
          isReady = false;
        };
        isReady = false;
      };
      cleanup = activeCleanup;
      isReady = true;
      return cleanup;
    })
    .finally(() => {
      initPromise = null;
    });

  return initPromise;
}
