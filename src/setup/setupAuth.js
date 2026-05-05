import { subscribe } from '../shared/events/index.js';
import { initAuth } from '../auth/index.js';
import { devDebug } from '../shared/utils/dev/dev-utils.js';
// import {
//   removeAllIncomingListeners,
//   startListeningForSavedRooms,
// } from '../features/call/room-listeners.js';
import { messagingController } from '../features/messaging/messaging-controller.js';
import { getMessagesUI } from '../features/messaging/components/messages-ui.js';
import {
  cleanupInviteListeners,
  setupInviteListener,
  processReferral,
  ensureContactsHydrated,
  resetContactsState,
} from '../features/contacts/index.js';
import { getPushNotifications } from '../features/push-notifications/index.js';
import { showEnableNotificationsPrompt } from '../features/notifications/index.js';

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
 * @param {{ lobbyElement: HTMLElement }} options
 * @returns {Promise<() => void>}
 */
export function setupAuth(options = {}) {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const { lobbyElement } = options;
    const ac = new AbortController();
    let initialized = false;
    // let savedRoomsCleanup = () => {
    //   runSafe(removeAllIncomingListeners, 'removeAllIncomingListeners');
    // };
    let inviteCleanup = () => {
      runSafe(cleanupInviteListeners, 'cleanupInviteListeners');
    };

    const cleanupLoginScopedListeners = () => {
      // runSafe(savedRoomsCleanup, 'savedRooms cleanup');
      runSafe(inviteCleanup, 'invite cleanup');
      // savedRoomsCleanup = () => {
      //   runSafe(removeAllIncomingListeners, 'removeAllIncomingListeners');
      // };
      inviteCleanup = () => {
        runSafe(cleanupInviteListeners, 'cleanupInviteListeners');
      };
    };

    const runMainLogoutCleanup = () => {
      runSafe(cleanupLoginScopedListeners, 'cleanupLoginScopedListeners');
      runSafe(
        () => messagingController.closeAllConversations(),
        'messagingController.closeAllConversations',
      );
      runSafe(() => getMessagesUI()?.reset?.(), 'getMessagesUI().reset');
      // NOTE: Local storage is cleared on log out, while selected keys are preserved.
      clearLocalStorageOnLogout();
    };

    try {
      subscribe(
        'evt:auth:session:ready',
        async () => {
          try {
            await ensureContactsHydrated();
          } catch (e) {
            console.warn('[AUTH] Failed to handle evt:auth:session:ready:', e);
          }
        },
        { signal: ac.signal },
      );

      subscribe(
        'evt:auth:session:logout',
        async () => {
          try {
            devDebug('[AUTH] User logged out - cleaning up listeners');
            runMainLogoutCleanup();

            resetContactsState();
          } catch (e) {
            console.warn('[AUTH] Failed to handle evt:auth:session:logout:', e);
          }
        },
        { signal: ac.signal },
      );

      subscribe(
        'evt:auth:session:login',
        async ({ isInitialResolution }) => {
          try {
            devDebug('[AUTH] User logged in - setting up listeners');

            await processReferral().catch((e) =>
              console.warn('[REFERRAL] Failed to process referral:', e),
            );
            await ensureContactsHydrated().catch((e) =>
              console.warn(
                '[AUTH] Failed to hydrate contacts state on login:',
                e,
              ),
            );

            cleanupLoginScopedListeners();
            // const maybeSavedRoomsCleanup =
            //   await startListeningForSavedRooms().catch((e) => {
            //     console.warn('Failed to re-attach saved-room listeners', e);
            //     return undefined;
            //   });
            if (typeof maybeSavedRoomsCleanup === 'function') {
              savedRoomsCleanup = maybeSavedRoomsCleanup;
            }

            const maybeInviteCleanup = setupInviteListener();
            if (typeof maybeInviteCleanup === 'function') {
              inviteCleanup = maybeInviteCleanup;
            }

            const pushController = getPushNotifications();
            if (pushController) {
              const notifResult = await pushController
                .ensureEnabledIfGranted()
                .catch((e) => {
                  console.warn('[AUTH] Push notification setup failed:', e);
                  return { state: 'error' };
                });
              if (notifResult.state === 'prompt-needed') {
                showEnableNotificationsPrompt();
              }
            }
          } catch (e) {
            console.warn('[AUTH] Failed to handle evt:auth:session:login:', e);
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
