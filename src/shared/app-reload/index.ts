export {
  getAppReloadAllowed,
  holdAppReload,
  whenAppReloadAllowed,
} from './app-reload-state.js';

/** Set just before a PWA update reload; initSentry reads it to tag that load. */
export const UPDATE_RELOAD_KEY = 'pwa-update-reload';

// Seam for tests: jsdom's location.reload can't be stubbed.
export function reloadApp() {
  window.location.reload();
}
