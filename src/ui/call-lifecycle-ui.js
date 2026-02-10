// src/ui/call-lifecycle-ui.js
import { uiState } from './state.js';
import { enterCallMode, exitCallMode } from './legacy/call-mode.js';
import { getLoggedInUserId } from '../auth/auth.js';

export function onCallConnected() {
  const isLoggedIn = !!getLoggedInUserId();
  const view = isLoggedIn ? 'connected' : 'connected:guest';
  uiState.setView(view);
  enterCallMode(); // legacy - remove after migration
}

export function onCallDisconnected() {
  const isLoggedIn = !!getLoggedInUserId();
  const view = isLoggedIn ? 'lobby' : 'lobby:guest';
  uiState.setView(view);
  exitCallMode(); // legacy - remove after migration
}
