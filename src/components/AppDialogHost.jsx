import { Match, Show, Switch, createSignal } from 'solid-js';
import { Portal } from 'solid-js/web';
import EditContactDialog from './contacts/EditContactDialog.jsx';
import SaveContactNameDialog from './contacts/SaveContactNameDialog.jsx';

const [activeDialog, setActiveDialog] = createSignal(null);

function replaceActiveDialog(nextDialog) {
  const currentDialog = activeDialog();

  if (currentDialog?.onCancel) {
    try {
      currentDialog.onCancel();
    } catch (error) {
      console.warn('[app-dialog-host] cancel handler failed:', error);
    }
  }

  setActiveDialog(nextDialog);
}

export function closeAppDialog() {
  setActiveDialog(null);
}

export function openEditContactDialog({ contactId, currentName, roomId }) {
  if (!contactId) {
    return;
  }

  replaceActiveDialog({
    type: 'edit-contact',
    contactId,
    currentName: typeof currentName === 'string' ? currentName : '',
    roomId: roomId ?? null,
  });
}

export function showSaveContactPrompt(contactUserId, roomId) {
  if (!contactUserId || !roomId) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    replaceActiveDialog({
      type: 'save-contact',
      contactId: contactUserId,
      roomId,
      resolve,
      onCancel: () => resolve(false),
    });
  });
}

export function resolveSaveContactDialog(result) {
  const dialog = activeDialog();

  if (dialog?.type === 'save-contact') {
    try {
      dialog.resolve(!!result);
    } catch (error) {
      console.warn('[app-dialog-host] resolve handler failed:', error);
    }
  }

  setActiveDialog(null);
}

export default function AppDialogHost() {
  return (
    <Show when={activeDialog()}>
      {(dialog) => (
        <Portal>
          <Switch>
            <Match when={dialog().type === 'edit-contact'}>
              <EditContactDialog
                contactId={dialog().contactId}
                currentName={dialog().currentName}
                roomId={dialog().roomId}
                onClose={closeAppDialog}
              />
            </Match>

            <Match when={dialog().type === 'save-contact'}>
              <SaveContactNameDialog
                contactId={dialog().contactId}
                roomId={dialog().roomId}
                onClose={resolveSaveContactDialog}
              />
            </Match>
          </Switch>
        </Portal>
      )}
    </Show>
  );
}
