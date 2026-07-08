import { handleCommand } from '../shared/events/index.js';
import { createSingleFlightSetup } from '../shared/utils/create-single-flight-setup.js';
import { getPushNotifications } from './push-notifications.js';

export {
  PushNotifications,
  getPushNotifications,
  initPushNotifications,
} from './push-notifications.js';

/**
 * Registers app-level command handlers for push notifications.
 * See the setup contract in `createSingleFlightSetup`.
 *
 * @type {() => Promise<() => void>}
 */
export const setup = createSingleFlightSetup({
  label: '[push-notifications]',
  register: (signal) => {
    handleCommand(
      'cmd:push:subscription:disable',
      async () => {
        try {
          await getPushNotifications()?.disable?.();
        } catch (e) {
          console.warn('[push] Failed to disable notifications:', e);
        }
      },
      { signal },
    );
  },
});
