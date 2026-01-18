// src/firebase/auth.js

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
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
import { initOneTap, showOneTapSignin } from './onetap.js';

import { initializePresence, setOffline } from './presence.js';
import { registerUserInDirectory } from '../contacts/user-discovery.js';

export const auth = getAuth(app);

// Production-aware auth logger: avoid printing PII in production builds
const isProd =
  typeof import.meta !== 'undefined' && Boolean(import.meta.env?.PROD);
function logAuthError(context, error, extra = {}) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'n/a';
  if (isProd) {
    console.error(`[AUTH] ${context}:`, {
      code: error?.code || 'unknown',
      message: error?.message || String(error),
      origin,
      ...extra,
    });
  } else {
    console.error(`[AUTH] ${context}:`, error, extra, { origin });
  }
}

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

  // Note: We always use popup flow now, so redirect results are only from
  // the Safari external fallback (which opens the app URL in Safari browser).
  // Keep this check in case user completes sign-in in Safari and returns to PWA.
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      // Do not print user displayName in production logs
      devDebug('[AUTH] ✅ Sign-in completed (via Safari fallback)');
    }
  } catch (e) {
    // Ignore redirect result errors - they're expected when no redirect occurred
    devDebug('[AUTH] No redirect result:', e.code);
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

/**
 * Detect if running in iOS standalone PWA mode.
 * @returns {{ isStandalonePWA: boolean, isIOS: boolean, isIOSStandalone: boolean }}
 */
function detectIOSStandalone() {
  const displayModeStandalone =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(display-mode: standalone)').matches;
  const navigatorStandalone =
    typeof navigator !== 'undefined' && navigator.standalone === true;
  const isStandalonePWA = displayModeStandalone || navigatorStandalone;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent || '');
  const isIOSStandalone = isStandalonePWA && isIOS;
  return { isStandalonePWA, isIOS, isIOSStandalone };
}

/**
 * A robust, shared error handler for Google Sign-In popup errors.
 * Handles user cancellations, popup blockers, iOS PWA fallbacks, and other common issues.
 * @param {Error} error The error object from a signInWithPopup catch block.
 */
function handleSignInError(error) {
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

  const { isIOSStandalone } = detectIOSStandalone();

  // iOS Standalone PWA: arm Safari fallback and ask user to tap Login again
  if (
    (errorCode === 'auth/network-request-failed' ||
      errorCode === 'auth/popup-blocked') &&
    isIOSStandalone
  ) {
    console.warn(
      `[AUTH] ${errorCode} inside iOS standalone PWA. Arming Safari fallback.`
    );
    setSafariExternalOpenArmed(true);
    alert(
      'Sign-in is blocked in the installed app on iOS.\n\nTap the Login button again to open in Safari and complete sign-in.'
    );
    return;
  }

  // If popup is blocked (and not iOS standalone which is handled above), inform user
  if (errorCode === 'auth/popup-blocked') {
    alert(
      'Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.'
    );
    return;
  }

  // The email of the user's account used (do not print raw value in prod)
  const email = error?.customData?.email;
  // Log error in a production-safe way
  logAuthError('Google sign-in', error, {
    email: email ? '<redacted>' : undefined,
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

  // Generic fallback for any other errors
  alert(`Sign-in failed: ${errorMessage}`);
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

    // Initialize presence when user logs in
    if (isLoggedIn) {
      initializePresence().catch((err) => {
        console.warn('Failed to initialize presence:', err);
      });

      // Register user in discovery directory
      registerUserInDirectory(user).catch((err) => {
        console.warn('Failed to register user in directory:', err);
      });
    }

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

export const signInWithAccountSelection = async () => {
  const provider = new GoogleAuthProvider();
  // Force account selection
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  const { isIOSStandalone } = detectIOSStandalone();

  try {
    // If previous attempt failed in iOS standalone PWA, the user can tap Login again
    // and we open in Safari from the same user gesture.
    if (isIOSStandalone && safariExternalOpenArmed) {
      devDebug('[AUTH] Using Safari external fallback');
      setSafariExternalOpenArmed(false);
      openInSafariExternal();
      return;
    }

    // ALWAYS use popup flow (even for iOS standalone PWAs)
    // If popup is blocked, we'll catch the error and fallback to Safari external
    devDebug('[AUTH] Starting popup sign-in flow...');
    const result = await signInWithPopup(auth, provider);
    devDebug('[AUTH] Popup sign-in successful:', result.user.email);
    setSafariExternalOpenArmed(false); // clear on success
    return result;
  } catch (error) {
    handleSignInError(error);
    // Don't re-throw - errors are handled gracefully by handleSignInError
  }
};

export async function signOutUser() {
  try {
    await setOffline();
    await signOut(auth);
    console.info('User signed out');
    setTimeout(() => showOneTapSignin(), 1500); // TODO: decide whether this is annoying
  } catch (error) {
    logAuthError('Sign out', error);
    // Re-throw the error to allow callers to handle it
    throw error;
  }
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

/**
 * Request Google Contacts access via Google Identity Services Token Model.
 * Opens a popup to request the contacts.readonly scope.
 * @returns {Promise<string>} - Google access token with contacts scope
 * @throws {Error} - If authorization fails or is cancelled
 */
export function requestContactsAccess() {
  return new Promise((resolve, reject) => {
    if (!GOOGLE_CLIENT_ID) {
      reject(new Error('Google Client ID not configured'));
      return;
    }

    // Wait for GIS library to load
    if (typeof google === 'undefined' || !google.accounts?.oauth2) {
      reject(new Error('Google Identity Services not loaded'));
      return;
    }

    const currentUser = getCurrentUser();

    console.log('[AUTH] Requesting contacts access via GIS Token Model...');

    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly',
      hint: currentUser?.email || undefined,
      callback: (response) => {
        if (response.error) {
          console.error('[AUTH] Token request error:', response.error);
          if (response.error === 'access_denied') {
            reject(new Error('Authorization cancelled'));
          } else {
            reject(new Error(response.error_description || response.error));
          }
          return;
        }

        if (!response.access_token) {
          reject(new Error('No access token received'));
          return;
        }

        console.log('[AUTH] Contacts access granted');
        resolve(response.access_token);
      },
      error_callback: (error) => {
        console.error('[AUTH] Token client error:', error);
        if (error.type === 'popup_closed') {
          reject(new Error('Authorization cancelled'));
        } else {
          reject(new Error(error.message || 'Authorization failed'));
        }
      },
    });

    // Request the token (opens popup)
    tokenClient.requestAccessToken();
  });
}
