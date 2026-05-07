import { getMessagesUI } from '../features/messaging/components/messages-ui.js';

/** Wires UI-only handlers to CallController. Business logic handlers are in main.js. */
export function tempBindMsgUiToCall(CallController) {
  CallController.on('evt:call:participant:joined', () => {
    getMessagesUI()?.closeMessages();
  });

  CallController.on('evt:call:file-transport:ready', ({ controller }) => {
    getMessagesUI()?.setFileTransferController(controller);
  });

  CallController.on('evt:call:session:cleanup', () => {
    getMessagesUI()?.setFileTransferController(null);
    getMessagesUI()?.reset();
  });
}
