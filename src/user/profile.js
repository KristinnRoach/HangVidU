// profile.js - Save user profile to a world-readable RTDB node.
// Separate from presence so profile data isn't overwritten by connect/disconnect cycles.

import { ref, set, get } from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';
import { subscribe } from '../auth/auth-state.js';

// Auto-save profile when user logs in
subscribe((state) => {
  if (state.isLoggedIn && state.user) {
    saveUserProfile(state.user).catch((err) => {
      console.warn('Failed to save user profile:', err);
    });
  }
});

/**
 * Save user profile (displayName, photoURL) to a world-readable node.
 * Idempotent — safe to call on every login.
 * @param {{ uid: string, displayName?: string, photoURL?: string }} user
 */
async function saveUserProfile(user) {
  if (!user?.uid) return;

  const profileRef = ref(rtdb, `users/${user.uid}/profile`);

  try {
    await set(profileRef, {
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
    });
  } catch (error) {
    console.error('Failed to save user profile:', error);
  }
}

/**
 * Fetch a user's public profile by ID.
 * Readable without authentication (world-readable node).
 * @param {string} userId
 * @returns {Promise<{ displayName: string|null, photoURL: string|null } | null>}
 */
export async function getUserProfile(userId) {
  if (!userId) return null;

  try {
    const snapshot = await get(ref(rtdb, `users/${userId}/profile`));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
}
