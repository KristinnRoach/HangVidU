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
      const request = parseAuthLoginRequested(payload);
      await signInWithAccountSelection(request);
    },
    { signal: ac.signal },
  );

  authBus.on(
    AUTH_INTENT_EVENTS.LOGOUT_REQUESTED,
    async (payload) => {
      parseAuthLogoutRequested(payload);
      await signOutUser();
    },
    { signal: ac.signal },
  );

  authBus.on(
    AUTH_INTENT_EVENTS.DELETE_ACCOUNT_REQUESTED,
    async (payload) => {
      const request = parseAuthDeleteAccountRequested(payload);
      await deleteAccount({ scrubMessages: request.scrubMessages });
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
