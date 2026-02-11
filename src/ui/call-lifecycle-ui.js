// src/ui/call-lifecycle-ui.js
import { uiState } from './ui-state.js';
import { enterCallMode, exitCallMode } from './legacy/call-mode.js';

export function onCallConnected() {
  uiState.setView('connected');
  enterCallMode(); // legacy - remove after migration
}

export function onCallDisconnected() {
  uiState.setView('lobby');
  exitCallMode(); // legacy - remove after migration
}
