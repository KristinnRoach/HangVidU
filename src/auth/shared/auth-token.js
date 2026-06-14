import { auth } from '../adapters/firebase-auth-adapter.js';

/**
 * Get current user's ID token (JWT)
 * @returns {Promise<string|null>} ID token or null if not logged in
 */
export async function getLoggedInUserToken() {
  const user = auth.currentUser;
  if (!user) return null;
  // forceRefresh: false - use cached token if valid
  return user.getIdToken(false);
}
