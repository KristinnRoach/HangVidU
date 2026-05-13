import { setDevDebugEnabled } from '../shared/utils/dev/dev-utils.js';
import { initializeAppCheckDeferred } from '../shared/vendors/firebase.js';
import { initI18n } from '../shared/i18n/index.js';
import { setupContacts } from '../setup/setupContacts.js';
import { setupAuth } from '../setup/setupAuth.js';
import { setupAppRoot } from '../setup/setupAppRoot.js';
import { setupMainAppBusListeners } from '../setup/setupMainAppBusListeners.js';
import { messagingController } from '../features/messaging/messaging-controller.js';
import { initPushNotifications } from '../features/push-notifications/push-notifications.js';
import { setupMessagingAppBusHandlers } from '../features/messaging/messaging-command-handlers.js';

export async function setupAppRuntime() {
  setDevDebugEnabled(true);
  initializeAppCheckDeferred();
  await initI18n();
  await setupAuth();
  await setupContacts();
  setupAppRoot();
  setupMainAppBusListeners();
  setupMessagingAppBusHandlers({ messagingController });

  initPushNotifications().catch((error) => {
    console.error('[APP] Push notifications init:', error);
  });
}
