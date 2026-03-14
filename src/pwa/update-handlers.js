// import { showUpdateNotification } from '../ui/components/notifications/update-notification.js';
import CallController from '../webrtc/call-controller.js';
import { showInfoToast, showErrorToast } from '../ui/utils/toast.js';

// Check for updates every 30 minutes (in milliseconds)
const UPDATE_CHECK_INTERVAL = 30 * 60 * 1000;

let updateCheckIntervalId = null;
let visibilityAbortController = null;
let pendingUpdateSW = null;

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
    console.debug('[PWA] Service worker update check completed');
  } catch (error) {
    console.debug('[PWA] Update check error:', error);
  }
}

/**
 * Attempts to auto-update. If a call is active, defers until call ends.
 * @param {Function} updateSW - The updateSW function from registerSW
 */
async function attemptAutoUpdate(updateSW) {
  if (CallController.isInCall()) {
    deferUpdate(updateSW);
    return;
  }

  try {
    showInfoToast('Updating...', { duration: 2000 });
    await updateSW(true);
  } catch (err) {
    console.error('[PWA] Auto-update failed:', err);
    showErrorToast('Update failed. Try refreshing manually.');
  }
}

/**
 * Defers update until the current call ends.
 * Idempotent — safe to call multiple times while deferred.
 * @param {Function} updateSW - The updateSW function from registerSW
 */
function deferUpdate(updateSW) {
  if (pendingUpdateSW) {
    pendingUpdateSW = updateSW;
    return;
  }

  pendingUpdateSW = updateSW;
  showInfoToast('Update available — will apply after your call', {
    duration: 4000,
  });

  const onCallEnd = () => {
    CallController.off('cleanup', onCallEnd);
    const sw = pendingUpdateSW;
    pendingUpdateSW = null;
    if (sw) attemptAutoUpdate(sw);
  };

  CallController.on('cleanup', onCallEnd);
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
      attemptAutoUpdate(updateSW);
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

  console.debug('[PWA] Visibility change listener enabled');
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

  console.info(
    `[PWA] Started periodic update checks (every ${UPDATE_CHECK_INTERVAL / 1000 / 60} minutes)`,
  );
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

  if (updateCheckIntervalId === null && visibilityAbortController === null) {
    console.info('[PWA] Stopped automatic update checks');
  }
}

/**
 * Sets up PWA update handling with auto-update.
 * Auto-applies updates unless the user is in a call, in which case it defers.
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
      onNeedRefresh() {
        console.info('[PWA] New version available');
        attemptAutoUpdate(updateSW);
      },
      onOfflineReady() {
        console.info('[PWA] App ready to work offline');
      },
    });

    // Set up all update check mechanisms
    await startupUpdateCheck(updateSW);
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
