import { t } from '../../../shared/i18n/index.js';
import { contactsService } from '../contacts-service.js';
import confirmDialog from '../../../shared/components/base/confirm-dialog.js';

/**
 * Prompt user to save a contact after hangup.
 *
 * Returns `true` only when the user confirms and the contact write succeeds.
 */
export async function showSaveContactPrompt(
  contactUserId,
  roomId,
  autoRemoveSeconds = 25,
) {
  if (!contactUserId || !roomId) return false;

  const shouldSave = await confirmDialog(t('contact.save.confirm'), {
    autoRemoveSeconds,
  });

  if (!shouldSave) return false;

  // TODO: Replace with an in-app name-entry dialog.
  const name =
    window.prompt(t('contact.name.prompt'), contactUserId) || contactUserId;

  const savedContact = await contactsService.saveContact(
    contactUserId,
    name,
    roomId,
  );
  return !!savedContact;
}
