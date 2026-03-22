import { VIBRATION_PATTERNS } from '../../media/haptic/vibration-patterns.js';

const NOTIFICATION_ICON_PATH = 'icons/play-arrows-v1/icon-192.png';

export function isIncomingCallType(type) {
  return type === 'incoming_call';
}

function isCallLifecycleType(type) {
  return type === 'incoming_call' || type === 'missed_call';
}

export function getNotificationActions(type) {
  if (isIncomingCallType(type)) {
    return [
      {
        action: 'accept',
        title: 'Accept',
      },
    ];
  }

  if (type === 'message') {
    return [
      {
        action: 'view',
        title: 'View',
      },
    ];
  }

  return [];
}

export function getNotificationTag(data) {
  if (isCallLifecycleType(data?.type) && data?.notificationId) {
    return `call_${data.notificationId}`;
  }

  if (isCallLifecycleType(data?.type) && data?.roomId) {
    return `call_${data.roomId}`;
  }

  if (data?.type === 'message' && data?.senderId) {
    return `message_${data.senderId}`;
  }

  return 'default';
}

export function getVibrationPattern(type) {
  return VIBRATION_PATTERNS[type] || VIBRATION_PATTERNS.default;
}

export function buildNotificationPresentation(payload, baseUrl) {
  const data = payload?.data || {};
  const title = payload?.title || 'Notification';
  const tag = getNotificationTag(data);
  const actions = getNotificationActions(data.type);
  const iconUrl = `${baseUrl}${NOTIFICATION_ICON_PATH}`;

  return {
    title,
    tag,
    actions,
    options: {
      body: payload?.body || 'Tap to open HangVidU',
      icon: iconUrl,
      badge: iconUrl,
      data,
      tag,
      requireInteraction: isIncomingCallType(data.type),
      actions,
      vibrate: getVibrationPattern(data.type),
    },
  };
}
