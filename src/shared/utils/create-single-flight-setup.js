/**
 * Builds a memoized `setup()` with a single-flight init lifecycle and
 * AbortController-based teardown. Concurrent callers share one init; the
 * resolved cleanup is reused on subsequent calls and tears down by aborting.
 *
 * Setup contract:
 * - idempotent: returns the existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts registered handlers via the AbortController
 *
 * @param {object} options
 * @param {string} options.label - log prefix used in teardown warnings,
 *   e.g. `[presence]`.
 * @param {(signal: AbortSignal) => void} [options.register] - registers
 *   handlers/subscriptions against the provided abort signal.
 * @param {(signal: AbortSignal) => (void|Promise<void>)} [options.start] - runs
 *   setup work before the setup is marked ready.
 * @param {() => void} [options.stop] - runs extra teardown work
 *   before aborting registered handlers.
 * @returns {() => Promise<() => void>} the memoized setup function.
 */
export function createSingleFlightSetup(options) {
  if (!options || typeof options !== 'object') {
    throw new TypeError('createSingleFlightSetup: options must be an object');
  }

  const { label, register } = options;
  const start = options.start ?? (() => {});
  const stop = options.stop ?? (() => {});

  if (typeof label !== 'string' || label.trim() === '') {
    throw new TypeError(
      'createSingleFlightSetup: label must be a non-empty string',
    );
  }
  if (register !== undefined && typeof register !== 'function') {
    throw new TypeError('createSingleFlightSetup: register must be a function');
  }
  if (typeof start !== 'function') {
    throw new TypeError('createSingleFlightSetup: start must be a function');
  }
  if (typeof stop !== 'function') {
    throw new TypeError('createSingleFlightSetup: stop must be a function');
  }

  let isReady = false;
  let initPromise = null;
  let cleanup = () => {
    isReady = false;
  };

  return function setup() {
    if (isReady) {
      return Promise.resolve(cleanup);
    }
    if (initPromise) {
      return initPromise;
    }

    initPromise = Promise.resolve()
      .then(async () => {
        const ac = new AbortController();

        try {
          register?.(ac.signal);
          await start(ac.signal);
        } catch (error) {
          ac.abort();
          throw error;
        }

        cleanup = () => {
          try {
            stop();
          } catch (error) {
            console.warn(`${label} cleanup failed:`, error);
          }
          ac.abort();
          isReady = false;
        };
        isReady = true;
        return cleanup;
      })
      .finally(() => {
        initPromise = null;
      });

    return initPromise;
  };
}
