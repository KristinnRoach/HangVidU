import { appBus } from './app-bus.js';
import { messagingController } from '../features/messaging/messaging-controller.js';
import { isDev, tempWarn } from '../utils/dev/dev-utils.js';
import { callContact } from '../call/WIP-start-call-refactor.js';
import { contactsService } from '../features/contacts/index.js';
import {
  listenForIncomingOnRoom,
  removeIncomingListenersForRoom,
} from '../call/room-listeners.js';
import { clearUrlParam } from '../utils/url.js';
import { onCallDisconnected } from '../components/ui/core/call-lifecycle-ui.js';

export function setupMainAppBusListeners() {
  appBus.on(
    'call:outgoing:requested',
    async ({ contactId, contactName, conversationId, roomId }) => {
      isDev() &&
        tempWarn(
          '[main.js] call:outgoing:requested event received with data: ',
          {
            contactId,
            contactName,
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
              })
              .catch((e) => {
                console.warn(
                  'Failed to select conversation on call:outgoing:requested:',
                  e,
                );
              });
          }
        } catch (e) {
          console.warn(
            'Failed to select conversation on call:outgoing:requested:',
            e,
          );
        }
      }

      callContact(contactId, contactName, roomId);
    },
  );

  appBus.on('room:id:created', ({ roomId }) => {
    listenForIncomingOnRoom(roomId);
  });

  appBus.on('room:id:updated', ({ roomId, previousRoomId }) => {
    if (previousRoomId && previousRoomId !== roomId) {
      removeIncomingListenersForRoom(previousRoomId);
    }
    listenForIncomingOnRoom(roomId);
  });

  appBus.on('room:joinOrCreate:failed', ({ roomId }) => {
    console.warn(
      `[AppBus] room:joinOrCreate:failed 
      Failed to join or create room with id: ${roomId}`,
    );
    clearUrlParam();
    onCallDisconnected();
  });
}
