// src/auth/auth-actions.js — sign-in, sign-out, delete + iOS Safari workarounds

import { auth, logAuthError } from './auth-setup.js';
import { clearGISTokenCache } from './gis-tokens.js';
import { setState } from './auth-state.js';
import { showOneTapSignin } from './onetap.js';
import {
  createGoogleAuthProvider,
  signInWithGooglePopup,
  signOutFirebaseUser,
} from './firebase-auth-adapter.js';
import { dispatchCommand, dispatchCommandAndAwait } from '../events/index.js';
import { t } from '../i18n/index.js';
import { devDebug } from '../utils/dev/dev-utils.js';
import { getPushNotifications } from '../features/push-notifications/index.js';
import { callCloudFunction } from './cloud-functions.js';

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
  const isIOS =
    typeof navigator !== 'undefined' &&
    /iphone|ipad|ipod/i.test(navigator.userAgent || '');
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
  // Only log error details, do not show raw error to user

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
      `[AUTH] ${errorCode} inside iOS standalone PWA. Arming Safari fallback.`,
    );
    setSafariExternalOpenArmed(true);
    alert(t('auth.ios_blocked'));
    return;
  }

  // If popup is blocked (and not iOS standalone which is handled above), inform user
  if (errorCode === 'auth/popup-blocked') {
    alert(t('auth.popup_blocked'));
    return;
  }

  // The email of the user's account used (do not print raw value in prod)
  // Log error in a production-safe way, do not log email or sensitive data
  logAuthError('Google sign-in', error);

  if (errorCode === 'auth/unauthorized-domain') {
    alert(t('auth.unauthorized'));
    return;
  }

  // Generic fallback for any other errors
  alert(t('auth.sign_in_failed'));
}

export const signInWithAccountSelection = async () => {
  const provider = createGoogleAuthProvider();
  // Force account selection
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  const { isIOSStandalone } = detectIOSStandalone();

  // Signal sign-in is in progress (will be cleared by onAuthStateChanged)
  setState({ status: 'loading' });

  try {
    // If previous attempt failed in iOS standalone PWA, the user can tap Login again
    // and we open in Safari from the same user gesture.
    if (isIOSStandalone && safariExternalOpenArmed) {
      devDebug('[AUTH] Using Safari external fallback');
      setSafariExternalOpenArmed(false);
      openInSafariExternal();
      setState({ status: 'idle' });
      return;
    }

    // ALWAYS use popup flow (even for iOS standalone PWAs)
    // If popup is blocked, we'll catch the error and fallback to Safari external
    devDebug('[AUTH] Starting popup sign-in flow...');
    const result = await signInWithGooglePopup(provider);
    devDebug('[AUTH] Popup sign-in successful');
    setSafariExternalOpenArmed(false); // clear on success
    return result;
  } catch (error) {
    handleSignInError(error);
    setState({ status: 'idle' });
    // Don't re-throw - errors are handled gracefully by handleSignInError
  }
};

export async function signOutUser() {
  // Signal sign-out is in progress (will be cleared by onAuthStateChanged)
  setState({ status: 'loading' });

  try {
    // Disable notifications and unregister the current Web Push subscription - Fire and forget
    getPushNotifications()
      ?.disable?.()
      .catch((err) => {
        console.warn('[AUTH] Failed to disable notifications on logout:', err);
      });

    await dispatchCommandAndAwait('user:presence:set-offline', {
      userId: auth.currentUser?.uid,
    });
    clearGISTokenCache();
    await signOutFirebaseUser();
    console.info('User signed out');
    setTimeout(() => showOneTapSignin(), 1500); // TODO: decide whether this is annoying
  } catch (error) {
    logAuthError('Sign out', error);
    setState({ status: 'idle' });
    // Re-throw the error to allow callers to handle it
    throw error;
  }
}

/**
 * Delete the current user's account and all associated data.
 * Delegates to the deleteAccount Cloud Function which handles all cleanup
 * server-side with Admin SDK (RTDB data, discovery directory, Auth record).
 *
 * @throws {Error} If user is not logged in or deletion fails
 */
export async function deleteAccount({ scrubMessages = true } = {}) {
  const user = auth.currentUser;
  if (!user || !user.uid) {
    throw new Error('No user logged in, user: ' + user);
  }

  setState({ status: 'loading' });

  try {
    console.info('[AUTH] Starting account deletion');

    await dispatchCommandAndAwait('user:presence:set-offline', {
      userId: user.uid,
    });
    clearGISTokenCache();

    await callCloudFunction('deleteAccount', { scrubMessages });

    // Sign out locally — the server deleted the Auth record but the
    // client's cached token would remain valid until it expires.
    await signOutFirebaseUser();

    console.info('[AUTH] Account deleted successfully');
    setTimeout(() => showOneTapSignin(), 1500);
  } catch (error) {
    logAuthError('Delete account', error);
    setState({ status: 'idle' });
    throw error;
  }
}
