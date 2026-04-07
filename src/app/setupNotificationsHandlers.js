import { handleCommand } from '../events/index.js';
import {
  createInviteNotification,
  createReferralNotification,
  inAppNotificationManager,
} from '../features/notifications/index.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts registered app-bus handlers
 *
 * Registers app-level command handlers that project notifications into UI.
 *
 * @returns {Promise<() => void>}
 */
export function setupNotificationsHandlers() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = Promise.resolve().then(() => {
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
      try {
        ac.abort();
      } catch (error) {
        console.warn(
          '[setupNotificationsHandlers] cleanup failed to abort handlers:',
          error,
        );
      } finally {
        isReady = false;
      }
    };
    isReady = true;
    return cleanup;
  }).finally(() => {
    initPromise = null;
  });

  return initPromise;
}
