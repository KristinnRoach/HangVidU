function setupPWA(installBtn) {
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      // hide the button after install
      installBtn.style.display = 'none';
      deferredPrompt = null;
    }
  });

  // hide button if app is already installed
  window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
  });
}

export { setupPWA };
