import { createNotification, buildTemplate } from './notification.js';
import { inAppNotificationManager } from './in-app-notification-manager.js';
import { t, onLocaleChange } from '../../i18n/index.js';

const NOTIFICATION_ID = 'pwa-update';

/**
 * Shows a notification prompting the user to update the PWA.
 * @param {Function} updateSW - Function to trigger the service worker update
 * @returns {HTMLElement} The notification component
 */
export function showUpdateNotification(updateSW) {
  // Don't show duplicate update notifications
  if (inAppNotificationManager.has(NOTIFICATION_ID)) {
    return inAppNotificationManager.notifications.get(NOTIFICATION_ID);
  }

  const notification = createNotification({
    template: buildTemplate({
      body: `<p class="notification-message">[[t:notification.update.title]]</p>`,
      actions: `
        <button class="notification-btn notification-btn-primary" onclick="handleUpdate">[[t:notification.update.update]]</button>
        <button class="notification-btn notification-btn-secondary" onclick="handleLater">[[t:notification.update.later]]</button>
      `,
    }),
    handlers: {
      handleUpdate: () => {
        updateSW(true); // Triggers reload with new version
        inAppNotificationManager.remove(NOTIFICATION_ID);
      },
      handleLater: () => {
        // Keep notification in the manager (bell icon remains)
        // Just hide the notifications list panel if it's open
        if (inAppNotificationManager.isListVisible()) {
          inAppNotificationManager.hideList();
        }
        // Note: notification stays in the list, accessible via bell icon
        // User can click bell to see it again and update when ready
      },
    },
    className: 'notification pwa-update-notification',
    templateFns: { t: { resolve: t, onChange: onLocaleChange } },
    // Don't specify parent - let notification manager handle placement
  });

  // Register with manager (automatically updates toggle)
  inAppNotificationManager.add(NOTIFICATION_ID, notification);

  return notification;
}
