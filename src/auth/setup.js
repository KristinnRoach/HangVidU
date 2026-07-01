// src/auth/setup.js — app-level auth setup: logout housekeeping + kick off auth.
//
// This registers auth-level side effects and then calls `initAuth()` LAST, so
// the first auth lifecycle events are observed by all feature subscribers that
// main.tsx registered before this setup. It is app wiring, not the auth module
// surface (that's `src/auth/index.js`).

import { subscribe } from '../shared/events/index.js';
import { initAuth } from './index.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

const LOCAL_STORAGE_KEYS_TO_PRESERVE_ON_LOGOUT = ['locale'];
const LOCAL_STORAGE_PREFIXES_TO_PRESERVE_ON_LOGOUT = ['debug:']; // 'referral'

/**
 * Clear user-scoped local storage while preserving app-wide keys.
 *
 * @returns {void}
 */
function clearLocalStorageOnLogout() {
  try {
    const storage = globalThis.localStorage;
    if (!storage) {
      return;
    }

    const preservedEntries = [];

    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);

      if (
        key &&
        (LOCAL_STORAGE_KEYS_TO_PRESERVE_ON_LOGOUT.includes(key) ||
          LOCAL_STORAGE_PREFIXES_TO_PRESERVE_ON_LOGOUT.some((prefix) =>
            key.startsWith(prefix),
          ))
      ) {
        preservedEntries.push([key, storage.getItem(key)]);
      }
    }

    // NOTE: wipes the guest-mode 'contacts' key as a side effect — intentional.
    storage.clear();

    preservedEntries.forEach(([key, value]) => {
      if (value !== null) {
        storage.setItem(key, value);
      }
    });
  } catch (error) {
    console.warn('[auth] Failed to clear localStorage on logout:', error);
  }
}

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts the logout subscription and resets readiness
 *
 * MUST be wired after other auth-touching setups in `main.tsx` so `initAuth()`
 * fires its initial lifecycle events only once every subscriber is registered.
 */
export function setup() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const ac = new AbortController();

    subscribe('evt:auth:session:logged-out', clearLocalStorageOnLogout, {
      signal: ac.signal,
    });

    // initAuth() LAST: subscribers (this one + feature setups) are now registered.
    await initAuth();

    cleanup = () => {
      ac.abort();
      isReady = false;
    };
    isReady = true;
    return cleanup;
  })().finally(() => {
    initPromise = null;
  });

  return initPromise;
}
