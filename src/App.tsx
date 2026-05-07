import { onCleanup, onMount } from 'solid-js';

import { devDebug } from './shared/utils/dev/dev-utils.js';
import { initializeAppCheckDeferred } from './shared/vendors/firebase.js';
import { initI18n } from './shared/i18n/index.js';
import { setupContacts } from './setup/setupContacts.js';
import { setupAuth } from './setup/setupAuth.js';
import { setupInitPreflight } from './setup/setupInitPreflight.js';
import { setupAppRoot } from './setup/setupAppRoot.js';
import { setupMainAppBusListeners } from './setup/setupMainAppBusListeners.js';
import { messagingController } from './features/messaging/messaging-controller.js';

import { setLogger } from '@kidlib/p2p';
import { useP2PRoom } from '@kidlib/p2p/solid';

import { initPushNotifications } from './features/push-notifications/push-notifications.js';
import { useCallFlow } from './useCallFlow.js';

import MainLayout from './components/MainLayout.jsx';
import { setupMessagingAppBusHandlers } from './features/messaging/messaging-command-handlers.js';
import CallDialogs from './components/dialogs/CallDialogs.jsx';
import { initMessagesUI } from './features/messaging/components/messages-ui.js';

setupInitPreflight();
initializeAppCheckDeferred();
await initI18n();
await setupAuth();
setupAppRoot();
setupMainAppBusListeners();
await setupContacts();
setupMessagingAppBusHandlers({ messagingController });

// Initialize push notifications (permission requests happen on auth change)
initPushNotifications().catch((error) => {
  console.error('[APP] Push notifications init:', error);
});

/**
 * SolidJS app shell.
 * WIP - Migrating imperative UI modules behind this root
 */
export default function App() {
  const p2p = useP2PRoom();
  const callFlow = useCallFlow({ p2p });
  let cleanupCallFlow: (() => void) | undefined;
  let isDisposed = false;

  onMount(async () => {
    if (isDisposed) return;
    devDebug('[APP] Start of onMount');

    setLogger((...args) => console.info('[P2P]', ...args));

    initMessagesUI(); // Legacy messages UI - to be migrated
    cleanupCallFlow = callFlow.setup();

    devDebug('[APP] End of onMount');
  });

  onCleanup(() => {
    isDisposed = true;
    cleanupCallFlow?.();
  });

  return (
    <div>
      <MainLayout p2p={p2p} />
      <CallDialogs callFlow={callFlow} />
    </div>
  );
}
