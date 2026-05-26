import { captureReferral } from './referrals/referral-handler.js';
import { hydrateContacts } from '../../stores/contactsStore.js';

let isReady = false;
let initPromise: Promise<() => void> | null = null;
let cleanup: () => void = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup resets readiness for retry
 *
 * Setup contacts-related app concerns that must run before full app init.
 */
export function setup(): Promise<() => void> {
  if (isReady) {
    return Promise.resolve(cleanup);
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = captureReferral()
    .then(() => hydrateContacts())
    .then(() => {
      isReady = true;
      return cleanup;
    })
    .finally(() => {
      initPromise = null;
    });

  return initPromise;
}
