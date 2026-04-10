import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './auth-setup.js';
import { setSafariExternalOpenArmed } from './auth-actions.js';
import { getIsLoggedIn, setState } from './auth-state.js';
import { devDebug } from '../utils/dev/dev-utils.js';
import { t, getLocale, onLocaleChange } from '../i18n/index.js';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const GIS_SCRIPT_BASE = 'https://accounts.google.com/gsi/client';

const oneTapCallbacks = new Set();

/**
 * Load the Google Identity Services script with the given locale.
 * Removes any previously loaded GIS script first.
 */
function loadGISScript(locale) {
  return new Promise((resolve, reject) => {
    // Remove existing GIS script if present
    const existing = document.querySelector(
      `script[src^="${GIS_SCRIPT_BASE}"]`,
    );
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = `${GIS_SCRIPT_BASE}?hl=${locale}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load GIS script'));
    document.head.appendChild(script);
  });
}

/**
 * Suppress FedCM abort errors that occur when users dismiss One Tap.
 * These errors are expected behavior and should not clutter the console.
 */
function suppressFedCMAbortErrors() {
  // Only suppress in production to avoid hiding real issues during development
  if (import.meta.env.DEV) return;

  const originalError = console.error;
  console.error = (...args) => {
    const message = args.join(' ');

    // Filter out FedCM abort errors
    if (
      message.includes('FedCM') &&
      message.includes('AbortError') &&
      message.includes('signal is aborted without reason')
    ) {
      // Suppress this expected error
      return;
    }

    // Also filter out the generic "The request has been aborted" error
    if (
      args.length === 1 &&
      typeof args[0] === 'string' &&
      args[0].trim() === 'The request has been aborted.'
    ) {
      // Suppress this expected error
      return;
    }

    // Pass all other errors through
    originalError.apply(console, args);
  };
}

/**
 * Initialize Google One Tap (one-time setup)
 */

export function onOneTapStatusChange(callback) {
  devDebug(
    '[ONE TAP] Callback registered, total callbacks:',
    oneTapCallbacks.size + 1,
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
    'callbacks',
  );
  oneTapCallbacks.forEach((cb) => {
    try {
      cb(status);
    } catch (e) {
      devDebug('OneTap status callback error:', e);
    }
  });
}

export async function initOneTap() {
  devDebug('[ONE TAP] initOneTap called');

  if (!GOOGLE_CLIENT_ID) {
    console.error(
      '[ONE TAP] Cannot initialize: VITE_APP_GOOGLE_CLIENT_ID is not configured',
    );
    return;
  }

  // Load GIS script dynamically with current locale
  try {
    await loadGISScript(getLocale());
  } catch (e) {
    devDebug('[ONE TAP] Failed to load GIS script:', e);
    return;
  }

  devDebug('[ONE TAP] Google library loaded');

  // Suppress FedCM abort errors when user dismisses One Tap
  // These are expected user actions, not actual errors
  suppressFedCMAbortErrors();

  initializeGIS();

  // Re-load GIS with new locale when language changes
  onLocaleChange(async (locale) => {
    devDebug('[ONE TAP] Locale changed to', locale, '— reloading GIS');
    try {
      await loadGISScript(locale);
      initializeGIS();
    } catch (e) {
      devDebug('[ONE TAP] Failed to reload GIS for locale:', e);
    }
  });
}

function initializeGIS() {
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    ux_mode: 'popup', // popup or redirect
    context: 'signin', // Sets text content. "signin": Sign in to, "singup": Sign up to, "use": Use
    itp_support: true, // Enable the upgraded One Tap UX on browsers that support Intelligent Tracking Prevention (ITP)
    cancel_on_tap_outside: false,
    auto_select: true, // Todo: Verify behaviour. Does it automatically select the account if the user is logged in in the browser?
    prompt_parent_id: 'onetap-container', // Position prompt in container
    callback: handleOneTapCredential, // Required for popup UX mode

    // TODO: Research and optimize:
    // Docs: https://developers.google.com/identity/gsi/web/reference/js-reference
    // native_callback: // Optional
    // nonce: // Optional random string used by the ID token to prevent replay attacks
    // login_hint: // Optional pre-fill
    /* use_fedcm_for_prompt - NOTE: This attribute is deprecated:
       - Research use_fedcm_for_button + button_auto_select and the link below: 
       https://developers.google.com/identity/gsi/web/guides/fedcm-migration
    */
  });
}

export function showOneTapSignin() {
  devDebug('[ONE TAP] showOneTapSignin called');

  if (getIsLoggedIn()) {
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

    // Signal main auth state that sign-in is in progress (will be cleared by onAuthStateChanged)
    setState({ status: 'loading' });

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
      alert(t('auth.account_exists'));
    } else {
      alert(t('auth.onetap_failed', { error: errorMessage }));
    }
  }
}

/**
 * Render the branded "Sign in with Google" button into a container element.
 * Must be called after GIS script is loaded (i.e. after initOneTap()).
 * @param {HTMLElement} containerEl - DOM element to render the button into
 * @param {Object} [options] - GsiButtonConfiguration overrides
 */
export function renderGoogleSignInButton(containerEl, options = {}) {
  if (!window.google?.accounts?.id) {
    devDebug('[ONE TAP] Cannot render button: GIS not loaded yet');
    return;
  }

  // Using locale as idempotency guard
  const locale = getLocale();
  if (containerEl.dataset.gsiRendered === locale) return;
  containerEl.textContent = '';

  google.accounts.id.renderButton(containerEl, {
    type: 'standard',
    theme: 'filled_black',
    size: 'large',
    shape: 'pill',
    text: 'signin_with',
    width: '250',
    locale,
    ...options,
  });

  containerEl.dataset.gsiRendered = locale;
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
