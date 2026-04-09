/**
 * @typedef {'emit' | 'emitAsync'} EmitPhase
 */

/**
 * @typedef {Object} ListenerErrorContext
 * @property {string | symbol} eventName Event key being emitted.
 * @property {unknown} error Error thrown/rejected by a listener.
 * @property {EmitPhase} phase Emission phase where failure occurred.
 */

/**
 * @typedef {Object} EmitterOptions
 * @property {(context: ListenerErrorContext) => void} [onListenerError] Optional error hook.
 */

/**
 * @typedef {Object} EmitAsyncOptions
 * @property {boolean} [throwOnError=false] Throw AggregateError when any listener fails.
 * @property {boolean} [returnSettled=false] Return Promise.allSettled-style results.
 */

/**
 * Emits events to listeners returned by a registry.
 */
export class Emitter {
  /**
   * @param {{ getListeners: (event: string | symbol) => Function[] }} registry Listener source.
   * @param {EmitterOptions} [options]
   */
  constructor(registry, options = {}) {
    if (!registry || typeof registry.getListeners !== 'function') {
      throw new TypeError(
        'Emitter: registry must expose getListeners(event): Function[]',
      );
    }

    const { onListenerError } = options;
    if (onListenerError && typeof onListenerError !== 'function') {
      throw new TypeError('Emitter: onListenerError must be a function');
    }

    this._registry = registry;
    this._onListenerError = onListenerError;
  }

  /**
   * @param {unknown} value
   * @returns {value is PromiseLike<unknown>}
   */
  _isPromiseLike(value) {
    return !!value && typeof value.then === 'function';
  }

  /**
   * Report listener errors via injected hook or console fallback.
   * @param {string | symbol} eventName
   * @param {unknown} error
   * @param {EmitPhase} phase
   */
  _reportListenerError(eventName, error, phase) {
    if (this._onListenerError) {
      this._onListenerError({ eventName, error, phase });
      return;
    }

    if (phase === 'emit') {
      console.error(`EventEmitter: Error in listener for "${String(eventName)}"`, error);
      return;
    }
    console.error(`EventEmitter: Async error in "${String(eventName)}"`, error);
  }

  /**
   * Fire-and-forget emit. Async listener rejections are caught and reported.
   * @param {string | symbol} eventName Event key.
   * @param {any} data Payload passed to listeners.
   */
  emit(eventName, data) {
    const handlers = this._registry.getListeners(eventName);

    handlers.forEach((cb) => {
      try {
        const result = cb(data);
        if (this._isPromiseLike(result)) {
          Promise.resolve(result).catch((err) => {
            this._reportListenerError(eventName, err, 'emit');
          });
        }
      } catch (err) {
        this._reportListenerError(eventName, err, 'emit');
      }
    });
  }

  /**
   * Emit and await listeners concurrently.
   * @param {string | symbol} eventName Event key.
   * @param {any} data Payload passed to listeners.
   * @param {EmitAsyncOptions} [options]
   * @returns {Promise<void | PromiseSettledResult<unknown>[]>}
   */
  async emitAsync(eventName, data, options = {}) {
    const { throwOnError = false, returnSettled = false } = options;
    const handlers = this._registry.getListeners(eventName);

    if (handlers.length === 0) {
      return returnSettled ? [] : undefined;
    }

    const results = await Promise.allSettled(
      handlers.map((cb) => {
        try {
          return cb(data);
        } catch (err) {
          return Promise.reject(err);
        }
      }),
    );

    const errors = [];
    for (const result of results) {
      if (result.status === 'rejected') {
        errors.push(result.reason);
        this._reportListenerError(eventName, result.reason, 'emitAsync');
      }
    }

    if (throwOnError && errors.length > 0) {
      throw new AggregateError(
        errors,
        `Emitter.emitAsync("${String(eventName)}") failed in ${errors.length} listener(s)`,
      );
    }

    return returnSettled ? results : undefined;
  }

  /**
   * Emit a list of events sequentially.
   * @param {Array<[string | symbol, any]>} events Array of [eventName, payload].
   * @param {EmitAsyncOptions} [options]
   * @returns {Promise<void | Array<[string | symbol, PromiseSettledResult<unknown>[] | undefined]>>}
   */
  async emitAsyncSequential(events, options = {}) {
    const { returnSettled = false } = options;
    const settledByEvent = [];

    for (const [eventName, data] of events) {
      const settled = await this.emitAsync(eventName, data, options);
      if (returnSettled) {
        settledByEvent.push([eventName, settled]);
      }
    }

    return returnSettled ? settledByEvent : undefined;
  }
}
