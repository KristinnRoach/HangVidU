import { renderContactsList } from '../contacts/components/contacts-list.js';
import { showSaveContactPrompt } from '../contacts/components/save-contact-modal.js';

// TODO: Revisit once standardized pattern established

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
