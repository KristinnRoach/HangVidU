import {
  dispatchCommand,
  handleCommand,
} from '../../events/index.js';
import { tempWarn } from '../../utils/dev/dev-utils.js';
import { contactsService } from '../contacts/index.js';

let cleanupMessagingAppBusHandlers = null;

/**
 * Register cross-module messaging command handlers.
 * Idempotent: repeated calls return the same cleanup function
 * without registering duplicate listeners.
 *
 * @param {Object} params
 * @param {import('./messaging-controller.js').MessagingController} params.messagingController
 * @returns {() => void} Cleanup function that unsubscribes listeners.
 */
export function setupMessagingAppBusHandlers({ messagingController }) {
  if (!messagingController) {
    throw new Error(
      'setupMessagingAppBusHandlers requires messagingController',
    );
  }

  if (cleanupMessagingAppBusHandlers) {
    return cleanupMessagingAppBusHandlers;
  }

  const unsubscribers = [];
  const unreadSubscriptions = new Map();

  unsubscribers.push(
    handleCommand('call:incoming:accepted', async ({ contactId }) => {
      tempWarn(
        `[APPBUS] Handling call answered event from contact ${contactId}`,
      );

      const conversationId =
        await contactsService.getConversationId(contactId);

      if (!conversationId) {
        console.warn(
          '[APPBUS] Missing conversationId for accepted call contact:',
          contactId,
        );
        return;
      }

      messagingController
        .selectConversation(conversationId, {
          remoteParticipantIds: [contactId],
          displayUI: false,
        })
        .catch((e) => {
          console.warn(
            'Failed to select conversation on call:incoming:accepted:',
            e,
          );
        });
    }),
  );

  unsubscribers.push(
    handleCommand('call:unanswered', async ({ roomId, contactId }) => {
      tempWarn(
        `[APPBUS] Handling unanswered call for room ${roomId}, contact ${contactId}`,
      );

      try {
        const conversationId =
          await contactsService.getConversationId(contactId);

        if (!conversationId) {
          console.warn(
            '[APPBUS] Missing conversationId for unanswered call contact:',
            contactId,
          );
          return;
        }

        await messagingController.sendEventMessage(
          conversationId,
          'call:unanswered',
          { callId: roomId },
        );
      } catch (e) {
        console.warn('[APPBUS] Failed to write unanswered call message:', e);
      }
    }),
  );

  unsubscribers.push(
    handleCommand(
      'messaging:conversation:unread-count:listen',
      ({ conversationId }) => {
        if (!conversationId || unreadSubscriptions.has(conversationId)) {
          return;
        }

        const unsubscribe = messagingController.listenToUnreadCount(
          conversationId,
        );

        unreadSubscriptions.set(conversationId, unsubscribe);
      },
    ),
  );

  unsubscribers.push(
    handleCommand(
      'messaging:conversation:unread-count:unlisten',
      ({ conversationId }) => {
        const unsubscribe = unreadSubscriptions.get(conversationId);
        if (!unsubscribe) {
          return;
        }

        unreadSubscriptions.delete(conversationId);
        unsubscribe();
      },
    ),
  );

  cleanupMessagingAppBusHandlers = () => {
    unreadSubscriptions.forEach((unsubscribe) => {
      try {
        unsubscribe();
      } catch (e) {
        console.warn(
          '[APPBUS] Failed to unsubscribe unread-count listener:',
          e,
        );
      }
    });
    unreadSubscriptions.clear();

    while (unsubscribers.length > 0) {
      const unsubscribe = unsubscribers.pop();
      try {
        unsubscribe();
      } catch (e) {
        console.warn('[APPBUS] Failed to unsubscribe messaging listener:', e);
      }
    }

    cleanupMessagingAppBusHandlers = null;
  };

  return cleanupMessagingAppBusHandlers;
}
