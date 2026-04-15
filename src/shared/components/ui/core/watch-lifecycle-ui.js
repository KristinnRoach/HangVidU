// src/ui/core/watch-lifecycle-ui.js
import { uiState } from './ui-state.js';
import { enterWatchModeUI, exitWatchModeUI } from './legacy/watch-mode.js';

export function onWatchModeEntered() {
  uiState.setMainContent('ytVideo');
  enterWatchModeUI(); // legacy - remove after migration
}

export function onWatchModeExited() {
  uiState.setMainContent('remoteStream');
  exitWatchModeUI(); // legacy - remove after migration
}
