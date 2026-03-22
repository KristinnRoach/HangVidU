const { getDatabase } = require('firebase-admin/database');

const { verifyAuthHeader } = require('./auth');
const {
  getExclusiveSubscriptionOwnershipUpdates,
  getSubscriptionId,
  maskSubscriptionKey,
} = require('./subscription-ownership-store');

const MAX_PLATFORM_LENGTH = 100;
const MAX_LANGUAGE_LENGTH = 32;
const MAX_USER_AGENT_LENGTH = 512;

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function isValidHttpsUrl(value) {
  if (!isNonEmptyString(value)) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

function sanitizeString(value, maxLength) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  return trimmed.slice(0, maxLength);
}

function sanitizeDeviceInfo(deviceInfo) {
  if (!deviceInfo || typeof deviceInfo !== 'object' || Array.isArray(deviceInfo)) {
    return {};
  }

  const sanitized = {
    platform: sanitizeString(deviceInfo.platform, MAX_PLATFORM_LENGTH),
    userAgent: sanitizeString(deviceInfo.userAgent, MAX_USER_AGENT_LENGTH),
    language: sanitizeString(deviceInfo.language, MAX_LANGUAGE_LENGTH),
  };

  return Object.fromEntries(
    Object.entries(sanitized).filter(([, value]) => value !== undefined),
  );
}

function isValidSubscription(subscription) {
  return (
    subscription &&
    typeof subscription === 'object' &&
    !Array.isArray(subscription) &&
    isValidHttpsUrl(subscription.endpoint) &&
    subscription.keys &&
    typeof subscription.keys === 'object' &&
    !Array.isArray(subscription.keys) &&
    isNonEmptyString(subscription.keys.p256dh) &&
    isNonEmptyString(subscription.keys.auth)
  );
}

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

    if (!isValidSubscription(subscription)) {
      return res.status(400).json({ error: 'Missing or invalid subscription' });
    }

    const subscriptionId = getSubscriptionId(subscription.endpoint);
    const sanitizedDeviceInfo = sanitizeDeviceInfo(deviceInfo);
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
      deviceInfo: sanitizedDeviceInfo,
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
