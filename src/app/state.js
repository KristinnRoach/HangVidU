// src/app/state.js - Single source of truth

const appState = {
  // Cross-feature state that needs coordination
  room: {
    id: null,
    role: null, // 'initiator' | 'joiner' | null
    partnerOnline: false,
  },
};

// Simple observer pattern
const listeners = [];
export function onChange(callback) {
  listeners.push(callback);
}

export function updateState(updates) {
  Object.keys(updates).forEach((key) => {
    if (
      typeof updates[key] === 'object' &&
      updates[key] !== null &&
      !Array.isArray(updates[key])
    ) {
      appState[key] = { ...appState[key], ...updates[key] };
    } else {
      appState[key] = updates[key];
    }
  });
  listeners.forEach((fn) => fn(appState));
}

export function getState() {
  return appState;
}
