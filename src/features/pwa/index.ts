import { createSingleFlightSetup } from '../../shared/utils/create-single-flight-setup.js';
import { setupUpdateHandler, stopUpdateChecks } from './update-handlers.js';

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: stops periodic and visibility-based SW update checks
 *
 * Registers the PWA service-worker update handler so the app auto-applies
 * new versions (startup check, onNeedRefresh, visibility check, 30-min poll).
 * No-op when VITE_ENABLE_PWA === '0'.
 */
export const setup = createSingleFlightSetup({
  label: '[pwa]',
  start: setupUpdateHandler,
  stop: stopUpdateChecks,
});
