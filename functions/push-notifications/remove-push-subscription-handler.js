const { getDatabase } = require('firebase-admin/database');

const { verifyAuthHeader } = require('./auth');
const { getSubscriptionId } = require('./subscription-ownership-store');

/**
 * Removes the current browser push subscription for the authenticated user.
 */
async function handleRemovePushSubscription(req, res) {
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
    const db = getDatabase();
    const indexedOwnerSnapshot = await db
      .ref(`pushSubscriptionOwners/${subscriptionId}`)
      .once('value');
    const updates = {
      [`users/${uid}/pushSubscriptions/${subscriptionId}`]: null,
    };

    if (indexedOwnerSnapshot.val() === uid) {
      updates[`pushSubscriptionOwners/${subscriptionId}`] = null;
    }

    await db.ref().update(updates);

    return res.json({ success: true });
  } catch (error) {
    console.error('[Push] Failed to remove subscription:', error);
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || 'Internal server error' });
  }
}

module.exports = {
  handleRemovePushSubscription,
};
