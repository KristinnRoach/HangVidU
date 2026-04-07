import { initIcons } from '../components/ui/icons.js';
import { initUI } from '../components/ui/core/init-ui.js';
import { initI18n, onLocaleChange } from '../i18n/index.js';
import { updateI18nElements, getElements } from '../elements.js';
import { devDebug } from '../utils/dev/dev-utils.js';

let unsubscribeLocaleChange = null;

/**
 * Run minimal UI/i18n preflight before app feature setup.
 *
 * @returns {Promise<boolean>} false when critical UI elements are missing
 */
export async function setupInitPreflight() {
  initUI();
  initIcons();

  await initI18n();

  // Hydrate i18n attributes in index.html and re-hydrate on locale change
  updateI18nElements();
  unsubscribeLocaleChange?.();
  unsubscribeLocaleChange = onLocaleChange(() => updateI18nElements());

  // Validate critical elements first
  const elements = getElements();
  const criticalElements = [
    'localVideoEl',
    'remoteVideoEl',
    'localBoxEl',
    'remoteBoxEl',
    'chatControls',
    'lobbyDiv',
    'titleAuthBar',
  ];

  const missingCritical = criticalElements.filter((name) => !elements[name]);
  if (missingCritical.length > 0) {
    console.error('Critical elements missing:', missingCritical);
    devDebug('Error: Required UI elements not found.');
    return false;
  }

  return true;
}
