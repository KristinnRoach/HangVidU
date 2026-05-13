import { createSignal, onCleanup, onMount } from 'solid-js';
import { setLogger } from '@kidlib/p2p';

import { devDebug } from '../shared/utils/dev/dev-utils.js';
import { onLocaleChange } from '../shared/i18n/index.js';
import { initializeElements, updateI18nElements } from '../elements.js';
import { initIcons } from '../components/base-legacy/icons.js';
import { initMessagesUI } from '../features/messaging/components/messages-ui.js';
import { probeDefaultReceiveStore } from '../features/file-transfer/index.js';
import type { useCallFlow } from '../features/call/useCallFlow.js';

type Options = {
  callFlow: ReturnType<typeof useCallFlow>;
};

export function useAppMountEffects({ callFlow }: Options) {
  const [messagesUIReady, setMessagesUIReady] = createSignal(false);
  const cleanupFns: (() => void)[] = [];
  let isDisposed = false;

  onMount(() => {
    if (isDisposed) return;
    devDebug('[APP] Start of onMount');
    setLogger((...args) => console.info('[P2P]', ...args));

    initializeElements();
    updateI18nElements();
    const unsubscribeLocaleChange = onLocaleChange(() => updateI18nElements());
    probeDefaultReceiveStore().then((available) => {
      console.info(`[FileTransferController] Is OPFS available: ${available}`);
    });
    initMessagesUI();
    setMessagesUIReady(true);
    initIcons();
    callFlow.init();
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
