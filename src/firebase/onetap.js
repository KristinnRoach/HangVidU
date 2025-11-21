import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, isLoggedIn, setSafariExternalOpenArmed } from './auth.js';
import { devDebug } from '../utils/dev/dev-utils.js';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const oneTapCallbacks = new Set();

/**
 * Initialize Google One Tap
 * @param {Object} [retryAfterClickOutside]
 * @param {'never'|'once'|'always'} [retryAfterClickOutside.shouldRetry] - Controls re-prompting after click outside: 'never', 'once', or 'always'.
 * @param {number} [retryAfterClickOutside.intervalSeconds] - Grace period before retry (seconds).
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

export function initializeOneTap(
  retryAfterClickOutside = { shouldRetry: 'never', intervalSeconds: 10 }
) {
  // Track if we've retried after click outside (for 'once' mode)
  if (!initializeOneTap._hasRetried) {
    initializeOneTap._hasRetried = false;
  }
  devDebug('[ONE TAP] initializeOneTap called');

  if (typeof google === 'undefined' || !google.accounts?.id) {
    devDebug(
      '[ONE TAP] Google Identity Services library not loaded yet, retrying...'
    );
    setTimeout(() => initializeOneTap(retryAfterClickOutside), 100);
    return;
  }

  devDebug('[ONE TAP] Google library loaded');

  if (isLoggedIn()) {
    devDebug('[ONE TAP] User already logged in, skipping');
    notifyOneTapStatus('not_needed');
    return;
  }

  // DEV: Clear suppression state
  if (import.meta.env.DEV) {
    devDebug('[ONE TAP] DEV mode: clearing g_state cookie');
    document.cookie =
      'g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleOneTapCredential,
    auto_select: false,
    cancel_on_tap_outside: false, // Prevent accidental browser-level dismissals
    context: 'signin',
    use_fedcm_for_prompt: true,
  });

  devDebug('[ONE TAP] Calling prompt()...');

  google.accounts.id.prompt((notification) => {
    devDebug('[ONE TAP] Prompt callback fired!', notification);

    if (notification.isNotDisplayed()) {
      const reason = notification.getNotDisplayedReason();
      devDebug('[ONE TAP] Not displayed:', reason);
      notifyOneTapStatus('not_displayed');
    } else if (notification.isSkippedMoment()) {
      const reason = notification.getSkippedReason();
      devDebug('[ONE TAP] Skipped:', reason);
      notifyOneTapStatus('skipped');
      // Retry logic for click outside (skipped/dismissed)
      handleRetryAfterClickOutside('skipped', retryAfterClickOutside);
    } else if (notification.isDismissedMoment()) {
      const reason = notification.getDismissedReason();
      devDebug('[ONE TAP] Dismissed:', reason);
      notifyOneTapStatus('dismissed');
      handleRetryAfterClickOutside('dismissed', retryAfterClickOutside);
    } else {
      devDebug('[ONE TAP] ✅ Displayed');
      notifyOneTapStatus('displayed');
      // Reset retry tracking for 'once' mode
      initializeOneTap._hasRetried = false;
    }
  });

  /**
   * Handles retry logic after click outside (skipped/dismissed)
   * @param {'skipped'|'dismissed'} eventType
   * @param {{shouldRetry: 'never'|'once'|'always', intervalSeconds: number}} opts
   */
  function handleRetryAfterClickOutside(eventType, opts) {
    const { shouldRetry = 'never', intervalSeconds = 10 } = opts || {};
    if (shouldRetry === 'never') return;
    if (shouldRetry === 'once' && initializeOneTap._hasRetried) return;
    initializeOneTap._hasRetried = true;
    setTimeout(() => {
      devDebug(`[ONE TAP] Retrying prompt after ${eventType}...`);
      initializeOneTap(opts);
    }, intervalSeconds * 1000);
  }
}

/**
 * Handle the credential from Google One Tap
 * @param {Object} response - Contains the JWT credential
 */
async function handleOneTapCredential(response) {
  try {
    devDebug('[ONE TAP] Received credential, signing in with Firebase...');

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
 * - Prevents accidental suppression: `cancel_on_tap_outside: false` (only explicit user actions dismiss prompt)
 * - Status updates: `onOneTapStatusChange(callback)` with status values: 'displayed', 'not_displayed', 'skipped', 'dismissed', 'not_needed'
 * - Retry logic: opt-in via `shouldRetry` in `initializeOneTap`
 * - Usage:
 *   - Call `initializeOneTap()` after Firebase Auth is ready
 *   - Use `onOneTapStatusChange` to update UI
 *   - No custom click-outside logic needed
 * - Console logging is suppressed in production; use `devDebug` for development logs
 */
