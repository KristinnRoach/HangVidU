import { appBus } from './app-bus.js';
import { messagingController } from '../messaging/messaging-controller.js';
import { isDev, tempWarn } from '../utils/dev/dev-utils.js';
// STARTUP_ORDER_DEPENDANCY: this import is configured by main.js via
// setupWIPStartCallRefactor() before setupMainAppBusListeners() is called.
import { callContact } from '../call/WIP-start-call-refactor.js';

/**
 * Register app-level AppBus listeners that still depend on main-owned room hooks.
 *
 * @param {{
 *   listenForIncomingOnRoom: (roomId: string) => void,
 * }} params
 */
export function setupMainAppBusListeners({ listenForIncomingOnRoom }) {
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
