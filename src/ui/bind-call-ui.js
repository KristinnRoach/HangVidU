// src/ui/bind-call-ui.js

import { onCallConnected, onCallDisconnected } from './call-lifecycle-ui.js';
import { hideCallingUI } from './components/calling/calling-ui.js';
import { messagesUI } from './components/messages/messages-ui.js';

/** Wires UI-only handlers to CallController. Business logic handlers are in main.js. */
export function bindCallUI(CallController) {
  CallController.on('memberJoined', onCallConnected);

  CallController.on('fileTransportReady', ({ controller }) => {
    messagesUI.setFileTransferController(controller);
  });

  CallController.on('cleanup', () => {
    hideCallingUI();
    messagesUI.setFileTransferController(null);
    messagesUI.reset();
    onCallDisconnected();
  });
}
