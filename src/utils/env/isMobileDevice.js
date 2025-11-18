/**
 * Detect if running on a mobile device (iOS/Android)
 */
export function isMobileDevice() {
  if (typeof window === 'undefined') return false;

  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Check for iOS
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

  // Check for Android
  const isAndroid = /android/i.test(userAgent);

  // Check for mobile Safari specifically
  const isMobileSafari =
    isIOS &&
    /Safari/.test(userAgent) &&
    !/CriOS|FxiOS|OPiOS|mercury/.test(userAgent);

  return isIOS || isAndroid || isMobileSafari;
}
