// src/auth/gis-token-service.js
// GIS OAuth token policy layer (cache + silent/interactive flow).

import {
  createGoogleOAuthTokenClient,
  isGoogleOAuthLoaded,
  requestGoogleOAuthAccessToken,
} from './adapters/google-identity-adapter.js';

const TOKEN_EXPIRY_BUFFER_MS = 60_000;
const tokenCache = new Map();

function getCachedToken(cacheKey) {
  const entry = tokenCache.get(cacheKey);
  if (entry && Date.now() < entry.expiresAt) return entry.token;
  tokenCache.delete(cacheKey);
  return null;
}

function setCachedToken(cacheKey, token, expiresInSeconds) {
  const expiry = expiresInSeconds > 0 ? expiresInSeconds : 3600;
  tokenCache.set(cacheKey, {
    token,
    expiresAt: Date.now() + expiry * 1000 - TOKEN_EXPIRY_BUFFER_MS,
  });
}

/**
 * Clear all in-memory GIS access tokens.
 */
export function clearGisTokenCache() {
  tokenCache.clear();
}

function createTokenRequestError(errorCode, errorDescription) {
  if (errorCode === 'access_denied') {
    const error = new Error('Authorization cancelled');
    error.code = errorCode;
    return error;
  }

  const error = new Error(errorDescription || errorCode || 'Authorization failed');
  error.code = errorCode || 'unknown';
  return error;
}

function requestTokenFromGIS({ clientId, scope, hint, prompt }) {
  return new Promise((resolve, reject) => {
    const client = createGoogleOAuthTokenClient({
      client_id: clientId,
      scope,
      hint,
      callback: (response) => {
        if (response.error) {
          reject(
            createTokenRequestError(response.error, response.error_description),
          );
          return;
        }

        if (!response.access_token) {
          reject(new Error('No access token received'));
          return;
        }

        resolve({
          token: response.access_token,
          expiresIn: response.expires_in || 3600,
        });
      },
      error_callback: (error) => {
        if (error?.type === 'popup_closed') {
          reject(createTokenRequestError('access_denied', 'Authorization cancelled'));
          return;
        }
        reject(new Error(error?.message || 'Authorization failed'));
      },
    });

    requestGoogleOAuthAccessToken(
      client,
      prompt ? { prompt } : undefined,
    );
  });
}

/**
 * Request OAuth access token via GIS token model.
 * Strategy:
 * 1) return cached token if valid
 * 2) silent prompt=none (unless interactive=true)
 * 3) interactive popup fallback
 *
 * @param {object} params
 * @param {string} params.cacheKey
 * @param {string} params.scope
 * @param {string} params.clientId
 * @param {string} [params.hint]
 * @param {boolean} [params.interactive]
 * @returns {Promise<string>}
 */
export async function requestGisToken({
  cacheKey,
  scope,
  clientId,
  hint,
  interactive = false,
}) {
  const cached = getCachedToken(cacheKey);
  if (cached) return cached;

  if (!clientId) {
    throw new Error('Google Client ID not configured');
  }

  if (!isGoogleOAuthLoaded()) {
    throw new Error('Google Identity Services not loaded');
  }

  if (interactive) {
    const interactiveResult = await requestTokenFromGIS({
      clientId,
      scope,
      hint,
    });
    setCachedToken(cacheKey, interactiveResult.token, interactiveResult.expiresIn);
    return interactiveResult.token;
  }

  try {
    const silentResult = await requestTokenFromGIS({
      clientId,
      scope,
      hint,
      prompt: 'none',
    });
    setCachedToken(cacheKey, silentResult.token, silentResult.expiresIn);
    return silentResult.token;
  } catch (_) {
    const interactiveResult = await requestTokenFromGIS({
      clientId,
      scope,
      hint,
    });
    setCachedToken(cacheKey, interactiveResult.token, interactiveResult.expiresIn);
    return interactiveResult.token;
  }
}
