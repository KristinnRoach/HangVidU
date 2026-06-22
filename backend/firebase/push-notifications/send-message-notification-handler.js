const { verifyAuthHeader } = require('./auth');
const { buildMessagePayload } = require('./notification-payload-builder');
const { sendWebPushToUser } = require('./web-push-delivery');

/**
 * Authenticated HTTP handler for message push sends. Called by the sender's
 * client after a message persists (messages live on the D1/Worker spine now, so
 * the old RTDB trigger no longer fires). Best-effort: trusts the authenticated
 * caller and pushes to each provided recipient. Recipient resolution happens
 * client-side via the conversation's remoteParticipantIds.
 */
async function handleSendMessageNotification(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    await verifyAuthHeader(req);

    const { recipientIds, conversationId, senderId, senderName, messagePreview } =
      req.body || {};
    if (!Array.isArray(recipientIds) || recipientIds.length === 0) {
      return res.status(400).json({ error: 'Missing recipientIds' });
    }

    const payload = buildMessagePayload({
      conversationId,
      senderId,
      senderName,
      messagePreview,
    });

    await Promise.all(
      recipientIds.map((userId) =>
        sendWebPushToUser(userId, payload).catch((error) => {
          console.error('[Push-msg] delivery failed for', userId, error);
        }),
      ),
    );

    return res.json({ success: true });
  } catch (error) {
    console.error('[Push] Error sending message notification:', error);
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || 'Internal server error' });
  }
}

module.exports = {
  handleSendMessageNotification,
};
