// src/contacts/user-discovery.js
// User discovery system - allows users to find each other by email

import { ref, set, get } from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';
import { subscribe } from '../auth/auth-state.js';

// Auto-register user in directory when they log in
subscribe((state) => {
  if (state.isLoggedIn && state.user) {
    registerUserInDirectory(state.user).catch((err) => {
      console.warn('Failed to register user in directory:', err);
    });
  }
});

/**
 * Create a Firebase-safe hash from an email address.
 * Uses base64 encoding with Firebase-incompatible characters replaced.
 * @param {string} email - Email address to hash
 * @returns {string} - Firebase-safe hash
 */
export function hashEmail(email) {
  if (!email || typeof email !== 'string') {
    throw new Error('Invalid email: must be a non-empty string');
  }

  // Normalize: lowercase and trim
  const normalized = email.toLowerCase().trim();

  // UTF-8 safe base64 encode, then replace / for Firebase compatibility
  let binary = '';
  for (const b of new TextEncoder().encode(normalized))
    binary += String.fromCharCode(b);
  const safe = btoa(binary).replace(/\//g, '-');

  return safe;
}

/**
 * Register a user in the public directory for discovery by email.
 * Called after successful Google sign-in.
 * @param {Object} user - Firebase user object
 * @param {string} user.uid - User ID
 * @param {string} user.email - User email
 * @param {string} user.displayName - User display name
 * @param {string} [user.photoURL] - User photo URL
 * @returns {Promise<void>}
 */
export async function registerUserInDirectory(user) {
  if (!user || !user.uid || !user.email) {
    throw new Error('Invalid user: must have uid and email');
  }

  const emailHash = hashEmail(user.email);
  const userRef = ref(rtdb, `usersByEmail/${emailHash}`);

  const userData = {
    uid: user.uid,
    displayName: user.displayName || 'Anonymous',
    photoURL: user.photoURL || null,
    registeredAt: Date.now(),
  };

  try {
    await set(userRef, userData);
    console.log('[USER DISCOVERY] Registered user in directory:', user.email);
  } catch (error) {
    console.error('[USER DISCOVERY] Failed to register user:', error);
    throw error;
  }
}

/**
 * Find a user by email address.
 * @param {string} email - Email address to search for
 * @returns {Promise<Object|null>} - User data if found, null otherwise
 */
export async function findUserByEmail(email) {
  if (!email || typeof email !== 'string') {
    return null;
  }

  try {
    const emailHash = hashEmail(email);
    const userRef = ref(rtdb, `usersByEmail/${emailHash}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  } catch (error) {
    console.error('[USER DISCOVERY] Failed to find user by email:', error);
    return null;
  }
}

/**
 * Find multiple users by email addresses (batch lookup).
 * @param {string[]} emails - Array of email addresses
 * @returns {Promise<Object>} - Map of email to user data { email: userData | null }
 */
export async function findUsersByEmails(emails) {
  if (!Array.isArray(emails)) {
    throw new Error('Invalid emails: must be an array');
  }

  const results = {};

  // Perform lookups in parallel
  const promises = emails.map(async (email) => {
    const userData = await findUserByEmail(email);
    results[email] = userData;
  });

  await Promise.all(promises);

  return results;
}

/**
 * Remove a user from the discovery directory.
 * Called when a user deletes their account.
 * @param {string} email - Email address to remove
 * @returns {Promise<void>}
 */
export async function removeUserFromDirectory(email) {
  if (!email || typeof email !== 'string') {
    throw new Error('Invalid email: must be a non-empty string');
  }

  try {
    const emailHash = hashEmail(email);
    const userRef = ref(rtdb, `usersByEmail/${emailHash}`);
    const { remove } = await import('firebase/database');

    await remove(userRef);
    console.log('[USER DISCOVERY] Removed user from directory:', email);
  } catch (error) {
    console.error(
      '[USER DISCOVERY] Failed to remove user from directory:',
      error,
    );
    throw error;
  }
}
