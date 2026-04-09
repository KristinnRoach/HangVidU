/**
 * @typedef {Object} ListenerOptions
 * @property {AbortSignal} [signal] AbortSignal that auto-unsubscribes listener on abort.
 */

/**
 * Stores and manages event listeners.
 */
export class ListenerRegistry {
  constructor() {
    /** @type {Map<string | symbol, Set<Function>>} */
    this._listeners = new Map();
    /** @type {Map<string | symbol, Map<Function, { signal: AbortSignal, onAbort: Function }>>} */
    this._abortHandlers = new Map();
  }

  /**
   * Register a listener for an event.
   * @param {string | symbol} event Event name/key.
   * @param {Function} callback Listener function.
   * @param {ListenerOptions} [options]
   * @returns {Function} Unsubscribe function.
   */
  on(event, callback, options = {}) {
    const { signal } = options;

    if (typeof callback !== 'function') {
      throw new TypeError('ListenerRegistry.on: callback must be a function');
    }

    if (signal?.aborted) {
      return () => {};
    }

    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }

    const listeners = this._listeners.get(event);
    listeners.add(callback);

    let onAbort;
    if (signal) {
      onAbort = () => {
        this.off(event, callback);
      };
      this._trackAbortHandler(event, callback, signal, onAbort);
      signal.addEventListener('abort', onAbort, { once: true });
    }

    return () => {
      this.off(event, callback);
    };
  }

  /**
   * Register a listener that runs only once.
   * @param {string | symbol} event Event name/key.
   * @param {Function} callback Listener function.
   * @param {ListenerOptions} [options]
   * @returns {Function} Unsubscribe function.
   */
  once(event, callback, options = {}) {
    if (typeof callback !== 'function') {
      throw new TypeError('ListenerRegistry.once: callback must be a function');
    }

    let unsubscribe = () => {};

    const wrapper = (data) => {
      unsubscribe();
      callback(data);
    };

    unsubscribe = this.on(event, wrapper, options);
    return unsubscribe;
  }

  /**
   * Remove one listener for an event.
   * @param {string | symbol} event Event name/key.
   * @param {Function} callback Listener function to remove.
   */
  off(event, callback) {
    this._detachAbortHandler(event, callback);

    const listeners = this._listeners.get(event);
    if (!listeners) return;

    listeners.delete(callback);
    if (listeners.size === 0) {
      this._listeners.delete(event);
    }
  }

  /**
   * Return a stable snapshot of listeners for safe iteration.
   * @param {string | symbol} event Event name/key.
   * @returns {Function[]} Listener array (never the live Set).
   */
  getListeners(event) {
    const listeners = this._listeners.get(event);
    return listeners ? Array.from(listeners) : [];
  }

  /**
   * Remove listeners for one event, or all events when called without args.
   * @param {string | symbol} [event] Event name/key to clear.
   */
  removeAllListeners(event) {
    if (arguments.length === 1) {
      this._detachAbortHandlersForEvent(event);
      this._listeners.delete(event);
      return;
    }

    this._detachAllAbortHandlers();
    this._listeners.clear();
  }

  /**
   * Count listeners for one event.
   * @param {string | symbol} event Event name/key.
   * @returns {number}
   */
  listenerCount(event) {
    return this._listeners.get(event)?.size ?? 0;
  }

  /**
   * Track AbortSignal listener for later cleanup via off/removeAllListeners.
   * @param {string | symbol} event
   * @param {Function} callback
   * @param {AbortSignal} signal
   * @param {Function} onAbort
   */
  _trackAbortHandler(event, callback, signal, onAbort) {
    if (!this._abortHandlers.has(event)) {
      this._abortHandlers.set(event, new Map());
    }
    const handlersForEvent = this._abortHandlers.get(event);
    const existing = handlersForEvent.get(callback);
    if (existing) {
      existing.signal.removeEventListener('abort', existing.onAbort);
    }
    handlersForEvent.set(callback, { signal, onAbort });
  }

  /**
   * Detach one tracked AbortSignal listener.
   * @param {string | symbol} event
   * @param {Function} callback
   */
  _detachAbortHandler(event, callback) {
    const handlersForEvent = this._abortHandlers.get(event);
    if (!handlersForEvent) return;

    const tracked = handlersForEvent.get(callback);
    if (!tracked) return;

    tracked.signal.removeEventListener('abort', tracked.onAbort);
    handlersForEvent.delete(callback);

    if (handlersForEvent.size === 0) {
      this._abortHandlers.delete(event);
    }
  }

  /**
   * Detach all tracked AbortSignal listeners for a specific event.
   * @param {string | symbol} event
   */
  _detachAbortHandlersForEvent(event) {
    const handlersForEvent = this._abortHandlers.get(event);
    if (!handlersForEvent) return;

    for (const tracked of handlersForEvent.values()) {
      tracked.signal.removeEventListener('abort', tracked.onAbort);
    }
    this._abortHandlers.delete(event);
  }

  /**
   * Detach all tracked AbortSignal listeners across all events.
   */
  _detachAllAbortHandlers() {
    for (const handlersForEvent of this._abortHandlers.values()) {
      for (const tracked of handlersForEvent.values()) {
        tracked.signal.removeEventListener('abort', tracked.onAbort);
      }
    }
    this._abortHandlers.clear();
  }
}
