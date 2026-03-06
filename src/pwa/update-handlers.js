import { showUpdateNotification } from '../ui/components/notifications/update-notification.js';

// Check for updates every 30 minutes (in milliseconds)
const UPDATE_CHECK_INTERVAL = 30 * 60 * 1000;

let updateCheckIntervalId = null;
let visibilityAbortController = null;

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
      console.debug('[PWA] Service workers not supported, skipping update check');
      return;
    }

    // Use explicit registration lookup instead of .ready to avoid indefinite hangs
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      console.debug('[PWA] No service worker registration found, skipping update check');
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
 * Starts periodic update checks while the app is open.
 */
function startPeriodicUpdateChecks() {
  if (updateCheckIntervalId !== null) {
    console.debug('[PWA] Periodic update checks already running');
    return;
  }

  // Check immediately on start (fire and forget)
  checkForUpdates().catch((error) => {
    console.debug('[PWA] Initial update check failed:', error);
  });

  // Then check every UPDATE_CHECK_INTERVAL
  updateCheckIntervalId = setInterval(() => {
    checkForUpdates().catch((error) => {
      console.debug('[PWA] Periodic update check failed:', error);
    });
  }, UPDATE_CHECK_INTERVAL);

  // Also check for updates when user switches back to the tab
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
    { signal: visibilityAbortController.signal }
  );

  console.info(
    `[PWA] Started periodic update checks (every ${UPDATE_CHECK_INTERVAL / 1000 / 60} minutes)`
  );
}

/**
 * Stops periodic update checks.
 */
export function stopPeriodicUpdateChecks() {
  if (updateCheckIntervalId !== null) {
    clearInterval(updateCheckIntervalId);
    updateCheckIntervalId = null;
  }

  if (visibilityAbortController !== null) {
    visibilityAbortController.abort();
    visibilityAbortController = null;
  }

  if (updateCheckIntervalId === null && visibilityAbortController === null) {
    console.info('[PWA] Stopped periodic update checks');
  }
}

/**
 * Sets up PWA update handling with user prompt.
 * Automatically shows update notification when new version is available.
 * Enables periodic checks so updates are detected even if app is left open.
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
        showUpdateNotification(updateSW);
      },
      onOfflineReady() {
        console.info('[PWA] App ready to work offline');
      },
    });

    // Start checking for updates periodically
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
