// src/auth/auth-actions.js — sign-in, sign-out, delete + iOS Safari workarounds

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser,
} from 'firebase/auth';

import { auth, logAuthError } from './auth-setup.js';
import { clearGISTokenCache } from './gis-tokens.js';
import { setState } from './auth-state.js';
import { showOneTapSignin } from './onetap.js';
import { setOffline } from '../firebase/presence.js';
import { t } from '../i18n/index.js';
import { devDebug } from '../utils/dev/dev-utils.js';

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
  const email = error?.customData?.email;
  // Log error in a production-safe way
  logAuthError('Google sign-in', error, {
    email: email ? '<redacted>' : undefined,
  });

  if (errorCode === 'auth/unauthorized-domain') {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
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

    alert(t('auth.unauthorized', { details: guidanceLines.join('\n') }));
    return;
  }

  // Generic fallback for any other errors
  alert(t('auth.sign_in_failed', { error: errorMessage }));
}

export const signInWithAccountSelection = async () => {
  const provider = new GoogleAuthProvider();
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
  // Signal sign-out is in progress (will be cleared by onAuthStateChanged)
  setState({ status: 'loading' });

  try {
    await setOffline();
    clearGISTokenCache();
    await signOut(auth);
    console.info('User signed out');
    setTimeout(() => showOneTapSignin(), 1500); // TODO: decide whether this is annoying
  } catch (error) {
    logAuthError('Sign out', error);
    // Re-throw the error to allow callers to handle it
    throw error;
  }
}

/**
 * Delete the current user's account and all associated data.
 * Cleanup runs before deleteUser() because RTDB security rules require
 * an authenticated session (auth.uid). If deleteUser() subsequently fails
 * (e.g. auth/requires-recent-login), the data is already gone but the
 * auth account remains — the user can simply retry.
 *
 * @throws {Error} If user is not logged in or deletion fails
 */
export async function deleteAccount() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user logged in');
  }

  const userId = user.uid;

  // Signal account deletion is in progress (will be cleared by onAuthStateChanged)
  setState({ status: 'loading' });

  try {
    console.info('[AUTH] Starting account deletion for user:', userId);

    // 1. Set user offline and clear cached tokens
    await setOffline();
    clearGISTokenCache();

    // 2. Clean up user data while still authenticated (RTDB rules require auth)
    const { ref, remove } = await import('firebase/database');
    const { rtdb } = await import('../storage/fb-rtdb/rtdb.js');

    console.info('[AUTH] Cleaning up user data from RTDB...');
    try {
      await remove(ref(rtdb, `users/${userId}`));
    } catch (err) {
      console.warn('[AUTH] Failed to remove user node from RTDB:', err);
    }

    // 3. Delete FCM token if available
    try {
      const { FCMTransport } =
        await import('../notifications/transports/fcm-transport.js');
      const fcmTransport = new FCMTransport();
      await fcmTransport.deleteToken();
    } catch (err) {
      console.warn('[AUTH] Failed to delete FCM token:', err);
    }

    // 4. Remove user from discovery directory (so they don't show as "On HangVidU")
    if (user.email) {
      try {
        const { removeUserFromDirectory } =
          await import('../contacts/user-discovery.js');
        await removeUserFromDirectory(user.email);
      } catch (err) {
        console.warn(
          '[AUTH] Failed to remove user from discovery directory:',
          err,
        );
      }
    }

    // 5. Delete the Firebase Auth account (also signs out the user)
    console.info('[AUTH] Deleting Firebase Auth account...');
    await deleteUser(user);

    console.info('[AUTH] Account deleted successfully');
    setTimeout(() => showOneTapSignin(), 1500);
  } catch (error) {
    logAuthError('Delete account', error);

    if (error.code === 'auth/requires-recent-login') {
      throw new Error(
        'For security, please sign out and sign in again before deleting your account.',
      );
    }

    throw error;
  }
}
