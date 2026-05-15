import { createResource, onCleanup, Suspense } from 'solid-js';
import type { JSX } from 'solid-js';

import { setupSolidAuthState } from '../auth/solid-auth.js';
import { messagingController } from '../features/messaging/messaging-controller.js';
import { setupMessagingAppBusHandlers } from '../features/messaging/messaging-command-handlers.js';
import { initPushNotifications } from '../features/push-notifications/push-notifications.js';
import { initI18n } from '../shared/i18n/index.js';
import { setDevDebugEnabled } from '../shared/utils/dev/dev-utils.js';
import { initializeAppCheckDeferred } from '../shared/vendors/firebase.js';
import { setupAuth } from '../setup/setupAuth.js';
import { setupContacts } from '../setup/setupContacts.js';
import { setupMessagingContactsIntegration } from '../setup/messaging-contacts-bridge.js';
import { setupMainAppBusListeners } from '../setup/setupMainAppBusListeners.js';
import { setupNotificationsHandlers } from '../setup/setupNotificationsHandlers.js';

type Cleanup = () => void;

function LoadingScreen() {
  return (
    <div
      class='loading-screen'
      style='display: flex;  height: 100dvh; flex-direction: column; align-items: center; justify-content: center;'
    >
      <p>Loading HangVidU...</p>
    </div>
  );
}

function runCleanup(cleanup: Cleanup) {
  try {
    cleanup();
  } catch (error) {
    console.warn('[AppRuntime] cleanup failed:', error);
  }
}

function cleanupAll(cleanupFns: Cleanup[]) {
  for (const cleanup of [...cleanupFns].reverse()) {
    runCleanup(cleanup);
  }
}

async function initializeAppRuntime(): Promise<Cleanup> {
  const cleanupFns: Cleanup[] = [];

  try {
    setDevDebugEnabled(true);
    initializeAppCheckDeferred();
    await initI18n();

    cleanupFns.push(await setupAuth());
    cleanupFns.push(await setupContacts());
    cleanupFns.push(setupSolidAuthState());
    cleanupFns.push(await setupMainAppBusListeners());
    cleanupFns.push(await setupNotificationsHandlers());
    cleanupFns.push(setupMessagingContactsIntegration());
    cleanupFns.push(setupMessagingAppBusHandlers({ messagingController }));
    initPushNotifications().catch((error) => {
      console.error('[APP] Push notifications init:', error);
    });
  } catch (error) {
    cleanupAll(cleanupFns);
    throw error;
  }

  return () => cleanupAll(cleanupFns);
}

export function AppRuntime(props: { children: JSX.Element }) {
  const [runtimeCleanup] = createResource(initializeAppRuntime);

  function RuntimeReady(props: { children: JSX.Element }) {
    const cleanup = runtimeCleanup();
    onCleanup(() => cleanup?.());
    return <>{props.children}</>;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <RuntimeReady>{props.children}</RuntimeReady>
    </Suspense>
  );
}
