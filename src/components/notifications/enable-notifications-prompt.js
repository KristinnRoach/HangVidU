// enable-notifications-prompt.js - Prompt user to enable push notifications

import { createNotification } from './notification.js';
import { inAppNotificationManager } from './in-app-notification-manager.js';
import { pushNotificationController } from '../../notifications/push-notification-controller.js';
import { showSuccessToast, showWarningToast } from '../../utils/ui/toast.js';
import { t } from '../../i18n/index.js';

const NOTIFICATION_ID = 'enable-notifications';

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
    template: `
      <div class="notification-content">
        <div class="notification-header">
          <span class="notification-icon">🔔</span>
          <span class="notification-title">${t('notification.enable.title')}</span>
          <button class="notification-dismiss" onclick="handleDismiss" title="${t('shared.dismiss')}">×</button>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            ${t('notification.enable.body')}
          </p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-primary" onclick="handleEnable">
            ${t('shared.enable')}
          </button>
        </div>
      </div>
    `,
    className: 'notification enable-notifications-notification',
    handlers: {
      handleEnable: async (e) => {
        const btn = e.target;
        btn.disabled = true;
        btn.textContent = t('notification.enable.enabling');

        try {
          // This is now in a user gesture handler, so requestPermission will work
          const result = await pushNotificationController.requestPermission();

          if (result.state === 'granted') {
            showSuccessToast(t('notification.enable.success'));
            inAppNotificationManager.remove(NOTIFICATION_ID);
          } else if (result.state === 'denied') {
            showWarningToast(t('notification.enable.blocked'));
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
