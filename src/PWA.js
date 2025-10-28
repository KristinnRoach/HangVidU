import { devDebug } from './utils/log';
import { hideElement, showElement } from './utils/ui-utils';
import { installBtn } from './elements';

let beforeInstallEvent = null;

function setupPWA() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.info('[PWA]: App is already installed');
    hideElement(installBtn);
    return;
  }

  if (!installBtn) {
    console.warn('[PWA]: Install button not found');
    return;
  }

  if (!beforeInstallEvent) {
    console.debug('[PWA]: beforeInstallEvent not assigned yet');
    hideElement(installBtn);
    return;
  }

  showElement(installBtn);

  installBtn.addEventListener('click', async () => {
    devDebug('[PWA]: Install button clicked');

    if (!beforeInstallEvent) {
      console.warn(
        '[PWA]: beforeInstallEvent is null - beforeinstallprompt may not have fired'
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
      await beforeInstallEvent.prompt();
      const { outcome } = await beforeInstallEvent.userChoice;

      devDebug(`User choice: ${outcome}`);

      if (outcome === 'accepted') {
        hideElement(installBtn);
      }

      beforeInstallEvent = null;
    } catch (error) {
      console.error('Error showing install prompt:', error);
    }
  });

  window.addEventListener('appinstalled', () => {
    devDebug('App installed successfully');
    hideElement(installBtn);
    beforeInstallEvent = null;
  });
}

// Attach "beforeinstallprompt" listener as early as possible
window.addEventListener('beforeinstallprompt', (e) => {
  console.debug('[PWA]: beforeinstallprompt fired');
  e.preventDefault();
  beforeInstallEvent = e;
  if (installBtn) showElement(installBtn);
});

export { setupPWA };
