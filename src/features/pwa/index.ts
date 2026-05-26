import {
  setupUpdateHandler,
  stopUpdateChecks,
} from './update-handlers.js';

let isReady = false;
let initPromise: Promise<() => void> | null = null;
let cleanup: () => void = () => {
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
 */
export function setup(): Promise<() => void> {
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
          console.warn('[pwa] cleanup failed:', error);
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
