import {
  showInfoToast,
  showErrorToast,
} from '../../components/base-legacy/toast.js';

// TODO: Consider reverting to 30min once migration has settled.
const UPDATE_CHECK_INTERVAL = 20 * 60 * 1000;

let updateCheckIntervalId = null;
let visibilityAbortController = null;
let controllerChangeAbortController = null;

/**
 * Dynamically imports the PWA register module.
 * Separated to avoid Vite's static dependency scanner when PWA is disabled.
 */
async function importPWARegister() {
  // @ts-ignore - virtual module only exists when PWA plugin is enabled
  const { registerSW } = await import('virtual:pwa-register');
  return registerSW;
}

/**
 * Checks for updates using the standard Service Worker API.
 * This triggers the browser to check if the service worker has been updated.
 */
async function checkForUpdates() {
  try {
    // Feature-detect service worker support
    if (!('serviceWorker' in navigator)) {
      console.debug(
        '[PWA] Service workers not supported, skipping update check',
      );
      return;
    }

    // Use explicit registration lookup instead of .ready to avoid indefinite hangs
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      console.debug(
        '[PWA] No service worker registration found, skipping update check',
      );
      return;
    }

    // The standard API to check for service worker updates
    // This causes the browser to re-fetch the service worker script and compare it
    await registration.update();
    if (import.meta.env.DEV) {
      console.debug('[PWA] Service worker update check completed');
    }
  } catch (error) {
    console.debug('[PWA] Update check error:', error);
  }
}

/**
 * Attempts to auto-update immediately.
 * @param {Function} updateSW - The updateSW function from registerSW
 */
async function attemptAutoUpdate(updateSW) {
  try {
    showInfoToast('Updating...', { duration: 2000 });
    await updateSW(true);
  } catch (err) {
    console.error('[PWA] Auto-update failed:', err);
    showErrorToast('Update failed. Try refreshing manually.');
  }
}

/**
 * Reloads as soon as an updated service worker takes control.
 */
function reloadOnControllerChange() {
  if (!('serviceWorker' in navigator)) return;
  controllerChangeAbortController = new AbortController();
  navigator.serviceWorker.addEventListener(
    'controllerchange',
    () => {
      // TODO: Once app updates are stable, defer while p2p.state() !== 'idle'
      // and later let the user choose when to reload.
      window.location.reload();
    },
    { once: true, signal: controllerChangeAbortController.signal },
  );
}

/**
 * Checks for a service worker that was installed while the app was closed.
 * (onNeedRefresh only fires for updates detected while the page is open)
 * @param {Function} updateSW - The updateSW function from registerSW
 */
async function startupUpdateCheck(updateSW) {
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg?.waiting) {
      console.info('[PWA] Found waiting service worker at startup');
      void attemptAutoUpdate(updateSW);
    }
  } catch (err) {
    console.debug('[PWA] Startup waiting-check failed:', err);
  }
}

/**
 * Checks for updates when the app becomes visible (tab is switched back).
 */
function visibilityChangeCheck() {
  if (visibilityAbortController !== null) {
    console.debug('[PWA] Visibility change listener already active');
    return;
  }

  // Use AbortController to safely clean up the listener
  visibilityAbortController = new AbortController();
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.visibilityState === 'visible') {
        console.debug('[PWA] App came to foreground, checking for updates');
        checkForUpdates().catch((error) => {
          console.debug('[PWA] Foreground update check failed:', error);
        });
      }
    },
    { signal: visibilityAbortController.signal },
  );

  if (import.meta.env.DEV) {
    console.debug('[PWA] Visibility change listener enabled');
  }
}

/**
 * Starts periodic update checks while the app is open.
 * Checks every UPDATE_CHECK_INTERVAL (30 minutes).
 */
function startPeriodicUpdateChecks() {
  if (updateCheckIntervalId !== null) {
    console.debug('[PWA] Periodic update checks already running');
    return;
  }

  // Check every UPDATE_CHECK_INTERVAL
  updateCheckIntervalId = setInterval(() => {
    checkForUpdates().catch((error) => {
      console.debug('[PWA] Periodic update check failed:', error);
    });
  }, UPDATE_CHECK_INTERVAL);

  if (import.meta.env.DEV) {
    console.info(
      `[PWA] Started periodic update checks (every ${UPDATE_CHECK_INTERVAL / 1000 / 60} minutes)`,
    );
  }
}

/**
 * Stops all automatic update checks (periodic and visibility-based).
 */
export function stopUpdateChecks() {
  if (updateCheckIntervalId !== null) {
    clearInterval(updateCheckIntervalId);
    updateCheckIntervalId = null;
  }

  if (visibilityAbortController !== null) {
    visibilityAbortController.abort();
    visibilityAbortController = null;
  }

  if (controllerChangeAbortController !== null) {
    controllerChangeAbortController.abort();
    controllerChangeAbortController = null;
  }

  if (updateCheckIntervalId === null && visibilityAbortController === null) {
    console.info('[PWA] Stopped automatic update checks');
  }
}

/**
 * Sets up PWA update handling with auto-update.
 * Auto-applies updates immediately.
 * Enables startup, visibility, and periodic checks so updates are detected reliably.
 */
export async function setupUpdateHandler() {
  // Only try to import if PWA is enabled
  if (import.meta.env.VITE_ENABLE_PWA === '0') {
    console.debug('[PWA] Update handler not available (PWA disabled)');
    return;
  }
  try {
    const registerSW = await importPWARegister();

    if (!registerSW) {
      console.warn('[PWA] registerSW is not available');
      return;
    }

    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        console.info('[PWA] New version available');
        void attemptAutoUpdate(updateSW);
      },
      onOfflineReady() {
        console.info('[PWA] App ready to work offline');
      },
    });

    // Set up all update check mechanisms
    reloadOnControllerChange();
    await startupUpdateCheck(updateSW);
    await checkForUpdates();
    visibilityChangeCheck();
    startPeriodicUpdateChecks();

    return updateSW;
  } catch (error) {
    // Silently fail if virtual module is not available (e.g., PWA disabled)
    if (
      error.message?.includes('Failed to resolve') ||
      error.message?.includes('virtual:pwa-register')
    ) {
      console.debug('[PWA] Update handler not available (PWA may be disabled)');
      return;
    }
    console.error('[PWA] Failed to setup update handler:', error);
  }
}
