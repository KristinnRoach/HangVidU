const { buildMessagePayload } = require('./notification-payload-builder');
const { sendWebPushToUser } = require('./web-push-delivery');
const { getDatabase } = require('firebase-admin/database');

/**
 * RTDB trigger that fans out message push notifications to all conversation
 * members except the sender.
 */
async function handleSendMessageNotification(event) {
  const message = event.data.val();
  if (!message || !message.from) return;

  const { conversationId } = event.params;
  const senderId = String(message.from).trim();
  const senderName = message.fromName || 'Someone';

  if (message.type === 'event') {
    return;
  }

  const membersSnap = await getDatabase()
    .ref(`conversations/${conversationId}/members`)
    .once('value');

  if (!membersSnap.exists()) {
    console.warn('[Push-msg] No members found for conversation', conversationId);
    return;
  }

  const recipientIds = [...new Set(Object.keys(membersSnap.val()))]
    .map((id) => String(id).trim())
    .filter(Boolean)
    .filter((id) => id !== senderId);

  if (recipientIds.length === 0) {
    console.warn(
      '[Push-msg] No recipients found after excluding sender for',
      conversationId,
    );
    return;
  }

  const text = typeof message.text === 'string' ? message.text.trim() : '';
  const fileLabel = message.type === 'file' ? 'Sent a file' : '';
  const previewSource = text || fileLabel;
  const preview =
    previewSource.length > 50
      ? previewSource.substring(0, 47) + '...'
      : previewSource;

  const payload = buildMessagePayload({
    conversationId,
    senderId,
    senderName,
    messagePreview: preview,
  });

  await Promise.all(
    recipientIds.map((recipientId) =>
      sendWebPushToUser(recipientId, payload).catch((error) => {
        console.error(
          '[Push-msg] Error sending notification to',
          recipientId,
          error,
        );
      }),
    ),
  );
}

module.exports = {
  handleSendMessageNotification,
};
