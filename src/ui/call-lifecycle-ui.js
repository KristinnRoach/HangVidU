// src/ui/call-lifecycle-ui.js
import { enterCallMode, exitCallMode } from './legacy/call-mode.js';

export function onCallConnected() {
  enterCallMode();
}

export function onCallDisconnected() {
  exitCallMode();
}
