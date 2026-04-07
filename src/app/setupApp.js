import { setupNotificationsHandlers } from './setupNotificationsHandlers.js';
import { setupContacts } from './setupContacts.js';

let isReady = false;
let initializationPromise = null;
let cleanup = () => {
  isReady = false;
};

function drainCleanupFns(cleanupFns) {
  while (cleanupFns.length) {
    const fn = cleanupFns.pop();
    try {
      fn?.();
    } catch (e) {
      console.warn('[setupApp] cleanup failed:', e);
    }
  }
}

/**
 * App-composition setup draft.
 *
 * This is intentionally callback-driven for now so we can consolidate existing
 * main.js bootstrap/init behavior incrementally without forcing a large move.
 *
 * Required callbacks:
 * - runInit: runs the existing init phase and resolves to boolean success
 * - bindCallUI: binds call UI handlers
 * - setupMainAppBusListeners: registers app-level command/fact handlers
 * - startListeningForSavedRooms
 * - renderContactsList
 * - autoInitMsgSessionIfNeeded
 * - autoJoinFromUrl
 *
 * Optional callbacks:
 * - registerServiceWorkerNavigation: returns optional cleanup function
 * - onInitFailed
 * - onReady
 *
 * @param {{
 *   runInit: () => Promise<boolean>,
 *   bindCallUI: () => void,
 *   setupMainAppBusListeners: () => void,
 *   startListeningForSavedRooms: () => Promise<void>,
 *   renderContactsList: () => Promise<void>,
 *   autoInitMsgSessionIfNeeded: () => Promise<void>,
 *   autoJoinFromUrl: () => Promise<boolean>,
 *   registerServiceWorkerNavigation?: () => (() => void)|void,
 *   onInitFailed?: (error?: unknown) => void,
 *   onReady?: () => void,
 * }} options
 * @returns {Promise<() => void>}
 */
export function setupApp(options) {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    const cleanupFns = [];
    let initialized = false;

    try {
      cleanupFns.push(await setupNotificationsHandlers());
      cleanupFns.push(await setupContacts());

      const initSuccess = await options.runInit();
      if (!initSuccess) {
        options.onInitFailed?.();
        drainCleanupFns(cleanupFns);

        isReady = false;
        cleanup = () => {
          isReady = false;
        };
        return cleanup;
      }

      options.bindCallUI();
      options.setupMainAppBusListeners();

      await options
        .startListeningForSavedRooms()
        .catch((e) => console.warn('Failed to start saved-room listeners', e));

      await options.renderContactsList().catch((e) => {
        console.warn('Failed to render contacts list:', e);
      });

      await options.autoInitMsgSessionIfNeeded().catch((e) => {
        console.warn('Failed to auto-init messaging session:', e);
      });

      const swCleanup = options.registerServiceWorkerNavigation?.();
      if (typeof swCleanup === 'function') {
        cleanupFns.push(swCleanup);
      }

      const autoJoinedSuccessfully = await options.autoJoinFromUrl();
      if (!autoJoinedSuccessfully) {
        options.onReady?.();
      }

      cleanup = () => {
        drainCleanupFns(cleanupFns);
        isReady = false;
      };
      isReady = true;
      initialized = true;
      return cleanup;
    } catch (error) {
      if (!initialized) {
        drainCleanupFns(cleanupFns);
      }
      cleanup = () => {
        isReady = false;
      };
      isReady = false;
      console.error('[setupApp] bootstrap failed:', error);
      options.onInitFailed?.(error);
      throw error;
    } finally {
      initializationPromise = null;
    }
  })();

  return initializationPromise;
}
