/**
 * Debug utility for PWA install prompt diagnostics
 * @param {Object} options
 * @param {boolean} [options.shouldShowInProd=false] - Whether to show diagnostics in production
 */
export const debugPWAInstall = ({ shouldShowInProd = false } = {}) => {
  const enabled = localStorage.getItem('debug:console') === '1';

  // In dev, respect the debug:console flag; in prod, respect shouldShowInProd
  if (isDev()) {
    if (!enabled) return;
  } else if (!shouldShowInProd) {
    return;
  }

  // Check installability criteria and provide detailed feedback
  const checks = [];

  if (!('serviceWorker' in navigator)) {
    checks.push('❌ Service Workers not supported');
  } else {
    checks.push('✓ Service Workers supported');
  }

  const isSecure =
    window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';
  if (!isSecure) {
    checks.push('❌ Not served over HTTPS or localhost');
  } else {
    checks.push('✓ Secure context (HTTPS/localhost)');
  }

  // Check if already installed
  if (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  ) {
    checks.push('⚠️  App is already installed');
  } else {
    checks.push('✓ App not yet installed');
  }

  console.group('[PWA] Install Prompt Debug');
  console.log('Installability checks:');
  checks.forEach((check) => console.log(check));
  console.log('\nPossible reasons beforeinstallprompt did not fire:');
  console.log(
    '1. Chrome throttled the prompt (recently dismissed/uninstalled)'
  );
  console.log('2. Manifest or Service Worker issues');
  console.log('3. App already installed');
  console.log('\nWorkarounds:');
  console.log('• Try in Incognito mode (bypasses throttling)');
  console.log('• Use Chrome menu: ⋮ → "Install HangVidU..."');
  console.groupEnd();

  // Show alert in dev mode
  if (isDev()) {
    alert(
      '⚠️ Install prompt blocked (Chrome throttling)\n\n' +
        '✅ Workarounds:\n' +
        '1. Open in Incognito mode\n' +
        '2. Use Chrome menu: ⋮ → "Install HangVidU..."\n' +
        '3. Wait 1-2 days for Chrome to reset\n\n' +
        "Your PWA setup is correct! This is just Chrome's anti-spam protection."
    );
  }
};
