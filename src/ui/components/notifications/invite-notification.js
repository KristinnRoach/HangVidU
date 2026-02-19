// invite-notification.js - Contact invitation notification component

import { createNotification, buildTemplate } from './notification.js';
import { escapeHtml } from '../../../ui/component-system/dom-utils.js';
import { t, onLocaleChange } from '../../../i18n/index.js';

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
    template: buildTemplate({
      header: `
        ${iconHtml}
        <span class="notification-title">[[t:notification.invite.title]]</span>
      `,
      body: `
        <p class="notification-message">
          <strong>${escapeHtml(fromName)}</strong> [[t:notification.invite.suffix]]
        </p>
        ${fromEmail ? `<p class="notification-detail">${escapeHtml(fromEmail)}</p>` : ''}
      `,
      actions: `
        <button class="notification-btn notification-btn-accept" onclick="handleAccept">
          [[t:notification.invite.accept]]
        </button>
        <button class="notification-btn notification-btn-decline" onclick="handleDecline">
          [[t:notification.invite.decline]]
        </button>
      `,
    }),
    className: 'notification invite-notification',
    templateFns: { t: { resolve: t, onChange: onLocaleChange } },
    handlers: {
      handleAccept: async (e) => {
        const btn = e.target;
        btn.disabled = true;
        btn.textContent = t('notification.invite.accepting');

        try {
          if (onAccept) await onAccept();
          // Notification will be disposed by the manager after onAccept completes
        } catch (error) {
          console.error('[INVITE NOTIFICATION] Accept failed:', error);
          btn.disabled = false;
          btn.textContent = t('notification.invite.accept');
        }
      },
      handleDecline: async (e) => {
        const btn = e.target;
        btn.disabled = true;
        btn.textContent = t('notification.invite.declining');

        try {
          if (onDecline) await onDecline();
          // Notification will be disposed by the manager after onDecline completes
        } catch (error) {
          console.error('[INVITE NOTIFICATION] Decline failed:', error);
          btn.disabled = false;
          btn.textContent = t('notification.invite.decline');
        }
      },
    },
  });

  return notification;
}
