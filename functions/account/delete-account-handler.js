const { getAuth } = require('firebase-admin/auth');
const { getDatabase } = require('firebase-admin/database');

const { verifyAuthHeader } = require('../push-notifications/auth');

const MAX_AUTH_AGE_SECONDS = 5 * 60; // 5 minutes

/**
 * Deletes the authenticated user's account and associated data.
 * Preserves conversations so other participants keep their message history.
 *
 * Cleans up:
 * - users/{uid}/* (contacts, presence, pushSubscriptions, etc.)
 * - usersByEmail/{emailHash} (discovery directory entry)
 * - notifications/{uid}
 * - Firebase Auth user record
 *
 * Redacts:
 * - message content authored by this user (text, files, details)
 *   replaced with { redacted: true }, preserving conversation structure
 *
 * Preserves:
 * - conversations (other participants keep message history structure)
 * - users/{uid}/profile as a tombstone ({ deleted: true, deletedAt })
 *
 * @param {import('firebase-functions/v2/https').Request} req
 * @param {import('firebase-functions/v2/https').Response} res
 * @returns {Promise<void>}
 */
async function handleDeleteAccount(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const uid = await verifyAuthHeader(req);
    const { scrubMessages = true } = req.body || {};
    const db = getDatabase();
    const adminAuth = getAuth();

    // Require recent sign-in for account deletion
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    const authAge = Math.floor(Date.now() / 1000) - decoded.auth_time;
    if (authAge > MAX_AUTH_AGE_SECONDS) {
      return res.status(403).json({
        error: 'Recent sign-in required. Please sign out and sign in again.',
        code: 'auth/requires-recent-login',
      });
    }

    // Look up user email before deletion (needed for directory cleanup)
    let email = null;
    try {
      const userRecord = await adminAuth.getUser(uid);
      email = userRecord.email;
    } catch (err) {
      console.warn('[Account] Could not fetch user record:', err.message);
    }

    const updates = {};

    // 1. Remove user sub-nodes but leave profile as tombstone
    const userSnap = await db.ref(`users/${uid}`).once('value');
    if (userSnap.exists()) {
      for (const key of Object.keys(userSnap.val())) {
        if (key !== 'profile') {
          updates[`users/${uid}/${key}`] = null;
        }
      }
    }

    // 2. Replace profile with tombstone so other users see "Deleted Account"
    updates[`users/${uid}/profile`] = {
      deleted: true,
      deletedAt: Date.now(),
    };

    // 3. Remove notifications
    updates[`notifications/${uid}`] = null;

    // 4. Remove discovery directory entry
    if (email) {
      const emailHash = hashEmail(email);
      updates[`usersByEmail/${emailHash}`] = null;
    }

    // 5. Find user's conversations via reverse index (or fall back to full scan)
    const userConvosSnap = await db
      .ref(`users/${uid}/conversations`)
      .once('value');
    let conversationIds;
    if (userConvosSnap.exists()) {
      conversationIds = Object.keys(userConvosSnap.val());
    } else {
      // TODO: remove fallback after safety period (now is 31 march 2026)
      // Fallback for pre-migration conversations without reverse index
      const allConvosSnap = await db.ref('conversations').once('value');
      conversationIds = allConvosSnap.exists()
        ? Object.keys(allConvosSnap.val()).filter((id) =>
            id.split('_').includes(uid),
          )
        : [];
    }

    // Remove user from each conversation's members list
    for (const convoId of conversationIds) {
      updates[`conversations/${convoId}/members/${uid}`] = null;
    }

    // 6. Optionally scrub message content
    let scrubbed = 0;
    if (scrubMessages) {
      for (const convoId of conversationIds) {
        const messagesSnap = await db
          .ref(`conversations/${convoId}/messages`)
          .orderByChild('from')
          .equalTo(uid)
          .once('value');
        if (!messagesSnap.exists()) continue;

        messagesSnap.forEach((msgSnap) => {
          const path = `conversations/${convoId}/messages/${msgSnap.key}`;
          updates[`${path}/text`] = null;
          updates[`${path}/fromName`] = null;
          updates[`${path}/fileName`] = null;
          updates[`${path}/mimeType`] = null;
          updates[`${path}/fileSize`] = null;
          updates[`${path}/data`] = null;
          updates[`${path}/details`] = null;
          updates[`${path}/redacted`] = true;
          scrubbed++;
        });
      }
    }

    // 6. Apply all RTDB updates atomically
    await db.ref().update(updates);
    console.info(
      `[Account] RTDB cleaned up for user: ${uid} (${scrubbed} messages redacted)`,
    );

    // 7. Delete Firebase Auth account (idempotent — ignore if already deleted)
    try {
      await adminAuth.deleteUser(uid);
      console.info('[Account] Auth account deleted:', uid);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        console.info('[Account] Auth account already deleted:', uid);
      } else {
        throw err;
      }
    }

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
 *
 * @param {string} email
 * @returns {string} Firebase-safe base64 key
 */
function hashEmail(email) {
  const normalized = email.toLowerCase().trim();
  return Buffer.from(normalized).toString('base64').replace(/\//g, '-');
}

module.exports = {
  handleDeleteAccount,
};
