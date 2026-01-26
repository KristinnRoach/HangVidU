import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PlatformDetector } from './platform-detector.js';

describe('PlatformDetector', () => {
  let detector;

  beforeEach(() => {
    detector = new PlatformDetector();
  });

  describe('detectBrowser', () => {
    it('detects Chrome browser', () => {
      const userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
      expect(detector.detectBrowser(userAgent)).toBe('chrome');
    });

    it('detects Firefox browser', () => {
      const userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0';
      expect(detector.detectBrowser(userAgent)).toBe('firefox');
    });

    it('detects Safari browser', () => {
      const userAgent =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
      expect(detector.detectBrowser(userAgent)).toBe('safari');
    });

    it('detects Edge browser', () => {
      const userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0';
      expect(detector.detectBrowser(userAgent)).toBe('edge');
    });

    it('detects Opera browser', () => {
      const userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0';
      expect(detector.detectBrowser(userAgent)).toBe('opera');
    });

    it('detects Samsung browser', () => {
      const userAgent =
        'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36';
      expect(detector.detectBrowser(userAgent)).toBe('samsung');
    });

    it('returns unknown for unrecognized browser', () => {
      const userAgent = 'Some Unknown Browser/1.0';
      expect(detector.detectBrowser(userAgent)).toBe('unknown');
    });
  });

  describe('detectOS', () => {
    it('detects Windows OS', () => {
      const userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
      const platform = 'Win32';
      expect(detector.detectOS(userAgent, platform)).toBe('windows');
    });

    it('detects macOS', () => {
      const userAgent =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';
      const platform = 'MacIntel';
      expect(detector.detectOS(userAgent, platform)).toBe('macos');
    });

    it('detects iOS from iPhone', () => {
      const userAgent =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15';
      const platform = 'iPhone';
      expect(detector.detectOS(userAgent, platform)).toBe('ios');
    });

    it('detects iOS from iPad', () => {
      const userAgent =
        'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15';
      const platform = 'iPad';
      expect(detector.detectOS(userAgent, platform)).toBe('ios');
    });

    it('detects Android OS', () => {
      const userAgent = 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36';
      const platform = 'Linux armv8l';
      expect(detector.detectOS(userAgent, platform)).toBe('android');
    });

    it('detects Linux OS', () => {
      const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36';
      const platform = 'Linux x86_64';
      expect(detector.detectOS(userAgent, platform)).toBe('linux');
    });
  });

  describe('detectDeviceType', () => {
    it('detects mobile device from iPhone', () => {
      const userAgent =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)';
      expect(detector.detectDeviceType(userAgent)).toBe('mobile');
    });

    it('detects tablet device from iPad', () => {
      const userAgent = 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)';
      expect(detector.detectDeviceType(userAgent)).toBe('tablet');
    });

    it('detects mobile device from Android phone', () => {
      const userAgent =
        'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Mobile';
      expect(detector.detectDeviceType(userAgent)).toBe('mobile');
    });

    it('detects tablet device from Android tablet', () => {
      const userAgent = 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36';
      expect(detector.detectDeviceType(userAgent)).toBe('tablet');
    });

    it('detects desktop device', () => {
      const userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
      expect(detector.detectDeviceType(userAgent)).toBe('desktop');
    });
  });

  describe('detectBrowserVersion', () => {
    it('detects Chrome version', () => {
      const userAgent =
        'Mozilla/5.0 (Windows NT 10.0) Chrome/120.5.0.0 Safari/537.36';
      expect(detector.detectBrowserVersion(userAgent)).toBe('120.5');
    });

    it('detects Firefox version', () => {
      const userAgent = 'Mozilla/5.0 (Windows NT 10.0) Firefox/121.0';
      expect(detector.detectBrowserVersion(userAgent)).toBe('121.0');
    });

    it('detects Safari version', () => {
      const userAgent = 'Mozilla/5.0 (Macintosh) Version/17.2 Safari/605.1.15';
      expect(detector.detectBrowserVersion(userAgent)).toBe('17.2');
    });

    it('detects Edge version', () => {
      const userAgent =
        'Mozilla/5.0 (Windows NT 10.0) Chrome/120.0.0.0 Edg/120.3.0.0';
      expect(detector.detectBrowserVersion(userAgent)).toBe('120.3');
    });
  });

  describe('detectOSVersion', () => {
    it('detects iOS version', () => {
      const userAgent =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X)';
      expect(detector.detectOSVersion(userAgent)).toBe('17.2');
    });

    it('detects Android version', () => {
      const userAgent = 'Mozilla/5.0 (Linux; Android 13.0) AppleWebKit/537.36';
      expect(detector.detectOSVersion(userAgent)).toBe('13.0');
    });

    it('detects Windows version', () => {
      const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
      expect(detector.detectOSVersion(userAgent)).toBe('10');
    });

    it('detects macOS version', () => {
      const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)';
      expect(detector.detectOSVersion(userAgent)).toBe('10.15');
    });
  });

  describe('isPWA and isStandalone', () => {
    it('detects standalone mode from navigator.standalone', () => {
      vi.stubGlobal('navigator', { ...navigator, standalone: true });
      expect(detector.isStandalone()).toBe(true);
      vi.unstubAllGlobals();
    });

    it('detects non-standalone mode', () => {
      vi.stubGlobal('navigator', { ...navigator, standalone: false });
      vi.stubGlobal('matchMedia', () => ({ matches: false }));
      expect(detector.isStandalone()).toBe(false);
      vi.unstubAllGlobals();
    });
  });

  describe('isNotificationSupported', () => {
    it('returns true when Notification and serviceWorker are available', () => {
      vi.stubGlobal('Notification', {});
      vi.stubGlobal('navigator', { ...navigator, serviceWorker: {} });
      expect(detector.isNotificationSupported()).toBe(true);
      vi.unstubAllGlobals();
    });

    it('returns false when serviceWorker is not available', () => {
      vi.stubGlobal('Notification', {});
      vi.stubGlobal('navigator', {});
      expect(detector.isNotificationSupported()).toBe(false);
      vi.unstubAllGlobals();
    });
  });

  describe('requiresPWAInstall', () => {
    it('returns true for iOS Safari 16.4+ in browser mode', () => {
      const userAgent =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 Version/16.4 Safari/605.1.15';
      vi.spyOn(detector, 'detectPlatform').mockReturnValue({
        browser: 'safari',
        browserVersion: '16.4',
        os: 'ios',
        osVersion: '16.4',
        deviceType: 'mobile',
        isPWA: false,
        isStandalone: false,
      });
      expect(detector.requiresPWAInstall()).toBe(true);
      vi.restoreAllMocks();
    });

    it('returns false for iOS Safari 16.4+ in standalone mode', () => {
      vi.spyOn(detector, 'detectPlatform').mockReturnValue({
        browser: 'safari',
        browserVersion: '16.4',
        os: 'ios',
        osVersion: '16.4',
        deviceType: 'mobile',
        isPWA: true,
        isStandalone: true,
      });
      expect(detector.requiresPWAInstall()).toBe(false);
      vi.restoreAllMocks();
    });

    it('returns false for Chrome on Android', () => {
      vi.spyOn(detector, 'detectPlatform').mockReturnValue({
        browser: 'chrome',
        browserVersion: '120.0',
        os: 'android',
        osVersion: '13',
        deviceType: 'mobile',
        isPWA: false,
        isStandalone: false,
      });
      expect(detector.requiresPWAInstall()).toBe(false);
      vi.restoreAllMocks();
    });
  });

  describe('getPlatformLimitations', () => {
    it('returns limitations for iOS < 16.4', () => {
      vi.spyOn(detector, 'detectPlatform').mockReturnValue({
        browser: 'safari',
        browserVersion: '15.0',
        os: 'ios',
        osVersion: '15.0',
        deviceType: 'mobile',
        isPWA: false,
        isStandalone: false,
      });
      vi.spyOn(detector, 'isNotificationSupported').mockReturnValue(false);

      const limitations = detector.getPlatformLimitations();
      expect(limitations).toContain(
        'Web push notifications not supported on iOS versions below 16.4',
      );
      vi.restoreAllMocks();
    });

    it('returns PWA requirement for iOS 16.4+ in browser mode', () => {
      vi.spyOn(detector, 'detectPlatform').mockReturnValue({
        browser: 'safari',
        browserVersion: '16.4',
        os: 'ios',
        osVersion: '16.4',
        deviceType: 'mobile',
        isPWA: false,
        isStandalone: false,
      });
      vi.spyOn(detector, 'isNotificationSupported').mockReturnValue(true);

      const limitations = detector.getPlatformLimitations();
      expect(limitations).toContain(
        'Must be installed as PWA (add to home screen) for notifications',
      );
      vi.restoreAllMocks();
    });

    it('returns Safari macOS limitations', () => {
      vi.spyOn(detector, 'detectPlatform').mockReturnValue({
        browser: 'safari',
        browserVersion: '17.0',
        os: 'macos',
        osVersion: '14.0',
        deviceType: 'desktop',
        isPWA: false,
        isStandalone: false,
      });
      vi.spyOn(detector, 'isNotificationSupported').mockReturnValue(true);

      const limitations = detector.getPlatformLimitations();
      expect(limitations).toContain(
        'May require explicit permission in System Preferences',
      );
      vi.restoreAllMocks();
    });
  });

  describe('detectPlatform integration', () => {
    it('returns complete platform information', () => {
      const platform = detector.detectPlatform();

      expect(platform).toHaveProperty('browser');
      expect(platform).toHaveProperty('browserVersion');
      expect(platform).toHaveProperty('os');
      expect(platform).toHaveProperty('osVersion');
      expect(platform).toHaveProperty('deviceType');
      expect(platform).toHaveProperty('isPWA');
      expect(platform).toHaveProperty('isStandalone');
    });
  });
});
