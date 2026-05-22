import { getContactsService } from './contacts-service.js';
import { handleCommand } from '../../shared/events/index.js';
import { resolveContactIdFromDirectConversationId } from '../../shared/utils/direct-conversation-id.js';
import { getLoggedInUserId } from '../../auth/index.js';

let isRegistered = false;

export function setupContactsCommandHandlers() {
  if (isRegistered) return;
  isRegistered = true;

  handleCommand(
    'cmd:contacts:record:interaction',
    (details: { contactId?: string; conversationId?: string }) => {
      console.warn(
        '[ContactsService] Recording interaction for conversation:',
        details,
      );
      if (!details.contactId && !details.conversationId) return;
      let effectiveContactId = details.contactId;
      if (!effectiveContactId && details.conversationId) {
        const myUserId = getLoggedInUserId();
        effectiveContactId = resolveContactIdFromDirectConversationId(
          details.conversationId,
          myUserId,
        );
      }
      if (!effectiveContactId) return;
      getContactsService().updateLastInteraction(effectiveContactId);
    },
  );
}
