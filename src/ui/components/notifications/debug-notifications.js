import { inAppNotificationManager } from './in-app-notification-manager.js';
import { isDev } from '../../../utils/dev/dev-utils.js';

/**
 * Debug utility to manually trigger notifications for testing.
 * Only works in dev mode.
 */
export function addDebugUpdateButton() {
  if (!isDev()) return;

  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    position: fixed;
    bottom: 40px;
    right: 12px;
    z-index: 9999;
    padding: 8px;
    border-radius: 4px;
    background: rgb(255 255 255 / 0.3);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
    gap: 8px;
    width: fit-content;
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
    inAppNotificationManager.addDummy();
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
    inAppNotificationManager.clear();
  };

  buttonContainer.appendChild(addBtn);
  buttonContainer.appendChild(clearBtn);
  document.body.appendChild(buttonContainer);
}
