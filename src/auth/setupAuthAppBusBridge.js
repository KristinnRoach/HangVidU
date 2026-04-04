import { publishAndAwait } from '../events/index.js';
import { AUTH_EVENTS, authBus } from './auth-bus.js';

let cleanupAuthAppBusBridge = null;

/**
 * Forward selected auth-domain events to shared published facts.
 *
 * This bridge decides which auth lifecycle facts the app should react to
 * without forcing auth-state to know about app-level event names.
 */
export function setupAuthAppBusBridge() {
  if (cleanupAuthAppBusBridge) {
    return cleanupAuthAppBusBridge;
  }

  const ac = new AbortController();

  authBus.on(
    AUTH_EVENTS.READY,
    async ({ state }) => {
      await publishAndAwait('auth:ready', { state });
    },
    { signal: ac.signal },
  );

  authBus.on(
    AUTH_EVENTS.LOGGED_IN,
    async ({ state, previousState, isInitialResolution }) => {
      await publishAndAwait('auth:login', {
        state,
        previousState,
        isInitialResolution,
      });
    },
    { signal: ac.signal },
  );

  authBus.on(
    AUTH_EVENTS.LOGGED_OUT,
    async ({ state, previousState, isInitialResolution }) => {
      await publishAndAwait('auth:logout', {
        state,
        previousState,
        isInitialResolution,
      });
    },
    { signal: ac.signal },
  );

  const cleanup = () => {
    ac.abort();
    if (cleanupAuthAppBusBridge === cleanup) {
      cleanupAuthAppBusBridge = null;
    }
  };

  cleanupAuthAppBusBridge = cleanup;
  return cleanup;
}
