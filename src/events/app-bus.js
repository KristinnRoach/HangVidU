import { EventEmitter } from './event-emitter.js';

/**
 * AppBus — shared cross-module event bus.
 *
 * Dispatch: emit() for fire-and-forget, emitAsync() to await listener completion.
 * Subscribe: on() for all listeners (sync or async).
 */
export const appBus = new EventEmitter();
