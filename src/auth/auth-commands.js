// src/auth/auth-commands.js — sign-in, sign-out + iOS Safari workarounds

import { logAuthError } from './shared/auth-error-logging.js';
import { normalizeAuthErrorCode } from './shared/auth-error-codes.js';
import { clearGisTokenCache } from '@shared/utils/google/gis-token-service.js';
import { beginAuthTransition } from './auth-state.js';
import { showOneTapSignin } from './onetap.js';
import {
  auth,
  createGoogleAuthProvider,
  signInWithGooglePopup,
  signOutFirebaseUser,
} from './adapters/firebase-auth-adapter.js';
import {
  dispatchCommand,
  dispatchCommandAndAwait,
} from '@shared/events/index.js';
import { t } from '@shared/i18n/index.js';
import { devDebug } from '@shared/utils/dev/dev-utils.js';
import {
  detectIOSStandalone,
  openInSafariExternal,
} from './shared/auth-platform-utils.js';
import { disableGoogleAutoSignIn } from '@shared/utils/google/google-identity-adapter.js';
import {
  isSafariExternalOpenArmed,
  setSafariExternalOpenArmed,
} from './shared/safari-auth-fallback.js';

/**
 * A robust, shared error handler for Google Sign-In popup errors.
 * Handles user cancellations, popup blockers, iOS PWA fallbacks, and other common issues.
 * @param {Error} error The error object from a signInWithPopup catch block.
 */
function handleSignInError(error) {
  const code = normalizeAuthErrorCode(error);

  // User cancelled the popup — not an error, show nothing.
  if (code === 'cancelled') {
    console.log('Sign-in cancelled by user');
    return;
  }

  const { isIOSStandalone } = detectIOSStandalone();

  // iOS Standalone PWA: arm Safari fallback and ask user to tap Login again.
  if (
    (code === 'network-error' || code === 'popup-blocked') &&
    isIOSStandalone
  ) {
    console.warn(
      `[AUTH] ${code} inside iOS standalone PWA. Arming Safari fallback.`,
    );
    setSafariExternalOpenArmed(true);
    alert(t('auth.ios_blocked'));
    return;
  }

  // Popup blocked (non-iOS-standalone, handled above otherwise): inform user.
  if (code === 'popup-blocked') {
    alert(t('auth.popup_blocked'));
    return;
  }

  // Log in a production-safe way (never log email/sensitive data).
  logAuthError('Google sign-in', error);

  if (code === 'unauthorized-domain') {
    alert(t('auth.unauthorized'));
    return;
  }

  // Generic fallback for any other errors.
  alert(t('auth.sign_in_failed'));
}

export const signInWithAccountSelection = async () => {
  const provider = createGoogleAuthProvider();
  // Force account selection
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  const { isIOSStandalone } = detectIOSStandalone();

  // Signal sign-in is in progress (will be cleared by the auth listener).
  const revertAuthState = beginAuthTransition();

  try {
    // If previous attempt failed in iOS standalone PWA, the user can tap Login again
    // and we open in Safari from the same user gesture.
    if (isIOSStandalone && isSafariExternalOpenArmed()) {
      devDebug('[AUTH] Using Safari external fallback');
      setSafariExternalOpenArmed(false);
      openInSafariExternal();
      revertAuthState();
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
    revertAuthState();
    // Don't re-throw - errors are handled gracefully by handleSignInError
  }
};

export async function signOutUser() {
  // Signal sign-out is in progress (will be cleared by the auth listener).
  const revertAuthState = beginAuthTransition();

  try {
    // Disable notifications and unregister the current Web Push subscription - Fire and forget
    dispatchCommand('cmd:push:subscription:disable', {
      reason: 'auth:signout',
    });

    await dispatchCommandAndAwait('cmd:user:presence:set-offline', {
      userId: auth.currentUser?.uid,
    });
    clearGisTokenCache();
    await signOutFirebaseUser();
    console.info('User signed out');
    disableGoogleAutoSignIn();
    setTimeout(() => showOneTapSignin(), 1500); // ? reshow onetap on signout ?
  } catch (error) {
    logAuthError('Sign out', error);
    revertAuthState();
    // Re-throw the error to allow callers to handle it
    throw error;
  }
}
