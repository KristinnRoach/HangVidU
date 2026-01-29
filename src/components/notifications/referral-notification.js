// referral-notification.js - Referral landing notification for logged-out users

import { createNotification } from './notification.js';

/**
 * Create a referral notification prompting sign-in.
 * Shown in the notification panel when a user arrives via referral link.
 *
 * @param {Object} options
 * @param {string|null} options.referrerName - Inviter's display name (null if unknown)
 * @param {string|null} options.referrerPhotoURL - Inviter's photo URL (null if unknown)
 * @param {Function} options.onSignIn - Callback to trigger sign-in flow
 * @returns {HTMLElement} The notification component
 */
export function createReferralNotification({
  referrerName,
  referrerPhotoURL,
  onSignIn,
}) {
  const name = referrerName || 'Someone';

  const iconHtml = referrerPhotoURL
    ? `<img src="[[referrerPhotoURL]]" alt="[[name]]" class="notification-avatar" />`
    : '<span class="notification-icon">👤</span>';

  return createNotification({
    template: `
      <div class="notification-content">
        <div class="notification-header">
          ${iconHtml}
          <span class="notification-title">You've been invited</span>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>[[name]]</strong> invited you to connect
          </p>
          <p class="notification-detail">Sign in to add them as a contact</p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-accept" onclick="handleSignIn">
            Sign in
          </button>
        </div>
      </div>
    `,
    className: 'notification referral-notification',
    handlers: {
      handleSignIn: async (e) => {
        const btn = e.target;
        btn.disabled = true;
        btn.textContent = 'Signing in...';

        try {
          if (onSignIn) await onSignIn();
        } catch (error) {
          console.error('[REFERRAL NOTIFICATION] Sign-in failed:', error);
          btn.disabled = false;
          btn.textContent = 'Sign in';
        }
      },
    },
  });
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
