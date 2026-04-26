// src/ui/core/call-lifecycle-ui.js
import { uiState } from './ui-state.js';
// import { enterCallModeUI, exitCallModeUI } from './legacy/call-mode.js';

export function onCallConnected({ audioOnly = false } = {}) {
  enterCallModeUI(audioOnly); // legacy - remove after migration
}

export function onCallDisconnected() {
  exitCallModeUI(); // legacy - remove after migration
}
