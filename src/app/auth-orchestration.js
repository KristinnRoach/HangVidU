import { subscribe } from '../shared/events/index.js';
import { initAuth } from '../auth/index.js';
import { devDebug } from '../shared/utils/dev/dev-utils.js';
import {
  getPublicUserProfile,
  savePublicUserProfile,
  registerInUserDirectory,
  ensureHandle,
} from '../stores/userDirectoryStore.js';
import { setupInviteListener } from '../features/contacts/invites/invite-listener.js';
import { processReferral } from '../features/contacts/referrals/referral-handler.js';
import { hydrateContacts, resetContacts } from '../stores/contactsStore.js';
import { resetConversationsState } from '../stores/conversations-client.js';
import { stopConversationActivity } from '../stores/conversation-activity';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

function runSafe(fn, label) {
  try {
    fn?.();
  } catch (error) {
    console.warn(`[auth-orchestration] ${label} failed:`, error);
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
    console.warn(
      '[auth-orchestration] Failed to clear localStorage on logout:',
      error,
    );
  }
}

/**
 * Wire cross-feature reactions to auth lifecycle events, then kick off auth.
 *
 * This is app-level orchestration, NOT the auth module itself (that's
 * `src/auth/`, whose `initAuth()` this calls last). Distinct from
 * `auth/auth-setup.js` despite the historical name overlap.
 *
 * Contract:
 * - register auth-driven listeners first, then call `initAuth()` so the
 *   initial auth lifecycle facts are observed by those listeners
 * - idempotent: returns the existing cleanup when already wired
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts all auth-bound subscriptions
 *
 * @returns {Promise<() => void>}
 */
export function wireAuthReactions() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const ac = new AbortController();
    let initialized = false;

    let inviteCleanup = () => {};

    const cleanupLoginScopedListeners = () => {
      runSafe(inviteCleanup, 'invite cleanup');

      inviteCleanup = () => {};
    };

    const runMainLogoutCleanup = () => {
      runSafe(cleanupLoginScopedListeners, 'cleanupLoginScopedListeners');
      runSafe(stopConversationActivity, 'stopConversationActivity');
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
            resetConversationsState();
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
        async ({ state }) => {
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

            const user = state?.user;
            if (user) {
              try {
                try {
                  const profile = await getPublicUserProfile(user.uid);
                  if (!profile?.displayName && !profile?.photoURL) {
                    await savePublicUserProfile(user);
                  }
                } catch (e) {
                  console.warn('[AUTH] Failed to sync public profile on login:', e);
                }
                const { handle } = await ensureHandle(user);
                // Directory entry is the email→account index; skip when the
                // user has no email (e.g. username-only password accounts).
                if (user.email) {
                  await registerInUserDirectory(user, { username: handle });
                }
              } catch (e) {
                console.warn('[AUTH] Failed to save profile / ensure handle:', e);
              }
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
