import { onCleanup, onMount } from 'solid-js';

import { updateI18nElements, onLocaleChange } from '../shared/i18n/index.js';
import { handleServiceWorkerNavigation } from '../setup/handleServiceWorkerNavigation.js';
import { setupServiceWorkerNavigation } from '../setup/setupServiceWorkerNavigation.js';

export function useLegacyI18nElements() {
  let unsubscribeLocaleChange: (() => void) | undefined;
  onMount(() => {
    updateI18nElements();
    unsubscribeLocaleChange = onLocaleChange(() => updateI18nElements());
  });

  onCleanup(() => {
    unsubscribeLocaleChange?.();
  });
}

export function useLegacyMessagesUIReady() {
  let cleanupServiceWorkerNavigation: (() => void) | undefined;
  let isDisposed = false;

  onMount(() => {
    setupServiceWorkerNavigation({
      handleServiceWorkerNavigation,
      waitUntilReady: Promise.resolve(),
    }).then((cleanup) => {
      if (isDisposed) {
        cleanup();
        return;
      }
      cleanupServiceWorkerNavigation = cleanup;
    });

    handleServiceWorkerNavigation(
      window.location.pathname + window.location.search,
    ).catch((error) => {
      console.warn('[APP] Failed to handle initial navigation:', error);
    });
  });

  onCleanup(() => {
    isDisposed = true;
    cleanupServiceWorkerNavigation?.();
  });

  return true;
}
