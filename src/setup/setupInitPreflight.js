import { initIcons } from '../shared/components/ui/icons.js';
import { initUI } from '../shared/components/ui/core/init-ui.js';
import { initI18n, onLocaleChange } from '../shared/i18n/index.js';
import { updateI18nElements, getElements } from '../elements.js';
import { devDebug } from '../shared/utils/dev/dev-utils.js';

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

const DEFAULT_CRITICAL_ELEMENTS = [
  'localVideoEl',
  'remoteVideoEl',
  'localBoxEl',
  'remoteBoxEl',
  'chatControls',
  'lobbyDiv',
];

const DEFAULT_INTERACTIVE_ELEMENTS = ['callBtn', 'hangUpBtn'];

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup unsubscribes locale hydration listener
 *
 * Run minimal UI/i18n preflight before app feature setup.
 *
 * @param {{ criticalElements?: string[], interactiveElements?: string[] }} [options]
 * @returns {Promise<() => void>}
 */
export function setupInitPreflight(options = {}) {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const criticalElements =
      options.criticalElements ?? DEFAULT_CRITICAL_ELEMENTS;
    const interactiveElements =
      options.interactiveElements ?? DEFAULT_INTERACTIVE_ELEMENTS;

    // Validate critical elements first
    const elements = getElements();
    const missingCritical = criticalElements.filter((name) => !elements[name]);
    if (missingCritical.length > 0) {
      console.error('Critical elements missing:', missingCritical);
      devDebug('Error: Required UI elements not found.');
      throw new Error('setupInitPreflight failed: required UI missing');
    }

    const missingInteractive = interactiveElements.filter(
      (name) => !elements[name],
    );
    if (missingInteractive.length > 0) {
      console.warn(
        'Optional interactive controls missing:',
        missingInteractive,
      );
    }

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
