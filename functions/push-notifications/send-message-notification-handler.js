const { buildMessagePayload } = require('./notification-payload-builder');
const { sendWebPushToUser } = require('./web-push-delivery');
const { getDatabase } = require('firebase-admin/database');

/**
 * RTDB trigger that fans out message push notifications to all conversation
 * members except the sender.
 *
 * Recipients are read from conversations/{conversationId}/members — the
 * authoritative membership collection — so this handler works for both
 * legacy uid1_uid2 conversations and future opaque-ID conversations.
 */
async function handleSendMessageNotification(event) {
  const message = event.data.val();
  if (!message || !message.from) return;

  const { conversationId } = event.params;
  const senderId = message.from;
  const senderName = message.fromName || 'Someone';

  if (message.type === 'event') {
    return;
  }

  // Derive recipients from the membership collection — do NOT split the conversationId.
  // Trade-off: this adds one DB read per message notification. Acceptable at the
  // current scale; for high-volume messaging consider including recipient data in
  // the message payload or using a dedicated Cloud Function trigger.
  const db = getDatabase();
  const membersSnap = await db
    .ref(`conversations/${conversationId}/members`)
    .once('value');

  if (!membersSnap.exists()) {
    console.warn('[Push-msg] No members found for conversation', conversationId);
    return;
  }

  const recipientIds = Object.keys(membersSnap.val()).filter(
    (uid) => uid !== senderId,
  );

  if (recipientIds.length === 0) {
    console.warn('[Push-msg] No recipients after excluding sender in', conversationId);
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
