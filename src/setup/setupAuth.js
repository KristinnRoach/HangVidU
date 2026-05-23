import { subscribe } from '../shared/events/index.js';
import { initAuth, getAuthState } from '../auth/index.js';
import { devDebug } from '../shared/utils/dev/dev-utils.js';
import {
  saveUserProfile,
  registerUserInDirectory,
} from '../storage/user/index.js';
import { cleanupInviteListeners } from '../contacts/invitations.js';
import { setupInviteListener } from '../contacts/invite-listener.js';
import { processReferral } from '../contacts/referral-handler.js';
import { hydrateContacts, resetContacts } from '../stores/contactsStore.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

function runSafe(fn, label) {
  try {
    fn?.();
  } catch (error) {
    console.warn(`[setupAuth] ${label} failed:`, error);
  }
}

const LOCAL_STORAGE_KEYS_TO_PRESERVE_ON_LOGOUT = ['locale'];
const LOCAL_STORAGE_PREFIXES_TO_PRESERVE_ON_LOGOUT = ['debug:']; // 'referral'

/**
 * Clear user-scoped local storage while preserving app-wide keys.
 *
 * @returns {void}
 */
function clearLocalStorageOnLogout() {
  try {
    const storage = globalThis.localStorage;
    if (!storage) {
      return;
    }

    const preservedEntries = [];

    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);

      if (
        key &&
        (LOCAL_STORAGE_KEYS_TO_PRESERVE_ON_LOGOUT.includes(key) ||
          LOCAL_STORAGE_PREFIXES_TO_PRESERVE_ON_LOGOUT.some((prefix) =>
            key.startsWith(prefix),
          ))
      ) {
        preservedEntries.push([key, storage.getItem(key)]);
      }
    }

    storage.clear();

    preservedEntries.forEach(([key, value]) => {
      if (value !== null) {
        storage.setItem(key, value);
      }
    });
  } catch (error) {
    console.warn('[setupAuth] Failed to clear localStorage on logout:', error);
  }
}

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts all auth-bound subscriptions
 *
 * Setup auth at app-composition level:
 * - register auth-driven listeners first
 * - initialize auth second (so initial auth lifecycle facts are observed)
 *
 * @returns {Promise<() => void>}
 */
export function setupAuth() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const ac = new AbortController();
    let initialized = false;

    let inviteCleanup = () => {
      runSafe(cleanupInviteListeners, 'cleanupInviteListeners');
    };

    const cleanupLoginScopedListeners = () => {
      runSafe(inviteCleanup, 'invite cleanup');

      inviteCleanup = () => {
        runSafe(cleanupInviteListeners, 'cleanupInviteListeners');
      };
    };

    const runMainLogoutCleanup = () => {
      runSafe(cleanupLoginScopedListeners, 'cleanupLoginScopedListeners');
      // NOTE: Local storage is cleared on log out, while selected keys are preserved.
      clearLocalStorageOnLogout();
    };

    try {
      subscribe(
        'evt:auth:session:ready',
        async () => {
          try {
            await hydrateContacts();
          } catch (e) {
            console.warn('[AUTH] Failed to handle evt:auth:session:ready:', e);
          }
        },
        { signal: ac.signal },
      );

      subscribe(
        'evt:auth:session:logged-out',
        async () => {
          try {
            devDebug('[AUTH] User logged out - cleaning up listeners');
            runMainLogoutCleanup();

            resetContacts();
          } catch (e) {
            console.warn(
              '[AUTH] Failed to handle evt:auth:session:logged-out:',
              e,
            );
          }
        },
        { signal: ac.signal },
      );

      subscribe(
        'evt:auth:session:logged-in',
        async ({ isInitialResolution }) => {
          try {
            devDebug('[AUTH] User logged in - setting up listeners');

            await processReferral().catch((e) =>
              console.warn('[REFERRAL] Failed to process referral:', e),
            );
            await hydrateContacts().catch((e) =>
              console.warn(
                '[AUTH] Failed to hydrate contacts state on login:',
                e,
              ),
            );

            const authState = getAuthState();
            if (authState?.user) {
              saveUserProfile(authState.user).catch((e) =>
                console.warn('[AUTH] Failed to save user profile:', e),
              );
              registerUserInDirectory(authState.user).catch((e) =>
                console.warn(
                  '[AUTH] Failed to register user in directory:',
                  e,
                ),
              );
            }

            cleanupLoginScopedListeners();

            const maybeInviteCleanup = setupInviteListener();
            if (typeof maybeInviteCleanup === 'function') {
              inviteCleanup = maybeInviteCleanup;
            }
          } catch (e) {
            console.warn(
              '[AUTH] Failed to handle evt:auth:session:logged-in:',
              e,
            );
          }
        },
        { signal: ac.signal },
      );

      await initAuth();

      cleanup = () => {
        cleanupLoginScopedListeners();
        runSafe(() => ac.abort(), 'abort auth subscriptions');
        isReady = false;
      };
      isReady = true;
      initialized = true;

      return cleanup;
    } catch (error) {
      if (!initialized) {
        cleanupLoginScopedListeners();
        runSafe(() => ac.abort(), 'abort auth subscriptions');
      }
      cleanup = () => {
        cleanupLoginScopedListeners();
        isReady = false;
      };
      isReady = false;
      throw error;
    }
  })().finally(() => {
    initPromise = null;
  });

  return initPromise;
}
