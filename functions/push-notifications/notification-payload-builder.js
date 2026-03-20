const crypto = require('node:crypto');

function buildPushTopic(notificationId) {
  if (!notificationId) return undefined;
  return crypto
    .createHash('sha256')
    .update(notificationId)
    .digest('base64url')
    .slice(0, 32);
}

function normalizeCallNotificationType(type) {
  if (!type || type === 'call') {
    return 'incoming_call';
  }
  return type;
}

function isIncomingCallType(type) {
  return type === 'incoming_call' || type === 'call';
}

function buildCallPayload(callData = {}) {
  const type = normalizeCallNotificationType(callData.type);
  const notificationId =
    callData.notificationId ||
    `${callData.roomId || 'call'}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
  const title =
    type === 'missed_call'
      ? `Missed call from ${callData.callerName || 'Someone'}`
      : `Incoming call from ${callData.callerName || 'Someone'}`;
  const body = type === 'missed_call' ? 'Tap to call back' : 'Tap to answer';

  return {
    title,
    body,
    data: {
      type,
      roomId: callData.roomId || '',
      callerId: callData.callerId || '',
      callerName: callData.callerName || 'Unknown caller',
      targetUserId: callData.targetUserId || '',
      notificationId,
      timestamp: Date.now().toString(),
    },
  };
}

function buildMessagePayload(messageData = {}) {
  return {
    title: messageData.senderName || 'Someone',
    body: messageData.messagePreview || 'Sent you a message',
    data: {
      type: 'message',
      senderId: messageData.senderId || '',
      senderName: messageData.senderName || 'Someone',
      messagePreview: messageData.messagePreview || '',
      conversationId: messageData.conversationId || '',
      timestamp: Date.now().toString(),
    },
  };
}

module.exports = {
  buildCallPayload,
  buildMessagePayload,
  buildPushTopic,
  isIncomingCallType,
};
