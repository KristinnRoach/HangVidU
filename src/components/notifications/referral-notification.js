// referral-notification.js - Referral landing notification for logged-out users

import { createNotification } from './notification.js';
import { escapeHtml } from '../../utils/dom/dom-utils.js';
import { t, onLocaleChange } from '../../i18n/index.js';

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
    ? `<img src="${escapeHtml(referrerPhotoURL)}" alt="${escapeHtml(name)}" class="notification-avatar" />`
    : '<span class="notification-icon">👤</span>';

  return createNotification({
    template: `
      <div class="notification-content">
        <div class="notification-header">
          ${iconHtml}
          <span class="notification-title">[[t:notification.referral.title]]</span>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>${escapeHtml(name)}</strong> [[t:notification.referral.suffix]]
          </p>
          <p class="notification-detail">[[t:notification.referral.sign_in_prompt]]</p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-accept" onclick="handleSignIn">
            [[t:notification.referral.sign_in]]
          </button>
        </div>
      </div>
    `,
    className: 'notification referral-notification',
    templateFns: { t: { resolve: t, onChange: onLocaleChange } },
    handlers: {
      handleSignIn: async (e) => {
        const btn = e.target;
        btn.disabled = true;
        btn.textContent = t('notification.referral.signing_in');

        try {
          if (onSignIn) await onSignIn();
        } catch (error) {
          console.error('[REFERRAL NOTIFICATION] Sign-in failed:', error);
          btn.disabled = false;
          btn.textContent = t('notification.referral.sign_in');
        }
      },
    },
  });
}
