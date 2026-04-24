import { initIcons } from '../shared/components/ui/icons.js';
import { initUI } from '../shared/components/ui/core/init-ui.js';
import { initI18n, onLocaleChange } from '../shared/i18n/index.js';
import {
  updateI18nElements,
  initializeElements,
} from '../elements.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup unsubscribes locale hydration listener
 *
 * Run remaining legacy UI/i18n initialization after Solid has rendered the app shell.
 *
 * @returns {Promise<() => void>}
 */
export function setupInitPreflight() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    initializeElements();
    initUI();
    initIcons();

    await initI18n();

    // Hydrate i18n attributes in index.html and re-hydrate on locale change
    updateI18nElements();
    const unsubscribeLocaleChange = onLocaleChange(() => updateI18nElements());

    cleanup = () => {
      try {
        unsubscribeLocaleChange?.();
      } catch (error) {
        console.warn(
          '[setupInitPreflight] cleanup failed to unsubscribe locale listener:',
          error,
        );
      } finally {
        isReady = false;
      }
    };
    isReady = true;
    return cleanup;
  })().finally(() => {
    initPromise = null;
  });

  return initPromise;
}
