// src/app/state.js - Single source of truth

const appState = {
  // App-level state (managed by app.js)
  isInitialized: false,
  startChatInProgress: false,

  // Manager instances
  managers: {
    connectionMonitor: null,
    pageReloadManager: null,
    autoSaveCleanup: null,
  },

  // Cross-feature state that needs coordination
  connection: 'idle', // idle | connecting | connected | reconnecting | disconnected
  room: {
    id: null,
    isInitiator: false,
    partnerOnline: false,
  },
  ui: {
    isAudioMuted: false,
    isVideoOn: true,
    currentFacingMode: 'user',
    watchMode: false,
  },
  sync: {
    streamUrl: '',
    isSyncing: false,
  },
};

// Simple observer pattern
const listeners = [];
export function onChange(callback) {
  listeners.push(callback);
}

export function updateState(updates) {
  Object.assign(appState, updates);
  listeners.forEach((fn) => fn(appState));
}

export function getState() {
  return appState;
}

// Helper functions for common state operations (KISS principle)
export function setInitialized(value) {
  updateState({ isInitialized: value });
}

export function isInitialized() {
  return appState.isInitialized;
}

export function setStartChatInProgress(value) {
  updateState({ startChatInProgress: value });
}

export function isStartChatInProgress() {
  return appState.startChatInProgress;
}

export function setManager(name, instance) {
  updateState({
    managers: {
      ...appState.managers,
      [name]: instance,
    },
  });
}

export function getManager(name) {
  return appState.managers[name];
}

export function clearManagers() {
  updateState({
    managers: {
      connectionMonitor: null,
      pageReloadManager: null,
      autoSaveCleanup: null,
    },
  });
}
