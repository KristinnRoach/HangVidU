import { handleCommand } from '../../shared/events/index.js';
import { inAppNotificationManager } from './in-app-notification-manager.js';
import { showEnableNotificationsPrompt } from './components/enable-notifications-prompt.js';
import { createInviteNotification } from './components/invite-notification.js';
import { createReferralNotification } from './components/referral-notification.js';

export { inAppNotificationManager } from './in-app-notification-manager.js';
export {
  buildTemplate,
  createNotification,
} from '../../components/base-legacy/notification.js';

export { showEnableNotificationsPrompt } from './components/enable-notifications-prompt.js';

export { addDebugUpdateButton } from './components/debug-notifications.js';
export { showPushUnsupportedNotification } from './components/push-unsupported-notification.js';
export { showUpdateNotification } from './components/update-notification.js';
export { createInviteNotification } from './components/invite-notification.js';
export { createMissedCallNotification } from './components/missed-call-notification.js';
export { createReferralNotification } from './components/referral-notification.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts registered command handlers
 *
 * Registers app-level command handlers that project notifications into UI.
 *
 * @returns {Promise<() => void>}
 */
export function setup() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = Promise.resolve()
    .then(() => {
      const ac = new AbortController();

      handleCommand(
        'cmd:app-notifications:invite:add',
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
        'cmd:app-notifications:invite:remove',
        ({ notificationId }) => {
          if (!notificationId) {
            return;
          }
          inAppNotificationManager.remove(notificationId);
        },
        { signal: ac.signal },
      );

      handleCommand(
        'cmd:app-notifications:referral:add',
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
        'cmd:app-notifications:referral:remove',
        ({ notificationId }) => {
          if (!notificationId) {
            return;
          }
          inAppNotificationManager.remove(notificationId);
        },
        { signal: ac.signal },
      );

      handleCommand(
        'cmd:app-notifications:show:enable-push',
        () => {
          showEnableNotificationsPrompt();
        },
        { signal: ac.signal },
      );

      cleanup = () => {
        try {
          ac.abort();
        } catch (error) {
          console.warn(
            '[notifications] cleanup failed to abort handlers:',
            error,
          );
        } finally {
          isReady = false;
        }
      };
      isReady = true;
      return cleanup;
    })
    .finally(() => {
      initPromise = null;
    });

  return initPromise;
}
