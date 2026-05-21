import { onCleanup, onMount } from 'solid-js';
import type { JSX } from 'solid-js';
import { render } from 'solid-js/web';

import App from './App';
import { initPushNotifications } from './features/push-notifications/push-notifications.js';
import { initializeAppCheckDeferred } from './shared/vendors/firebase.js';
import { setupAuth } from './setup/setupAuth.js';
import { setupContacts } from './setup/setupContacts.js';
import { setupMainAppBusListeners } from './setup/setupMainAppBusListeners.js';
import { setupNotificationsHandlers } from './setup/setupNotificationsHandlers.js';

type Cleanup = () => void;

function runCleanups(cleanups: Cleanup[]) {
  for (const cleanup of [...cleanups].reverse()) {
    try {
      cleanup();
    } catch (error) {
      console.warn('[main] cleanup failed:', error);
    }
  }
}

function AppSideEffects(props: { children: JSX.Element }) {
  const cleanups: Cleanup[] = [];

  initializeAppCheckDeferred();

  onMount(async () => {
    try {
      cleanups.push(await setupAuth());
      cleanups.push(await setupContacts());
      cleanups.push(await setupMainAppBusListeners());
      cleanups.push(await setupNotificationsHandlers());
      initPushNotifications().catch((error) => {
        console.error('[main] Push notifications init:', error);
      });
    } catch (error) {
      console.error('[main] Side-effect setup failed:', error);
      runCleanups(cleanups);
    }
  });

  onCleanup(() => runCleanups(cleanups));

  return <>{props.children}</>;
}

render(
  () => (
    <AppSideEffects>
      <App />
    </AppSideEffects>
  ),
  document.getElementById('root')!,
);
