export {
  getAppReloadAllowed,
  holdAppReload,
  whenAppReloadAllowed,
} from './app-reload-state.js';

/** Set just before an app reload; initSentry consumes it to tag that load. */
export const PAGE_RELOAD_REASON_KEY = 'pwa-reload-reason';

// Seam for tests: jsdom's location.reload can't be stubbed.
export function reloadApp() {
  window.location.reload();
}
