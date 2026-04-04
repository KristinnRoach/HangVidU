import { authBus } from './auth-bus.js';
import {
  AUTH_INTENT_EVENTS,
  parseAuthDeleteAccountRequested,
  parseAuthLoginRequested,
  parseAuthLogoutRequested,
} from './auth-events-schema.js';
import {
  deleteAccount,
  signInWithAccountSelection,
  signOutUser,
} from './auth-actions.js';

let cleanupAuthIntentListeners = null;

export function setupAuthIntentListeners() {
  if (cleanupAuthIntentListeners) {
    return cleanupAuthIntentListeners;
  }

  const ac = new AbortController();

  authBus.on(
    AUTH_INTENT_EVENTS.LOGIN_REQUESTED,
    async (payload) => {
      try {
        const request = parseAuthLoginRequested(payload);
        await signInWithAccountSelection(request);
      } catch (e) {
        console.warn('[auth] login intent failed:', e);
      }
    },
    { signal: ac.signal },
  );

  authBus.on(
    AUTH_INTENT_EVENTS.LOGOUT_REQUESTED,
    async (payload) => {
      try {
        parseAuthLogoutRequested(payload);
        await signOutUser();
      } catch (e) {
        console.warn('[auth] logout intent failed:', e);
      }
    },
    { signal: ac.signal },
  );

  authBus.on(
    AUTH_INTENT_EVENTS.DELETE_ACCOUNT_REQUESTED,
    async (payload) => {
      try {
        const request = parseAuthDeleteAccountRequested(payload);
        await deleteAccount({ scrubMessages: request.scrubMessages });
      } catch (e) {
        console.warn('[auth] delete-account intent failed:', e);
      }
    },
    { signal: ac.signal },
  );

  const cleanup = () => {
    ac.abort();
    if (cleanupAuthIntentListeners === cleanup) {
      cleanupAuthIntentListeners = null;
    }
  };

  cleanupAuthIntentListeners = cleanup;
  return cleanup;
}
