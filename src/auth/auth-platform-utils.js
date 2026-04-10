// src/auth/auth-platform-utils.js
// Browser/platform detection helpers for auth flows.

const isIOS = () => {
  if (typeof navigator === 'undefined') return false;

  const ua = navigator.userAgent || '';
  const isStandardIOS = /iphone|ipad|ipod/i.test(ua);
  const isIPadOSDesktop =
    /Macintosh/.test(ua) &&
    typeof navigator.maxTouchPoints === 'number' &&
    navigator.maxTouchPoints > 1;

  return isStandardIOS || isIPadOSDesktop;
};

/**
 * Detect whether the app runs as an iOS standalone PWA.
 *
 * @returns {{ isStandalonePWA: boolean, isIOS: boolean, isIOSStandalone: boolean }}
 */
export function detectIOSStandalone() {
  const displayModeStandalone =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(display-mode: standalone)')?.matches === true;
  const navigatorStandalone =
    typeof navigator !== 'undefined' && navigator.standalone === true;
  const isStandalonePWA = displayModeStandalone || navigatorStandalone;
  const ios = isIOS();
  const isIOSStandalone = isStandalonePWA && ios;

  return { isStandalonePWA, isIOS: ios, isIOSStandalone };
}

/**
 * Attempt to open current app URL in external Safari from a user gesture.
 * No-op on failure.
 */
export function openInSafariExternal() {
  try {
    const a = document.createElement('a');
    a.href = window.location.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer external';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (_) {}
}
