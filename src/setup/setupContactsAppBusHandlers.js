//
// Owns app-level contact command handlers that orchestrate app UI (modals)
// around contacts-domain service writes.

import { handleCommand } from '../shared/events/index.js';
import { t } from '../shared/i18n/index.js';
import confirmDialog from '../shared/components/base/confirm-dialog.js';
import editContactModal from '../components/contacts/edit-contact-modal.jsx';
import { contactsService, getContactById } from '../features/contacts/index.js';

let cleanupContactsAppBusHandlers = null;

/**
 * Register app-level contact command handlers.
 * Idempotent: repeated calls return the same cleanup function.
 *
 * Commands handled:
 *   - cmd:contacts:contact:edit     { contactId }
 *
 * @returns {() => void}
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
