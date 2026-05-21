import { createResource, onCleanup, Suspense } from 'solid-js';
import type { JSX } from 'solid-js';

import { AuthProvider } from '../auth/solid-auth';
import { Spinner } from '../components/app/Spinner.jsx';

import { initPushNotifications } from '../features/push-notifications/push-notifications.js';
import { initI18n } from '../shared/i18n/index.js';
import { initializeAppCheckDeferred } from '../shared/vendors/firebase.js';
import { setupAuth } from '../setup/setupAuth.js';
import { setupContacts } from '../setup/setupContacts.js';
import { setupMainAppBusListeners } from '../setup/setupMainAppBusListeners.js';
import { setupNotificationsHandlers } from '../setup/setupNotificationsHandlers.js';

type Cleanup = () => void;

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
    initializeAppCheckDeferred();
    await initI18n();

    cleanupFns.push(await setupAuth());
    cleanupFns.push(await setupContacts());
    cleanupFns.push(await setupMainAppBusListeners());
    cleanupFns.push(await setupNotificationsHandlers());
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
    <Suspense fallback={<Spinner />}>
      <RuntimeReady>
        <AuthProvider>{props.children}</AuthProvider>
      </RuntimeReady>
    </Suspense>
  );
}
