import {
  dispatchCommandAndAwait,
  handleCommand,
  subscribe,
} from '../shared/events/index.js';
import { messagingController } from '../features/messaging/messaging-controller.js';
import { isDev, tempWarn } from '../shared/utils/dev/dev-utils.js';
import {
  getContactById,
  getContactByRoomId,
  getConversationId,
} from '../features/contacts/index.js';

import { getPushNotifications } from '../features/push-notifications/index.js';
import { setUserOffline } from '../features/presence/index.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts registered event handlers/subscriptions
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
        'cmd:user:presence:set-offline',
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
        'cmd:push:subscription:disable',
        async () => {
          try {
            await getPushNotifications()?.disable?.();
          } catch (e) {
            console.warn('[push] Failed to disable notifications:', e);
          }
        },
        { signal: ac.signal },
      );

      handleCommand(
        'cmd:contacts:contact:get-by-room-id',
        ({ roomId } = {}) => {
          if (!roomId) {
            return null;
          }
          return getContactByRoomId(roomId);
        },
        { signal: ac.signal },
      );

      handleCommand(
        'cmd:messaging:conversation:select',
        async ({
          conversationId,
          remoteParticipantIds = [],
          displayUI = true,
          contactNickName,
        }) => {
          try {
            const contactId =
              remoteParticipantIds.length === 1
                ? remoteParticipantIds[0]
                : null;
            const providedContactNickName =
              typeof contactNickName === 'string' && contactNickName.trim()
                ? contactNickName.trim()
                : null;
            const localContact =
              !providedContactNickName && contactId
                ? getContactById(contactId)
                : null;
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
              'Failed to select conversation on cmd:messaging:conversation:select:',
              e,
            );
          }
        },
        { signal: ac.signal },
      );

      // handleCommand(
      //   'cmd:room:initiate:call',
      //   async ({
      //     contactId,
      //     contactNickName,
      //     conversationId,
      //     roomId,
      //     audioOnly = false,
      //   }) => {
      //     const resolvedContactNickName =
      //       typeof contactNickName === 'string' && contactNickName.trim()
      //         ? contactNickName.trim()
      //         : null;

      //     isDev() &&
      //       tempWarn(
      //         '[main.js] cmd:room:initiate:call event received with data: ',
      //         {
      //           contactId,
      //           contactNickName: resolvedContactNickName,
      //           conversationId,
      //           roomId,
      //           audioOnly,
      //         },
      //       );

      //     if (contactId) {
      //       const resolvedConversationId =
      //         conversationId ?? getConversationId(contactId);

      //       if (resolvedConversationId) {
      //         messagingController
      //           .selectConversation(resolvedConversationId, {
      //             remoteParticipantIds: [contactId],
      //             displayUI: false,
      //             contactNickName: resolvedContactNickName,
      //           })
      //           .catch((e) => {
      //             console.warn(
      //               'Failed to select conversation on cmd:room:initiate:call',
      //               e,
      //             );
      //           });
      //       }
      //     }

      //     callContact(contactId, resolvedContactNickName, roomId, {
      //       audioOnly,
      //     });
      //   },
      //   { signal: ac.signal },
      // );

      subscribe(
        'evt:call:incoming:accepted',
        async ({ contactId }) => {
          isDev() &&
            tempWarn(
              `[APPBUS] Handling call answered event from contact ${contactId}`,
            );

          const conversationId = getConversationId(contactId);

          if (!conversationId) {
            console.warn(
              '[APPBUS] Missing conversationId for accepted call contact:',
              contactId,
            );
            return;
          }

          const contact = getContactById(contactId);
          const contactNickName = contact?.contactNickName || null;

          try {
            await dispatchCommandAndAwait(
              'cmd:messaging:conversation:select',
              {
                conversationId,
                remoteParticipantIds: [contactId],
                displayUI: false,
                contactNickName,
              },
            );
          } catch (e) {
            console.warn(
              'Failed to select conversation on evt:call:incoming:accepted:',
              e,
            );
          }
        },
        { signal: ac.signal },
      );

      subscribe(
        'evt:call:session:unanswered',
        async ({ roomId, contactId }) => {
          isDev() &&
            tempWarn(
              `[APPBUS] Handling unanswered call for room ${roomId}, contact ${contactId}`,
            );

          const conversationId = getConversationId(contactId);

          if (!conversationId) {
            console.warn(
              '[APPBUS] Missing conversationId for unanswered call contact:',
              contactId,
            );
            return;
          }

          try {
            await messagingController.sendEventMessage(
              conversationId,
              'evt:call:session:unanswered',
              { callId: roomId },
            );
          } catch (e) {
            console.warn(
              '[APPBUS] Failed to write unanswered call message:',
              e,
            );
          }
        },
        { signal: ac.signal },
      );

      // subscribe(
      //   'evt:contacts:room:created',
      //   ({ roomId }) => {
      //     listenForIncomingOnRoom(roomId);
      //   },
      //   { signal: ac.signal },
      // );

      // subscribe(
      //   'evt:contacts:room:updated',
      //   ({ roomId, previousRoomId }) => {
      //     if (previousRoomId && previousRoomId !== roomId) {
      //       removeIncomingListenersForRoom(previousRoomId);
      //     }
      //     listenForIncomingOnRoom(roomId);
      //   },
      //   { signal: ac.signal },
      // );

      // subscribe(
      //   'evt:room:lifecycle:join-or-create-failed',
      //   ({ roomId }) => {
      //     console.warn(
      //       `[AppBus] evt:room:lifecycle:join-or-create-failed
      // Failed to join or create room with id: ${roomId}`,
      //     );
      //     clearUrlParam();
      //     // ! onCallDisconnected();
      //   },
      //   { signal: ac.signal },
      // );

      // subscribe(
      //   'evt:contacts:contact:deleted',
      //   ({ roomId }) => {
      //     if (roomId) {
      //       removeIncomingListenersForRoom(roomId);
      //     }
      //   },
      //   { signal: ac.signal },
      // );

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
