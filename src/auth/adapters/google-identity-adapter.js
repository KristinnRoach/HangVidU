// src/auth/adapters/google-identity-adapter.js
// Thin adapter around Google Identity Services browser APIs.

const GIS_SCRIPT_BASE = 'https://accounts.google.com/gsi/client';

/**
 * Load Google Identity Services script for a locale.
 * Existing GIS script tags are replaced so locale changes are applied.
 *
 * @param {string} locale
 * @returns {Promise<void>}
 */
export function loadGoogleIdentityScript(locale) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src^="${GIS_SCRIPT_BASE}"]`);
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
 * @returns {boolean} Whether GIS One Tap API is available.
 */
export function isGoogleOneTapLoaded() {
  return typeof window !== 'undefined' && !!window.google?.accounts?.id;
}

/**
 * @returns {boolean} Whether GIS OAuth2 token API is available.
 */
export function isGoogleOAuthLoaded() {
  return typeof google !== 'undefined' && !!google.accounts?.oauth2;
}

/**
 * Initialize GIS One Tap API.
 *
 * @param {object} config - GIS initialize configuration.
 */
export function initializeGoogleOneTap(config) {
  google.accounts.id.initialize(config);
}

/**
 * Show One Tap prompt.
 *
 * @param {(notification: object) => void} callback
 */
export function promptGoogleOneTap(callback) {
  google.accounts.id.prompt(callback);
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
 * Render GIS sign-in button.
 *
 * @param {HTMLElement} containerEl
 * @param {object} options
 */
export function renderGoogleSignInButton(containerEl, options) {
  google.accounts.id.renderButton(containerEl, options);
}

/**
 * Create OAuth token client.
 *
 * @param {object} config - GIS OAuth token client configuration.
 * @returns {object}
 */
export function createGoogleOAuthTokenClient(config) {
  return google.accounts.oauth2.initTokenClient(config);
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
