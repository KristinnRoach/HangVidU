import { renderContactsList } from '../ui/components/contacts/contacts.js';
import { showSaveContactPrompt } from '../ui/components/contacts/save-contact-modal.js';

/**
 * Prompt to save a contact, then refresh the contacts list only on success.
 */
export async function promptAndRefreshContactSave(
  contactUserId,
  roomId,
  lobbyElement,
) {
  const didSave = await showSaveContactPrompt(contactUserId, roomId);

  if (!didSave) {
    return false;
  }

  if (lobbyElement) {
    await renderContactsList(lobbyElement);
  }

  return true;
}
