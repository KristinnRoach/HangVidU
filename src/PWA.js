import { devDebug } from './utils/log';
import { hideElement, showElement } from './utils/ui-utils';
import { installBtn } from './elements';

let beforeInstallEvent = null;
let installBtnHandlerAttached = false;

function isIOS() {
  return (
    /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream
  );
}

function setupPWA() {
  if (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  ) {
    console.info('[PWA]: App is already installed');
    hideElement(installBtn);
    return;
  }

  if (!installBtn) {
    console.warn('[PWA]: Install button not found');
    return;
  }

  // iOS: Show instructions instead of install prompt
  if (isIOS()) {
    installBtn.innerHTML = '<i class="fa fa-info"></i>';
    installBtn.title = 'Show Install Instructions';
    showElement(installBtn);

    installBtn.onclick = () => {
      alert(
        "Tap the Share icon and choose 'Add to Home Screen' to install this app."
      );
    };
    return;
  }

  // Only attach the click handler once
  if (!installBtnHandlerAttached) {
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
        devDebug(`User choice outcome: ${outcome}`);

        if (outcome === 'accepted') {
          console.info('[PWA]: User accepted the install prompt');
        } else {
          console.info('[PWA]: User dismissed the install prompt');
        }

        hideElement(installBtn);
        beforeInstallEvent = null;
      } catch (error) {
        hideElement(installBtn);

        console.error('Error showing install prompt:', error);
      }
    });
    installBtnHandlerAttached = true;
  }

  window.addEventListener('appinstalled', () => {
    devDebug('App installed successfully');
    hideElement(installBtn);
    beforeInstallEvent = null;
  });

  // Show or hide the button based on beforeInstallEvent
  if (beforeInstallEvent) {
    showElement(installBtn);
  } else {
    hideElement(installBtn);
  }
}

// Attach "beforeinstallprompt" listener as early as possible
window.addEventListener('beforeinstallprompt', (e) => {
  console.debug('[PWA]: beforeinstallprompt fired');
  e.preventDefault();
  beforeInstallEvent = e;
  if (installBtn) showElement(installBtn);
});

export { setupPWA };
