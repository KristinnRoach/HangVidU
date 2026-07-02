// src/auth/auth-setup.js — auth instance, initialization, persistence, auth listener

import { setState, waitForAuthReady } from './auth-state.js';

import {
  auth,
  getFirebaseRedirectResult,
  onFirebaseAuthStateChanged,
  persistenceBackends,
  setFirebaseAuthPersistence,
  signInFirebaseAnonymously,
} from './adapters/firebase-auth-adapter.js';
import { devDebug } from '../shared/utils/dev/dev-utils.js';
import { initOneTap, cancelOneTap, showOneTapSignin } from './onetap.js';
import { clearGisTokenCache } from '../shared/utils/google/gis-token-service.js';
import { getLocale, onLocaleChange } from '../shared/i18n/index.js';
import { logAuthError } from './shared/auth-error-logging.js';
import { getLoggedInUserToken } from './shared/auth-token.js';
import {
  extractUsernameFromSyntheticEmail,
  isSyntheticEmail,
} from './shared/synthetic-email.js';

// Sync Firebase Auth popup language with app locale
auth.languageCode = getLocale();
onLocaleChange((locale) => {
  auth.languageCode = locale;
});

export { getLoggedInUserToken };

/**
 * Provider profile fields are seed data for the app profile store only.
 * They are not part of public auth state because D1 owns app identity/profile.
 */
export function getAuthProviderProfileSeed() {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser || firebaseUser.isAnonymous) return null;
  const rawEmail = firebaseUser.email;
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName,
    email: isSyntheticEmail(rawEmail) ? null : rawEmail,
    photoURL: firebaseUser.photoURL,
    username: extractUsernameFromSyntheticEmail(rawEmail),
  };
}

/**
 * Ensure a Firebase user exists whose ID token can authenticate against the
 * signaling worker, without requiring an account: reuses the current session
 * (logged-in or anonymous), otherwise signs in anonymously.
 * Anonymous users are reported as logged-out in app auth state.
 * @returns {Promise<string>} the user's uid
 */
export async function signInAsGuest() {
  if (auth.currentUser) return auth.currentUser.uid;
  const { user } = await signInFirebaseAnonymously();
  return user.uid;
}

// Max wait for the Safari redirect-result check before proceeding to register
// the auth listener. Prevents a hung check from pinning auth state at 'loading'.
const REDIRECT_RESULT_TIMEOUT_MS = 4000;

let _initPromise = null;

/**
 * Initialize auth: set persistence, process redirects, then register
 * onFirebaseAuthStateChanged. This ensures Firebase has restored any persisted
 * session before we publish the first auth state — avoiding a false
 * 'unauthenticated' flash and premature side-effects.
 *
 * Safe to call multiple times — subsequent calls return the same promise.
 */
export function initAuth() {
  if (_initPromise) return _initPromise;
  _initPromise = _initAuthInternal();
  return _initPromise;
}

async function _initAuthInternal() {
  // 1. Set persistence with graceful fallback for Safari/iOS/private mode.
  // Must never throw: a rejection here would skip listener registration below,
  // leaving auth state stuck at 'uninitialized' (never ready → stuck UI).
  try {
    await setFirebaseAuthPersistence(
      persistenceBackends.indexedDBLocalPersistence,
    );
  } catch {
    try {
      await setFirebaseAuthPersistence(
        persistenceBackends.browserLocalPersistence,
      );
    } catch {
      try {
        await setFirebaseAuthPersistence(
          persistenceBackends.inMemoryPersistence,
        );
      } catch (e) {
        // In-memory is the last resort; proceed without persistence rather
        // than blocking auth initialization.
        logAuthError('All persistence backends failed', e);
      }
    }
  }

  // 2. Process redirect results (Safari external fallback). Bounded by a
  // timeout so a hung redirect check can't block listener registration and
  // leave auth state stuck at 'uninitialized'. The auth listener below still
  // reports any redirect sign-in once Firebase resolves it.
  try {
    const result = await Promise.race([
      getFirebaseRedirectResult(),
      new Promise((resolve) =>
        setTimeout(() => resolve(null), REDIRECT_RESULT_TIMEOUT_MS),
      ),
    ]);
    if (result?.user) {
      devDebug('[AUTH] Sign-in completed (via Safari fallback)');
    }
  } catch (e) {
    devDebug('[AUTH] No redirect result:', e.code);
  }

  // 3. NOW safe to listen — persistence is set, redirects processed
  onFirebaseAuthStateChanged((firebaseUser) => {
    // Anonymous sessions (guest calls) carry a real Firebase ID token for the
    // signaling worker, but are NOT app logins — UI and persistence layers
    // must keep treating the visitor as logged out.
    const loggedIn = !!firebaseUser && !firebaseUser.isAnonymous;
    setState(
      loggedIn
        ? {
            status: 'authenticated',
            isLoggedIn: true,
            user: normalizeUser(firebaseUser),
          }
        : { status: 'unauthenticated', isLoggedIn: false, user: null },
    );

    if (loggedIn) cancelOneTap();
    else clearGisTokenCache();
  });

  devDebug('[AUTH] Auth initialization complete, scheduling One Tap...');

  // Small delay to ensure page is fully loaded
  setTimeout(async () => {
    devDebug('[AUTH] Timeout fired, calling initOneTap()...');
    await initOneTap();
    await waitForAuthReady();
    showOneTapSignin();
  }, 100);
}

// --- Normalize Firebase User to plain object for auth-state ---
// Username-only accounts use a synthetic email as the Firebase Auth principal;
// strip it so consumers see `email: null` for those accounts.
function normalizeUser(firebaseUser) {
  if (!firebaseUser) return null;
  const rawEmail = firebaseUser.email;
  const email = isSyntheticEmail(rawEmail) ? null : rawEmail;
  return {
    uid: firebaseUser.uid,
    email,
  };
}
