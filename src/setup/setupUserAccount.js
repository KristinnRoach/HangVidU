import { onAuthStateChanged } from '../auth/index.js';
import { saveUserProfile } from '../storage/user/index.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup unsubscribes auth listener
 *
 * Setup user-account sync concerns at setup composition level.
 *
 * @returns {Promise<() => void>}
 */
export function setupUserAccount() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = Promise.resolve()
    .then(() => {
      const unsubscribe = onAuthStateChanged((state) => {
        if (!state?.isLoggedIn || !state.user) {
          return;
        }

        saveUserProfile(state.user).catch((err) => {
          console.warn('Failed to save user profile:', err);
        });
      });

      cleanup = () => {
        try {
          unsubscribe();
        } catch (error) {
          console.warn(
            '[setupUserAccount] cleanup failed to unsubscribe auth listener:',
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
