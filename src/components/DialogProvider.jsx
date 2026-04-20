import {
  Match,
  Show,
  Switch,
  createContext,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import {
  dispatchCommand,
  handleCommand,
} from '../shared/events/index.js';
import IncomingCallDialog from './call/IncomingCallDialog.jsx';
import OutgoingCallDialog from './call/OutgoingCallDialog.jsx';
import EditContactDialog from './contacts/EditContactDialog.jsx';
import SaveContactDialog from './contacts/SaveContactDialog.jsx';

const DialogContext = createContext();

function createDialogApi() {
  const [activeDialog, setActiveDialog] = createSignal(null);

  function closeDialog() {
    setActiveDialog(null);
  }

  function replaceDialog(nextDialog) {
    const currentDialog = activeDialog();

    if (currentDialog?.onCancel) {
      try {
        currentDialog.onCancel();
      } catch (error) {
        console.warn('[dialog-provider] cancel handler failed:', error);
      }
    }

    setActiveDialog(nextDialog);
  }

  function dismissIncomingCallDialog(roomId) {
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

  function dismissOutgoingCallDialog(roomId) {
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

  function resolveSaveContactDialog(result) {
    const dialog = activeDialog();

    if (dialog?.type === 'save-contact') {
      try {
        dialog.resolve(!!result);
      } catch (error) {
        console.warn('[dialog-provider] resolve handler failed:', error);
      }

      setActiveDialog(null);
    }
  }

  return {
    activeDialog,
    closeDialog,
    dismissIncomingCallDialog,
    dismissOutgoingCallDialog,
    openEditContactDialog({ contactId, currentName, roomId }) {
      if (!contactId) {
        return;
      }

      replaceDialog({
        type: 'edit-contact',
        contactId,
        currentName: typeof currentName === 'string' ? currentName : '',
        roomId: roomId ?? null,
      });
    },
    showIncomingCallDialog(props = {}) {
      replaceDialog({
        type: 'incoming-call',
        props,
      });
    },
    showOutgoingCallDialog(props = {}) {
      replaceDialog({
        type: 'outgoing-call',
        props,
      });
    },
    showSaveContactPrompt(contactUserId, roomId) {
      if (!contactUserId || !roomId) {
        return Promise.resolve(false);
      }

      return new Promise((resolve) => {
        replaceDialog({
          type: 'save-contact',
          contactId: contactUserId,
          roomId,
          resolve,
          onCancel: () => resolve(false),
        });
      });
    },
    resolveSaveContactDialog,
  };
}

function DialogRenderer() {
  const dialogs = useDialog();

  return (
    <Show when={dialogs.activeDialog()}>
      {(dialog) => (
        <Portal>
          <Switch>
            <Match when={dialog().type === 'edit-contact'}>
              <EditContactDialog
                contactId={dialog().contactId}
                currentName={dialog().currentName}
                roomId={dialog().roomId}
                onClose={dialogs.closeDialog}
              />
            </Match>

            <Match when={dialog().type === 'save-contact'}>
              <SaveContactDialog
                contactId={dialog().contactId}
                roomId={dialog().roomId}
                onClose={dialogs.resolveSaveContactDialog}
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

export default function DialogProvider(props) {
  const dialogs = createDialogApi();
  const ac = new AbortController();

  onMount(() => {
    handleCommand(
      'cmd:dialog:incoming-call:open',
      (payload = {}) => {
        dialogs.showIncomingCallDialog(payload);
      },
      { signal: ac.signal },
    );

    handleCommand(
      'cmd:dialog:incoming-call:close',
      ({ roomId } = {}) => dialogs.dismissIncomingCallDialog(roomId),
      { signal: ac.signal },
    );

    handleCommand(
      'cmd:dialog:outgoing-call:open',
      (payload = {}) => {
        dialogs.showOutgoingCallDialog(payload);
      },
      { signal: ac.signal },
    );

    handleCommand(
      'cmd:dialog:outgoing-call:close',
      ({ roomId } = {}) => dialogs.dismissOutgoingCallDialog(roomId),
      { signal: ac.signal },
    );

    handleCommand(
      'cmd:dialog:contact-edit:open',
      (payload = {}) => {
        dialogs.openEditContactDialog(payload);
      },
      { signal: ac.signal },
    );

    handleCommand(
      'cmd:dialog:contact-save:prompt',
      async ({ contactUserId, roomId } = {}) =>
        dialogs.showSaveContactPrompt(contactUserId, roomId),
      { signal: ac.signal },
    );

    handleCommand(
      'cmd:dialog:modal:close',
      () => {
        dialogs.closeDialog();
      },
      { signal: ac.signal },
    );
  });

  onCleanup(() => ac.abort());

  return (
    <DialogContext.Provider value={dialogs}>
      {props.children}
      <DialogRenderer />
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

export function openEditContactDialog(payload) {
  dispatchCommand('cmd:dialog:contact-edit:open', payload);
}
