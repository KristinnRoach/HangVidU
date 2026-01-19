// src/ui/watch-lifecycle-ui.js
import { enterWatchMode, exitWatchMode } from './legacy/watch-mode.js';

export function onWatchModeEntered() {
  enterWatchMode();
}

export function onWatchModeExited() {
  exitWatchMode();
}
