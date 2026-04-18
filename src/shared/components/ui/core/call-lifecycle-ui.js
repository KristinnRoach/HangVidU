// src/ui/core/call-lifecycle-ui.js
import { uiState } from './ui-state.js';
import { enterCallModeUI, exitCallModeUI } from './legacy/call-mode.js';

export function onCallingStarted() {
  uiState.setView('calling');
}

export function onCallingEnded() {
  if (uiState.getCurrentBaseView() === 'calling') {
    uiState.setView('lobby');
  }
}

export function onCallConnected({ audioOnly = false } = {}) {
  uiState.setView('connected');
  enterCallModeUI(audioOnly); // legacy - remove after migration
}

export function onCallDisconnected() {
  uiState.setView('lobby');
  exitCallModeUI(); // legacy - remove after migration
}
