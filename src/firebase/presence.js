import {
  ref,
  set,
  onDisconnect,
  serverTimestamp,
  onValue,
} from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, subscribe } from '../auth/auth-state.js';

let presenceInitialized = false;

// Auto-initialize when user logs in
subscribe((state) => {
  if (state.isLoggedIn) {
    initializePresence().catch((err) => {
      console.warn('Failed to initialize presence:', err);
    });
  }
});

/**
 * Initialize presence tracking for logged-in user.
 */
async function initializePresence() {
  const userId = getLoggedInUserId();
  if (!userId || presenceInitialized) return;

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

    presenceInitialized = true;
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
    presenceInitialized = false;
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
