// profile.js - Save user profile to a world-readable RTDB node.
// Separate from presence so profile data isn't overwritten by connect/disconnect cycles.

import { ref, set, get } from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';

let profileSaved = false;

/**
 * Save user profile (displayName, photoURL) to a world-readable node.
 * Called once per session after authentication.
 * @param {import('firebase/auth').User} user
 */
export async function saveUserProfile(user) {
  if (!user?.uid || profileSaved) return;

  const profileRef = ref(rtdb, `users/${user.uid}/profile`);

  try {
    await set(profileRef, {
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
    });
    profileSaved = true;
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
