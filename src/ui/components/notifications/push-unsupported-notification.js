// push-unsupported-notification.js - Notification for browsers without Web Push support

import { createNotification, buildTemplate } from './notification.js';
import { inAppNotificationManager } from './in-app-notification-manager.js';
import { t, onLocaleChange } from '../../../i18n/index.js';

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
    template: buildTemplate({
      header: `
        <span class="notification-title">[[t:notification.push.unsupported.title]]</span>
        <button class="notification-dismiss" onclick="handleDismiss" title="[[t:shared.dismiss]]">×</button>
      `,
      body: `
        <p class="notification-message">
          [[t:notification.push.unsupported.body]]
        </p>
      `,
      actions: `
        <button class="notification-btn notification-btn-secondary" onclick="handleDismiss">
          [[t:notification.push.got_it]]
        </button>
      `,
    }),
    className: 'notification push-unsupported-notification',
    templateFns: { t: { resolve: t, onChange: onLocaleChange } },
    handlers: {
      handleDismiss: () => {
        inAppNotificationManager.remove(NOTIFICATION_ID);
      },
    },
  });

  inAppNotificationManager.add(NOTIFICATION_ID, notification);

  return notification;
}
