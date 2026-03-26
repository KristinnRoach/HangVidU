import { t } from '../../../i18n/index.js';
import { dispatchUIEvent } from '../../dispatcher.js';
import confirmDialog from '../base/confirm-dialog.js';

/**
 * Prompt user to save contact after hangup (and render contacts list in lobby)
 */
export async function showSaveContactPrompt(
  contactUserId,
  roomId, // TODO: Remove roomId dependency
  autoRemoveSeconds = 25,
) {
  if (!contactUserId || !roomId) return;

  const shouldSave = await confirmDialog(t('contact.save.confirm'), {
    autoRemoveSeconds,
  });

  if (!shouldSave) return;

  const name =
    window.prompt(t('contact.name.prompt'), contactUserId) || contactUserId;

  dispatchUIEvent('contact:save', { contactUserId, name, roomId });

  // await renderContactsList(parentContainerEl); // TODO: emit event to refresh contact list or something
}
