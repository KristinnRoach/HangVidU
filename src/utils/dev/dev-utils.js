// DEV convenience utils

export const isDev = () => import.meta.env.DEV;
export const isProd = () => import.meta.env.PROD;

export const setDevDebugEnabled = (enabled) => {
  try {
    if (enabled) {
      localStorage.setItem('debug:console', '1');
    } else {
      localStorage.removeItem('debug:console');
    }
  } catch {
    // localStorage unavailable
  }
};

export const setTempLogsEnabled = (enabled) => {
  try {
    if (enabled) {
      localStorage.setItem('debug:temp', '1');
    } else {
      localStorage.removeItem('debug:temp');
    }
  } catch {
    // localStorage unavailable
  }
};

export const devDebug = (...args) => {
  // Only log in dev when explicitly enabled via localStorage flag
  // Enable with: localStorage.setItem('debug:console', '1')
  // Disable with: localStorage.removeItem('debug:console')
  if (!isDev()) return;
  try {
    const enabled = localStorage.getItem('debug:console') === '1';
    if (enabled) console.debug(...args);
  } catch {
    // Fallback if localStorage unavailable
    // Remain silent by default to avoid noisy consoles
  }
};

export const tempWarn = (...args) => {
  const enabled = localStorage.getItem('debug:console') === '1';
  if (!isDev() || !enabled) return;
  console.warn(...args);
};

export const tempLog = (...args) => {
  const enabled = localStorage.getItem('debug:console') === '1';
  if (!isDev() || !enabled) return;
  console.log(...args);
};

export const tempInfo = (...args) => {
  const enabled = localStorage.getItem('debug:console') === '1';
  if (!isDev() || !enabled) return;
  console.info(...args);
};

export const tempTable = (data, columns) => {
  const enabled = localStorage.getItem('debug:console') === '1';
  if (!isDev() || !enabled) return;
  console.table(data, columns);
};

/**
 * Debug utility to log element visibility and CSS properties
 * @param {HTMLElement} el - The element to debug
 * @param {string} [context] - Optional context label (e.g., 'showElement', 'hideElement')
 */
export const debugVisibility = (el, context = 'visibility') => {
  const enabled = localStorage.getItem('debug:console') === '1';
  if (!isDev() || !enabled) return;

  try {
    const cs = getComputedStyle(el);
    const stack = new Error().stack
      ?.split('\n')
      .slice(2, 6) // trim internal frames
      .map((s) => s.trim());
    const id = el.id || '(no-id)';
    const classes = el.className || '';
    const inRemoteBox =
      id === 'remote-video-el' ||
      id === 'remote-video-box' ||
      el.closest?.('#remote-video-box');

    console.debug(`[UI] ${context}`, {
      id,
      classes,
      visibility: cs.visibility,
      display: cs.display,
      opacity: cs.opacity,
      zIndex: cs.zIndex,
      position: cs.position,
      trace: stack,
      highlight: !!inRemoteBox,
    });
  } catch (error) {
    console.warn('[debugVisibility] Error:', error);
  }
};

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
