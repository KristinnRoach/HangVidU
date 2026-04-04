import {
  handleCommand,
  subscribe,
} from '../events/index.js';
import { messagingController } from '../features/messaging/messaging-controller.js';
import { isDev, tempWarn } from '../utils/dev/dev-utils.js';
import { callContact } from '../features/call/WIP-start-call-refactor.js';
import { contactsService } from '../features/contacts/index.js';
import {
  listenForIncomingOnRoom,
  removeIncomingListenersForRoom,
} from '../features/call/room-listeners.js';
import { setUserOffline } from '../firebase/presence.js';
import { clearUrlParam } from '../utils/url.js';
import { onCallDisconnected } from '../components/ui/core/call-lifecycle-ui.js';

export function setupMainAppBusListeners() {
  handleCommand('user:presence:set-offline', async () => {
    try {
      await setUserOffline();
    } catch (e) {
      console.warn('Failed to set user presence offline:', e);
    }
  });

  handleCommand(
    'messaging:conversation:select',
    async ({ conversationId, remoteParticipantIds = [], displayUI = true }) => {
      try {
        await messagingController.selectConversation(conversationId, {
          remoteParticipantIds,
          displayUI,
        });
      } catch (e) {
        console.warn(
          'Failed to select conversation on messaging:conversation:select:',
          e,
        );
      }
    },
  );

  handleCommand(
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

  subscribe('room:id:created', ({ roomId }) => {
    listenForIncomingOnRoom(roomId);
  });

  subscribe('room:id:updated', ({ roomId, previousRoomId }) => {
    if (previousRoomId && previousRoomId !== roomId) {
      removeIncomingListenersForRoom(previousRoomId);
    }
    listenForIncomingOnRoom(roomId);
  });

  subscribe('room:joinOrCreate:failed', ({ roomId }) => {
    console.warn(
      `[AppBus] room:joinOrCreate:failed 
      Failed to join or create room with id: ${roomId}`,
    );
    clearUrlParam();
    onCallDisconnected();
  });
}
