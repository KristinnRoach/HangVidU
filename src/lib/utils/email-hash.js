// src/shared/utils/email-hash.js
// Firebase-safe hash of an email address, used as the key under `usersByEmail/`.
// Pure function — kept in shared so both storage and auth layers can use it.

/**
 * @param {string} email
 * @returns {string} Firebase-safe base64 of the lowercased, trimmed email.
 */
export function hashEmail(email) {
  if (!email || typeof email !== 'string') {
    throw new Error('Invalid email: must be a non-empty string');
  }

  const normalized = email.toLowerCase().trim();

  let binary = '';
  for (const b of new TextEncoder().encode(normalized)) {
    binary += String.fromCharCode(b);
  }
  return btoa(binary).replace(/\//g, '-');
}
