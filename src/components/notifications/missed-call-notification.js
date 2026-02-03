// missed-call-notification.js - Missed call notification component

import { createNotification } from './notification.js';
import { escapeHtml } from '../../utils/dom/dom-utils.js';

/**
 * Create a missed call notification component.
 * Shows in the notification list with call back action.
 *
 * @param {Object} options - Configuration
 * @param {string} options.callerId - Caller's user ID
 * @param {string} options.callerName - Caller's display name
 * @param {string} options.roomId - Original room ID
 * @param {Function} options.onCallBack - Callback when user clicks "Call Back"
 * @param {Function} options.onDismiss - Callback when user dismisses notification
 * @returns {HTMLElement} The notification component
 */
export function createMissedCallNotification({
  callerId,
  callerName,
  roomId,
  onCallBack,
  onDismiss,
}) {
  const displayName = callerName || 'Someone';

  // TODO: Add reactive time display (e.g., "2m ago", updates every minute)

  const notification = createNotification({
    template: `
      <div class="notification-content">
        <div class="notification-header">
          <span class="notification-icon">📞</span>
          <span class="notification-title">Missed Call</span>
          <button class="notification-dismiss" onclick="handleDismiss" title="Dismiss">×</button>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>${escapeHtml(displayName)}</strong> tried to call you
          </p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-primary" onclick="handleCallBack">
            Call Back
          </button>
        </div>
      </div>
    `,
    className: 'notification missed-call-notification',
    handlers: {
      handleCallBack: async (e) => {
        const btn = e.target;
        btn.disabled = true;
        btn.textContent = 'Calling...';

        try {
          // TODO: Consider switching to event-driven architecture for ALL call flows
          // This should be done in a dedicated architectural session where we review
          // ALL affected code (call-flow.js, main.js, contacts.js, etc.)
          if (onCallBack) await onCallBack();
          // Notification will be disposed after call is initiated
        } catch (error) {
          console.error('[MISSED CALL NOTIFICATION] Call back failed:', error);
          btn.disabled = false;
          btn.textContent = 'Call Back';
        }
      },
      handleDismiss: () => {
        if (onDismiss) onDismiss();
        // Dispose will be called by notification manager
      },
    },
  });

  return notification;
}

