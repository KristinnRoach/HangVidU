import { EventEmitter } from '../events/event-emitter.js';

/**
 * AuthBus - module-local event bus for auth intents.
 *
 * UI-owned auth requests flow through this bus before they are translated into
 * auth actions. Auth lifecycle facts are published directly to the shared
 * events layer from auth-state.
 */
export const authBus = new EventEmitter();
