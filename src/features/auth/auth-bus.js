import { EventEmitter } from '../../app/event-emitter.js';

export const AUTH_EVENTS = {
  READY: 'auth:ready',
  LOGGED_IN: 'auth:logged-in',
  LOGGED_OUT: 'auth:logged-out',
};

/**
 * AuthBus - module-local event bus for auth lifecycle events.
 *
 * The auth module emits stable auth facts here first. Cross-module forwarding
 * is handled by an explicit bridge so auth code stays unaware of app-level
 * compatibility contracts.
 */
export const authBus = new EventEmitter();
