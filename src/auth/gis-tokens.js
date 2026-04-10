// src/auth/gis-tokens.js — stable auth API for GIS token requests.

import { auth } from './adapters/firebase-auth-adapter.js';
import { clearGisTokenCache, requestGisToken } from './gis-token-service.js';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

/** Clear all cached GIS tokens (e.g. on sign-out). */
export function clearGISTokenCache() {
  clearGisTokenCache();
}

/**
 * Request Google Contacts access via Google Identity Services Token Model.
 *
 * @param {Object} [options]
 * @param {boolean} [options.interactive] - Skip silent attempt and go straight to popup.
 * @returns {Promise<string>}
 */
export function requestContactsAccess({ interactive = false } = {}) {
  return requestGisToken({
    cacheKey: 'contacts',
    scope:
      'https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly',
    clientId: GOOGLE_CLIENT_ID,
    hint: auth.currentUser?.email,
    interactive,
  });
}

/**
 * Request Gmail send access via Google Identity Services Token Model.
 * Gmail send is a sensitive scope and should always be interactive.
 *
 * @returns {Promise<string>}
 */
export function requestGmailSendAccess() {
  return requestGisToken({
    cacheKey: 'gmail-send',
    scope: 'https://www.googleapis.com/auth/gmail.send',
    clientId: GOOGLE_CLIENT_ID,
    hint: auth.currentUser?.email,
    interactive: true,
  });
}
