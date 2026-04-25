import {
  onCallConnected,
  onCallDisconnected,
} from '../shared/components/ui/core/call-lifecycle-ui.js';
import { hideOutgoingCallingUI } from '../features/call/outgoing-call-session.js';
import { messagesUI } from '../features/messaging/components/messages-ui.js';

/** Wires UI-only handlers to CallController. Business logic handlers are in main.js. */
export function bindCallUI(CallController) {
  CallController.on('evt:call:participant:joined', () => {
    onCallConnected({ audioOnly: CallController.getState().audioOnly }); // TODO: Get rid of this legacy path
    messagesUI.closeMessages();
  });

  CallController.on('evt:call:file-transport:ready', ({ controller }) => {
    messagesUI.setFileTransferController(controller);
  });

  CallController.on('evt:call:session:cleanup', () => {
    hideOutgoingCallingUI();
    messagesUI.setFileTransferController(null);
    messagesUI.reset();
    onCallDisconnected(); // TODO: Get rid of this legacy path, onCallConnected and onCallDisconnected
  });
}
