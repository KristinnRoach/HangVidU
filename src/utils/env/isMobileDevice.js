/**
 * Detect if running on a mobile device (iOS/Android)
 *
 * Notes:
 * - iPadOS in “Request Desktop Website” mode reports as Macintosh; detect via maxTouchPoints.
 * - Prefer simple, reliable signal to decide redirect vs popup for Firebase Auth.
 */
export function isMobileDevice(logInfo = false) {
  if (typeof window === 'undefined' || typeof navigator === 'undefined')
    return false;

  const ua = navigator.userAgent || navigator.vendor || '';

  // iOS (including iPadOS with desktop UA)
  const isiOSUA = /iPad|iPhone|iPod/.test(ua);
  const isiPadOSDesktopUA =
    /Macintosh/.test(ua) &&
    typeof navigator.maxTouchPoints === 'number' &&
    navigator.maxTouchPoints > 1;
  const isIOS = (isiOSUA || isiPadOSDesktopUA) && !window.MSStream;

  // Android
  const isAndroid = /Android/i.test(ua);

  const result = isIOS || isAndroid;

  if (logInfo) {
    console.table({
      'User Agent': ua,
      isAndroid,
      isiOSUA,
      isiPadOSDesktopUA,
      isMobileDevice: result,
    });
  }

  return result;
}
