// src/ui/core/bind-call-ui.js

import { onCallConnected, onCallDisconnected } from './call-lifecycle-ui.js';
import { hideOutgoingCallingUI } from '../../../call/components/outgoing-call.js';
import { messagesUI } from '../../../messaging/components/messages-ui.js';

/** Wires UI-only handlers to CallController. Business logic handlers are in main.js. */
export function bindCallUI(CallController) {
  CallController.on('memberJoined', onCallConnected);

  CallController.on('fileTransportReady', ({ controller }) => {
    messagesUI.setFileTransferController(controller);
  });

  CallController.on('cleanup', () => {
    hideOutgoingCallingUI();
    messagesUI.setFileTransferController(null);
    messagesUI.reset();
    onCallDisconnected();
  });
}
