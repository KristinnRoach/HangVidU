import {
  debugPWAInstall,
  debugVisibility,
  devDebug,
  isDev,
  tempInfo,
  tempWarn,
} from '../utils/dev/dev-utils';
import { hideElement, showElement } from '../utils/ui/ui-utils';
import createIconButton from '../components/primitives/button/icon-button.js';

let beforeInstallEvent = null;
let installBtnHandlerAttached = false;
let installBtnComponent = null;

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
    if (installBtnComponent && !isDev()) hideElement(installBtnComponent);
    return;
  }

  // Create install button component if not already created
  if (!installBtnComponent) {
    const topRightMenu = document.querySelector('.top-right-menu');
    if (!topRightMenu) {
      console.warn('[PWA]: .top-right-menu container not found');
      return;
    }

    installBtnComponent = createIconButton({
      id: 'install-btn',
      title: 'Install App',
      iconHtml: '<i class="fa fa-plus"></i>',
      className: 'hidden', // Start hidden
      onMount: (el) => {
        if (isDev()) {
          tempInfo('onMount fired for installButtonComponent');
          showElement(el); // Always visible in DEV for testing
        }
      },
      parent: topRightMenu,
    });
  }

  const installBtn =
    installBtnComponent.querySelector?.('button') ?? installBtnComponent;
  if (!(installBtn instanceof HTMLElement)) {
    console.warn('[PWA]: Install button element not found in component');
    return;
  }

  // iOS: Show instructions instead of install prompt
  if (isIOS()) {
    installBtnComponent.update({
      iconHtml: '<i class="fa fa-info"></i>',
      title: 'Show Install Instructions',
    });

    showElement(installBtnComponent);

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

        // Show PWA install diagnostics (dev-only by default)
        debugPWAInstall({ shouldShowInProd: true });

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

        !isDev() && hideElement(installBtnComponent);
        beforeInstallEvent = null;
      } catch (error) {
        !isDev() && hideElement(installBtnComponent);

        console.error('Error showing install prompt:', error);
      }
    });
    installBtnHandlerAttached = true;
  }

  window.addEventListener('appinstalled', () => {
    devDebug('App installed successfully');
    !isDev() && hideElement(installBtnComponent);
    beforeInstallEvent = null;
  });

  // Show or hide the button based on beforeInstallEvent
  if (beforeInstallEvent) {
    showElement(installBtnComponent);
  } else {
    !isDev() && hideElement(installBtnComponent);
  }
}

// Attach "beforeinstallprompt" listener as early as possible
window.addEventListener('beforeinstallprompt', (e) => {
  console.debug('[PWA]: beforeinstallprompt fired');
  e.preventDefault();
  beforeInstallEvent = e;
  if (installBtnComponent) showElement(installBtnComponent);
});

export { setupPWA };
