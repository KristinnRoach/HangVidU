import { handleCommand } from '@shared/events/index.js';
import { createSingleFlightSetup } from '@shared/utils/create-single-flight-setup.js';
import { inAppNotificationManager } from './in-app-notification-manager.js';
import { showEnableNotificationsPrompt } from './components/enable-notifications-prompt.js';
import { createInviteNotification } from './components/invite-notification.js';

export { inAppNotificationManager } from './in-app-notification-manager.js';
export {
  buildTemplate,
  createNotification,
} from '../../components/base-legacy/notification.js';

export { showEnableNotificationsPrompt } from './components/enable-notifications-prompt.js';

export { showPushUnsupportedNotification } from './components/push-unsupported-notification.js';
export { createInviteNotification } from './components/invite-notification.js';
export { NotificationsToggle } from './components/NotificationsToggle.jsx';

/**
 * Registers app-level command handlers that project notifications into UI.
 * See the setup contract in `createSingleFlightSetup`.
 *
 * @type {() => Promise<() => void>}
 */
export const setup = createSingleFlightSetup({
  label: '[notifications]',
  register: (signal) => {
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
      },
      { signal },
    );

    handleCommand(
      'cmd:app-notifications:invite:remove',
      ({ notificationId }) => {
        if (!notificationId) {
          return;
        }
        inAppNotificationManager.remove(notificationId);
      },
      { signal },
    );

    handleCommand(
      'cmd:app-notifications:show:enable-push',
      () => {
        showEnableNotificationsPrompt();
      },
      { signal },
    );
  },
});
