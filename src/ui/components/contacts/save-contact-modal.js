import { dispatchUIEvent } from '../../dispatcher';

/**
 * Prompt user to save contact after hangup (and render contacts list in lobby)
 */
export async function showSaveContactPrompt(
  contactUserId,
  roomId, // TODO: Remove roomId dependency
  parentContainerEl,
  autoRemoveSeconds = 25,
) {
  if (!contactUserId || !roomId || !parentContainerEl) return;

  const shouldSave = await confirmDialog(t('contact.save.confirm'), {
    autoRemoveSeconds,
  });

  if (!shouldSave) return;

  const name =
    window.prompt(t('contact.name.prompt'), contactUserId) || contactUserId;

  dispatchUIEvent('contact:save', { contactUserId, name, roomId });

  // await renderContactsList(parentContainerEl); // TODO: emit event to refresh contact list or something
}
