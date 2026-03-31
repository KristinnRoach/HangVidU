const { getAuth } = require('firebase-admin/auth');
const { getDatabase } = require('firebase-admin/database');

const { verifyAuthHeader } = require('../push-notifications/auth');

/**
 * Deletes the authenticated user's account and all associated data.
 *
 * Cleans up:
 * - users/{uid} (profile, contacts, presence, pushSubscriptions, etc.)
 * - usersByEmail/{emailHash} (discovery directory entry)
 * - conversations where the uid appears in the conversation ID
 * - notifications/{uid}
 * - Firebase Auth user record
 */
async function handleDeleteAccount(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const uid = await verifyAuthHeader(req);
    const db = getDatabase();
    const adminAuth = getAuth();

    // Look up user email before deletion (needed for directory cleanup)
    let email = null;
    try {
      const userRecord = await adminAuth.getUser(uid);
      email = userRecord.email;
    } catch (err) {
      console.warn('[Account] Could not fetch user record:', err.message);
    }

    const updates = {};

    // 1. Remove user node (profile, contacts, presence, pushSubscriptions, etc.)
    updates[`users/${uid}`] = null;

    // 2. Remove notifications
    updates[`notifications/${uid}`] = null;

    // 3. Remove discovery directory entry
    if (email) {
      const emailHash = hashEmail(email);
      updates[`usersByEmail/${emailHash}`] = null;
    }

    // 4. Find and remove conversations involving this user
    const conversationsSnap = await db.ref('conversations').once('value');
    if (conversationsSnap.exists()) {
      for (const key of Object.keys(conversationsSnap.val())) {
        if (key.includes(`${uid}_`) || key.includes(`_${uid}`)) {
          updates[`conversations/${key}`] = null;
        }
      }
    }

    // 5. Apply all RTDB deletions atomically
    await db.ref().update(updates);
    console.info('[Account] RTDB data removed for user:', uid);

    // 6. Delete Firebase Auth account
    await adminAuth.deleteUser(uid);
    console.info('[Account] Auth account deleted:', uid);

    return res.json({ success: true });
  } catch (error) {
    console.error('[Account] Failed to delete account:', error);
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || 'Internal server error' });
  }
}

/**
 * Produces a Firebase-safe base64 hash from an email address.
 * Must match the client-side hashEmail in src/contacts/user-discovery.js.
 */
function hashEmail(email) {
  const normalized = email.toLowerCase().trim();
  return Buffer.from(normalized).toString('base64').replace(/\//g, '-');
}

module.exports = {
  handleDeleteAccount,
};
