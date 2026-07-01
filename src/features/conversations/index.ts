import { subscribe } from '../../shared/events/index.js';
import { stopConversationActivity } from '../../stores/conversation-activity';
import { resetConversationsState } from '../../stores/conversations-client.js';
import { createSingleFlightSetup } from '../../shared/utils/create-single-flight-setup.js';

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts the logout subscription and resets readiness
 *
 * Tears down live conversation state when the user logs out.
 */
export const setup = createSingleFlightSetup({
  label: '[conversations]',
  register: (signal) => {
    subscribe(
      'evt:auth:session:logged-out',
      () => {
        try {
          stopConversationActivity();
        } catch (error) {
          console.warn('[conversations] activity teardown failed:', error);
        }
        try {
          resetConversationsState();
        } catch (error) {
          console.warn('[conversations] state reset failed:', error);
        }
      },
      { signal },
    );
  },
});
