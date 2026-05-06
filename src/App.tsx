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

import { getPushNotifications } from './features/push-notifications/push-notifications.js';
import { useCallFlow } from './useCallFlow.js';
import { showPushUnsupportedNotification } from './features/notifications/index.js';

import MainLayout from './components/MainLayout.jsx';
import { setupMessagingAppBusHandlers } from './features/messaging/messaging-command-handlers.js';
import CallDialogs from './components/dialogs/CallDialogs.jsx';

function initP2P() {
  setLogger((...args) => {
    console.info('[P2P]', ...args);
  });
}

/**
 * SolidJS app shell.
 * WIP - Migrating imperative UI modules behind this root
 */
export default function App() {
  const p2p = useP2PRoom();
  const callFlow = useCallFlow({ p2p });
  let cleanupCallFlow: (() => void) | undefined;
  let isDisposed = false;

  onCleanup(() => {
    isDisposed = true;
    cleanupCallFlow?.();
  });

  onMount(async () => {
    // Remove most of these when Solid-ified:
    console.info('Mounting app...');
    setupInitPreflight();
    initializeAppCheckDeferred();
    await initI18n();
    await setupAuth();
    setupAppRoot();
    setupMainAppBusListeners();
    await setupContacts();
    setupMessagingAppBusHandlers({ messagingController });

    // Initialize push notifications (permission requests happen on auth change)
    const pushController = getPushNotifications();
    try {
      const pushInitialized = await pushController.initialize();
      if (!pushInitialized && !pushController.isNotificationSupported()) {
        showPushUnsupportedNotification();
      }
    } catch (error) {
      console.error('[APP.onMount()] Push notifications init:', error);
    }

    if (isDisposed) return;

    initP2P();
    cleanupCallFlow = callFlow.setup();

    devDebug('End of onMount');
  });

  return (
    <div>
      <MainLayout p2p={p2p} />
      <CallDialogs callFlow={callFlow} />
    </div>
  );
}
