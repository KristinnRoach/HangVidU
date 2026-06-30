import { setSafariExternalOpenArmed } from './shared/safari-auth-fallback.js';
import { getIsLoggedIn, setState } from './auth-state.js';
import {
  createGoogleCredential,
  signInWithGoogleCredential,
} from './adapters/firebase-auth-adapter.js';
import {
  cancelGoogleOneTap,
  initializeGoogleOneTap,
  isGoogleOneTapLoaded,
  loadGoogleIdentityScript,
  promptGoogleOneTap,
  renderGoogleSignInButton as renderAdapterGoogleSignInButton,
} from './adapters/google-identity-adapter.js';
import { devDebug } from '../shared/utils/dev/dev-utils.js';
import { getLocale, onLocaleChange, t } from '../shared/i18n/index.js';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const oneTapCallbacks = new Set();
let oneTapInitialized = false;
let initOneTapPromise = null;

function notifyOneTapStatus(status) {
  devDebug('[ONE TAP] Notifying status:', status, 'to', oneTapCallbacks.size);
  oneTapCallbacks.forEach((cb) => {
    try {
      cb(status);
    } catch (e) {
      devDebug('[ONE TAP] status callback error:', e);
    }
  });
}

function initializeOneTapClient() {
  initializeGoogleOneTap({
    client_id: GOOGLE_CLIENT_ID,
    ux_mode: 'popup',
    context: 'signin',
    itp_support: true,
    cancel_on_tap_outside: false,
    auto_select: true,
    use_fedcm_for_prompt: !import.meta.env.DEV,
    prompt_parent_id: 'onetap-container',
    callback: handleOneTapCredential,
  });
}

async function loadAndInitializeOneTap(locale) {
  await loadGoogleIdentityScript(locale);
  initializeOneTapClient();
}

export function onOneTapStatusChange(callback) {
  oneTapCallbacks.add(callback);
  return () => oneTapCallbacks.delete(callback);
}

export async function initOneTap() {
  if (oneTapInitialized) return;
  if (initOneTapPromise) return initOneTapPromise;

  initOneTapPromise = (async () => {
    if (!GOOGLE_CLIENT_ID) {
      console.error(
        '[ONE TAP] Cannot initialize: VITE_APP_GOOGLE_CLIENT_ID is not configured',
      );
      return;
    }

    try {
      await loadAndInitializeOneTap(getLocale());
    } catch (e) {
      devDebug('[ONE TAP] Failed to initialize GIS:', e);
      return;
    }

    oneTapInitialized = true;
  })().finally(() => {
    initOneTapPromise = null;
  });

  return initOneTapPromise;
}

export function showOneTapSignin() {
  if (getIsLoggedIn()) {
    notifyOneTapStatus('not_needed');
    return;
  }

  if (!isGoogleOneTapLoaded()) {
    devDebug('[ONE TAP] Google library not loaded yet');
    return;
  }

  // Uncomment this line to wipe cookie in dev if needed for testing
  // if (import.meta.env.DEV) document.cookie = 'g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  notifyOneTapStatus('prompting');

  promptGoogleOneTap();
}

async function handleOneTapCredential(response) {
  try {
    notifyOneTapStatus('signing_in');
    setState({ status: 'loading' });

    const credential = createGoogleCredential(response.credential);
    await signInWithGoogleCredential(credential);

    setSafariExternalOpenArmed(false);
  } catch (error) {
    const errorCode = error?.code || 'unknown';
    const errorMessage = error?.message || String(error);

    setState({ status: 'unauthenticated', isLoggedIn: false, user: null });
    setSafariExternalOpenArmed(false);
    notifyOneTapStatus('failed');

    if (errorCode === 'auth/account-exists-with-different-credential') {
      alert(t('auth.account_exists'));
    } else {
      alert(t('auth.onetap_failed', { error: errorMessage }));
    }
  }
}

/**
 * Render the branded "Sign in with Google" button into a container element.
 *
 * @param {HTMLElement} containerEl
 * @param {Object} [options]
 * @returns {boolean|undefined}
 */
export function renderGoogleSignInButton(containerEl, options = {}) {
  if (!isGoogleOneTapLoaded()) {
    devDebug('[ONE TAP] Cannot render button: GIS not loaded yet');
    return false;
  }

  containerEl.style.visibility = 'hidden';

  const locale = getLocale();
  if (containerEl.dataset.gsiRendered === locale) {
    containerEl.style.visibility = 'visible';
    return;
  }

  containerEl.replaceChildren();

  renderAdapterGoogleSignInButton(containerEl, {
    type: 'standard',
    theme: 'filled_black',
    size: 'medium',
    shape: 'pill',
    text: 'signin_with',
    width: '240',
    locale,
    ...options,
  });

  containerEl.dataset.gsiRendered = locale;
  requestAnimationFrame(() => {
    containerEl.style.visibility = 'visible';
  });

  return true;
}

export function cancelOneTap() {
  cancelGoogleOneTap();
}

/**
 * @returns {boolean} Whether One Tap API is currently available.
 */
export function isOneTapAvailable() {
  return isGoogleOneTapLoaded();
}
