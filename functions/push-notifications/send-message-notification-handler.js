const { buildMessagePayload } = require('./notification-payload-builder');
const { sendWebPushToUser } = require('./web-push-delivery');

async function handleSendMessageNotification(event) {
  const message = event.data.val();
  if (!message || !message.from) return;

  const { conversationId } = event.params;
  const senderId = message.from;
  const senderName = message.fromName || 'Someone';

  if (message.type === 'event') {
    return;
  }

  const userIds = conversationId.split('_');
  const recipientId = userIds.find((id) => id !== senderId);

  if (!recipientId) {
    console.warn('[Push-msg] Could not determine recipient from', conversationId);
    return;
  }

  const text = typeof message.text === 'string' ? message.text.trim() : '';
  const fileLabel = message.type === 'file' ? 'Sent a file' : '';
  const previewSource = text || fileLabel;
  const preview =
    previewSource.length > 50
      ? previewSource.substring(0, 47) + '...'
      : previewSource;

  try {
    await sendWebPushToUser(
      recipientId,
      buildMessagePayload({
        conversationId,
        senderId,
        senderName,
        messagePreview: preview,
      }),
    );
  } catch (error) {
    console.error('[Push-msg] Error sending message notification:', error);
  }
}

module.exports = {
  handleSendMessageNotification,
};
