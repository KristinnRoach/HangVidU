import { appBus } from './app-bus.js';
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

let cleanupMainAuthAppBusListeners = null;

/**
 * Register main appBus listeners for auth-driven cross-module side effects.
 *
 * Auth emits module-local events on authBus, the bridge forwards selected
 * compatibility events to appBus, and this app-level listener layer decides
 * how the rest of the app reacts.
 *
 * @param {{ lobbyElement: HTMLElement }} options
 * @returns {() => void}
 */
export function setupMainAuthAppBusListeners(options = {}) {
  if (cleanupMainAuthAppBusListeners) {
    return cleanupMainAuthAppBusListeners;
  }

  const { lobbyElement } = options;
  const ac = new AbortController();

  appBus.on(
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

  appBus.on(
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

  appBus.on(
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

  cleanupMainAuthAppBusListeners = () => {
    ac.abort();
    cleanupMainAuthAppBusListeners = null;
  };

  return cleanupMainAuthAppBusListeners;
}
