import { handleCommand, subscribe } from '../events/index.js';
import { messagingController } from '../features/messaging/messaging-controller.js';
import { isDev, tempWarn } from '../utils/dev/dev-utils.js';
import { callContact } from '../features/call/WIP-start-call-refactor.js';
import { contactsService } from '../features/contacts/index.js';
import {
  listenForIncomingOnRoom,
  removeIncomingListenersForRoom,
} from '../features/call/room-listeners.js';
import { setUserOffline } from '../features/presence/index.js';
import { clearUrlParam } from '../utils/url.js';
import { onCallDisconnected } from '../components/ui/core/call-lifecycle-ui.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts registered app-bus handlers/subscriptions
 *
 * @returns {Promise<() => void>}
 */
export function setupMainAppBusListeners() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = Promise.resolve()
    .then(() => {
      const ac = new AbortController();

      handleCommand(
        'user:presence:set-offline',
        async ({ userId } = {}) => {
          try {
            await setUserOffline(userId);
          } catch (e) {
            console.warn('Failed to set user presence offline:', e);
          }
        },
        { signal: ac.signal },
      );

      handleCommand(
        'messaging:conversation:select',
        async ({
          conversationId,
          remoteParticipantIds = [],
          displayUI = true,
          contactNickName,
        }) => {
          try {
            const contactId =
              remoteParticipantIds.length === 1 ? remoteParticipantIds[0] : null;
            const providedContactNickName =
              typeof contactNickName === 'string' && contactNickName.trim()
                ? contactNickName.trim()
                : null;
            let localContact = null;
            if (!providedContactNickName && contactId) {
              try {
                localContact = await contactsService.getContact(contactId);
              } catch (contactError) {
                console.warn(
                  'Failed to resolve local contact nickname on messaging:conversation:select:',
                  contactError,
                );
              }
            }
            const resolvedContactNickName = providedContactNickName
              ? providedContactNickName
              : localContact?.contactNickName || null;

            await messagingController.selectConversation(conversationId, {
              remoteParticipantIds,
              displayUI,
              contactNickName: resolvedContactNickName,
            });
          } catch (e) {
            console.warn(
              'Failed to select conversation on messaging:conversation:select:',
              e,
            );
          }
        },
        { signal: ac.signal },
      );

      handleCommand(
        'call:outgoing:initiate',
        async ({ contactId, contactNickName, conversationId, roomId }) => {
          const resolvedContactNickName =
            typeof contactNickName === 'string' && contactNickName.trim()
              ? contactNickName.trim()
              : null;

          isDev() &&
            tempWarn(
              '[main.js] call:outgoing:initiate event received with data: ',
              {
                contactId,
                contactNickName: resolvedContactNickName,
                conversationId,
                roomId,
              },
            );

          if (contactId) {
            try {
              const resolvedConversationId =
                conversationId ??
                (await contactsService.getConversationId(contactId));

              if (resolvedConversationId) {
                messagingController
                  .selectConversation(resolvedConversationId, {
                    remoteParticipantIds: [contactId],
                    displayUI: false,
                    contactNickName: resolvedContactNickName,
                  })
                  .catch((e) => {
                    console.warn(
                      'Failed to select conversation on call:outgoing:initiate',
                      e,
                    );
                  });
              }
            } catch (e) {
              console.warn(
                'Failed to select conversation on call:outgoing:initiate',
                e,
              );
            }
          }

          callContact(contactId, resolvedContactNickName, roomId);
        },
        { signal: ac.signal },
      );

      subscribe(
        'room:id:created',
        ({ roomId }) => {
          listenForIncomingOnRoom(roomId);
        },
        { signal: ac.signal },
      );

      subscribe(
        'room:id:updated',
        ({ roomId, previousRoomId }) => {
          if (previousRoomId && previousRoomId !== roomId) {
            removeIncomingListenersForRoom(previousRoomId);
          }
          listenForIncomingOnRoom(roomId);
        },
        { signal: ac.signal },
      );

      subscribe(
        'room:joinOrCreate:failed',
        ({ roomId }) => {
          console.warn(
            `[AppBus] room:joinOrCreate:failed 
      Failed to join or create room with id: ${roomId}`,
          );
          clearUrlParam();
          onCallDisconnected();
        },
        { signal: ac.signal },
      );

      subscribe(
        'contact:deleted',
        ({ roomId }) => {
          if (roomId) {
            removeIncomingListenersForRoom(roomId);
          }
        },
        { signal: ac.signal },
      );

      cleanup = () => {
        try {
          ac.abort();
        } catch (error) {
          console.warn(
            '[setupMainAppBusListeners] cleanup failed to abort listeners:',
            error,
          );
        } finally {
          isReady = false;
        }
      };

      isReady = true;
      return cleanup;
    })
    .finally(() => {
      initPromise = null;
    });

  return initPromise;
}
