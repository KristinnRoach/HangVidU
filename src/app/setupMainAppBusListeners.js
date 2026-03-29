import { appBus } from './app-bus.js';
import { messagingController } from '../messaging/messaging-controller.js';
import { isDev, tempWarn } from '../utils/dev/dev-utils.js';

/**
 * Register app-level AppBus listeners that still depend on main-owned call hooks.
 *
 * @param {{
 *   callContact: (contactId: string, contactName: string, roomId?: string|null) => Promise<boolean>,
 *   listenForIncomingOnRoom: (roomId: string) => void,
 * }} params
 */
export function setupMainAppBusListeners({
  callContact,
  listenForIncomingOnRoom,
}) {
  if (typeof callContact !== 'function') {
    throw new Error('setupMainAppBusListeners requires callContact');
  }

  if (typeof listenForIncomingOnRoom !== 'function') {
    throw new Error(
      'setupMainAppBusListeners requires listenForIncomingOnRoom',
    );
  }

  appBus.on('call:outgoing:requested', ({ contactId, contactName, roomId }) => {
    isDev() &&
      tempWarn('[main.js] call:outgoing:requested event received with data: ', {
        contactId,
        contactName,
        roomId,
      });

    try {
      const conversationId =
        messagingController.resolveConversationIdFromContactId(contactId);

      messagingController
        .selectConversation(conversationId, {
          remoteParticipantIds: [contactId],
          displayUI: false,
        })
        .catch((e) => {
          console.warn(
            'Failed to select conversation on call:outgoing:requested:',
            e,
          );
        });
    } catch (e) {
      console.warn('Failed to select conversation after memberJoined:', e);
    }

    callContact(contactId, contactName, roomId);
  });

  appBus.on('room:id:created', ({ roomId }) => {
    listenForIncomingOnRoom(roomId);
  });

  appBus.on('room:id:updated', ({ roomId }) => {
    listenForIncomingOnRoom(roomId);
  });
}
