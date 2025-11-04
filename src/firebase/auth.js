import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from './firebase.js';
import { devDebug } from '../utils/dev/dev-utils.js';

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

    devDebug('Google Access Token exists:', !!token);
  } catch (error) {
    const errorCode = error?.code || 'unknown';
    const errorMessage = error?.message || String(error);
    // The email of the user's account used.
    const email = error?.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.error('Error during Google sign-in:', {
      errorCode,
      errorMessage,
      email,
      credential,
      origin: typeof window !== 'undefined' ? window.location.origin : 'n/a',
    });

    if (errorCode === 'auth/unauthorized-domain') {
      const origin =
        typeof window !== 'undefined' ? window.location.origin : '';
      const guidanceLines = [
        "This app's host is not whitelisted in Firebase Authentication.",
        'Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:',
        origin ? `• ${origin}` : '• <your dev origin>',
        '',
        'Common dev hosts to add:',
        '• http://localhost (covers any port)',
        '• http://127.0.0.1',
        '• http://[::1] (IPv6 localhost)',
        '• Your LAN IP, e.g. http://192.168.x.y',
        '',
        'Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead.',
      ];

      // Try to copy the origin to the clipboard for convenience (best-effort)
      if (
        origin &&
        typeof navigator !== 'undefined' &&
        navigator.clipboard?.writeText
      ) {
        navigator.clipboard.writeText(origin).catch(() => {});
      }

      alert(
        `Sign-in failed: Unauthorized domain.\n\n${guidanceLines.join('\n')}`
      );
      return;
    }

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
