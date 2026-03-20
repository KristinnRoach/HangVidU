const { getDatabase } = require('firebase-admin/database');

const { verifyAuthHeader } = require('./auth');
const {
  getExclusiveSubscriptionOwnershipUpdates,
  getSubscriptionId,
  maskSubscriptionKey,
} = require('./subscription-ownership-store');

/**
 * Registers the current browser push subscription for the authenticated user.
 */
async function handleRegisterPushSubscription(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const uid = await verifyAuthHeader(req);
    const { subscription, deviceInfo = {} } = req.body || {};

    if (!subscription?.endpoint || !subscription?.keys) {
      return res.status(400).json({ error: 'Missing or invalid subscription' });
    }

    const subscriptionId = getSubscriptionId(subscription.endpoint);
    const now = Date.now();
    const db = getDatabase();
    const { updates, removedFromUserIds } =
      await getExclusiveSubscriptionOwnershipUpdates(db, uid, subscriptionId);

    updates[`users/${uid}/pushSubscriptions/${subscriptionId}`] = {
      subscription,
      endpoint: subscription.endpoint,
      keys: subscription.keys,
      createdAt: now,
      lastUsed: now,
      deviceInfo,
    };

    await db.ref().update(updates);

    if (removedFromUserIds.length > 0) {
      console.warn('[Push] Reassigned subscription ownership', {
        subscriptionKey: maskSubscriptionKey(subscriptionId),
        claimedByUserId: uid,
        removedFromUserIds,
      });
    }

    return res.json({ success: true, subscriptionId });
  } catch (error) {
    console.error('[Push] Failed to register subscription:', error);
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || 'Internal server error' });
  }
}

module.exports = {
  handleRegisterPushSubscription,
};
