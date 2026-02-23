/**
 * EventEmitter - A lightweight, framework-agnostic event emitter.
 * Provides a simple on/off/emit/once pattern for domain-driven events.
 */
export class EventEmitter {
  constructor() {
    this._listeners = new Map();
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {Function} callback - Function to call when event is emitted
   * @param {Object} [options] - Optional settings
   * @param {AbortSignal} [options.signal] - AbortSignal to auto-unsubscribe listener
   * @returns {Function} Unsubscribe function
   */
  on(event, callback, options = {}) {
    const { signal } = options;

    // If the signal is already aborted, do not subscribe.
    if (signal && signal.aborted) {
      return () => {};
    }

    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event).add(callback);

    let onAbort;
    if (signal) {
      onAbort = () => {
        this.off(event, callback);
        signal.removeEventListener('abort', onAbort);
      };
      signal.addEventListener('abort', onAbort, { once: true });
    }

    return () => {
      if (signal && onAbort) signal.removeEventListener('abort', onAbort);
      this.off(event, callback);
    };
  }

  /**
   * Subscribe to an event once
   * @param {string} event - Event name
   * @param {Function} callback - Function to call once
   * @returns {Function} Unsubscribe function
   */
  once(event, callback, options = {}) {
    const wrapper = (data) => {
      this.off(event, wrapper);
      callback(data);
    };
    return this.on(event, wrapper, options);
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name
   * @param {Function} callback - Callback function to remove
   */
  off(event, callback) {
    if (this._listeners.has(event)) {
      this._listeners.get(event).delete(callback);
      if (this._listeners.get(event).size === 0) {
        this._listeners.delete(event);
      }
    }
  }

  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {any} data - Data to pass to listeners
   */
  emit(event, data) {
    if (this._listeners.has(event)) {
      // Create a copy to avoid issues if listeners are removed during emission
      const handlers = Array.from(this._listeners.get(event));
      handlers.forEach((cb) => {
        try {
          cb(data);
        } catch (err) {
          console.error(`EventEmitter: Error in listener for ${event}`, err);
        }
      });
    }
  }

  /**
   * Remove all listeners
   */
  removeAllListeners() {
    this._listeners.clear();
  }
}
