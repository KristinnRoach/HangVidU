import { setupNotificationsHandlers } from './setupNotificationsHandlers.js';
import { setupContacts } from './setupContacts.js';

let isReady = false;
let initPromise = null;
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
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: one reverse-order cleanup stack for full app lifecycle
 *
 * App bootstrap orchestrator.
 *
 * Required callbacks:
 * - runPreflight: runs UI/i18n preflight and resolves to cleanup function
 * - runInit: runs module init and resolves to boolean success
 * - setupTopBarAndLocale: resolves to cleanup function
 * - bindCallUI: binds call UI handlers
 * - setupMainAppBusListeners: registers app-level command/fact handlers
 * - startListeningForSavedRooms
 * - renderContactsList
 * - autoInitMsgSessionIfNeeded
 * - autoJoinFromUrl
 * - handleServiceWorkerNavigation
 *
 * Optional callbacks:
 * - onInitFailed
 * - onReady
 *
 * @param {{
 *   runPreflight: () => Promise<() => void>,
 *   runInit: () => Promise<boolean>,
 *   setupTopBarAndLocale: () => Promise<() => void>,
 *   bindCallUI: () => void,
 *   setupMainAppBusListeners: () => void,
 *   startListeningForSavedRooms: () => Promise<void>,
 *   renderContactsList: () => Promise<void>,
 *   autoInitMsgSessionIfNeeded: () => Promise<void>,
 *   autoJoinFromUrl: () => Promise<boolean>,
 *   handleServiceWorkerNavigation: (path: string) => Promise<boolean>,
 *   onInitFailed?: (error?: unknown) => void,
 *   onReady?: () => void,
 *   serviceWorkerQueueLimit?: number,
 * }} options
 * @returns {Promise<() => void>}
 */
export function setupApp(options) {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const cleanupFns = [];
    const pendingServiceWorkerNavigationPaths = [];
    const serviceWorkerQueueLimit = options.serviceWorkerQueueLimit ?? 20;
    let isReadyForServiceWorkerNavigation = false;

    const clearServiceWorkerQueue = () => {
      pendingServiceWorkerNavigationPaths.length = 0;
    };

    const flushQueuedServiceWorkerNavigation = async () => {
      while (pendingServiceWorkerNavigationPaths.length > 0) {
        const path = pendingServiceWorkerNavigationPaths.shift();
        await options.handleServiceWorkerNavigation(path).catch((error) => {
          console.warn('[setupApp] Failed queued SW NAVIGATE:', {
            path,
            error,
          });
        });
      }
    };

    const registerServiceWorkerNavigation = () => {
      if (!('serviceWorker' in navigator)) {
        return;
      }

      navigator.serviceWorker.startMessages?.();
      const handleServiceWorkerMessage = (event) => {
        const { type, path } = event.data || {};
        if (type !== 'NAVIGATE' || !path) {
          return;
        }

        if (!isReadyForServiceWorkerNavigation) {
          pendingServiceWorkerNavigationPaths.push(path);
          if (
            pendingServiceWorkerNavigationPaths.length > serviceWorkerQueueLimit
          ) {
            pendingServiceWorkerNavigationPaths.shift();
          }
          return;
        }

        options.handleServiceWorkerNavigation(path).catch((error) => {
          console.warn('[setupApp] Failed SW NAVIGATE:', { path, error });
        });
      };

      navigator.serviceWorker.addEventListener(
        'message',
        handleServiceWorkerMessage,
      );
      cleanupFns.push(() => {
        navigator.serviceWorker.removeEventListener(
          'message',
          handleServiceWorkerMessage,
        );
      });
    };

    try {
      registerServiceWorkerNavigation();
      cleanupFns.push(await options.runPreflight());
      cleanupFns.push(await setupNotificationsHandlers());
      cleanupFns.push(await setupContacts());

      const initSuccess = await options.runInit();
      if (!initSuccess) {
        options.onInitFailed?.();
        clearServiceWorkerQueue();
        drainCleanupFns(cleanupFns);

        isReady = false;
        cleanup = () => {
          isReady = false;
        };
        isReadyForServiceWorkerNavigation = false;
        return cleanup;
      }

      cleanupFns.push(await options.setupTopBarAndLocale());
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

      const autoJoinedSuccessfully = await options.autoJoinFromUrl();
      if (!autoJoinedSuccessfully) {
        options.onReady?.();
      }

      isReadyForServiceWorkerNavigation = true;
      await flushQueuedServiceWorkerNavigation();

      cleanup = () => {
        clearServiceWorkerQueue();
        isReadyForServiceWorkerNavigation = false;
        drainCleanupFns(cleanupFns);
        isReady = false;
      };
      isReady = true;
      return cleanup;
    } catch (error) {
      clearServiceWorkerQueue();
      isReadyForServiceWorkerNavigation = false;
      drainCleanupFns(cleanupFns);
      cleanup = () => {
        isReady = false;
      };
      isReady = false;
      console.error('[setupApp] bootstrap failed:', error);
      options.onInitFailed?.(error);
      throw error;
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
}
