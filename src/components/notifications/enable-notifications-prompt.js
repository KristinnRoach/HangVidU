// enable-notifications-prompt.js - Prompt user to enable push notifications

import { createNotification, buildTemplate } from './notification.js';
import { inAppNotificationManager } from './in-app-notification-manager.js';
import { pushNotificationController } from '../../notifications/push-notification-controller.js';
import { showSuccessToast, showWarningToast, showErrorToast } from '../../utils/ui/toast.js';
import { t, onLocaleChange } from '../../i18n/index.js';

const NOTIFICATION_ID = 'enable-notifications';

/**
 * Get a browser-specific "blocked" message, falling back to the generic one.
 * @param {string} browser - Browser name from detectBrowser()
 * @param {string} reason - Denial reason ('already-denied' | 'silent-block' | undefined)
 * @returns {string} Localized guidance message
 */
export function getBlockedMessage(browser, reason) {
  if (reason === 'silent-block') {
    return t('notification.enable.silent_block', { browser });
  }

  // Try browser-specific key, fall back to generic
  const browserKey = browser?.toLowerCase();
  const specificKey = `notification.enable.blocked.${browserKey}`;
  const specific = t(specificKey);
  // t() returns the key itself if missing — detect that
  if (specific !== specificKey) return specific;
  return t('notification.enable.blocked');
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
          } else if (result.state === 'error' && result.reason === 'enable-failed') {
            // Permission granted but FCM token/setup failed
            showErrorToast(t('notification.enable.failed'));
            btn.disabled = false;
            btn.textContent = t('shared.enable');
          } else if (result.reason === 'unsupported') {
            // Defensive: shouldn't normally reach here, but handle gracefully
            import('./push-unsupported-notification.js').then(({ showPushUnsupportedNotification }) => {
              showPushUnsupportedNotification();
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
