// invite-notification.js - Contact invitation notification component

import { createNotification } from './notification.js';

/**
 * Create an invite notification component.
 * Shows in the notification list with accept/decline actions.
 *
 * @param {Object} options - Configuration
 * @param {string} options.fromUserId - Sender's user ID
 * @param {Object} options.inviteData - Invite data (fromName, fromEmail, etc.)
 * @param {Function} options.onAccept - Callback when invite is accepted
 * @param {Function} options.onDecline - Callback when invite is declined
 * @returns {HTMLElement} The notification component
 */
export function createInviteNotification({
  fromUserId,
  inviteData,
  onAccept,
  onDecline,
}) {
  const fromName = inviteData.fromName || 'Someone';
  const fromEmail = inviteData.fromEmail || '';
  const fromPhotoURL = inviteData.fromPhotoURL;

  // Use profile picture if available, otherwise use emoji icon
  const iconHtml = fromPhotoURL
    ? `<img src="${escapeHtml(fromPhotoURL)}" alt="${escapeHtml(fromName)}" class="notification-avatar" />`
    : '<span class="notification-icon">👤</span>';

  const notification = createNotification({
    template: `
      <div class="notification-content">
        <div class="notification-header">
          ${iconHtml}
          <span class="notification-title">Contact Invitation</span>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>${escapeHtml(fromName)}</strong> wants to connect
          </p>
          ${fromEmail ? `<p class="notification-detail">${escapeHtml(fromEmail)}</p>` : ''}
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-accept" onclick="handleAccept">
            Accept
          </button>
          <button class="notification-btn notification-btn-decline" onclick="handleDecline">
            Decline
          </button>
        </div>
      </div>
    `,
    className: 'notification invite-notification',
    handlers: {
      handleAccept: async (e) => {
        const btn = e.target;
        btn.disabled = true;
        btn.textContent = 'Accepting...';

        try {
          if (onAccept) await onAccept();
          // Notification will be disposed by the manager after onAccept completes
        } catch (error) {
          console.error('[INVITE NOTIFICATION] Accept failed:', error);
          btn.disabled = false;
          btn.textContent = 'Accept';
        }
      },
      handleDecline: async (e) => {
        const btn = e.target;
        btn.disabled = true;
        btn.textContent = 'Declining...';

        try {
          if (onDecline) await onDecline();
          // Notification will be disposed by the manager after onDecline completes
        } catch (error) {
          console.error('[INVITE NOTIFICATION] Decline failed:', error);
          btn.disabled = false;
          btn.textContent = 'Decline';
        }
      },
    },
  });

  return notification;
}

/**
 * Escape HTML to prevent XSS
 * @private
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}
