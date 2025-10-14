// lib/state.js - Single source of truth
const state = {
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
  Object.assign(state, updates);
  listeners.forEach((fn) => fn(state));
}

export function getState() {
  return state;
}
