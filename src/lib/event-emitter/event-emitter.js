import { ListenerRegistry } from './listener-registry.js';
import { Emitter } from './emitter.js';

/**
 * Compatibility facade composed from ListenerRegistry + Emitter primitives.
 */
export class EventEmitter {
  /**
   * @param {import('./emitter.js').EmitterOptions} [options]
   */
  constructor(options = {}) {
    this._registry = new ListenerRegistry();
    this._emitter = new Emitter(this._registry, options);
  }

  /**
   * @param {string | symbol} event
   * @param {Function} callback
   * @param {import('./listener-registry.js').ListenerOptions} [options]
   * @returns {Function}
   */
  on(event, callback, options = {}) {
    return this._registry.on(event, callback, options);
  }

  /**
   * @param {string | symbol} event
   * @param {Function} callback
   * @param {import('./listener-registry.js').ListenerOptions} [options]
   * @returns {Function}
   */
  once(event, callback, options = {}) {
    return this._registry.once(event, callback, options);
  }

  /**
   * @param {string | symbol} event
   * @param {Function} callback
   */
  off(event, callback) {
    this._registry.off(event, callback);
  }

  /**
   * @param {string | symbol} eventName
   * @param {any} data
   */
  emit(eventName, data) {
    this._emitter.emit(eventName, data);
  }

  /**
   * @param {string | symbol} eventName
   * @param {any} data
   * @param {import('./emitter.js').EmitAsyncOptions} [options]
   */
  emitAsync(eventName, data, options = {}) {
    return this._emitter.emitAsync(eventName, data, options);
  }

  /**
   * @param {Array<[string | symbol, any]>} events
   * @param {import('./emitter.js').EmitAsyncOptions} [options]
   */
  emitAsyncSequential(events, options = {}) {
    return this._emitter.emitAsyncSequential(events, options);
  }

  /**
   * @param {string | symbol} [event]
   */
  removeAllListeners(event) {
    if (arguments.length === 0) {
      this._registry.removeAllListeners();
      return;
    }
    this._registry.removeAllListeners(event);
  }

  /**
   * @param {string | symbol} event
   * @returns {number}
   */
  listenerCount(event) {
    return this._registry.listenerCount(event);
  }
}
