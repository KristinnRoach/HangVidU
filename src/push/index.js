import { handleCommand, subscribe } from '@shared/events/index.js';
import { createSingleFlightSetup } from '@shared/utils/create-single-flight-setup.js';
import { getPushNotifications } from './push-notifications.js';

export {
  PushNotifications,
  getPushNotifications,
  initPushNotifications,
} from './push-notifications.js';

/**
 * Registers app-level command handlers for push notifications.
 * See the setup contract in `createSingleFlightSetup`.
 *
 * @type {() => Promise<() => void>}
 */
export const setup = createSingleFlightSetup({
  label: '[push-notifications]',
  register: (signal) => {
    handleCommand(
      'cmd:push:subscription:disable',
      async () => {
        try {
          await getPushNotifications()?.disable?.();
        } catch (e) {
          console.warn('[PUSH] Failed to disable notifications:', e);
        }
      },
      { signal },
    );

    // Push reacts to call facts — the call feature doesn't know push exists.
    // Payload is the call's { calleeId, roomId, callerId, callerName }.
    const toSendArgs = (call) => ({
      targetUserId: call.calleeId,
      roomId: call.roomId,
      callerId: call.callerId,
      callerName: call.callerName,
    });

    subscribe(
      'evt:call:invite:sent',
      (call) => {
        getPushNotifications()
          ?.sendIncomingCall(toSendArgs(call))
          ?.catch((err) =>
            console.error('Error sending incoming call notification:', err),
          );
      },
      { signal },
    );

    subscribe(
      'evt:call:invite:unanswered',
      (call) => {
        getPushNotifications()
          ?.sendMissedCall(toSendArgs(call))
          ?.catch((err) =>
            console.error('Error sending missed call notification:', err),
          );
      },
      { signal },
    );

    subscribe(
      'evt:conversation:message:sent',
      (message) => {
        getPushNotifications()
          ?.sendMessageNotification(message)
          ?.catch((err) =>
            console.error('Error sending message notification:', err),
          );
      },
      { signal },
    );
  },
});
