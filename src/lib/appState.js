// lib/appState.js - Single source of truth
const appState = {
  // isInitialized: false, // ? should be here ? Currently a flag at top of app.js
  connection: 'idle', // idle | connecting | connected | reconnecting | disconnected
  room: {
    id: null,
    isInitiator: false,
    partnerOnline: false,
  },
  media: {
    localStream: null,
    peerConnection: null,
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
