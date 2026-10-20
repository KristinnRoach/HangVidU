export {
  getAppReloadAllowed,
  holdAppReload,
  whenAppReloadAllowed,
} from './app-reload-state.js';

// Seam for tests: jsdom's location.reload can't be stubbed.
export function reloadApp() {
  window.location.reload();
}
