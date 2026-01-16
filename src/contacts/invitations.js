// src/contacts/invitations.js
// In-app contact invitation system

import { ref, set, remove, onValue, off, get } from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, getCurrentUser } from '../firebase/auth.js';
import { getDeterministicRoomId } from '../utils/room-id.js';

// Track invite listeners for cleanup
let inviteListener = null;

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
  
  inviteListener = onValue(invitesRef, (snapshot) => {
    if (snapshot.exists()) {
      const invites = snapshot.val();
      
      // Check each invite for pending status
      Object.entries(invites).forEach(([fromUserId, inviteData]) => {
        if (inviteData && inviteData.status === 'pending') {
          console.log(`[INVITATIONS] New invite from ${inviteData.fromName}`);
          callback(fromUserId, inviteData);
        }
      });
    }
  });

  console.log('[INVITATIONS] Listening for incoming invites');
  
  return cleanupInviteListeners;
}

/**
 * Accept a contact invitation.
 * Saves the contact and removes the invite.
 * @param {string} fromUserId - Sender's user ID
 * @param {Object} inviteData - The invite data
 * @returns {Promise<void>}
 */
export async function acceptInvite(fromUserId, inviteData) {
  const myUserId = getLoggedInUserId();
  
  if (!myUserId) {
    throw new Error('Must be logged in to accept invites');
  }

  // Save contact
  const contactRef = ref(rtdb, `users/${myUserId}/contacts/${fromUserId}`);
  await set(contactRef, {
    contactId: fromUserId,
    contactName: inviteData.fromName || 'User',
    roomId: inviteData.roomId,
    savedAt: Date.now(),
  });

  // Remove the invite
  const inviteRef = ref(rtdb, `users/${myUserId}/incomingInvites/${fromUserId}`);
  await remove(inviteRef);

  console.log(`[INVITATIONS] Accepted invite from ${inviteData.fromName}`);
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
  const inviteRef = ref(rtdb, `users/${myUserId}/incomingInvites/${fromUserId}`);
  await remove(inviteRef);

  console.log(`[INVITATIONS] Declined invite from ${fromUserId}`);
}

/**
 * Clean up invite listeners.
 * Call this on logout or component unmount.
 */
export function cleanupInviteListeners() {
  if (inviteListener) {
    const myUserId = getLoggedInUserId();
    if (myUserId) {
      const invitesRef = ref(rtdb, `users/${myUserId}/incomingInvites`);
      off(invitesRef, 'value', inviteListener);
    }
    inviteListener = null;
    console.log('[INVITATIONS] Cleaned up invite listeners');
  }
}
