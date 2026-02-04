// enable-notifications-prompt.js - Prompt user to enable push notifications

import { createNotification } from './notification.js';
import { inAppNotificationManager } from './in-app-notification-manager.js';
import { pushNotificationController } from '../../notifications/push-notification-controller.js';
import { showSuccessToast, showWarningToast } from '../../utils/ui/toast.js';

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
          <span class="notification-title">Enable Notifications</span>
          <button class="notification-dismiss" onclick="handleDismiss" title="Dismiss">×</button>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            Get notified when someone calls you, even when the app is closed.
          </p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-primary" onclick="handleEnable">
            Enable
          </button>
        </div>
      </div>
    `,
    className: 'notification enable-notifications-notification',
    handlers: {
      handleEnable: async (e) => {
        const btn = e.target;
        btn.disabled = true;
        btn.textContent = 'Enabling...';

        try {
          // This is now in a user gesture handler, so requestPermission will work
          const result = await pushNotificationController.requestPermission();

          if (result.state === 'granted') {
            showSuccessToast('Notifications enabled');
            inAppNotificationManager.remove(NOTIFICATION_ID);
          } else if (result.state === 'denied') {
            showWarningToast('Notifications blocked. Check browser settings.');
            inAppNotificationManager.remove(NOTIFICATION_ID);
          } else {
            // Dismissed or other state - keep notification for retry
            btn.disabled = false;
            btn.textContent = 'Enable';
          }
        } catch (error) {
          console.error('[ENABLE NOTIFICATIONS] Failed:', error);
          btn.disabled = false;
          btn.textContent = 'Enable';
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
