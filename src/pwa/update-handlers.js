import { showUpdateNotification } from '../ui/components/notifications/update-notification.js';

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
 * Sets up PWA update handling with user prompt.
 * Automatically shows update notification when new version is available.
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
