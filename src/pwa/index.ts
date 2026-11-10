import { createSingleFlightSetup } from '@shared/utils/create-single-flight-setup.js';
import { reloadAfterPreloadError } from './reload-page.js';
import { setupUpdateHandler, stopUpdateChecks } from './update-handlers.js';

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: stops periodic and visibility-based SW update checks
 *
 * Registers the PWA service-worker update handler so the app auto-applies
 * new versions (startup check, onNeedRefresh, visibility check, 30-min poll).
 * The update handler is a no-op when VITE_ENABLE_PWA === '0'.
 *
 * Also reloads once when a dynamic import fails, so a client still running a
 * build whose chunks a newer deploy removed recovers.
 */
export const setup = createSingleFlightSetup({
  label: '[pwa]',
  register: (signal) => {
    window.addEventListener(
      'vite:preloadError',
      () => void reloadAfterPreloadError(),
      { signal },
    );
  },
  start: setupUpdateHandler,
  stop: stopUpdateChecks,
});
