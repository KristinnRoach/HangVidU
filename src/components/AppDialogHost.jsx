import { Match, Show, Switch, createSignal } from 'solid-js';
import { Portal } from 'solid-js/web';
import IncomingCallDialog from './call/IncomingCallDialog.jsx';
import OutgoingCallDialog from './call/OutgoingCallDialog.jsx';
import EditContactDialog from './contacts/EditContactDialog.jsx';
import SaveContactDialog from './contacts/SaveContactDialog.jsx';

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

export function dismissIncomingCallDialog(roomId) {
  const dialog = activeDialog();
  if (dialog?.type !== 'incoming-call') {
    return false;
  }

  if (roomId && dialog.props?.roomId !== roomId) {
    return false;
  }

  setActiveDialog(null);
  return true;
}

export function dismissOutgoingCallDialog(roomId) {
  const dialog = activeDialog();
  if (dialog?.type !== 'outgoing-call') {
    return false;
  }

  if (roomId && dialog.props?.roomId !== roomId) {
    return false;
  }

  setActiveDialog(null);
  return true;
}

export function showIncomingCallDialog(props = {}) {
  replaceActiveDialog({
    type: 'incoming-call',
    props,
  });
}

export function showOutgoingCallDialog(props = {}) {
  replaceActiveDialog({
    type: 'outgoing-call',
    props,
  });
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

    setActiveDialog(null);
  }
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
              <SaveContactDialog
                contactId={dialog().contactId}
                roomId={dialog().roomId}
                onClose={resolveSaveContactDialog}
              />
            </Match>

            <Match when={dialog().type === 'incoming-call'}>
              <IncomingCallDialog {...dialog().props} />
            </Match>

            <Match when={dialog().type === 'outgoing-call'}>
              <OutgoingCallDialog {...dialog().props} />
            </Match>
          </Switch>
        </Portal>
      )}
    </Show>
  );
}
