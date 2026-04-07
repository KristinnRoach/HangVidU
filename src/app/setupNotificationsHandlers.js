import { handleCommand } from '../events/index.js';
import {
  createInviteNotification,
  createReferralNotification,
  inAppNotificationManager,
} from '../features/notifications/index.js';

let isReady = false;
let initializationPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Register app-level command handlers that project notifications into UI.
 *
 * @returns {Promise<() => void>}
 */
export function setupNotificationsHandlers() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = Promise.resolve().then(() => {
    const ac = new AbortController();

    handleCommand(
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

    handleCommand(
      'contacts:invite:notification:remove',
      ({ notificationId }) => {
        if (!notificationId) {
          return;
        }
        inAppNotificationManager.remove(notificationId);
      },
      { signal: ac.signal },
    );

    handleCommand(
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

    handleCommand(
      'contacts:referral:notification:remove',
      ({ notificationId }) => {
        if (!notificationId) {
          return;
        }
        inAppNotificationManager.remove(notificationId);
      },
      { signal: ac.signal },
    );

    cleanup = () => {
      ac.abort();
      isReady = false;
    };
    isReady = true;
    return cleanup;
  }).finally(() => {
    initializationPromise = null;
  });

  return initializationPromise;
}
