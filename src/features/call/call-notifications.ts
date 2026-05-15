import { getPushNotifications } from '../push-notifications/index.js';
import type { pendingOutgoingCall } from './call-types.js';

export function sendIncomingCallPushNotification(call: pendingOutgoingCall) {
  const pushNotifications = getPushNotifications();
  pushNotifications
    ?.sendIncomingCall({
      targetUserId: call.calleeId,
      roomId: call.roomId,
      callerId: call.callerId,
      callerName: call.callerName,
    })
    .catch((err) => {
      console.error('Error sending incoming call notification:', err);
    });
}

export function sendMissedCallPushNotification(call: pendingOutgoingCall) {
  const pushNotifications = getPushNotifications();
  pushNotifications
    ?.sendMissedCall({
      targetUserId: call.calleeId,
      roomId: call.roomId,
      callerId: call.callerId,
      callerName: call.callerName,
    })
    .catch((err) => {
      console.error('Error sending missed call notification:', err);
    });
}
