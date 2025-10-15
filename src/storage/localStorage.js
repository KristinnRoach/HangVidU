// src/storage/localStorage.js

const STORAGE_KEY = 'hangvidu_session';
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function saveState(state) {
  const stateWithTimestamp = {
    ...state,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stateWithTimestamp));
}

export function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const state = JSON.parse(stored);

    // Check if expired
    if (Date.now() - state.timestamp > SESSION_EXPIRY) {
      clearState();
      return null;
    }

    return state;
  } catch (e) {
    console.error('Failed to parse stored state:', e);
    clearState();
    return null;
  }
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}
