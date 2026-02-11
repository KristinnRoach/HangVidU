import {
  ref,
  set,
  onDisconnect,
  serverTimestamp,
  onValue,
} from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, subscribe } from '../auth/auth-state.js';

let presenceInitializedForUserId = null;
let lastSeenUserId = null;

// Auto-initialize when user logs in
subscribe((state) => {
  if (state.isLoggedIn) {
    const userId = getLoggedInUserId();
    if (userId && userId !== lastSeenUserId) {
      presenceInitializedForUserId = null;
      lastSeenUserId = userId;
    }
    initializePresence().catch((err) => {
      console.warn('Failed to initialize presence:', err);
    });
  } else {
    presenceInitializedForUserId = null;
    lastSeenUserId = null;
  }
});

/**
 * Initialize presence tracking for logged-in user.
 */
async function initializePresence() {
  const userId = getLoggedInUserId();
  if (!userId || presenceInitializedForUserId === userId) return;

  const presenceRef = ref(rtdb, `users/${userId}/presence`);

  try {
    // Set user as online
    await set(presenceRef, {
      state: 'online',
      lastChanged: serverTimestamp(),
    });

    // Set offline when disconnected
    await onDisconnect(presenceRef).set({
      state: 'offline',
      lastSeen: serverTimestamp(),
      lastChanged: serverTimestamp(),
    });

    presenceInitializedForUserId = userId;
    console.log('Presence initialized for user:', userId);
  } catch (error) {
    console.error('Failed to initialize presence:', error);
  }
}

/**
 * Manually set user offline (e.g., on logout)
 */
export async function setOffline() {
  const userId = getLoggedInUserId();
  if (!userId) return;

  const presenceRef = ref(rtdb, `users/${userId}/presence`);

  try {
    await set(presenceRef, {
      state: 'offline',
      lastSeen: serverTimestamp(),
      lastChanged: serverTimestamp(),
    });
    presenceInitializedForUserId = null;
  } catch (error) {
    console.error('Failed to set offline:', error);
  }
}

/**
 * Get presence status for a user
 * @param {string} userId
 * @param {Function} callback - Called with presence data when it changes
 * @returns {Function} Unsubscribe function
 */
export function watchUserPresence(userId, callback) {
  const presenceRef = ref(rtdb, `users/${userId}/presence`);

  const unsubscribe = onValue(presenceRef, (snapshot) => {
    const data = snapshot.val();
    callback(data || { state: 'offline' });
  });

  // Return unsubscribe function
  return unsubscribe;
}
