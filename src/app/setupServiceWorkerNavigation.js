let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup removes SW listener and queued navigation state
 *
 * Setup service-worker NAVIGATE handling with queue-until-ready semantics.
 *
 * @param {{
 *   handleServiceWorkerNavigation: (path: string) => Promise<boolean>,
 *   waitUntilReady: Promise<void>,
 *   queueLimit?: number,
 * }} options
 * @returns {Promise<() => void>}
 */
export function setupServiceWorkerNavigation(options) {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = Promise.resolve().then(() => {
    const pendingNavigationPaths = [];
    const queueLimit = options.queueLimit ?? 20;
    let isNavigationReady = false;
    let isCleanedUp = false;

    const runNavigation = (path, source) => {
      options.handleServiceWorkerNavigation(path).catch((error) => {
        console.warn(`[setupServiceWorkerNavigation] Failed ${source}:`, {
          path,
          error,
        });
      });
    };

    const flushQueuedNavigation = () => {
      while (pendingNavigationPaths.length > 0) {
        const path = pendingNavigationPaths.shift();
        runNavigation(path, 'queued SW NAVIGATE');
      }
    };

    const clearQueue = () => {
      pendingNavigationPaths.length = 0;
    };

    const markReadyAndFlush = () => {
      if (isCleanedUp || isNavigationReady) {
        return;
      }
      isNavigationReady = true;
      flushQueuedNavigation();
    };

    const queueUntilReady = Promise.resolve(options.waitUntilReady)
      .then(markReadyAndFlush)
      .catch((error) => {
        console.warn(
          '[setupServiceWorkerNavigation] waitUntilReady rejected:',
          error,
        );
      });

    if (!('serviceWorker' in navigator)) {
      cleanup = () => {
        clearQueue();
        isNavigationReady = false;
        isCleanedUp = true;
        isReady = false;
      };
      isReady = true;
      return cleanup;
    }

    navigator.serviceWorker.startMessages?.();

    const handleServiceWorkerMessage = (event) => {
      const { type, path } = event.data || {};
      if (type !== 'NAVIGATE' || !path) {
        return;
      }

      if (!isNavigationReady) {
        pendingNavigationPaths.push(path);
        if (pendingNavigationPaths.length > queueLimit) {
          pendingNavigationPaths.shift();
        }
        return;
      }

      runNavigation(path, 'SW NAVIGATE');
    };

    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);

    cleanup = () => {
      navigator.serviceWorker.removeEventListener(
        'message',
        handleServiceWorkerMessage,
      );
      clearQueue();
      isNavigationReady = false;
      isCleanedUp = true;
      isReady = false;
    };

    // Keep promise referenced so unhandled rejections are consumed through this chain.
    void queueUntilReady;
    isReady = true;
    return cleanup;
  }).finally(() => {
    initPromise = null;
  });

  return initPromise;
}
