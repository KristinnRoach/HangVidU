import { t } from '../../shared/i18n/index.js';
import { contactsService } from '../../features/contacts/contacts-service.js';
import confirmDialog from '../../shared/components/base/confirm-dialog.js';
import { openSolidDialog } from '../../shared/components/base/solid-dialog.js';
import SaveContactNameDialog from './SaveContactNameDialog.jsx';

export function promptSaveContactName(initialName) {
  return openSolidDialog((controls) => (
    <SaveContactNameDialog
      initialName={initialName}
      onClose={controls.close}
    />
  ));
}

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

  const name = (await promptSaveContactName(contactUserId)) || contactUserId;

  const savedContact = await contactsService.saveContact(
    contactUserId,
    name,
    roomId,
  );
  return !!savedContact;
}
