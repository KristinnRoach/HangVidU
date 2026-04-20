import { createContext, useContext, createSignal, ParentComponent, Match, Show, Switch } from 'solid-js';
import { Portal } from 'solid-js/web';
import IncomingCallDialog from './call/IncomingCallDialog.jsx';
import OutgoingCallDialog from './call/OutgoingCallDialog.jsx';
import EditContactDialog from './contacts/EditContactDialog.jsx';
import SaveContactDialog from './contacts/SaveContactDialog.jsx';

const DialogContext = createContext();

export const DialogProvider = (props) => {
  const [activeDialog, setActiveDialog] = createSignal(null);

  const closeDialog = () => {
    setActiveDialog(null);
  };

  const replaceDialog = (nextDialog) => {
    const current = activeDialog();
    if (current?.onCancel) {
      try {
        current.onCancel();
      } catch (error) {
        console.warn('[DialogProvider] cancel handler failed:', error);
      }
    }
    setActiveDialog(nextDialog);
  };

  const api = {
    activeDialog,
    closeDialog,
    showIncomingCallDialog: (props = {}) => replaceDialog({ type: 'incoming-call', props }),
    showOutgoingCallDialog: (props = {}) => replaceDialog({ type: 'outgoing-call', props }),
    openEditContactDialog: ({ contactId, currentName, roomId }) => {
      if (!contactId) return;
      replaceDialog({
        type: 'edit-contact',
        contactId,
        currentName: typeof currentName === 'string' ? currentName : '',
        roomId: roomId ?? null,
      });
    },
    showSaveContactPrompt: (contactUserId, roomId) => {
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
    resolveSaveContactDialog: (result) => {
      const dialog = activeDialog();
      if (dialog?.type === 'save-contact') {
        try {
          dialog.resolve(!!result);
        } catch (error) {
          console.warn('[DialogProvider] resolve handler failed:', error);
        }
        setActiveDialog(null);
      }
    },
    dismissIncomingCallDialog: (roomId) => {
      const dialog = activeDialog();
      if (dialog?.type !== 'incoming-call') return false;
      if (roomId && dialog.props?.roomId !== roomId) return false;
      setActiveDialog(null);
      return true;
    },
    dismissOutgoingCallDialog: (roomId) => {
      const dialog = activeDialog();
      if (dialog?.type !== 'outgoing-call') return false;
      if (roomId && dialog.props?.roomId !== roomId) return false;
      setActiveDialog(null);
      return true;
    },
  };

  return (
    <>
      <DialogContext.Provider value={api}>
        {props.children}
      </DialogContext.Provider>

      <Show when={activeDialog()}>
        {(dialog) => (
          <Portal>
            <Switch>
              <Match when={dialog().type === 'edit-contact'}>
                <EditContactDialog
                  contactId={dialog().contactId}
                  currentName={dialog().currentName}
                  roomId={dialog().roomId}
                  onClose={closeDialog}
                />
              </Match>

              <Match when={dialog().type === 'save-contact'}>
                <SaveContactDialog
                  contactId={dialog().contactId}
                  roomId={dialog().roomId}
                  onClose={() => api.resolveSaveContactDialog(true)}
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
    </>
  );
};

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}
