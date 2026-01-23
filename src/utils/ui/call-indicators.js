/**
 * Call Indicator Manager Module
 *
 * Manages Page Visibility API integration for incoming call notifications.
 * Provides visual indicators (title flashing, favicon changes, badges) when
 * the app is open but not actively focused.
 */

/**
 * Get current favicon href
 * @returns {string}
 */
function getFaviconHref() {
  const link = document.querySelector("link[rel~='icon']");
  return link ? link.href : '/favicon.ico';
}

/**
 * CallIndicators Class
 * Singleton managing visual call indicators based on page visibility
 */
class CallIndicators {
  constructor() {
    this.originalTitle = document.title;
    this.originalFavicon = getFaviconHref();
    this.titleFlashInterval = null;
    this.isFlashing = false;
    this.wakeLock = null;

    // Listen for visibility changes to auto-stop flashing
    this.setupVisibilityListener();
  }

  /**
   * Setup global visibility change listener
   * Auto-stops flashing when user returns to tab
   * @private
   */
  setupVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isFlashing) {
        // User returned to tab - stop flashing but keep other indicators
        this.stopTitleFlashing();
      }
    });
  }

  /**
   * Start visual indicators for incoming call
   * Only activates if page is hidden (not focused)
   * @param {string} callerName - Name of caller to display in title
   */
  startCallIndicators(callerName) {
    console.log(`[CallIndicators] Starting call indicators for: ${callerName}`);

    // Always start title flashing (even if visible, for consistency)
    this.startTitleFlashing(callerName);

    // Change favicon
    const baseUrl = import.meta.env.BASE_URL;
    this.setFavicon(`${baseUrl}icons/phone-ringing.svg`);

    // Set badge (if supported)
    this.setBadge(1);

    // Request wake lock (if supported)
    this.requestWakeLock();
  }

  /**
   * Stop all visual indicators
   */
  stopCallIndicators() {
    console.log('[CallIndicators] Stopping call indicators');

    this.stopTitleFlashing();
    this.restoreFavicon();
    this.clearBadge();
    this.releaseWakeLock();
  }

  /**
   * Flash tab title between app name and call notification
   * @param {string} callerName - Caller name to display
   */
  startTitleFlashing(callerName) {
    // Stop any existing flashing first
    this.stopTitleFlashing();

    let showCallText = true;
    this.isFlashing = true;

    // Flash immediately once
    document.title = `📞 Call from ${callerName}!`;

    // Then continue flashing
    this.titleFlashInterval = setInterval(() => {
      if (!this.isFlashing) return;

      document.title = showCallText
        ? `📞 Call from ${callerName}!`
        : this.originalTitle;
      showCallText = !showCallText;
    }, 1000);
  }

  /**
   * Stop title flashing and restore original title
   */
  stopTitleFlashing() {
    if (this.titleFlashInterval) {
      clearInterval(this.titleFlashInterval);
      this.titleFlashInterval = null;
    }
    this.isFlashing = false;
    document.title = this.originalTitle;
  }

  /**
   * Change favicon to specified icon
   * @param {string} iconPath - Path to icon file
   */
  setFavicon(iconPath) {
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = iconPath;
      console.log(`[CallIndicators] Favicon changed to: ${iconPath}`);
    }
  }

  /**
   * Restore original favicon
   */
  restoreFavicon() {
    this.setFavicon(this.originalFavicon);
  }

  /**
   * Set app badge count (PWA dock/taskbar icon)
   * @param {number} count - Badge count to display
   */
  setBadge(count) {
    if ('setAppBadge' in navigator) {
      navigator
        .setAppBadge(count)
        .then(() => {
          console.log(`[CallIndicators] Badge set to: ${count}`);
        })
        .catch((err) => {
          console.warn('[CallIndicators] Badge not supported:', err);
        });
    }
  }

  /**
   * Clear app badge
   */
  clearBadge() {
    if ('clearAppBadge' in navigator) {
      navigator
        .clearAppBadge()
        .then(() => {
          console.log('[CallIndicators] Badge cleared');
        })
        .catch((err) => {
          console.warn('[CallIndicators] Badge clear failed:', err);
        });
    }
  }

  /**
   * Request wake lock to keep screen awake during call
   * @async
   */
  async requestWakeLock() {
    if (!('wakeLock' in navigator)) {
      return; // Wake Lock API not supported
    }

    try {
      this.wakeLock = await navigator.wakeLock.request('screen');
      console.log('[CallIndicators] Wake lock active');

      // Re-request wake lock if it's released (e.g., tab visibility change)
      this.wakeLock.addEventListener(
        'release',
        () => {
          console.log('[CallIndicators] Wake lock released');
          this.wakeLock = null;
        },
        { once: true },
      );
    } catch (err) {
      console.warn('[CallIndicators] Wake lock failed:', err);
    }
  }

  /**
   * Release wake lock to allow screen to sleep
   */
  releaseWakeLock() {
    if (this.wakeLock) {
      const lock = this.wakeLock;
      this.wakeLock = null; // Clear immediately to prevent race conditions

      lock
        .release()
        .then(() => {
          console.log('[CallIndicators] Wake lock released manually');
        })
        .catch((err) => {
          console.warn('[CallIndicators] Wake lock release failed:', err);
        });
    }
  }
}

// Export singleton instance
export const callIndicators = new CallIndicators();
