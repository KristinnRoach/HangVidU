// src/ui/watch-lifecycle-ui.js
import { uiState } from './state.js';
import { enterWatchMode, exitWatchMode } from './legacy/watch-mode.js';

export function onWatchModeEntered() {
  uiState.setMainContent('ytVideo');
  enterWatchMode(); // legacy - remove after migration
}

export function onWatchModeExited() {
  uiState.setMainContent('remoteStream');
  exitWatchMode(); // legacy - remove after migration
}
