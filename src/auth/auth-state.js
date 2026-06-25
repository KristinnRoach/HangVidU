// src/auth/auth-state.js — pure auth state, no Firebase imports

import { publish, publishAndAwait, subscribe } from '../shared/events/index.js';

let state = {
  status: 'uninitialized', // 'uninitialized' | 'loading' | 'authenticated' | 'unauthenticated'
  // 'uninitialized' = auth not yet determined (pre first resolution); not ready
  // 'loading' = auth operation in flight (sign-in/out/delete)
  // 'authenticated' | 'unauthenticated' = stable login state
  user: null, // { uid, displayName, email, photoURL } | null
  isLoggedIn: false,
};

let hasResolvedReady = false;
let emitChain = Promise.resolve();

/**
 * Build the public auth snapshot without leaking private object references.
 *
 * @returns {{ status: string, user: { uid: string, displayName: string | null, email: string | null, photoURL: string | null } | null, isLoggedIn: boolean }}
 */
const snapshot = () => ({
  ...state,
  user: state.user ? { ...state.user } : null,
});

/**
 * Convert an auth snapshot into a stable post-initialization state.
 * Use this when an auth operation fails and the UI should leave loading.
 *
 * @param {ReturnType<typeof snapshot>} authSnapshot
 * @returns {Partial<typeof state>}
 */
export function toStableAuthState(authSnapshot = snapshot()) {
  if (authSnapshot?.isLoggedIn) {
    return {
      status: 'authenticated',
      isLoggedIn: true,
      user: authSnapshot.user ? { ...authSnapshot.user } : null,
    };
  }

  return { status: 'unauthenticated', isLoggedIn: false, user: null };
}

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

  let patch = next;
  if (patch?.status === 'uninitialized' && state.status !== 'uninitialized') {
    console.warn(
      '[auth-state] Ignoring reset to uninitialized after auth initialization',
    );
    patch = toStableAuthState(state);
  }

  state = { ...state, ...patch };
  const snap = snapshot();
  import.meta.env.DEV && console.info('[AUTH] setState', snap);

  // Canonical state-change event (STATE_RULES.md pattern) and the single
  // notification channel for auth state. Fire-and-forget: does not participate
  // in the ordered emit chain below.
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
 * @returns {{ uid: string, displayName: string | null, email: string | null, photoURL: string | null } | null}
 */
export function getUser() {
  return state.user ? { ...state.user } : null;
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
  return state.user?.displayName ?? null;
}

// --- Wait for first stable resolution ---

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
    // No await between this check and subscribe, and `publish` is synchronous,
    // so there is no window to miss the resolving state change.
    const unsubscribe = subscribe('evt:auth:state:changed', ({ state: next }) => {
      if (next.status !== 'authenticated' && next.status !== 'unauthenticated') {
        return;
      }
      unsubscribe();
      resolve(next);
    });
  });
}
