/**
 * PlatformDetector - Detects browser, OS, device type, and PWA mode
 * Used for FCM notification diagnostics and support matrix validation
 */

/**
 * @typedef {'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'samsung' | 'unknown'} BrowserType
 * @typedef {'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'unknown'} OSType
 * @typedef {'desktop' | 'mobile' | 'tablet'} DeviceType
 */

/**
 * @typedef {Object} PlatformInfo
 * @property {BrowserType} browser - Detected browser type
 * @property {string} browserVersion - Browser version string
 * @property {OSType} os - Detected operating system
 * @property {string} osVersion - OS version string (if detectable)
 * @property {DeviceType} deviceType - Device type (desktop, mobile, tablet)
 * @property {boolean} isPWA - Whether running as PWA
 * @property {boolean} isStandalone - Whether running in standalone mode
 */

export class PlatformDetector {
  /**
   * Detect the current platform information
   * @returns {PlatformInfo}
   */
  detectPlatform() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform || '';

    return {
      browser: this.detectBrowser(userAgent),
      browserVersion: this.detectBrowserVersion(userAgent),
      os: this.detectOS(userAgent, platform),
      osVersion: this.detectOSVersion(userAgent),
      deviceType: this.detectDeviceType(userAgent),
      isPWA: this.isPWA(),
      isStandalone: this.isStandalone(),
    };
  }

  /**
   * Detect browser type from user agent
   * @param {string} userAgent
   * @returns {BrowserType}
   */
  detectBrowser(userAgent) {
    // Order matters - check more specific browsers first
    if (userAgent.includes('Edg/') || userAgent.includes('Edge/')) {
      return 'edge';
    }
    if (userAgent.includes('OPR/') || userAgent.includes('Opera/')) {
      return 'opera';
    }
    if (userAgent.includes('SamsungBrowser/')) {
      return 'samsung';
    }
    if (userAgent.includes('Chrome/') || userAgent.includes('CriOS/')) {
      return 'chrome';
    }
    if (userAgent.includes('Firefox/') || userAgent.includes('FxiOS/')) {
      return 'firefox';
    }
    if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) {
      return 'safari';
    }
    return 'unknown';
  }

  /**
   * Detect browser version from user agent
   * @param {string} userAgent
   * @returns {string}
   */
  detectBrowserVersion(userAgent) {
    const patterns = [
      { regex: /Edg\/(\d+\.\d+)/, browser: 'edge' },
      { regex: /Edge\/(\d+\.\d+)/, browser: 'edge' },
      { regex: /OPR\/(\d+\.\d+)/, browser: 'opera' },
      { regex: /Opera\/(\d+\.\d+)/, browser: 'opera' },
      { regex: /SamsungBrowser\/(\d+\.\d+)/, browser: 'samsung' },
      { regex: /Chrome\/(\d+\.\d+)/, browser: 'chrome' },
      { regex: /CriOS\/(\d+\.\d+)/, browser: 'chrome' },
      { regex: /Firefox\/(\d+\.\d+)/, browser: 'firefox' },
      { regex: /FxiOS\/(\d+\.\d+)/, browser: 'firefox' },
      { regex: /Version\/(\d+\.\d+).*Safari/, browser: 'safari' },
    ];

    for (const pattern of patterns) {
      const match = userAgent.match(pattern.regex);
      if (match) {
        return match[1];
      }
    }

    return 'unknown';
  }

  /**
   * Detect operating system from user agent and platform
   * @param {string} userAgent
   * @param {string} platform
   * @returns {OSType}
   */
  detectOS(userAgent, platform) {
    // iOS detection
    if (
      /iPad|iPhone|iPod/.test(userAgent) ||
      (platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    ) {
      return 'ios';
    }

    // Android detection
    if (/Android/.test(userAgent)) {
      return 'android';
    }

    // macOS detection
    if (/Mac/.test(platform) || /Macintosh/.test(userAgent)) {
      return 'macos';
    }

    // Windows detection
    if (/Win/.test(platform) || /Windows/.test(userAgent)) {
      return 'windows';
    }

    // Linux detection
    if (/Linux/.test(platform) || /Linux/.test(userAgent)) {
      return 'linux';
    }

    return 'unknown';
  }

  /**
   * Detect OS version from user agent
   * @param {string} userAgent
   * @returns {string}
   */
  detectOSVersion(userAgent) {
    // iOS version
    const iosMatch = userAgent.match(/OS (\d+)[_.](\d+)/);
    if (iosMatch) {
      return `${iosMatch[1]}.${iosMatch[2]}`;
    }

    // Android version
    const androidMatch = userAgent.match(/Android (\d+\.?\d*)/);
    if (androidMatch) {
      return androidMatch[1];
    }

    // Windows version
    const windowsMatch = userAgent.match(/Windows NT (\d+\.\d+)/);
    if (windowsMatch) {
      const ntVersion = windowsMatch[1];
      // Map NT versions to Windows versions
      const versionMap = {
        '10.0': '10',
        6.3: '8.1',
        6.2: '8',
        6.1: '7',
      };
      return versionMap[ntVersion] || ntVersion;
    }

    // macOS version
    const macMatch = userAgent.match(/Mac OS X (\d+)[_.](\d+)/);
    if (macMatch) {
      return `${macMatch[1]}.${macMatch[2]}`;
    }

    return 'unknown';
  }

  /**
   * Detect device type (desktop, mobile, tablet)
   * @param {string} userAgent
   * @returns {DeviceType}
   */
  detectDeviceType(userAgent) {
    // Tablet detection
    if (
      /iPad/.test(userAgent) ||
      (/Android/.test(userAgent) && !/Mobile/.test(userAgent))
    ) {
      return 'tablet';
    }

    // Mobile detection
    if (
      /iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|webOS/.test(
        userAgent,
      )
    ) {
      return 'mobile';
    }

    // Default to desktop
    return 'desktop';
  }

  /**
   * Check if running as PWA (Progressive Web App)
   * @returns {boolean}
   */
  isPWA() {
    // Check if installed as PWA
    return (
      this.isStandalone() ||
      window.matchMedia('(display-mode: standalone)').matches
    );
  }

  /**
   * Check if running in standalone mode
   * @returns {boolean}
   */
  isStandalone() {
    // iOS standalone mode
    if (window.navigator.standalone === true) {
      return true;
    }

    // Android/Chrome standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return true;
    }

    return false;
  }

  /**
   * Check if notifications are supported on this platform
   * @returns {boolean}
   */
  isNotificationSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  /**
   * Check if PWA installation is required for notifications
   * @returns {boolean}
   */
  requiresPWAInstall() {
    const platform = this.detectPlatform();

    // iOS Safari requires PWA installation for notifications (iOS 16.4+)
    if (platform.os === 'ios' && platform.browser === 'safari') {
      const version = parseFloat(platform.osVersion);
      if (version >= 16.4) {
        return !platform.isStandalone;
      }
    }

    return false;
  }

  /**
   * Get platform-specific limitations
   * @returns {string[]}
   */
  getPlatformLimitations() {
    const platform = this.detectPlatform();
    const limitations = [];

    // iOS limitations
    if (platform.os === 'ios') {
      const version = parseFloat(platform.osVersion);
      if (version < 16.4) {
        limitations.push(
          'Web push notifications not supported on iOS versions below 16.4',
        );
      } else if (!platform.isStandalone) {
        limitations.push(
          'Must be installed as PWA (add to home screen) for notifications',
        );
      }
    }

    // Safari limitations
    if (platform.browser === 'safari' && platform.os === 'macos') {
      limitations.push('May require explicit permission in System Preferences');
    }

    // Firefox private browsing
    if (platform.browser === 'firefox') {
      limitations.push('Notifications may not work in private browsing mode');
    }

    // General service worker requirement
    if (!this.isNotificationSupported()) {
      limitations.push('Browser does not support web push notifications');
    }

    return limitations;
  }
}

// Export singleton instance
export const platformDetector = new PlatformDetector();
