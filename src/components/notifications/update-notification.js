import { createNotification } from './notification.js';
import { inAppNotificationManager } from './in-app-notification-manager.js';

const NOTIFICATION_ID = 'pwa-update';

/**
 * Display an in-app update notification and register it with the notification manager.
 *
 * If an update notification with the same id already exists, returns that existing notification
 * instead of creating a duplicate. The created notification presents "Update" and "Later"
 * actions: "Update" calls the provided updater and removes the notification from the manager;
 * "Later" hides the notifications list if visible but keeps the notification registered so it
 * remains accessible via the manager's UI.
 * @param {Function} updateSW - Function invoked to trigger the service worker update; called with `true` to reload into the new version.
 * @returns {HTMLElement} The notification element (or the existing registered notification if one was already present).
 */
export function showUpdateNotification(updateSW) {
  // Don't show duplicate update notifications
  if (inAppNotificationManager.has(NOTIFICATION_ID)) {
    return inAppNotificationManager.notifications.get(NOTIFICATION_ID);
  }

  const notification = createNotification({
    template: `
      <div class="update-content">
        <p>Update available</p>
        <div class="update-actions">
          <button onclick="handleUpdate">Update</button>
          <button onclick="handleLater">Later</button>
        </div>
      </div>
    `,
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
    className: 'pwa-update-notification',
    // Don't specify parent - let notification manager handle placement
  });

  // Register with manager (automatically updates toggle)
  inAppNotificationManager.add(NOTIFICATION_ID, notification);

  return notification;
}