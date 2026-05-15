// src/auth/auth-state.js — pure auth state, no Firebase imports

import { getOrCreateGuestId } from './guest-user.js';
import { publish, publishAndAwait } from '../shared/events/index.js';

let state = {
  status: 'idle', // 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
  // 'idle' = before initAuth() completes
  // 'loading' = auth operation in flight (sign-in/out/delete)
  // 'authenticated' | 'unauthenticated' = stable login state
  user: null, // { uid, userName, email, photoURL } | null
  isLoggedIn: false,
};

const listeners = new Set();
let hasResolvedReady = false;
let emitChain = Promise.resolve();

/**
 * Build the public auth snapshot without leaking private object references.
 *
 * @returns {{ status: string, user: { uid: string, userName: string | null, email: string | null, photoURL: string | null } | null, isLoggedIn: boolean }}
 */
const snapshot = () => ({
  ...state,
  user: state.user ? { ...state.user } : null,
});

/**
 * Update auth state and notify subscribers.
 * Called by auth.js when Firebase auth state changes — not part of the public API.
 *
 * @param {Partial<typeof state>} next
 * @returns {void}
 */
export function setState(next) {
  const previousSnapshot = snapshot();
  const wasReadyResolved = hasResolvedReady;

  state = { ...state, ...next };
  const snap = snapshot();
  for (const fn of listeners) {
    try {
      fn(snap);
    } catch (e) {
      console.error('[auth-state] subscriber error:', e);
    }
  }

  // Canonical state-change event (STATE_RULES.md pattern).
  // Fire-and-forget: does not participate in the ordered emit chain below.
  publish('evt:auth:state:changed', { state: snap, prev: previousSnapshot });

  // Build ordered list of auth events to emit.
  // Order matters: READY must complete before LOGGED_IN/LOGGED_OUT.
  const events = [];

  const isStableStatus =
    snap.status === 'authenticated' || snap.status === 'unauthenticated';

  if (isStableStatus && !hasResolvedReady) {
    hasResolvedReady = true;
    events.push(['evt:auth:session:ready', { state: snap }]);
  }

  if (!previousSnapshot.isLoggedIn && snap.isLoggedIn) {
    events.push([
      'evt:auth:session:logged-in',
      {
        state: snap,
        previousState: previousSnapshot,
        isInitialResolution: !wasReadyResolved,
      },
    ]);
  }

  if (previousSnapshot.isLoggedIn && !snap.isLoggedIn) {
    events.push([
      'evt:auth:session:logged-out',
      {
        state: snap,
        previousState: previousSnapshot,
        isInitialResolution: false,
      },
    ]);
  }

  if (events.length > 0) {
    emitChain = emitChain
      .then(async () => {
        for (const [eventName, payload] of events) {
          await publishAndAwait(eventName, payload);
        }
      })
      .catch((error) => {
        console.error('[auth-state] failed to emit auth events', error);
      });
  }
}

// --- Public accessors ---

/**
 * Return the current auth snapshot.
 *
 * @returns {ReturnType<typeof snapshot>}
 */
export function getAuthState() {
  return snapshot();
}

/** @returns {boolean} */
export function getIsLoggedIn() {
  return state.isLoggedIn;
}

/**
 * Get a defensive copy of the current authenticated user.
 *
 * @returns {{ uid: string, userName: string | null, email: string | null, photoURL: string | null } | null}
 */
export function getUser() {
  return state.user ? { ...state.user } : null;
}

/**
 * Returns the authenticated user's UID, or a persistent guest ID as fallback.
 *
 * @returns {string}
 */
export function getUserId() {
  return state.user?.uid ?? getOrCreateGuestId();
}

/**
 * Returns the authenticated user's UID, or null if not logged in.
 *
 * @returns {string|null}
 */
export function getLoggedInUserId() {
  return state.user?.uid ?? null;
}

/** @returns {string|null} */
export function getUserName() {
  return state.user?.userName ?? null;
}

// --- Subscribe to state changes ---

/**
 * Subscribe to auth state changes. Called with the full state object.
 * Returns an unsubscribe function.
 *
 * @param {(state: ReturnType<typeof snapshot>) => void} fn
 * @returns {() => boolean}
 */
export function onAuthStateChanged(fn) {
  listeners.add(fn);

  // Call the subscriber immediately with the current state
  try {
    fn(snapshot());
  } catch (e) {
    console.error('[auth-state] subscriber error:', e);
  }

  return () => listeners.delete(fn);
}

/**
 * Resolve when auth state has reached a stable value
 * ('authenticated' or 'unauthenticated').
 * Useful for flows that must wait for the first auth resolution.
 *
 * @returns {Promise<ReturnType<typeof snapshot>>}
 */
export function waitForAuthReady() {
  if (state.status === 'authenticated' || state.status === 'unauthenticated') {
    return Promise.resolve(snapshot());
  }

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged((current) => {
      if (
        current.status !== 'authenticated' &&
        current.status !== 'unauthenticated'
      ) {
        return;
      }
      unsubscribe();
      resolve(current);
    });
  });
}
