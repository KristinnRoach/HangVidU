import { devDebug } from './utils/log';
import { hideElement, showElement } from './utils/ui-utils';

function setupPWA(installBtn) {
  if (!installBtn) {
    console.warn('[PWA]: Install button not found');
    return;
  }

  if (window.matchMedia('(display-mode: standalone)').matches) {
    devDebug('[PWA]: App is already installed');
    hideElement(installBtn);
    return;
  }

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    devDebug('[PWA]: beforeinstallprompt event fired');
    e.preventDefault();
    deferredPrompt = e;
    showElement(installBtn);
  });

  installBtn.addEventListener('click', async () => {
    devDebug('[PWA]: Install button clicked');

    if (!deferredPrompt) {
      console.warn(
        '[PWA]: deferredPrompt is null - beforeinstallprompt may not have fired'
      );

      // Check installability criteria
      if (!('serviceWorker' in navigator)) {
        console.warn('[PWA]: Service Workers not supported');
      }
      if (
        window.location.protocol !== 'https:' &&
        window.location.hostname !== 'localhost'
      ) {
        console.warn('[PWA]: Not served over HTTPS');
      }
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      devDebug(`User choice: ${outcome}`);

      if (outcome === 'accepted') {
        hideElement(installBtn);
      }

      deferredPrompt = null;
    } catch (error) {
      console.error('Error showing install prompt:', error);
    }
  });

  window.addEventListener('appinstalled', () => {
    devDebug('App installed successfully');
    hideElement(installBtn);
    deferredPrompt = null;
  });
}

export { setupPWA };
