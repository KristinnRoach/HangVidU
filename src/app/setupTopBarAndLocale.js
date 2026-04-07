import {
  addDebugUpdateButton,
  createNotificationsToggle,
  inAppNotificationManager,
} from '../features/notifications/index.js';
import { getLocale, setLocale, onLocaleChange } from '../i18n/index.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup removes DOM injection/listeners
 *
 * Setup lightweight app chrome controls that do not require call/session state.
 *
 * @param {{ appWrapper: HTMLElement|null, showDebugUIForNotifications?: boolean }} options
 * @returns {Promise<() => void>}
 */
export function setupTopBarAndLocale(options) {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  const { appWrapper, showDebugUIForNotifications = false } = options;

  initPromise = Promise.resolve().then(() => {
    let notificationsToggle = null;

    // Add debug button for testing update notification (dev only)
    showDebugUIForNotifications && addDebugUpdateButton();

    // Initialize notification system for production (PWA updates, etc.)
    const topRightMenu = document.querySelector('.top-right-menu');
    if (topRightMenu) {
      notificationsToggle = createNotificationsToggle({
        parent: topRightMenu,
        hideWhenAllRead: false,
      });
      inAppNotificationManager.setToggle(notificationsToggle);
    }

    // TODO: integrate into template (and settings menu once implemented)
    const toggleLangBtn = document.createElement('button');
    toggleLangBtn.id = 'toggle-lang-btn';

    const renderLocaleLabel = () => {
      const localeUpperCase = getLocale().toUpperCase();
      if (toggleLangBtn.textContent !== `🌐 ${localeUpperCase}`) {
        toggleLangBtn.textContent = `🌐 ${localeUpperCase}`;
      }
    };
    renderLocaleLabel();

    toggleLangBtn.style.cssText = `
      position: fixed;
      bottom: 2px;
      left: 2px;

      z-index: 0;
      padding: 8px 12px;
      background: transparent;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      white-space: nowrap;
      cursor: pointer;
      box-shadow: none; 
    `;
    toggleLangBtn.onclick = async () => {
      const newLocale = getLocale() === 'en' ? 'is' : 'en';
      await setLocale(newLocale);
      renderLocaleLabel();
    };

    const unsubscribeLocaleChange = onLocaleChange(renderLocaleLabel);
    appWrapper && appWrapper.appendChild(toggleLangBtn);

    // Special-case stale cleanup guard: this setup owns shared singleton UI
    // state (`inAppNotificationManager`), so an old cleanup must never tear
    // down a newer initialized generation.
    let isCleanedUp = false;
    const activeCleanup = () => {
      if (cleanup !== activeCleanup || isCleanedUp) {
        return;
      }
      isCleanedUp = true;
      try {
        unsubscribeLocaleChange?.();
      } catch (error) {
        console.warn(
          '[setupTopBarAndLocale] cleanup failed to unsubscribe locale listener:',
          error,
        );
      }
      try {
        toggleLangBtn?.remove();
      } catch (error) {
        console.warn(
          '[setupTopBarAndLocale] cleanup failed to remove locale toggle:',
          error,
        );
      }
      try {
        inAppNotificationManager.setToggle(null);
      } catch (error) {
        console.warn(
          '[setupTopBarAndLocale] cleanup failed to clear notification toggle:',
          error,
        );
      }
      try {
        notificationsToggle?.remove();
      } catch (error) {
        console.warn(
          '[setupTopBarAndLocale] cleanup failed to remove notification toggle:',
          error,
        );
      } finally {
        cleanup = () => {
          isReady = false;
        };
        isReady = false;
      }
    };
    cleanup = activeCleanup;
    isReady = true;
    return cleanup;
  }).finally(() => {
    initPromise = null;
  });

  return initPromise;
}
