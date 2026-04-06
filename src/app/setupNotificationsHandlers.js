import { subscribe } from '../events/index.js';
import {
  createInviteNotification,
  createReferralNotification,
  inAppNotificationManager,
} from '../features/notifications/index.js';

let cleanupNotificationsHandlers = null;

/**
 * Register app-level handlers that project feature facts into notification UI.
 *
 * @returns {() => void}
 */
export function setupNotificationsHandlers() {
  if (cleanupNotificationsHandlers) {
    return cleanupNotificationsHandlers;
  }

  const ac = new AbortController();

  subscribe(
    'contacts:invite:notification:add',
    ({ notificationId, fromUserId, inviteData, onAccept, onDecline }) => {
      if (!notificationId || !fromUserId || !inviteData) {
        return;
      }

      const notification = createInviteNotification({
        fromUserId,
        inviteData,
        onAccept,
        onDecline,
      });

      inAppNotificationManager.add(notificationId, notification);

      if (!inAppNotificationManager.isListVisible()) {
        inAppNotificationManager.showList();
      }
    },
    { signal: ac.signal },
  );

  subscribe(
    'contacts:invite:notification:remove',
    ({ notificationId }) => {
      if (!notificationId) {
        return;
      }
      inAppNotificationManager.remove(notificationId);
    },
    { signal: ac.signal },
  );

  subscribe(
    'contacts:referral:notification:add',
    ({ notificationId, referrerName, referrerPhotoURL, onSignIn }) => {
      if (!notificationId) {
        return;
      }

      const notification = createReferralNotification({
        referrerName,
        referrerPhotoURL,
        onSignIn,
      });

      inAppNotificationManager.add(notificationId, notification);
    },
    { signal: ac.signal },
  );

  subscribe(
    'contacts:referral:notification:remove',
    ({ notificationId }) => {
      if (!notificationId) {
        return;
      }
      inAppNotificationManager.remove(notificationId);
    },
    { signal: ac.signal },
  );

  cleanupNotificationsHandlers = () => {
    ac.abort();
    cleanupNotificationsHandlers = null;
  };

  return cleanupNotificationsHandlers;
}
