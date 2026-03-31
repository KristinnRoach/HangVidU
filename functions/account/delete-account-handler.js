const { getAuth } = require('firebase-admin/auth');
const { getDatabase } = require('firebase-admin/database');

const { verifyAuthHeader } = require('../push-notifications/auth');

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

    // 5. Scrub message content from conversations involving this user
    const conversationsSnap = await db.ref('conversations').once('value');
    let scrubbed = 0;
    if (conversationsSnap.exists()) {
      for (const [convoId, convo] of Object.entries(conversationsSnap.val())) {
        if (!convoId.includes(`${uid}_`) && !convoId.includes(`_${uid}`)) {
          continue;
        }
        if (!convo.messages) continue;

        for (const [msgId, msg] of Object.entries(convo.messages)) {
          if (msg.from !== uid) continue;
          const path = `conversations/${convoId}/messages/${msgId}`;
          updates[`${path}/text`] = null;
          updates[`${path}/fromName`] = null;
          updates[`${path}/fileName`] = null;
          updates[`${path}/mimeType`] = null;
          updates[`${path}/fileSize`] = null;
          updates[`${path}/data`] = null;
          updates[`${path}/details`] = null;
          updates[`${path}/redacted`] = true;
          scrubbed++;
        }
      }
    }

    // 6. Apply all RTDB updates atomically
    await db.ref().update(updates);
    console.info(
      `[Account] RTDB cleaned up for user: ${uid} (${scrubbed} messages redacted)`,
    );

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
