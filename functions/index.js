// functions/index.js - Firebase Functions entry point
const crypto = require('node:crypto');
const webpush = require('web-push');
const { onRequest } = require('firebase-functions/v2/https');
const { onValueCreated } = require('firebase-functions/v2/database');
const { initializeApp } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const { getDatabase } = require('firebase-admin/database');
const { getAuth } = require('firebase-admin/auth');

initializeApp();

const REGION = 'europe-west1';
const pushPublicKey =
  process.env.WEB_PUSH_VAPID_PUBLIC_KEY || process.env.VITE_PUSH_VAPID_KEY;
const pushPrivateKey = process.env.WEB_PUSH_VAPID_PRIVATE_KEY;
const pushContactEmail =
  process.env.WEB_PUSH_CONTACT_EMAIL || 'mailto:no-reply@hangvidu.app';

if (pushPublicKey && pushPrivateKey) {
  webpush.setVapidDetails(pushContactEmail, pushPublicKey, pushPrivateKey);
}

function ensureWebPushConfigured() {
  if (!pushPublicKey || !pushPrivateKey) {
    throw new Error(
      'Web Push VAPID keys are not configured. Set WEB_PUSH_VAPID_PUBLIC_KEY and WEB_PUSH_VAPID_PRIVATE_KEY.',
    );
  }
}

async function verifyAuthHeader(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Unauthorized: Missing token');
    error.statusCode = 401;
    throw error;
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    return decoded.uid;
  } catch (authError) {
    console.warn('[Push] Invalid auth token:', authError.message);
    const error = new Error('Unauthorized: Invalid token');
    error.statusCode = 401;
    throw error;
  }
}

function getSubscriptionId(endpoint) {
  return crypto
    .createHash('sha256')
    .update(endpoint)
    .digest('hex')
    .slice(0, 40);
}

function buildCallPayload(callData = {}) {
  const type = callData.type || 'call';
  const title =
    type === 'missed_call'
      ? `Missed call from ${callData.callerName || 'Someone'}`
      : `Incoming call from ${callData.callerName || 'Someone'}`;
  const body =
    type === 'missed_call' ? 'Tap to call back' : 'Tap to answer or decline';

  return {
    title,
    body,
    data: {
      type,
      roomId: callData.roomId || '',
      callerId: callData.callerId || '',
      callerName: callData.callerName || 'Unknown caller',
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

async function sendWebPushToUser(userId, payload) {
  ensureWebPushConfigured();

  const db = getDatabase();
  const subscriptionsSnapshot = await db
    .ref(`users/${userId}/pushSubscriptions`)
    .once('value');
  const subscriptionsData = subscriptionsSnapshot.val();

  if (!subscriptionsData) {
    console.log(`[Push] No subscriptions for user ${userId}, skipping`);
    return { sent: false };
  }

  const entries = Object.entries(subscriptionsData).filter(
    ([, value]) => value?.subscription?.endpoint,
  );

  if (entries.length === 0) {
    console.log(`[Push] No valid subscriptions for user ${userId}, skipping`);
    return { sent: false };
  }

  const payloadJson = JSON.stringify(payload);
  const successKeys = [];
  const staleKeys = [];
  const failureDetails = [];

  await Promise.all(
    entries.map(async ([key, value]) => {
      try {
        await webpush.sendNotification(value.subscription, payloadJson, {
          TTL: 60,
          urgency: payload.data?.type === 'call' ? 'high' : 'normal',
          topic:
            payload.data?.type === 'call' && payload.data?.roomId
              ? `call_${payload.data.roomId}`
              : undefined,
        });
        successKeys.push(key);
      } catch (error) {
        const statusCode = error.statusCode || error.status;
        failureDetails.push({
          key,
          statusCode,
          body: error.body,
          message: error.message,
        });

        if (statusCode === 404 || statusCode === 410) {
          staleKeys.push(key);
        }
      }
    }),
  );

  const updates = {};
  successKeys.forEach((key) => {
    updates[`users/${userId}/pushSubscriptions/${key}/lastUsed`] = Date.now();
  });
  staleKeys.forEach((key) => {
    updates[`users/${userId}/pushSubscriptions/${key}`] = null;
  });

  if (Object.keys(updates).length > 0) {
    await db.ref().update(updates);
  }

  if (staleKeys.length > 0) {
    console.log(`[Push] Removed ${staleKeys.length} stale subscriptions`);
  }

  const successCount = successKeys.length;
  const failureCount = failureDetails.length;

  console.log(
    `[Push] Sent to ${userId} — success: ${successCount}, failed: ${failureCount}`,
  );

  return {
    sent: successCount > 0,
    successCount,
    failureCount,
    failures: failureDetails,
  };
}

exports.registerPushSubscription = onRequest(
  {
    cors: true,
    region: REGION,
  },
  async (req, res) => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const uid = await verifyAuthHeader(req);
      const { subscription, deviceInfo = {} } = req.body || {};

      if (!subscription?.endpoint || !subscription?.keys) {
        return res
          .status(400)
          .json({ error: 'Missing or invalid subscription' });
      }

      const subscriptionId = getSubscriptionId(subscription.endpoint);
      const now = Date.now();

      await getDatabase()
        .ref(`users/${uid}/pushSubscriptions/${subscriptionId}`)
        .set({
          subscription,
          endpoint: subscription.endpoint,
          keys: subscription.keys,
          createdAt: now,
          lastUsed: now,
          deviceInfo,
        });

      return res.json({ success: true, subscriptionId });
    } catch (error) {
      console.error('[Push] Failed to register subscription:', error);
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || 'Internal server error' });
    }
  },
);

exports.removePushSubscription = onRequest(
  {
    cors: true,
    region: REGION,
  },
  async (req, res) => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const uid = await verifyAuthHeader(req);
      const { endpoint } = req.body || {};
      if (!endpoint) {
        return res.status(400).json({ error: 'Missing endpoint' });
      }

      const subscriptionId = getSubscriptionId(endpoint);
      await getDatabase()
        .ref(`users/${uid}/pushSubscriptions/${subscriptionId}`)
        .remove();

      return res.json({ success: true });
    } catch (error) {
      console.error('[Push] Failed to remove subscription:', error);
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || 'Internal server error' });
    }
  },
);

exports.sendCallNotification = onRequest(
  {
    cors: true,
    region: REGION,
  },
  async (req, res) => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      await verifyAuthHeader(req);

      const { targetUserId, callData } = req.body || {};
      if (!targetUserId || !callData) {
        return res
          .status(400)
          .json({ error: 'Missing targetUserId or callData' });
      }

      const result = await sendWebPushToUser(
        targetUserId,
        buildCallPayload(callData),
      );

      if (!result.sent) {
        console.warn(
          '[Push] No push subscriptions found for user when sending call notification:',
          targetUserId,
        );
        return res.status(404).json({ error: 'No push subscriptions found' });
      }

      return res.json({
        success: true,
        successCount: result.successCount,
        failureCount: result.failureCount,
      });
    } catch (error) {
      console.error('[Push] Error sending call notification:', error);
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || 'Internal server error' });
    }
  },
);

exports.sendDebugCallNotification = onRequest(
  {
    cors: true,
    region: REGION,
  },
  async (req, res) => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const uid = await verifyAuthHeader(req);
      const callData = req.body?.callData || {};
      const payload = buildCallPayload({
        roomId: callData.roomId || `debug-${Date.now()}`,
        callerId: callData.callerId || uid,
        callerName: callData.callerName || 'Debug Caller',
        type: callData.type || 'call',
      });

      const result = await sendWebPushToUser(uid, payload);
      if (!result.sent) {
        return res.status(404).json({ error: 'No push subscriptions found' });
      }

      return res.json({
        success: true,
        successCount: result.successCount,
        failureCount: result.failureCount,
      });
    } catch (error) {
      console.error('[Push] Error sending debug notification:', error);
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || 'Internal server error' });
    }
  },
);

exports.healthCheck = onRequest((req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'hangvidu-web-push-functions',
  });
});

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

exports.sendMessageNotification = onValueCreated(
  {
    ref: '/conversations/{conversationId}/messages/{messageId}',
    region: REGION,
  },
  async (event) => {
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
      console.warn(
        '[FCM-msg] Could not determine recipient from',
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
  },
);
