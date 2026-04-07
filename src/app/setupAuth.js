import { subscribe } from '../events/index.js';
import { initAuth } from '../auth/index.js';
import { devDebug } from '../utils/dev/dev-utils.js';
import {
  removeAllIncomingListeners,
  startListeningForSavedRooms,
} from '../features/call/room-listeners.js';
import {
  cleanupInviteListeners,
  setupInviteListener,
  processReferral,
  renderContactsList,
} from '../features/contacts/index.js';
import { getPushNotifications } from '../features/push-notifications/index.js';
import { showEnableNotificationsPrompt } from '../features/notifications/index.js';

let isReady = false;
let initializationPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
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
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    const { lobbyElement } = options;
    const ac = new AbortController();

    subscribe(
      'auth:ready',
      async () => {
        try {
          await renderContactsList(lobbyElement);
        } catch (e) {
          console.warn('[AUTH] Failed to handle auth:ready:', e);
        }
      },
      { signal: ac.signal },
    );

    subscribe(
      'auth:logout',
      async () => {
        try {
          await renderContactsList(lobbyElement);
          devDebug('[AUTH] User logged out - cleaning up listeners');
          removeAllIncomingListeners();
          cleanupInviteListeners();
        } catch (e) {
          console.warn('[AUTH] Failed to handle auth:logout:', e);
        }
      },
      { signal: ac.signal },
    );

    subscribe(
      'auth:login',
      async ({ isInitialResolution }) => {
        try {
          devDebug('[AUTH] User logged in - setting up listeners');

          await processReferral().catch((e) =>
            console.warn('[REFERRAL] Failed to process referral:', e),
          );

          await renderContactsList(lobbyElement).catch((e) =>
            console.warn('[AUTH] Failed to render contacts list on login:', e),
          );

          if (!isInitialResolution) {
            await startListeningForSavedRooms().catch((e) =>
              console.warn('Failed to re-attach saved-room listeners', e),
            );
          }

          setupInviteListener(lobbyElement);

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
          console.warn('[AUTH] Failed to handle auth:login:', e);
        }
      },
      { signal: ac.signal },
    );

    await initAuth();

    cleanup = () => {
      ac.abort();
      isReady = false;
    };
    isReady = true;

    return cleanup;
  })().catch((error) => {
    isReady = false;
    throw error;
  }).finally(() => {
    initializationPromise = null;
  });

  return initializationPromise;
}
