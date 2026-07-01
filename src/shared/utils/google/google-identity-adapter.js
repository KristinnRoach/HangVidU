// src/shared/utils/google/google-identity-adapter.js
// Thin adapter around Google Identity Services browser APIs.

const GIS_SCRIPT_BASE = 'https://accounts.google.com/gsi/client';
let inFlightLoadPromise = null;
let inFlightLocale = null;

/**
 * Load Google Identity Services script for a locale.
 * Existing GIS script tags are replaced so locale changes are applied.
 *
 * @param {string} locale
 * @returns {Promise<void>}
 */
export function loadGoogleIdentityScript(locale) {
  const requestedLocale = locale || 'en';

  if (inFlightLoadPromise) {
    if (inFlightLocale === requestedLocale) return inFlightLoadPromise;

    return inFlightLoadPromise
      .catch(() => undefined)
      .then(() => loadGoogleIdentityScript(requestedLocale));
  }

  inFlightLocale = requestedLocale;

  inFlightLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      `script[src^="${GIS_SCRIPT_BASE}"]`,
    );
    if (existing) existing.remove();

    const script = document.createElement('script');
    const safeLocale = encodeURIComponent(requestedLocale);
    script.src = `${GIS_SCRIPT_BASE}?hl=${safeLocale}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      inFlightLoadPromise = null;
      inFlightLocale = null;
      resolve();
    };
    script.onerror = () => {
      inFlightLoadPromise = null;
      inFlightLocale = null;
      reject(new Error('Failed to load GIS script'));
    };
    document.head.appendChild(script);
  });

  return inFlightLoadPromise;
}

/**
 * @returns {boolean} Whether GIS One Tap API is available.
 */
export function isGoogleOneTapLoaded() {
  return typeof window !== 'undefined' && !!window.google?.accounts?.id;
}

/**
 * @returns {boolean} Whether GIS OAuth2 token API is available.
 */
export function isGoogleOAuthLoaded() {
  return !!globalThis?.google?.accounts?.oauth2;
}

function getGoogleAccountsOrThrow() {
  const accounts = globalThis?.google?.accounts;
  if (!accounts) {
    throw new Error('Google Identity Services is not loaded');
  }
  return accounts;
}

/**
 * Initialize GIS One Tap API.
 *
 * @param {object} config - GIS initialize configuration.
 */
export function initializeGoogleOneTap(config) {
  getGoogleAccountsOrThrow().id.initialize(config);
}

/**
 * Show One Tap prompt.
 *
 * @param {(notification: object) => void} [callback]
 */
export function promptGoogleOneTap(callback) {
  getGoogleAccountsOrThrow().id.prompt(callback);
}

/**
 * Cancel One Tap prompt if active.
 */
export function cancelGoogleOneTap() {
  if (typeof google !== 'undefined' && google.accounts?.id) {
    google.accounts.id.cancel();
  }
}

/**
 * Disable One Tap auto_select for the signed-out user (sets g_state cookie),
 * preventing automatic re-sign-in after an explicit sign-out.
 */
export function disableGoogleAutoSignIn() {
  if (typeof google !== 'undefined' && google.accounts?.id) {
    google.accounts.id.disableAutoSelect();
  }
}

/**
 * Render GIS sign-in button.
 *
 * @param {HTMLElement} containerEl
 * @param {object} options
 */
export function renderGoogleSignInButton(containerEl, options) {
  getGoogleAccountsOrThrow().id.renderButton(containerEl, options);
}

/**
 * Create OAuth token client.
 *
 * @param {object} config - GIS OAuth token client configuration.
 * @returns {object}
 */
export function createGoogleOAuthTokenClient(config) {
  return getGoogleAccountsOrThrow().oauth2.initTokenClient(config);
}

/**
 * Request access token using GIS token client.
 *
 * @param {object} client
 * @param {object} [options]
 */
export function requestGoogleOAuthAccessToken(client, options) {
  client.requestAccessToken(options);
}
