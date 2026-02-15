// src/auth/gis-tokens.js — GIS token cache and OAuth scope requests

import { auth } from './auth-setup.js';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

// --- GIS Token Cache ---
// Caches access tokens per scope key to avoid re-prompting the user.
// Tokens are held in memory only (cleared on page reload).
// Buffer (ms) subtracted from expiry to avoid using a nearly-expired token.
const TOKEN_EXPIRY_BUFFER_MS = 60_000;
const _tokenCache = {};

function getCachedToken(key) {
  const entry = _tokenCache[key];
  if (entry && Date.now() < entry.expiresAt) return entry.token;
  delete _tokenCache[key];
  return null;
}

function cacheToken(key, token, expiresInSeconds) {
  const expiry = expiresInSeconds > 0 ? expiresInSeconds : 3600;
  _tokenCache[key] = {
    token,
    expiresAt: Date.now() + expiry * 1000 - TOKEN_EXPIRY_BUFFER_MS,
  };
}

/** Clear all cached GIS tokens (e.g. on sign-out). */
export function clearGISTokenCache() {
  for (const key in _tokenCache) delete _tokenCache[key];
}

// Internal helper — used by requestGISToken for login_hint
function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Request a GIS access token for the given scopes.
 * Priority: 1) memory cache  2) silent GIS (prompt:'none')  3) interactive popup.
 *
 * @param {string} cacheKey - Key for the token cache
 * @param {string} scope - OAuth scope(s) to request
 * @param {Object} [options]
 * @param {boolean} [options.interactive] - Skip silent attempt and go straight
 *   to popup. Use when called from a click handler for a scope the user hasn't
 *   consented to yet — the silent attempt would fail and the async fallback
 *   loses the user-gesture context, causing browsers to block the popup.
 */
function requestGISToken(cacheKey, scope, { interactive = false } = {}) {
  const cached = getCachedToken(cacheKey);
  if (cached) {
    console.log(`[AUTH] Using cached ${cacheKey} token`);
    return Promise.resolve(cached);
  }

  return new Promise((resolve, reject) => {
    if (!GOOGLE_CLIENT_ID) {
      reject(new Error('Google Client ID not configured'));
      return;
    }

    if (typeof google === 'undefined' || !google.accounts?.oauth2) {
      reject(new Error('Google Identity Services not loaded'));
      return;
    }

    const currentUser = getCurrentUser();
    const hint = currentUser?.email || undefined;

    function onTokenResponse(response, onNeedConsent) {
      if (response.error) {
        if (onNeedConsent) {
          console.log(
            `[AUTH] Silent ${cacheKey} token failed (${response.error}), trying interactive...`,
          );
          onNeedConsent();
          return;
        }
        console.error(
          `[AUTH] ${cacheKey} token request error:`,
          response.error,
        );
        if (response.error === 'access_denied') {
          reject(new Error('Authorization cancelled'));
        } else {
          reject(new Error(response.error_description || response.error));
        }
        return;
      }

      if (!response.access_token) {
        reject(new Error('No access token received'));
        return;
      }

      console.log(`[AUTH] ${cacheKey} access granted`);
      cacheToken(cacheKey, response.access_token, response.expires_in || 3600);
      resolve(response.access_token);
    }

    // Interactive popup
    function requestInteractive() {
      console.log(
        `[AUTH] Requesting ${cacheKey} access via interactive popup...`,
      );
      const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope,
        hint,
        callback: (response) => onTokenResponse(response, null),
        error_callback: (error) => {
          console.error(`[AUTH] ${cacheKey} interactive error:`, error);
          if (error.type === 'popup_closed') {
            reject(new Error('Authorization cancelled'));
          } else {
            reject(new Error(error.message || 'Authorization failed'));
          }
        },
      });
      client.requestAccessToken();
    }

    if (interactive) {
      // Go straight to popup — preserves the user-gesture context
      requestInteractive();
      return;
    }

    // Silent attempt (no popup, works if user previously consented)
    console.log(`[AUTH] Attempting silent ${cacheKey} token acquisition...`);
    const silentClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope,
      hint,
      callback: (response) => onTokenResponse(response, requestInteractive),
      error_callback: () => {
        console.log(
          `[AUTH] Silent ${cacheKey} error_callback, trying interactive...`,
        );
        requestInteractive();
      },
    });
    silentClient.requestAccessToken({ prompt: 'none' });
  });
}

/**
 * Request Google Contacts access via Google Identity Services Token Model.
 * @param {Object} [options]
 * @param {boolean} [options.interactive] - Skip silent attempt and go straight
 *   to popup. Use when called from a click handler to preserve the user-gesture
 *   context (mobile browsers block popups without a gesture).
 * @returns {Promise<string>} - Google access token with contacts scope
 */
export function requestContactsAccess({ interactive = false } = {}) {
  return requestGISToken(
    'contacts',
    'https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly',
    { interactive },
  );
}

/**
 * Request Gmail send access via Google Identity Services Token Model.
 * Uses interactive flow (straight to popup) because gmail.send is a
 * sensitive scope that requires explicit consent — the silent-then-popup
 * fallback loses the user-gesture context and gets blocked by browsers.
 * After first consent, the token is cached and this returns immediately.
 * @returns {Promise<string>} - Google access token with Gmail send scope
 */
export function requestGmailSendAccess() {
  return requestGISToken(
    'gmail-send',
    'https://www.googleapis.com/auth/gmail.send',
    { interactive: true },
  );
}
