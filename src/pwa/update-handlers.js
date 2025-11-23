import { registerSW } from 'virtual:pwa-register';
import { showUpdateNotification } from '../components/notifications/update-notification.js';

/**
 * Sets up PWA update handling with user prompt.
 * Automatically shows update notification when new version is available.
 */
export function setupUpdateHandler() {
  try {
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
    console.error('[PWA] Failed to setup update handler:', error);
    console.warn('[PWA] This may be expected if PWA is disabled or virtual module is not available');
  }
}
