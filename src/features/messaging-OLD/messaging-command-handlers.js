import { handleCommand } from '../../shared/events/index.js';

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
  const unreadSubscriptions = new Map(); // { conversationId: { unsubscribe, refCount } }

  unsubscribers.push(
    handleCommand(
      'cmd:messaging:conversation:unread-count-listen',
      ({ conversationId }) => {
        if (!conversationId) return;

        const entry = unreadSubscriptions.get(conversationId);
        if (entry) {
          entry.refCount++;
          return;
        }

        const unsubscribe =
          messagingController.listenToUnreadCount(conversationId);

        unreadSubscriptions.set(conversationId, { unsubscribe, refCount: 1 });
      },
    ),
  );

  unsubscribers.push(
    handleCommand(
      'cmd:messaging:conversation:unread-count-unlisten',
      ({ conversationId }) => {
        const entry = unreadSubscriptions.get(conversationId);
        if (!entry) return;

        entry.refCount--;
        if (entry.refCount <= 0) {
          unreadSubscriptions.delete(conversationId);
          entry.unsubscribe();
        }
      },
    ),
  );

  cleanupMessagingAppBusHandlers = () => {
    unreadSubscriptions.forEach(({ unsubscribe }) => {
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
