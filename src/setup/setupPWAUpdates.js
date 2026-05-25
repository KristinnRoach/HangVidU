import {
  setupUpdateHandler,
  stopUpdateChecks,
} from '../pwa/update-handlers.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: stops periodic and visibility-based SW update checks
 *
 * Registers the PWA service-worker update handler so the app auto-applies
 * new versions (startup check, onNeedRefresh, visibility check, 30-min poll).
 * No-op when VITE_ENABLE_PWA === '0'.
 *
 * @returns {Promise<() => void>}
 */
export function setupPWAUpdates() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = Promise.resolve()
    .then(async () => {
      await setupUpdateHandler();

      cleanup = () => {
        try {
          stopUpdateChecks();
        } catch (error) {
          console.warn('[setupPWAUpdates] cleanup failed:', error);
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
