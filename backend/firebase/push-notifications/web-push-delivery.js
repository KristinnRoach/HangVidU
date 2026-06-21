const { getDatabase } = require('firebase-admin/database');

const { ensureWebPushConfigured, webpush } = require('./config');
const {
  buildPushTopic,
  isIncomingCallType,
} = require('./notification-payload-builder');
const { maskSubscriptionKey } = require('./subscription-ownership-store');

const PUSH_TTL_SECONDS = {
  incoming_call: 30,
  missed_call: 300,
  message: 3600,
  default: 60,
};

function getPushTtlSeconds(type) {
  return PUSH_TTL_SECONDS[type] || PUSH_TTL_SECONDS.default;
}

/**
 * Sends a normalized push payload to all stored subscriptions for one user.
 */
async function sendWebPushToUser(userId, payload) {
  ensureWebPushConfigured();

  const db = getDatabase();
  const subscriptionsSnapshot = await db
    .ref(`users/${userId}/pushSubscriptions`)
    .once('value');
  const subscriptionsData = subscriptionsSnapshot.val();

  if (!subscriptionsData) {
    console.log(`[Push] No subscriptions for user ${userId}, skipping`);
    return {
      sent: false,
      reason: 'no-subscriptions',
      totalSubscriptions: 0,
      successCount: 0,
      failureCount: 0,
      failures: [],
    };
  }

  const entries = Object.entries(subscriptionsData).filter(
    ([, value]) => value?.subscription?.endpoint,
  );

  if (entries.length === 0) {
    console.log(`[Push] No valid subscriptions for user ${userId}, skipping`);
    return {
      sent: false,
      reason: 'no-valid-subscriptions',
      totalSubscriptions: 0,
      successCount: 0,
      failureCount: 0,
      failures: [],
    };
  }

  const payloadJson = JSON.stringify(payload);
  const successKeys = [];
  const staleKeys = [];
  const failureDetails = [];

  await Promise.all(
    entries.map(async ([key, value]) => {
      try {
        await webpush.sendNotification(value.subscription, payloadJson, {
          TTL: getPushTtlSeconds(payload.data?.type),
          urgency: isIncomingCallType(payload.data?.type) ? 'high' : 'normal',
          topic:
            isIncomingCallType(payload.data?.type) &&
            payload.data?.notificationId
              ? buildPushTopic(payload.data.notificationId)
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
  if (failureDetails.length > 0) {
    console.warn('[Push] Delivery failure details:', {
      userId,
      payloadType: payload?.data?.type || 'unknown',
      roomId: payload?.data?.roomId || null,
      failures: failureDetails.map((failure) => ({
        subscriptionKey: maskSubscriptionKey(failure.key),
        statusCode: failure.statusCode || null,
        message: failure.message || null,
        body: failure.body || null,
      })),
    });
  }

  return {
    sent: successCount > 0,
    reason: successCount > 0 ? 'sent' : 'all-deliveries-failed',
    totalSubscriptions: entries.length,
    successCount,
    failureCount,
    failures: failureDetails.map((failure) => ({
      subscriptionKey: maskSubscriptionKey(failure.key),
      statusCode: failure.statusCode || null,
      message: failure.message || null,
      body: failure.body || null,
    })),
  };
}

module.exports = {
  getPushTtlSeconds,
  sendWebPushToUser,
};
