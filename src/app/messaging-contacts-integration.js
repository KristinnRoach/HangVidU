import { contactsService } from '../contacts/contacts-service.js';
import { messagingController } from '../messaging/messaging-controller.js';

// TODO: Fit into standardized pattern - Use appBus for this, or standardize on this pattern with domain event busses

let teardownMessagingContactsIntegration = null;

function updateLastInteractionForConversation(conversationId) {
  const state = messagingController.getConversation(conversationId);
  const contactId =
    state?.remoteParticipantIds?.length === 1
      ? state.remoteParticipantIds[0]
      : null;

  if (!contactId) {
    return;
  }

  contactsService.updateLastInteraction(contactId).catch(() => {});
}

/**
 * Bridge messaging-domain events into contact interaction metadata.
 *
 * This keeps messaging UI free from direct contact-service imports.
 */
export function setupMessagingContactsIntegration() {
  if (teardownMessagingContactsIntegration) {
    return teardownMessagingContactsIntegration;
  }

  const ac = new AbortController();

  messagingController.on(
    'message:received',
    ({ conversationId }) => {
      updateLastInteractionForConversation(conversationId);
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'message:sent',
    ({ conversationId }) => {
      updateLastInteractionForConversation(conversationId);
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'reaction:updated',
    ({ conversationId }) => {
      updateLastInteractionForConversation(conversationId);
    },
    { signal: ac.signal },
  );

  teardownMessagingContactsIntegration = () => {
    ac.abort();
    teardownMessagingContactsIntegration = null;
  };

  return teardownMessagingContactsIntegration;
}
