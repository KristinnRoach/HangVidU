// src/auth/auth-state.js — pure auth state, no Firebase imports

import { getOrCreateGuestId } from './guest-user.js';

let state = {
  status: 'idle', // 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
  user: null, // { uid, displayName, email, photoURL } | null
  isLoggedIn: false,
};

const listeners = new Set();

/**
 * Update auth state and notify subscribers.
 * Called by auth.js when Firebase auth state changes — not part of the public API.
 */
export function setState(next) {
  state = { ...state, ...next };
  for (const fn of listeners) {
    try {
      fn(state);
    } catch (e) {
      console.error('[auth-state] subscriber error:', e);
    }
  }
}

// --- Public accessors ---

export function getAuthState() {
  return { ...state };
}

export function getIsLoggedIn() {
  return state.isLoggedIn;
}

export function getUser() {
  return state.user ? { ...state.user } : null;
}

/**
 * Returns the authenticated user's UID, or a persistent guest ID as fallback.
 */
export function getUserId() {
  return state.user?.uid ?? getOrCreateGuestId();
}

/**
 * Returns the authenticated user's UID, or null if not logged in.
 */
export function getLoggedInUserId() {
  return state.user?.uid ?? null;
}

export function getUserName() {
  return state.user?.displayName ?? null;
}

// --- Subscribe to state changes ---

/**
 * Subscribe to auth state changes. Called with the full state object.
 * Returns an unsubscribe function.
 */
export function subscribe(fn) {
  listeners.add(fn);

  // Call the subscriber immediately with the current state
  try {
    fn(state);
  } catch (e) {
    console.error('[auth-state] subscriber error:', e);
  }

  return () => listeners.delete(fn);
}
