// src/auth/auth-setup.js — auth instance, initialization, persistence, onAuthStateChanged

import { setState, subscribe, waitForAuthReady } from './auth-state.js';

import {
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
} from 'firebase/auth';

import { app } from '../firebase/firebase.js';
import { devDebug } from '../utils/dev/dev-utils.js';
import { initOneTap, showOneTapSignin } from './onetap.js';
import { clearGISTokenCache } from './gis-tokens.js';
import { getLocale, onLocaleChange } from '../i18n/index.js';
import { uiState } from '../ui/core/ui-state.js';

export const auth = getAuth(app);

// Sync Firebase Auth popup language with app locale
auth.languageCode = getLocale();
onLocaleChange((locale) => {
  auth.languageCode = locale;
});

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

// Production-aware auth logger: avoid printing PII in production builds
const isProd =
  typeof import.meta !== 'undefined' && Boolean(import.meta.env?.PROD);

export function logAuthError(context, error, extra = {}) {
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

let _initPromise = null;

/**
 * Initialize auth: set persistence, process redirects, then register
 * onAuthStateChanged. This ensures Firebase has restored any persisted
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
  // Signal that auth initialization is in progress
  setState({ status: 'loading' });

  // 1. Set persistence with graceful fallback for Safari/iOS/private mode
  try {
    await setPersistence(auth, indexedDBLocalPersistence);
  } catch (_) {
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch {
      await setPersistence(auth, inMemoryPersistence);
    }
  }

  // 2. Process redirect results (Safari external fallback)
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      devDebug('[AUTH] Sign-in completed (via Safari fallback)');
    }
  } catch (e) {
    devDebug('[AUTH] No redirect result:', e.code);
  }

  // 3. NOW safe to listen — persistence is set, redirects processed
  onAuthStateChanged(auth, (firebaseUser) => {
    const loggedIn = !!firebaseUser;
    setState(
      loggedIn
        ? {
            status: 'authenticated',
            isLoggedIn: true,
            user: normalizeUser(firebaseUser),
          }
        : { status: 'unauthenticated', isLoggedIn: false, user: null },
    );
    if (!loggedIn) clearGISTokenCache();
  });

  // 4. DOM/UI sync subscriber
  subscribe((state) => {
    document.body.dataset.loggedIn = state.isLoggedIn ? 'true' : 'false';
    uiState.setView(uiState.view);
    devDebug(
      '[AUTH] document.body.dataset.loggedIn set to',
      document.body.dataset.loggedIn,
    );
  });

  devDebug('[AUTH] Auth initialization complete, scheduling One Tap...');

  // Small delay to ensure page is fully loaded
  setTimeout(async () => {
    devDebug('[AUTH] Timeout fired, calling initOneTap()...');
    await initOneTap();
    await waitForAuthReady();
    showOneTapSignin();
  }, 500);
}

// --- Normalize Firebase User to plain object for auth-state ---
function normalizeUser(firebaseUser) {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL,
  };
}

/**
 * Wait for auth state to be initialized and return the current user.
 * Note: onAuthStateChanged fires once after initialization, so this always resolves.
 * @returns {Promise<import('firebase/auth').User | null>}
 */
export function getCurrentUserAsync() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}
