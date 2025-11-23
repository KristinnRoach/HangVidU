// src/firebase/auth.js

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
  signOut,
} from 'firebase/auth';

import { app } from './firebase.js';
import { devDebug } from '../utils/dev/dev-utils.js';
import { isMobileDevice } from '../utils/env/isMobileDevice.js';
import { initOneTap, showOneTapSignin } from './onetap.js';

export const auth = getAuth(app);

// Export a promise that resolves when auth initialization completes
// This ensures redirect processing finishes before components subscribe to auth state
export const authReady = (async () => {
  // Set persistence early with graceful fallback for Safari/iOS/private mode
  try {
    await setPersistence(auth, indexedDBLocalPersistence);
  } catch (_) {
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch {
      await setPersistence(auth, inMemoryPersistence);
    }
  }

  // After persistence is set, process any pending redirect from a previous sign-in attempt.
  try {
    const result = await handleRedirectResult();
    if (result.success) {
      console.log(
        '[AUTH] ✅ Redirect sign-in completed, user:',
        result.user?.email || result.user?.uid
      );
    } else if (result.error) {
      console.error('[AUTH] ❌ Redirect sign-in failed:', result.error);
    } else {
      console.debug('[AUTH] No pending redirect result found.');
    }
  } catch (e) {
    console.error('[AUTH] Error during handleRedirectResult execution:', e);
  }

  devDebug('[AUTH] Auth initialization complete, scheduling One Tap...');

  // Small delay to ensure page is fully loaded
  setTimeout(() => {
    devDebug('[AUTH] Timeout fired, calling initOneTap()...');
    initOneTap();
    showOneTapSignin();
  }, 500);
})();

// iOS standalone PWA Safari fallback: armed after a failed attempt,
// then the next Login tap opens the app URL in Safari (user gesture).
let safariExternalOpenArmed = false;

/**
 * Get whether Safari external open fallback is armed.
 * @returns {boolean}
 */
export function isSafariExternalOpenArmed() {
  return safariExternalOpenArmed;
}

/**
 * Set Safari external open fallback armed state.
 * @param {boolean} value
 */
export function setSafariExternalOpenArmed(value) {
  safariExternalOpenArmed = value;
}

function openInSafariExternal() {
  try {
    const a = document.createElement('a');
    a.href = window.location.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer external';
    // Append to DOM to ensure iOS respects the gesture-triggered click
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (_) {}
}

let guestUserId = null; // Generated ID when not logged in (cached for session)
const createNewGuestUserId = () => Math.random().toString(36).substring(2, 15);

// Persist a stable per-browser guest ID with TTL
const GUEST_STORAGE_KEY = 'guestUser';
const DEFAULT_GUEST_TTL_MS = 48 * 60 * 60 * 1000; // 48 hours

function loadGuestFromLocalStorage() {
  try {
    const raw =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem(GUEST_STORAGE_KEY)
        : null;
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== 'object' || !obj.id) return null;
    if (obj.expiresAt && Date.now() > obj.expiresAt) {
      // Expired; clear and treat as missing
      try {
        localStorage.removeItem(GUEST_STORAGE_KEY);
      } catch (_) {}
      return null;
    }
    return obj;
  } catch (e) {
    return null;
  }
}

function persistGuestToLocalStorage(id, ttlMs = DEFAULT_GUEST_TTL_MS) {
  const now = Date.now();
  const payload = {
    id,
    createdAt: now,
    expiresAt: now + ttlMs,
  };
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(payload));
    }
  } catch (_) {}
  return payload;
}

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
  // If not logged in, use or generate a persistent guest user ID (with TTL)
  if (!guestUserId) {
    const stored = loadGuestFromLocalStorage();
    if (stored && stored.id) {
      guestUserId = stored.id;
    } else {
      guestUserId = createNewGuestUserId();
      persistGuestToLocalStorage(guestUserId);
    }
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

/**
 * Subscribe to auth state with a normalized, UI-friendly payload.
 * Returns Firebase's unsubscribe function.
 *
 * @param {(info: { user: import('firebase/auth').User|null, isLoggedIn: boolean, userName: string }) => void} callback
 * @param {{ truncate?: number }} [options]
 * @returns {() => void} Unsubscribe function
 */
export function onAuthChange(callback, { truncate = 7 } = {}) {
  return onAuthStateChanged(auth, (user) => {
    const isLoggedIn = !!user;
    const rawName = user?.displayName || 'Guest User';
    const userName =
      typeof rawName === 'string' && rawName.length > truncate
        ? rawName.slice(0, truncate) + '...'
        : rawName;

    try {
      callback({ user, isLoggedIn, userName });
    } catch (e) {
      // Swallow callback errors to avoid breaking the subscription loop
      // Optionally log in dev mode
      if (typeof devDebug === 'function')
        devDebug('onAuthChange callback error', e);
    }
  });
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  // Force account picker every time so user can choose different accounts for now // Todo: "Switch Account" button or select
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  // Use redirect flow for mobile devices (required for iOS Safari)
  // Use popup flow for desktop browsers
  const useMobileFlow = isMobileDevice();

  // Detect standalone PWA (iOS installed app or other platforms)
  const isStandalonePWA = (() => {
    try {
      return (
        (typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(display-mode: standalone)').matches) ||
        // Legacy iOS PWA detection
        (typeof navigator !== 'undefined' && navigator.standalone === true)
      );
    } catch (_) {
      return false;
    }
  })();
  const isIOSStandalone =
    isStandalonePWA && /iphone|ipad|ipod/i.test(navigator.userAgent || '');

  // In production (gh-pages), always use popup since static hosting lacks /__/auth/handler
  // In dev (ngrok with proxy), use redirect on mobile/standalone (proxy handles /__/auth)
  // Note: iOS standalone PWA on gh-pages will try popup; if blocked, we guide user to Safari
  const forcePopupInProd = import.meta.env.PROD;

  try {
    // If previous attempt failed in iOS standalone PWA, the user can tap Login again
    // and we open in Safari from the same user gesture.
    if (isIOSStandalone && safariExternalOpenArmed) {
      safariExternalOpenArmed = false;
      openInSafariExternal();
      return;
    }

    if ((useMobileFlow || isStandalonePWA) && !forcePopupInProd) {
      // Mobile or Standalone PWA (when not forcing popup): Use redirect
      console.log('[AUTH] Starting redirect sign-in flow...');
      await signInWithRedirect(auth, provider);
      // Note: redirect will navigate away, so code after this won't execute
      // The result will be handled by handleRedirectResult() on return
      return;
    }

    // Desktop (or mobile in prod when not standalone): Use popup flow
    const result = await signInWithPopup(auth, provider);
    // Google Access Token to access the Google API
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('Signed in user:', user);

    devDebug('Google Access Token exists:', !!token);
    safariExternalOpenArmed = false; // clear on success
  } catch (error) {
    const errorCode = error?.code || 'unknown';
    const errorMessage = error?.message || String(error);

    // Ignore popup-closed-by-user error (user cancelled auth)
    if (
      errorCode === 'auth/popup-closed-by-user' ||
      errorCode === 'auth/cancelled-popup-request'
    ) {
      console.log('Sign-in cancelled by user');
      return;
    }

    // iOS Standalone PWA: arm Safari fallback and ask user to tap Login again
    if (
      (errorCode === 'auth/network-request-failed' ||
        errorCode === 'auth/popup-blocked') &&
      isIOSStandalone
    ) {
      console.warn(
        `[AUTH] ${errorCode} inside iOS standalone PWA. Arming Safari fallback.`
      );
      safariExternalOpenArmed = true;
      alert(
        'Sign-in is blocked in the installed app on iOS.\n\nTap the Login button again to open in Safari and complete sign-in.'
      );
      return;
    }

    // If popup is blocked on mobile in prod, inform user
    if (
      errorCode === 'auth/popup-blocked' &&
      useMobileFlow &&
      import.meta.env.PROD
    ) {
      alert(
        'Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.'
      );
      return;
    }

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

/**
 * Handle redirect result after Google sign-in redirect flow (mobile)
 * Call this on app initialization to complete the sign-in after redirect
 */
export async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);

    if (result) {
      // User successfully signed in via redirect
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      console.log(
        '[AUTH] Redirect result found - signed in user:',
        user?.email || user?.uid
      );
      devDebug('Google Access Token exists:', !!token);

      return { success: true, user };
    }

    // No redirect result (normal page load, not returning from auth)
    console.log('[AUTH] No redirect result (normal page load)');
    return { success: false, user: null };
  } catch (error) {
    const errorCode = error?.code || 'unknown';
    const errorMessage = error?.message || String(error);
    const email = error?.customData?.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.error('Error handling redirect result:', {
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
    } else {
      alert(`Sign-in failed: ${errorMessage}`);
    }

    return { success: false, user: null, error };
  }
}

export const signInWithAccountSelection = async () => {
  try {
    devDebug('[AUTH] Sign in with account selection');

    const provider = new GoogleAuthProvider();
    // Force account selection
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    // Use popup on desktop, redirect on mobile/PWA
    if (
      isMobileDevice() ||
      window.matchMedia('(display-mode: standalone)').matches
    ) {
      devDebug('[AUTH] Using redirect flow for mobile/PWA');
      await signInWithRedirect(auth, provider);
    } else {
      devDebug('[AUTH] Using popup flow for desktop');
      const result = await signInWithPopup(auth, provider);
      devDebug('[AUTH] Popup sign-in successful:', result.user.email);
      return result;
    }
  } catch (error) {
    console.error('[AUTH] Account selection sign-in failed:', error);
    throw error;
  }
};

export function signOutUser() {
  signOut(auth)
    .then(() => {
      console.info('User signed out');
      setTimeout(() => showOneTapSignin(), 1500); // TODO: decide whether this is annoying
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
}
