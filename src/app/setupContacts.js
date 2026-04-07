import { captureReferral } from '../features/contacts/index.js';

let isReady = false;
let initializationPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contacts-related app concerns that must run before full app init.
 *
 * @returns {Promise<() => void>}
 */
export function setupContacts() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = captureReferral()
    .then(() => {
      isReady = true;
      return cleanup;
    })
    .finally(() => {
      initializationPromise = null;
    });

  return initializationPromise;
}
