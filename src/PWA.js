import { hideElement, showElement } from './utils/ui-utils';

function setupPWA(installBtn) {
  if (!installBtn) {
    console.warn('setupPWA: install button not found');
    return;
  }

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showElement(installBtn);
  });

  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      // hide the button after install
      if (outcome === 'accepted') {
        hideElement(installBtn);
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    }
  });

  // hide button if app is already installed
  window.addEventListener('appinstalled', () => {
    hideElement(installBtn);
  });
}

export { setupPWA };
