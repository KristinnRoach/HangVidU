// utils/detect-device.js

/**
 * Utils for detecting device types and capabilities.
 * Used for feature gating and platform-specific behavior.
 *
 * Note: User agent detection is inherently imperfect; prefer capability detection where possible.
 * These functions provide simple heuristics for common cases (e.g. iOS vs Android vs desktop).
 *
 * For more robust platform detection, consider using a well-maintained library like Bowser or Platform.js.
 */

// ======= Device OS Detection =======

/**
 * Detect if running on an iOS device.
 * Includes iPadOS in desktop mode (Macintosh UA + touch points).
 */
export function isIOSDevice() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const ua = navigator.userAgent || navigator.vendor || '';
  const isiOSUA = /iPad|iPhone|iPod/.test(ua);
  const isiPadOSDesktopUA =
    /Macintosh/.test(ua) &&
    typeof navigator.maxTouchPoints === 'number' &&
    navigator.maxTouchPoints > 1;

  return (isiOSUA || isiPadOSDesktopUA) && !window.MSStream;
}

/**
 * Detect if running on an Android device.
 */
export function isAndroidDevice() {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const ua = navigator.userAgent || navigator.vendor || '';
  return /Android/i.test(ua);
}

/**
 * Detect if running on a mobile device (iOS/Android)
 *
 * Notes:
 * - iPadOS in “Request Desktop Website” mode reports as Macintosh; detect via maxTouchPoints.
 * - Prefer simple, reliable signal to decide redirect vs popup for Firebase Auth.
 */
export function isIOSOrAndroidDevice(logInfo = false) {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const ua = navigator.userAgent || navigator.vendor || '';
  const isIOS = isIOSDevice();
  const isAndroid = isAndroidDevice();
  const result = isIOS || isAndroid;

  if (logInfo) {
    console.table({
      'User Agent': ua,
      isIOS,
      isAndroid,
      isIOSOrAndroidDevice: result,
    });
  }

  return result;
}

// ======= Device Input/Capability Detection =======

/**
 * Detect whether the current device likely supports touch input.
 *
 */
export function supportsTouchInput() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const hasTouchPoints =
    typeof navigator.maxTouchPoints === 'number' &&
    navigator.maxTouchPoints > 0;
  const hasTouchEvent = 'ontouchstart' in window;

  return hasTouchPoints || hasTouchEvent;
}
