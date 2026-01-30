// functions/index.js - Firebase Functions entry point
const { onRequest } = require('firebase-functions/v2/https');
const { onValueCreated } = require('firebase-functions/v2/database');
const { initializeApp } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const { getDatabase } = require('firebase-admin/database');
const { getAuth } = require('firebase-admin/auth');

// Initialize Firebase Admin
initializeApp();

/**
 * Send FCM call notification to target user
 * Called when someone receives an incoming call
 */
exports.sendCallNotification = onRequest(
  {
    cors: true,
    region: 'europe-west1', // Match your RTDB region
  },
  async (req, res) => {
    try {
      // Only allow POST requests
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      // Verify Authentication
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
      }

      const idToken = authHeader.split('Bearer ')[1];
      try {
        await getAuth().verifyIdToken(idToken);
      } catch (authError) {
        console.warn('[FCM] Invalid auth token:', authError.message);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      const { targetUserId, callData } = req.body;

      if (!targetUserId || !callData) {
        return res
          .status(400)
          .json({ error: 'Missing targetUserId or callData' });
      }

      console.log(
        `[FCM] Sending call notification to ${targetUserId}:`,
        callData,
      );

      // Determine notification type and content
      const type = callData.type || 'call';
      let title, body;

      if (type === 'missed_call') {
        title = `Missed call from ${callData.callerName || 'Someone'}`;
        body = 'Tap to call back';
      } else {
        title = `Incoming call from ${callData.callerName || 'Someone'}`;
        body = 'Tap to answer or decline';
      }

      const fcmMessage = {
        notification: {
          title,
          body,
        },
        data: {
          type,
          roomId: callData.roomId || '',
          callerId: callData.callerId || '',
          callerName: callData.callerName || 'Unknown caller',
          timestamp: Date.now().toString(),
        },
        android: {
          priority: 'high',
          notification: {
            channelId: 'calls',
            priority: 'high',
            defaultSound: true,
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              badge: 1,
              contentAvailable: true,
            },
          },
        },
        webpush: {
          headers: {
            Urgency: 'high',
          },
          notification: {
            icon: '/icons/play-arrows-v1/icon-192.png',
            badge: '/icons/play-arrows-v1/icon-192.png',
            requireInteraction: true,
            tag: `call_${callData.roomId}`,
            actions: [
              {
                action: 'accept',
                title: 'Accept',
              },
              {
                action: 'decline',
                title: 'Decline',
              },
            ],
          },
        },
      };

      const result = await sendFCMToUser(targetUserId, fcmMessage);

      if (!result.sent) {
        return res.status(404).json({ error: 'No FCM tokens found for user' });
      }

      res.json({
        success: true,
        successCount: result.successCount,
        failureCount: result.failureCount,
      });
    } catch (error) {
      console.error('[FCM] Error sending notification:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message,
      });
    }
  },
);

/**
 * Health check endpoint
 */
exports.healthCheck = onRequest((req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'hangvidu-fcm-functions',
  });
});

// ============================================================================
// MESSAGE PUSH NOTIFICATIONS (RTDB trigger)
// ============================================================================

/**
 * Shared helper: look up FCM tokens for a user, send multicast, clean up stale tokens.
 * @param {string} userId - Target user ID
 * @param {Object} message - Partial FCM message (notification, data, platform overrides).
 *                           `tokens` will be injected automatically.
 * @returns {Promise<{sent: boolean, successCount?: number, failureCount?: number}>}
 */
async function sendFCMToUser(userId, message) {
  const db = getDatabase();
  const tokensSnapshot = await db
    .ref(`users/${userId}/fcmTokens`)
    .once('value');
  const tokensData = tokensSnapshot.val();

  if (!tokensData) {
    console.log(`[FCM] No tokens for user ${userId}, skipping`);
    return { sent: false };
  }

  const tokenEntries = Object.entries(tokensData);
  const tokens = tokenEntries.map(([, td]) => td.token).filter(Boolean);

  if (tokens.length === 0) {
    console.log(`[FCM] No valid tokens for user ${userId}, skipping`);
    return { sent: false };
  }

  const fullMessage = { ...message, tokens };
  const messaging = getMessaging();
  const response = await messaging.sendEachForMulticast(fullMessage);

  // Clean up stale tokens
  if (response.failureCount > 0) {
    const staleKeys = [];
    response.responses.forEach((resp, idx) => {
      if (
        !resp.success &&
        resp.error &&
        (resp.error.code === 'messaging/invalid-registration-token' ||
          resp.error.code === 'messaging/registration-token-not-registered')
      ) {
        staleKeys.push(tokenEntries[idx][0]);
      }
    });

    if (staleKeys.length > 0) {
      const updates = {};
      staleKeys.forEach((key) => {
        updates[`users/${userId}/fcmTokens/${key}`] = null;
      });
      await db.ref().update(updates);
      console.log(
        `[FCM] Removed ${staleKeys.length} stale tokens for ${userId}`,
      );
    }
  }

  console.log(
    `[FCM] Sent to ${userId} — success: ${response.successCount}, failed: ${response.failureCount}`,
  );

  return {
    sent: true,
    successCount: response.successCount,
    failureCount: response.failureCount,
  };
}

/**
 * Send push notification when a new message is written to a conversation.
 *
 * Trigger path: /conversations/{conversationId}/messages/{messageId}
 * conversationId format: "userId1_userId2" (sorted alphabetically)
 *
 * Message shape (from RTDBMessagingTransport.send):
 *   { text, from, fromName, sentAt, read }
 */
exports.sendMessageNotification = onValueCreated(
  {
    ref: '/conversations/{conversationId}/messages/{messageId}',
    region: 'europe-west1',
  },
  async (event) => {
    const message = event.data.val();
    if (!message || !message.from) return;

    const { conversationId } = event.params;
    const senderId = message.from;
    const senderName = message.fromName || 'Someone';

    // Derive recipient from conversationId (format: "userA_userB", sorted)
    const userIds = conversationId.split('_');
    const recipientId = userIds.find((id) => id !== senderId);

    if (!recipientId) {
      console.warn(
        '[FCM-msg] Could not determine recipient from',
        conversationId,
      );
      return;
    }

    // Truncate message preview
    const text = typeof message.text === 'string' ? message.text : '';
    const preview = text.length > 50 ? text.substring(0, 47) + '...' : text;

    const fcmMessage = {
      notification: {
        title: `${senderName}`,
        body: preview || 'Sent you a message',
      },
      data: {
        type: 'message',
        senderId,
        senderName,
        messagePreview: preview,
        timestamp: Date.now().toString(),
      },
      android: {
        priority: 'high',
        notification: {
          channelId: 'messages',
          defaultSound: true,
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
      webpush: {
        notification: {
          icon: '/icons/play-arrows-v1/icon-192.png',
          badge: '/icons/play-arrows-v1/icon-192.png',
          tag: `message_${senderId}`,
          actions: [{ action: 'view', title: 'View' }],
        },
      },
    };

    try {
      await sendFCMToUser(recipientId, fcmMessage);
    } catch (error) {
      console.error('[FCM-msg] Error sending message notification:', error);
    }
  },
);
