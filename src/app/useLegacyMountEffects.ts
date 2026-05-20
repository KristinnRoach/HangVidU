import { onCleanup, onMount } from 'solid-js';
import { setLogger } from '@kidlib/p2p';

import { updateI18nElements, onLocaleChange } from '../shared/i18n/index.js';
import { initIcons } from '../components/base-legacy/icons.js';
import { probeDefaultReceiveStore } from '../features/file-transfer/index.js';
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

export function useP2PRuntimeDiagnostics() {
  onMount(() => {
    setLogger((...args) => console.info('[P2P]', ...args));
    probeDefaultReceiveStore().then((available) => {
      console.info(`[FileTransferController] Is OPFS available: ${available}`);
    });
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

export function useLegacyIcons() {
  onMount(() => {
    initIcons();
  });
}
