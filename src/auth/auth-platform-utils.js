// src/auth/auth-platform-utils.js
// Browser/platform detection helpers for auth flows.

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
  const isIOS =
    typeof navigator !== 'undefined' &&
    /iphone|ipad|ipod/i.test(navigator.userAgent || '');
  const isIOSStandalone = isStandalonePWA && isIOS;

  return { isStandalonePWA, isIOS, isIOSStandalone };
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
