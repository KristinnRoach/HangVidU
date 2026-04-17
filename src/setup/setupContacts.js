import {
  captureReferral,
  ensureContactsHydrated,
} from '../features/contacts/index.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup resets readiness for retry
 *
 * Setup contacts-related app concerns that must run before full app init.
 *
 * @returns {Promise<() => void>}
 */
export function setupContacts() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = captureReferral()
    .then(() => ensureContactsHydrated())
    .then(() => {
      isReady = true;
      return cleanup;
    })
    .finally(() => {
      initPromise = null;
    });

  return initPromise;
}
