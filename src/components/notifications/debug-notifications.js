import { createNotification } from './notification.js';
import { createNotificationsToggle } from './notifications-toggle.js';
import { inAppNotificationManager } from './in-app-notification-manager.js';
import { isDev } from '../../utils/dev/dev-utils.js';

const HIDE_DEBUG_UI = true; // Set to false to enable debug notification UI in dev mode

let dummyNotificationCounter = 0;

/**
 * Creates a dummy notification for testing
 */
function createDummyNotification() {
  dummyNotificationCounter++;
  const id = `dummy-notification-${dummyNotificationCounter}`;
  const notificationNumber = dummyNotificationCounter;

  const notification = createNotification({
    template: `
      <div class="update-content">
        <p>Dummy Notification #[[number]]</p>
        <div class="update-actions">
          <button onclick="handleDismiss">Dismiss</button>
        </div>
      </div>
    `,
    handlers: {
      handleDismiss: () => {
        console.log(`[DEBUG] Dismissed notification #${notificationNumber}`);
        inAppNotificationManager.remove(id);
      },
    },
    initialProps: { number: notificationNumber },
    className: 'pwa-update-notification',
    parent: document.body,
  });

  inAppNotificationManager.add(id, notification);
  console.log(
    `[DEBUG] Added notification #${notificationNumber}. Total: ${inAppNotificationManager.getCount()}`,
  );
}

/**
 * Debug utility to manually trigger notifications for testing.
 * Only works in dev mode.
 */
export function addDebugUpdateButton() {
  if (HIDE_DEBUG_UI || !isDev()) return;

  // Create notifications toggle in top-right menu
  const topRightMenu = document.querySelector('.top-right-menu');
  if (!topRightMenu) {
    console.warn('[DEBUG] .top-right-menu not found');
    return;
  }

  const notificationsToggle = createNotificationsToggle({
    parent: topRightMenu,
    hideWhenAllRead: false, // Keep visible during dev
    // No onClick - uses default toggle behavior
  });

  // Register toggle with notification manager (auto-wires toggle behavior)
  inAppNotificationManager.setToggle(notificationsToggle);

  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
    gap: 8px;
    max-width: fit-content;
  `;

  // Add notification button
  const addBtn = document.createElement('button');
  addBtn.textContent = '➕';
  addBtn.title = 'Add a dummy notification (dev only)';
  addBtn.style.cssText = `
    padding: 8px 12px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  `;

  addBtn.onclick = () => {
    createDummyNotification();
  };

  // Clear all button
  const clearBtn = document.createElement('button');
  clearBtn.textContent = '🗑️';
  clearBtn.title = 'Clear all notifications (dev only)';
  clearBtn.style.cssText = `
    padding: 8px 12px;
    background: #000000ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  `;

  clearBtn.onclick = () => {
    console.log('[DEBUG] Clearing all notifications');
    inAppNotificationManager.clear();
    dummyNotificationCounter = 0;
  };

  buttonContainer.appendChild(addBtn);
  buttonContainer.appendChild(clearBtn);
  document.body.appendChild(buttonContainer);
}
