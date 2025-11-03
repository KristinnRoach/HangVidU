import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from './firebase.js';
import { devDebug } from '../utils/dev-utils.js';

export const auth = getAuth(app);
let guestUserId = null; // Generated ID when not logged in

const createNewGuestUserId = () => Math.random().toString(36).substring(2, 15);

/**
 * Get the user ID to use for this session.
 * Returns the authenticated user's UID if logged in,
 * otherwise generates a guest ID
 * (or uses an existing one if already generated).
 * @returns {string} The current user ID
 */
export function getUserId() {
  const userId = getLoggedInUserId();
  if (userId) {
    return userId;
  }
  // If not logged in, use or generate a guest user ID
  if (!guestUserId) {
    guestUserId = createNewGuestUserId();
  }
  return guestUserId;
}

/**
 * Get the current authenticated user.
 * @returns {import('firebase/auth').User | null} The current user if logged in, null otherwise.
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Check if a user is currently logged in.
 * @returns {boolean} True if user is logged in, false otherwise.
 */
export function isLoggedIn() {
  return auth.currentUser !== null;
}

/**
 * Get the currently logged in user's ID (uid).
 * @returns {string | null} The user's uid if logged in, null otherwise.
 */
export function getLoggedInUserId() {
  return auth.currentUser?.uid ?? null;
}

/**
 * Wait for auth state to be initialized and return the current user.
 * Useful when you need to ensure auth persistence has been checked.
 * Note: onAuthStateChanged fires once after initialization, so this always resolves.
 * @returns {Promise<import('firebase/auth').User | null>} The current user if logged in, null otherwise.
 */
export function getCurrentUserAsync() {
  return new Promise((resolve) => {
    // onAuthStateChanged always fires once after auth initialization
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // Google Access Token to access the Google API
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('Signed in user:', user);

    devDebug('Google Access Token:', token);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error(
      'Error during Google sign-in:',
      errorMessage,
      errorCode,
      email,
      credential
    );
    alert(`Sign-in failed: ${errorMessage}`);
  }
}

export function signOutUser() {
  auth
    .signOut()
    .then(() => {
      console.log('User signed out successfully');
      // alert('You have been signed out.');
    })
    .catch((error) => {
      console.error('Error signing out:', error);
      // alert(`Sign-out failed: ${error.message}`);
    });
}
