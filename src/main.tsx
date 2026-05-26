import { onCleanup, onMount } from 'solid-js';
import type { JSX } from 'solid-js';
import { render } from 'solid-js/web';
import 'solid-devtools';

import App from './App';
import { initPushNotifications } from './features/push-notifications/push-notifications.js';
import { initializeAppCheckDeferred } from './infra/firebase.js';
import { setupAuth } from './setup/setupAuth.js';
import { setup as setupContacts } from './features/contacts';
import { setup as setupNotifications } from './features/notifications/index.js';
import { setup as setupPresence } from './features/presence/index.js';
import { setup as setupPushNotifications } from './features/push-notifications/index.js';
import { setup as setupPWA } from './features/pwa';

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
      cleanups.push(await setupNotifications());
      cleanups.push(await setupPresence());
      cleanups.push(await setupPushNotifications());
      cleanups.push(await setupContacts());
      cleanups.push(await setupAuth());
      cleanups.push(await setupPWA());
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
