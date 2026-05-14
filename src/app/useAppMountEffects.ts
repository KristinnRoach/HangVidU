import { createSignal, onCleanup, onMount } from 'solid-js';
import { setLogger } from '@kidlib/p2p';

import { devDebug } from '../shared/utils/dev/dev-utils.js';
import { updateI18nElements, onLocaleChange } from '../shared/i18n/index.js';
import { initIcons } from '../components/base-legacy/icons.js';
import { initMessagesUI } from '../features/messaging/components/messages-ui.js';
import { probeDefaultReceiveStore } from '../features/file-transfer/index.js';

export function useAppMountEffects() {
  const [messagesUIReady, setMessagesUIReady] = createSignal(false);
  const cleanupFns: (() => void)[] = [];
  let isDisposed = false;

  onMount(() => {
    if (isDisposed) return;
    devDebug('[APP] Start of onMount');
    setLogger((...args) => console.info('[P2P]', ...args));

    updateI18nElements();
    const unsubscribeLocaleChange = onLocaleChange(() => updateI18nElements());
    probeDefaultReceiveStore().then((available) => {
      console.info(`[FileTransferController] Is OPFS available: ${available}`);
    });
    initMessagesUI();
    setMessagesUIReady(true);
    initIcons();
    cleanupFns.push(unsubscribeLocaleChange);

    devDebug('[APP] End of onMount');
  });

  onCleanup(() => {
    isDisposed = true;
    cleanupFns.forEach((fn) => fn());
  });

  return {
    messagesUIReady,
  };
}
