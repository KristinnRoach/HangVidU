import { getPushNotifications } from '@push/index.js';
import type { PendingOutgoingCall } from './call-types.js';

export function sendIncomingCallPushNotification(call: PendingOutgoingCall) {
  const pushNotifications = getPushNotifications();
  pushNotifications
    ?.sendIncomingCall({
      targetUserId: call.calleeId,
      roomId: call.roomId,
      callerId: call.callerId,
      callerName: call.callerName,
    })
    ?.catch((err: unknown) => {
      console.error('Error sending incoming call notification:', err);
    });
}

export function sendMissedCallPushNotification(call: PendingOutgoingCall) {
  const pushNotifications = getPushNotifications();
  pushNotifications
    ?.sendMissedCall({
      targetUserId: call.calleeId,
      roomId: call.roomId,
      callerId: call.callerId,
      callerName: call.callerName,
    })
    ?.catch((err: unknown) => {
      console.error('Error sending missed call notification:', err);
    });
}
