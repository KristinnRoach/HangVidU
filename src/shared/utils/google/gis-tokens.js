// src/shared/utils/google/gis-tokens.js — Google OAuth scope-token requests (Contacts, Gmail send).

import { requestGisToken } from './gis-token-service.js';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

/**
 * Request Google Contacts access via Google Identity Services Token Model.
 *
 * @param {Object} [options]
 * @param {boolean} [options.interactive] - Skip silent attempt and go straight to popup.
 * @param {string} [options.hint] - Account email to preselect in the consent popup.
 * @returns {Promise<string>}
 */
export function requestContactsAccess({ interactive = false, hint } = {}) {
  return requestGisToken({
    cacheKey: 'contacts',
    scope:
      'https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly',
    clientId: GOOGLE_CLIENT_ID,
    hint,
    interactive,
  });
}

/**
 * Request Gmail send access via Google Identity Services Token Model.
 * Gmail send is a sensitive scope and should always be interactive.
 *
 * @param {Object} [options]
 * @param {string} [options.hint] - Account email to preselect in the consent popup.
 * @returns {Promise<string>}
 */
export function requestGmailSendAccess({ hint } = {}) {
  return requestGisToken({
    cacheKey: 'gmail-send',
    scope: 'https://www.googleapis.com/auth/gmail.send',
    clientId: GOOGLE_CLIENT_ID,
    hint,
    interactive: true,
  });
}
