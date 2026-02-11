// src/contacts/invitations.js
// In-app contact invitation system

import { ref, set, remove, onChildAdded, get } from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, getCurrentUser } from '../auth/auth.js';
import { getDeterministicRoomId } from '../utils/room-id.js';

// Track invite listeners for cleanup
let inviteListener = null;
let acceptedInviteListener = null;

/**
 * Send a contact invitation to another user.
 * @param {string} toUserId - Recipient's user ID
 * @param {string} toName - Recipient's display name (for logging)
 * @returns {Promise<void>}
 */
export async function sendInvite(toUserId, toName = 'User') {
  const myUserId = getLoggedInUserId();
  const currentUser = getCurrentUser();

  if (!myUserId || !currentUser) {
    throw new Error('Must be logged in to send invites');
  }

  if (!toUserId) {
    throw new Error('Recipient user ID is required');
  }

  // Generate deterministic room ID for this user pair
  const roomId = getDeterministicRoomId(myUserId, toUserId);

  // Write invite to recipient's incoming invites
  const inviteRef = ref(rtdb, `users/${toUserId}/incomingInvites/${myUserId}`);

  const inviteData = {
    fromUserId: myUserId,
    fromName: currentUser.displayName || 'Anonymous',
    fromEmail: currentUser.email || '',
    fromPhotoURL: currentUser.photoURL || null,
    roomId: roomId,
    timestamp: Date.now(),
    status: 'pending',
  };

  await set(inviteRef, inviteData);

  console.log(`[INVITATIONS] Sent invite to ${toName} (${toUserId})`);
}

/**
 * Send invitations to multiple users at once.
 * @param {Array<{userId: string, name: string}>} recipients - Array of recipients
 * @returns {Promise<{sent: number, failed: number, errors: Array}>} - Results summary
 */
export async function sendInvites(recipients) {
  if (!Array.isArray(recipients) || recipients.length === 0) {
    return { sent: 0, failed: 0, errors: [] };
  }

  const results = { sent: 0, failed: 0, errors: [] };

  // Send invites in parallel
  const promises = recipients.map(async ({ userId, name }) => {
    try {
      await sendInvite(userId, name);
      results.sent++;
    } catch (err) {
      results.failed++;
      const msg = (err && err.message) || String(err);
      results.errors.push({ userId, name, error: msg });
      console.error(`[INVITATIONS] Failed to invite ${name}:`, msg);
    }
  });

  await Promise.all(promises);

  console.log(
    `[INVITATIONS] Batch complete: ${results.sent} sent, ${results.failed} failed`,
  );
  return results;
}

/**
 * Listen for incoming contact invitations.
 * Calls the callback when a new invite is received.
 * @param {Function} callback - Called with (fromUserId, inviteData)
 * @returns {Function} - Cleanup function to stop listening
 */
export function listenForInvites(callback) {
  const myUserId = getLoggedInUserId();

  if (!myUserId) {
    console.warn('[INVITATIONS] Cannot listen for invites - not logged in');
    return () => {};
  }

  // Clean up any existing listener
  cleanupInviteListeners();

  const invitesRef = ref(rtdb, `users/${myUserId}/incomingInvites`);

  inviteListener = onChildAdded(invitesRef, (snapshot) => {
    const fromUserId = snapshot.key;
    const inviteData = snapshot.val();
    if (inviteData && inviteData.status === 'pending') {
      console.log(`[INVITATIONS] New invite from ${inviteData.fromName}`);
      callback(fromUserId, inviteData);
    }
  });

  console.log('[INVITATIONS] Listening for incoming invites');

  return cleanupInviteListeners;
}

/**
 * Accept a contact invitation.
 * Saves the contact for the accepter and notifies the sender.
 * @param {string} fromUserId - Sender's user ID
 * @param {Object} inviteData - The invite data
 * @returns {Promise<void>}
 */
export async function acceptInvite(fromUserId, inviteData) {
  const myUserId = getLoggedInUserId();
  const currentUser = getCurrentUser();

  if (!myUserId || !currentUser) {
    throw new Error('Must be logged in to accept invites');
  }

  // Save contact for me (the accepter)
  const myContactRef = ref(rtdb, `users/${myUserId}/contacts/${fromUserId}`);
  await set(myContactRef, {
    contactId: fromUserId,
    contactName: inviteData.fromName || 'User',
    roomId: inviteData.roomId,
    savedAt: Date.now(),
  });

  // Notify the sender that invite was accepted
  // Write to sender's acceptedInvites path (they will auto-save the contact)
  const acceptNotificationRef = ref(
    rtdb,
    `users/${fromUserId}/acceptedInvites/${myUserId}`,
  );
  await set(acceptNotificationRef, {
    acceptedByUserId: myUserId,
    acceptedByName: currentUser.displayName || 'User',
    acceptedByEmail: currentUser.email || '',
    acceptedByPhotoURL: currentUser.photoURL || null,
    roomId: inviteData.roomId,
    timestamp: Date.now(),
  });

  // Remove the invite
  const inviteRef = ref(
    rtdb,
    `users/${myUserId}/incomingInvites/${fromUserId}`,
  );
  await remove(inviteRef);

  console.log(
    `[INVITATIONS] Accepted invite from ${inviteData.fromName} and notified sender`,
  );
}

/**
 * Decline a contact invitation.
 * Removes the invite without saving the contact.
 * @param {string} fromUserId - Sender's user ID
 * @returns {Promise<void>}
 */
export async function declineInvite(fromUserId) {
  const myUserId = getLoggedInUserId();

  if (!myUserId) {
    throw new Error('Must be logged in to decline invites');
  }

  // Remove the invite
  const inviteRef = ref(
    rtdb,
    `users/${myUserId}/incomingInvites/${fromUserId}`,
  );
  await remove(inviteRef);

  console.log(`[INVITATIONS] Declined invite from ${fromUserId}`);
}

/**
 * Listen for accepted invitations (when someone accepts your invite).
 * Auto-saves the contact when an invite is accepted.
 * @param {Function} callback - Called with (acceptedByUserId, acceptData) after contact is saved
 * @returns {Function} - Cleanup function to stop listening
 */
export function listenForAcceptedInvites(callback) {
  const myUserId = getLoggedInUserId();

  if (!myUserId) {
    console.warn(
      '[INVITATIONS] Cannot listen for accepted invites - not logged in',
    );
    return () => {};
  }

  // Clean up any existing listener
  if (acceptedInviteListener) {
    acceptedInviteListener();
    acceptedInviteListener = null;
  }

  const acceptedRef = ref(rtdb, `users/${myUserId}/acceptedInvites`);

  acceptedInviteListener = onChildAdded(acceptedRef, async (snapshot) => {
    const acceptedByUserId = snapshot.key;
    const acceptData = snapshot.val();
    if (!acceptData) return;

    try {
      // Auto-save the contact
      const contactRef = ref(
        rtdb,
        `users/${myUserId}/contacts/${acceptedByUserId}`,
      );
      await set(contactRef, {
        contactId: acceptedByUserId,
        contactName: acceptData.acceptedByName || 'User',
        roomId: acceptData.roomId,
        savedAt: Date.now(),
      });

      console.log(
        `[INVITATIONS] Auto-saved contact: ${acceptData.acceptedByName} (invite accepted)`,
      );

      // Remove the accepted notification
      const acceptNotificationRef = ref(
        rtdb,
        `users/${myUserId}/acceptedInvites/${acceptedByUserId}`,
      );
      await remove(acceptNotificationRef);

      // Call the callback
      if (callback) {
        callback(acceptedByUserId, acceptData);
      }
    } catch (e) {
      console.error(
        '[INVITATIONS] Failed to auto-save contact from accepted invite:',
        e,
      );
    }
  });

  console.log('[INVITATIONS] Listening for accepted invites');

  return () => {
    if (acceptedInviteListener) {
      acceptedInviteListener();
      acceptedInviteListener = null;
    }
  };
}

/**
 * Clean up invite listeners.
 * Call this on logout or component unmount.
 */
export function cleanupInviteListeners() {
  if (inviteListener) {
    inviteListener();
    inviteListener = null;
  }

  if (acceptedInviteListener) {
    acceptedInviteListener();
    acceptedInviteListener = null;
  }

  console.log('[INVITATIONS] Cleaned up all invite listeners');
}
