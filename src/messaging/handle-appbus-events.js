import { appBus } from '../app/app-bus.js';
import { tempWarn } from '../utils/dev/dev-utils.js';

let cleanupMessagingAppBusHandlers = null;

/**
 * Register AppBus listeners for messaging side effects.
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

  unsubscribers.push(
    appBus.on('call:incoming:accepted', ({ contactId }) => {
      tempWarn(
        `[APPBUS] Handling call answered event from contact ${contactId}`,
      );

      const conversationId =
        messagingController.resolveConversationIdFromContactId(contactId);

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
    appBus.on('call:unanswered', async ({ roomId, contactId }) => {
      tempWarn(
        `[APPBUS] Handling unanswered call for room ${roomId}, contact ${contactId}`,
      );

      try {
        const conversationId =
          messagingController.resolveConversationIdFromContactId(contactId);

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

  cleanupMessagingAppBusHandlers = () => {
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
