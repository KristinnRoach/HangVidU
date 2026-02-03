// push-unsupported-notification.js - Notification for browsers without Web Push support

import { createNotification } from './notification.js';
import { inAppNotificationManager } from './in-app-notification-manager.js';

const NOTIFICATION_ID = 'push-unsupported';

/**
 * Shows a notification informing the user that push notifications
 * are not supported in their current browser and suggesting alternatives.
 *
 * Targets iOS Safari PWAs and other environments lacking PushManager.
 *
 * @returns {HTMLElement} The notification component
 */
export function showPushUnsupportedNotification() {
  if (inAppNotificationManager.has(NOTIFICATION_ID)) {
    return inAppNotificationManager.notifications.get(NOTIFICATION_ID);
  }

  const notification = createNotification({
    template: `
      <div class="notification-content">
        <div class="notification-header">
          <span class="notification-title">Push notifications unavailable</span>
          <button class="notification-dismiss" onclick="handleDismiss" title="Dismiss">\u00d7</button>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            Your browser doesn't support push notifications.
            To receive call alerts when the app isn't focused, install via
            <strong>Chrome</strong>, <strong>Edge</strong>, or <strong>Firefox</strong>.
          </p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-secondary" onclick="handleDismiss">
            Got it
          </button>
        </div>
      </div>
    `,
    className: 'notification push-unsupported-notification',
    handlers: {
      handleDismiss: () => {
        inAppNotificationManager.remove(NOTIFICATION_ID);
      },
    },
  });

  inAppNotificationManager.add(NOTIFICATION_ID, notification);

  return notification;
}
