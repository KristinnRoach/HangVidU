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
 * @param {(signal: AbortSignal) => void} options.register - registers
 *   handlers/subscriptions against the provided abort signal.
 * @returns {() => Promise<() => void>} the memoized setup function.
 */
export function createSingleFlightSetup(options) {
  if (!options || typeof options !== 'object') {
    throw new TypeError('createSingleFlightSetup: options must be an object');
  }

  const { label, register } = options;

  if (typeof label !== 'string' || label.trim() === '') {
    throw new TypeError(
      'createSingleFlightSetup: label must be a non-empty string',
    );
  }
  if (typeof register !== 'function') {
    throw new TypeError('createSingleFlightSetup: register must be a function');
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
      .then(() => {
        const ac = new AbortController();

        register(ac.signal);

        cleanup = () => {
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
