// src/features/contacts/contacts-command-handlers.js
//
// Owns cross-module contact commands. External surfaces (UI components, other
// features) dispatch these; the handlers here orchestrate modals + service
// writes inside the contacts module. Mirrors messaging-command-handlers.js.

import { handleCommand } from '../../shared/events/index.js';
import { t } from '../../shared/i18n/index.js';
import confirmDialog from '../../shared/components/base/confirm-dialog.js';
import editContactModal from './components/edit-contact-modal.jsx';
import { contactsService } from './contacts-service.js';
import { getContactById } from './contacts-state.js';

let cleanupContactsAppBusHandlers = null;

/**
 * Register cross-module contacts command handlers.
 * Idempotent: repeated calls return the same cleanup function.
 *
 * Commands handled:
 *   - cmd:contacts:contact:edit     { contactId }
 *     Opens the edit modal; routes to rename or delete based on result.
 *
 * @returns {() => void} Cleanup function that unregisters handlers.
 */
export function setupContactsAppBusHandlers() {
  if (cleanupContactsAppBusHandlers) {
    return cleanupContactsAppBusHandlers;
  }

  const unsubscribers = [];

  unsubscribers.push(
    handleCommand('cmd:contacts:contact:edit', async ({ contactId }) => {
      if (!contactId) return;

      const contact = getContactById(contactId);
      if (!contact) return;

      const result = await editContactModal(contact.contactNickName ?? '');
      if (!result) return;

      if (result.action === 'rename') {
        await contactsService.updateContact(
          contactId,
          result.name,
          contact.roomId,
        );
      } else if (result.action === 'delete') {
        const confirmed = await confirmDialog(t('contact.delete.confirm'));
        if (!confirmed) return;
        await contactsService.deleteContact(contactId);
      }
    }),
  );

  cleanupContactsAppBusHandlers = () => {
    while (unsubscribers.length > 0) {
      const unsubscribe = unsubscribers.pop();
      try {
        unsubscribe();
      } catch (e) {
        console.warn('[APPBUS] Failed to unsubscribe contacts handler:', e);
      }
    }
    cleanupContactsAppBusHandlers = null;
  };

  return cleanupContactsAppBusHandlers;
}
