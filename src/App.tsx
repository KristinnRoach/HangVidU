import { onMount } from 'solid-js';

import { rtdb } from './shared/storage/fb-rtdb/rtdb.js';
import { initializeAppCheckDeferred } from './shared/vendors/firebase.js';
import { initI18n, useI18n } from './shared/i18n/index.js';
import { setupContacts } from './setup/setupContacts.js';
import { initAuth } from './auth/auth-setup.js';
import { useAuth } from './auth/solid-auth.js';
import { setupAuth } from './setup/setupAuth.js';
import { useRooms } from './components/useRooms.js';
import { setupInitPreflight } from './setup/setupInitPreflight.js';
import { setupAppRoot } from './setup/setupAppRoot.js';
import { setupMainAppBusListeners } from './setup/setupMainAppBusListeners.js';

// import { handleCommand } from './shared/events/index.js';
// import { setupUserAccount } from './setup/setupUserAccount.js';
// import { setUserOffline } from './features/presence/index.js';

import MainLayout from './components/MainLayout.jsx';

/**
 * SolidJS app shell.
 * WIP - Migrating imperative UI modules behind this root
 */
export default function App() {
  onMount(async () => {
    // Remove most of these when Solid-ified:
    console.info('Mounting app.. rtdb:', rtdb);
    setupInitPreflight();
    initializeAppCheckDeferred();
    await initI18n();
    await setupAuth();
    setupAppRoot();
    setupMainAppBusListeners();
    await setupContacts();
    useRooms().init();
  });

  return <MainLayout />;
}
