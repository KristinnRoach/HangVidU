import { createNotification } from './notification.js';
import { notificationManager } from './notification-manager.js';

const NOTIFICATION_ID = 'pwa-update';

/**
 * Shows a notification prompting the user to update the PWA.
 * @param {Function} updateSW - Function to trigger the service worker update
 * @returns {HTMLElement} The notification component
 */
export function showUpdateNotification(updateSW) {
  // Don't show duplicate update notifications
  if (notificationManager.has(NOTIFICATION_ID)) {
    return notificationManager.notifications.get(NOTIFICATION_ID);
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
        notificationManager.remove(NOTIFICATION_ID);
      },
      handleLater: () => {
        notificationManager.remove(NOTIFICATION_ID);
      },
    },
    className: 'pwa-update-notification',
    parent: document.body,
  });

  // Register with manager (automatically updates toggle)
  notificationManager.add(NOTIFICATION_ID, notification);

  return notification;
}
