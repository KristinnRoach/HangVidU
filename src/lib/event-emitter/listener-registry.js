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
        signal.removeEventListener('abort', onAbort);
      };
      signal.addEventListener('abort', onAbort, { once: true });
    }

    return () => {
      if (signal && onAbort) {
        signal.removeEventListener('abort', onAbort);
      }
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
      this._listeners.delete(event);
      return;
    }
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
}
