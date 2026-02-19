// enable-notifications-prompt.js - Prompt user to enable push notifications

import { createNotification, buildTemplate } from './notification.js';
import { inAppNotificationManager } from './in-app-notification-manager.js';
import { pushNotificationController } from '../../../notifications/push-notification-controller.js';
import {
  showSuccessToast,
  showWarningToast,
  showErrorToast,
} from '../../utils/toast.js';
import { t, onLocaleChange } from '../../../i18n/index.js';

const NOTIFICATION_ID = 'enable-notifications';

/**
 * Get a browser-specific "blocked" message, falling back to the generic one.
 * @param {string} browser - Browser name from detectBrowser()
 * @param {string} reason - Denial reason ('already-denied' | 'silent-block' | undefined)
 * @returns {string} Localized guidance message
 */
export function getBlockedMessage(browser, reason) {
  if (reason === 'silent-block') {
    const msg = t('notification.enable.silent_block', { browser });
    // If translation missing, fallback to interpolated string
    if (msg && msg !== 'notification.enable.silent_block') return msg;
    return `Notifications were automatically blocked by ${browser || 'your browser'}. Open site settings in the address bar to allow.`;
  }

  const browserKey = browser?.toLowerCase();
  if (browserKey === 'chrome') {
    const msg = t('notification.enable.blocked.chrome');
    if (msg && msg !== 'notification.enable.blocked.chrome') return msg;
    return 'Notifications blocked. Click the icon in the address bar to allow.';
  }
  if (browserKey === 'firefox') {
    const msg = t('notification.enable.blocked.firefox');
    if (msg && msg !== 'notification.enable.blocked.firefox') return msg;
    return 'Notifications blocked. Click the lock icon in the address bar, then Permissions.';
  }
  // Fallback to generic
  const generic = t('notification.enable.blocked');
  if (generic && generic !== 'notification.enable.blocked') return generic;
  return 'Notifications blocked. Check browser settings.';
}

/**
 * Show an in-app notification prompting user to enable push notifications.
 * The "Enable" button triggers the browser permission prompt (requires user gesture).
 * @returns {HTMLElement|null} The notification component, or null if already showing
 */
export function showEnableNotificationsPrompt() {
  // Don't show duplicate
  if (inAppNotificationManager.has(NOTIFICATION_ID)) {
    return inAppNotificationManager.notifications.get(NOTIFICATION_ID);
  }

  const notification = createNotification({
    template: buildTemplate({
      header: `
        <span class="notification-icon">🔔</span>
        <span class="notification-title">[[t:notification.enable.title]]</span>
        <button class="notification-dismiss" onclick="handleDismiss" title="[[t:shared.dismiss]]">×</button>
      `,
      body: `
        <p class="notification-message">
          [[t:notification.enable.body]]
        </p>
      `,
      actions: `
        <button class="notification-btn notification-btn-primary" onclick="handleEnable">
          [[t:shared.enable]]
        </button>
      `,
    }),
    className: 'notification enable-notifications-notification',
    templateFns: { t: { resolve: t, onChange: onLocaleChange } },
    handlers: {
      handleEnable: async (e) => {
        const btn = e.target;
        btn.disabled = true;
        btn.textContent = t('notification.enable.enabling');

        try {
          const result = await pushNotificationController.requestPermission();

          if (result.state === 'granted') {
            showSuccessToast(t('notification.enable.success'));
            inAppNotificationManager.remove(NOTIFICATION_ID);
          } else if (
            result.state === 'error' &&
            result.reason === 'enable-failed'
          ) {
            // Permission granted but FCM token/setup failed
            showErrorToast(t('notification.enable.failed'));
            btn.disabled = false;
            btn.textContent = t('shared.enable');
          } else if (result.reason === 'unsupported') {
            // Defensive: shouldn't normally reach here, but handle gracefully
            import('./push-unsupported-notification.js')
              .then(({ showPushUnsupportedNotification }) => {
                showPushUnsupportedNotification();
              })
              .catch((err) => {
                console.error(
                  '[ENABLE NOTIFICATIONS] Failed to load unsupported notification:',
                  err,
                );
              });
            inAppNotificationManager.remove(NOTIFICATION_ID);
          } else if (result.state === 'denied') {
            showWarningToast(getBlockedMessage(result.browser, result.reason));
            inAppNotificationManager.remove(NOTIFICATION_ID);
          } else {
            // Dismissed or other state - keep notification for retry
            btn.disabled = false;
            btn.textContent = t('shared.enable');
          }
        } catch (error) {
          console.error('[ENABLE NOTIFICATIONS] Failed:', error);
          btn.disabled = false;
          btn.textContent = t('shared.enable');
        }
      },
      handleDismiss: () => {
        inAppNotificationManager.remove(NOTIFICATION_ID);
      },
    },
  });

  inAppNotificationManager.add(NOTIFICATION_ID, notification);

  return notification;
}

/**
 * Remove the enable notifications prompt if showing
 */
export function hideEnableNotificationsPrompt() {
  inAppNotificationManager.remove(NOTIFICATION_ID);
}
