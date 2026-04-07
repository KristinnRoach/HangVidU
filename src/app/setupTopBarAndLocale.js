import {
  addDebugUpdateButton,
  createNotificationsToggle,
  inAppNotificationManager,
} from '../features/notifications/index.js';
import { getLocale, setLocale } from '../i18n/index.js';

/**
 * Setup lightweight app chrome controls that do not require call/session state.
 *
 * @param {{ appWrapper: HTMLElement|null, showDebugUIForNotifications?: boolean }} options
 */
export function setupTopBarAndLocale(options) {
  const { appWrapper, showDebugUIForNotifications = false } = options;

  // Add debug button for testing update notification (dev only)
  showDebugUIForNotifications && addDebugUpdateButton();

  // Initialize notification system for production (PWA updates, etc.)
  const topRightMenu = document.querySelector('.top-right-menu');
  if (topRightMenu) {
    const notificationsToggle = createNotificationsToggle({
      parent: topRightMenu,
      hideWhenAllRead: false,
    });
    inAppNotificationManager.setToggle(notificationsToggle);
  }

  // TODO: integrate into template (and settings menu once implemented)
  const toggleLangBtn = document.createElement('button');
  toggleLangBtn.id = 'toggle-lang-btn';
  toggleLangBtn.textContent = `🌐 ${getLocale().toUpperCase()}`;
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
    toggleLangBtn.textContent = `🌐 ${newLocale.toUpperCase()}`;
  };
  appWrapper && appWrapper.appendChild(toggleLangBtn);
}
