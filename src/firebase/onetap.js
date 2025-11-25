import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, isLoggedIn, setSafariExternalOpenArmed } from './auth.js';
import { devDebug } from '../utils/dev/dev-utils.js';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const oneTapCallbacks = new Set();

/**
 * Initialize Google One Tap (one-time setup)
 */

export function onOneTapStatusChange(callback) {
  devDebug(
    '[ONE TAP] Callback registered, total callbacks:',
    oneTapCallbacks.size + 1
  );
  oneTapCallbacks.add(callback);
  return () => oneTapCallbacks.delete(callback);
}

function notifyOneTapStatus(status) {
  devDebug(
    '[ONE TAP] Notifying status:',
    status,
    'to',
    oneTapCallbacks.size,
    'callbacks'
  );
  oneTapCallbacks.forEach((cb) => {
    try {
      cb(status);
    } catch (e) {
      devDebug('OneTap status callback error:', e);
    }
  });
}

export function initOneTap() {
  devDebug('[ONE TAP] initOneTap called');

  if (!GOOGLE_CLIENT_ID) {
    console.error(
      '[ONE TAP] Cannot initialize: VITE_APP_GOOGLE_CLIENT_ID is not configured'
    );
    return;
  }

  if (typeof google === 'undefined' || !google.accounts?.id) {
    devDebug(
      '[ONE TAP] Google Identity Services library not loaded yet, retrying...'
    );
    setTimeout(() => initOneTap(), 100);
    return;
  }

  devDebug('[ONE TAP] Google library loaded');

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleOneTapCredential,
    auto_select: false,
    cancel_on_tap_outside: true,
    context: 'signin',
    use_fedcm_for_prompt: true,
    //use_fedcm_for_button: true,
    itp_support: true, // ? Check
  });
}

export function showOneTapSignin() {
  devDebug('[ONE TAP] showOneTapSignin called');

  if (isLoggedIn()) {
    devDebug('[ONE TAP] User already logged in, skipping');
    notifyOneTapStatus('not_needed');
    return;
  }

  if (!window.google?.accounts?.id) {
    devDebug('[ONE TAP] Google library not loaded yet');
    return;
  }

  // if (forceAccountSelection) {
  //   // Cancel One Tap and force account chooser
  //   devDebug('[ONE TAP] Canceling One Tap to force account selection');
  //   window.google.accounts.id.cancel();
  //   // Trigger traditional sign-in flow with account selection
  //   notifyOneTapStatus('account_selection_requested');
  //   return;
  // }

  // DEV: Clear suppression state
  if (import.meta.env.DEV) {
    devDebug('[ONE TAP] DEV mode: clearing g_state cookie');
    document.cookie =
      'g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  devDebug('[ONE TAP] Calling google.accounts.id.prompt()');
  notifyOneTapStatus('prompting');

  window.google.accounts.id.prompt((notification) => {
    devDebug('[ONE TAP] Prompt notification:', notification);

    // Use new getMomentType() method instead of deprecated isSkippedMoment/isDisplayMoment/isDismissedMoment
    const momentType = notification.getMomentType();
    devDebug('[ONE TAP] Moment type:', momentType);

    if (momentType === 'skipped') {
      devDebug('[ONE TAP] Skipped');
      notifyOneTapStatus('skipped');
    } else if (momentType === 'dismissed') {
      devDebug('[ONE TAP] Dismissed');
      notifyOneTapStatus('dismissed');
    } else if (momentType === 'display') {
      devDebug('[ONE TAP] ✅ Displayed');
      notifyOneTapStatus('displayed');
    }
  });
}

/**
 * Handle the credential from Google One Tap
 * @param {Object} response - Contains the JWT credential
 */
async function handleOneTapCredential(response) {
  try {
    devDebug('[ONE TAP] Received credential, signing in with Firebase...');
    notifyOneTapStatus('signing_in');

    // Create a Google credential from the One Tap JWT
    const credential = GoogleAuthProvider.credential(response.credential);

    // Sign in to Firebase with the credential
    const result = await signInWithCredential(auth, credential);

    devDebug('[ONE TAP] ✅ Successfully signed in:', result.user.email);

    // Clear any armed Safari fallback
    setSafariExternalOpenArmed(false);
  } catch (error) {
    devDebug('[ONE TAP] ❌ Sign-in failed:', error);

    const errorCode = error?.code || 'unknown';
    const errorMessage = error?.message || String(error);

    // Handle specific errors
    if (errorCode === 'auth/account-exists-with-different-credential') {
      alert(
        'An account already exists with the same email but different sign-in credentials.'
      );
    } else {
      alert(`One Tap sign-in failed: ${errorMessage}`);
    }
  }
}

/**
 * Cancel the One Tap prompt programmatically
 * Useful if user starts typing in a login form
 */
export function cancelOneTap() {
  if (typeof google !== 'undefined' && google.accounts?.id) {
    google.accounts.id.cancel();
  }
}

/**
 * Google One Tap Integration
 *
 * - Status updates: `onOneTapStatusChange(callback)` with status values:
 *   - 'displayed': One Tap prompt is showing
 *   - 'skipped': User skipped the prompt
 *   - 'dismissed': User dismissed the prompt
 *   - 'not_needed': User already logged in
 *   - 'signing_in': User selected account, Firebase sign-in in progress
 * - Usage:
 *   - Call `initOneTap()` once after Firebase Auth is ready
 *   - Call `showOneTapSignin()` to display the prompt (can be called multiple times)
 *   - Use `onOneTapStatusChange` to update UI (e.g., show loading state)
 *   - Console logging is suppressed in production; use `devDebug` for development logs
 */
