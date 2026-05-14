import { createSignal, onCleanup, onMount } from 'solid-js';
import { setLogger } from '@kidlib/p2p';

import { updateI18nElements, onLocaleChange } from '../shared/i18n/index.js';
import { initIcons } from '../components/base-legacy/icons.js';
import { initMessagesUI } from '../features/messaging/components/messages-ui.js';
import { probeDefaultReceiveStore } from '../features/file-transfer/index.js';

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
  const [messagesUIReady, setMessagesUIReady] = createSignal(false);

  onMount(() => {
    initMessagesUI();
    setMessagesUIReady(true);
  });

  return messagesUIReady;
}

export function useLegacyIcons() {
  onMount(() => {
    initIcons();
  });
}
