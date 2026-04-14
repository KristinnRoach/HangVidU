// src/contacts/user-discovery.js
// User discovery system - allows users to find each other by email

import { ref, set, get, remove } from 'firebase/database';
import { rtdb } from '../../shared/storage/fb-rtdb/rtdb.js';
import { onAuthStateChanged } from '../../auth/index.js';

function canonicalizeDirectoryUser(userData) {
  if (!userData || typeof userData !== 'object') {
    return null;
  }

  const userName =
    typeof userData.userName === 'string' && userData.userName.trim()
      ? userData.userName.trim()
      : typeof userData.displayName === 'string' && userData.displayName.trim()
        ? userData.displayName.trim()
        : 'Anonymous';

  return {
    ...userData,
    userName,
  };
}

// Auto-register user in directory when they log in
onAuthStateChanged((state) => {
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
 * @param {string} user.userName - User display name
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
    userName: user.userName || 'Anonymous',
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
 * Lookup a user by email address with explicit outcome typing.
 * @param {string} email - Email address to search for
 * @returns {Promise<{status: 'found' | 'not_found' | 'lookup_error', user: Object | null, error?: unknown}>}
 */
export async function lookupUserByEmail(email) {
  if (!email || typeof email !== 'string') {
    return { status: 'not_found', user: null };
  }

  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return { status: 'not_found', user: null };
  }

  try {
    const emailHash = hashEmail(trimmedEmail);
    const userRef = ref(rtdb, `usersByEmail/${emailHash}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return { status: 'not_found', user: null };
    }

    const user = canonicalizeDirectoryUser(snapshot.val());
    if (!user) {
      return { status: 'not_found', user: null };
    }

    return { status: 'found', user };
  } catch (error) {
    console.error('[USER DISCOVERY] Failed to find user by email:', error);
    return { status: 'lookup_error', user: null, error };
  }
}

/**
 * Find a user by email address.
 * @param {string} email - Email address to search for
 * @returns {Promise<Object|null>} - User data if found, null otherwise
 */
export async function findUserByEmail(email) {
  const result = await lookupUserByEmail(email);
  if (result.status !== 'found') {
    return null;
  }
  return result.user;
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
 * Remove a user from the 'usersByEmail' discovery directory.
 *
 * @param {string} email - Email address to remove
 * @returns {Promise<void>}
 */
export async function removeFromUserByEmailDirectory(email) {
  if (!email || typeof email !== 'string') {
    throw new Error('Invalid email: must be a non-empty string');
  }

  try {
    const emailHash = hashEmail(email);
    const userRef = ref(rtdb, `usersByEmail/${emailHash}`);
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
