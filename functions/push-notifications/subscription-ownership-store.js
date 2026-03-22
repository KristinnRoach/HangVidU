const crypto = require('node:crypto');

/**
 * Derives a stable storage key from a browser push endpoint.
 */
function getSubscriptionId(endpoint) {
  return crypto
    .createHash('sha256')
    .update(endpoint)
    .digest('hex')
    .slice(0, 40);
}

function maskSubscriptionKey(key) {
  if (!key) return 'unknown';
  return `${key.slice(0, 8)}...${key.slice(-6)}`;
}

async function findLegacySubscriptionOwners(db, currentUid, subscriptionId) {
  const usersSnapshot = await db.ref('users').once('value');
  const ownerUserIds = [];

  usersSnapshot.forEach((userSnapshot) => {
    const uid = userSnapshot.key;
    if (!uid || uid === currentUid) {
      return;
    }

    if (userSnapshot.child(`pushSubscriptions/${subscriptionId}`).exists()) {
      ownerUserIds.push(uid);
    }
  });

  return ownerUserIds;
}

/**
 * Produces the RTDB update map needed to ensure a subscription belongs to one user.
 */
async function getExclusiveSubscriptionOwnershipUpdates(
  db,
  currentUid,
  subscriptionId,
) {
  const indexedOwnerSnapshot = await db
    .ref(`pushSubscriptionOwners/${subscriptionId}`)
    .once('value');
  const indexedOwnerUid = indexedOwnerSnapshot.val();
  const updates = {
    [`pushSubscriptionOwners/${subscriptionId}`]: currentUid,
  };
  const removedFromUserIds = [];

  if (indexedOwnerUid && indexedOwnerUid !== currentUid) {
    updates[`users/${indexedOwnerUid}/pushSubscriptions/${subscriptionId}`] =
      null;
    removedFromUserIds.push(indexedOwnerUid);
  } else if (!indexedOwnerUid) {
    const legacyOwnerUserIds = await findLegacySubscriptionOwners(
      db,
      currentUid,
      subscriptionId,
    );
    console.warn('[Push] Legacy subscription ownership fallback used', {
      subscriptionKey: maskSubscriptionKey(subscriptionId),
      claimedByUserId: currentUid,
      legacyOwnerCount: legacyOwnerUserIds.length,
      legacyOwnerUserIds,
    });
    legacyOwnerUserIds.forEach((uid) => {
      updates[`users/${uid}/pushSubscriptions/${subscriptionId}`] = null;
      removedFromUserIds.push(uid);
    });
  }

  return { updates, removedFromUserIds };
}

module.exports = {
  getExclusiveSubscriptionOwnershipUpdates,
  getSubscriptionId,
  maskSubscriptionKey,
};
