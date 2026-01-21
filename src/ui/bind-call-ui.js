// src/ui/bind-call-ui.js

import { onCallConnected, onCallDisconnected } from './call-lifecycle-ui.js';
import { hideCallingUI } from '../components/calling/calling-ui.js';

export function bindCallUI(CallController) {
  CallController.on('memberJoined', onCallConnected);
  CallController.on('cleanup', () => {
    hideCallingUI();
    onCallDisconnected();
  });
}
