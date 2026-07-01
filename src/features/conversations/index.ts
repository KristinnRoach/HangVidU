import { subscribe } from '../../shared/events/index.js';
import { stopConversationActivity } from '../../stores/conversation-activity';
import { resetConversationsState } from '../../stores/conversations-client.js';

let isReady = false;
let initPromise: Promise<() => void> | null = null;
let cleanup: () => void = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts the logout subscription and resets readiness
 *
 * Tears down live conversation state when the user logs out.
 */
export function setup(): Promise<() => void> {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const ac = new AbortController();

    subscribe(
      'evt:auth:session:logged-out',
      () => {
        try {
          stopConversationActivity();
          resetConversationsState();
        } catch (error) {
          console.warn('[conversations] logout teardown failed:', error);
        }
      },
      { signal: ac.signal },
    );

    cleanup = () => {
      ac.abort();
      isReady = false;
    };
    isReady = true;
    return cleanup;
  })().finally(() => {
    initPromise = null;
  });

  return initPromise;
}
