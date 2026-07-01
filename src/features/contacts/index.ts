import { subscribe } from '../../shared/events/index.js';
import {
  captureReferral,
  processReferral,
} from './referrals/referral-handler.js';
import { setupInviteListener } from './invites/invite-listener.js';
import { hydrateContacts, resetContacts } from '../../stores/contactsStore.js';

let isReady = false;
let initPromise: Promise<() => void> | null = null;
let cleanup: () => void = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts auth subscriptions + runs the latest invite
 *   cleanup, then resets readiness
 *
 * Owns the contacts reactions to auth lifecycle (hydrate, referrals, invites)
 * plus the anonymous-boot referral capture + initial hydrate.
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

    // Per-login-scoped invite listener: replaced on each login, torn down on
    // logout and on full teardown.
    let inviteCleanup: () => void = () => {};
    const runInviteCleanup = () => {
      try {
        inviteCleanup();
      } catch (error) {
        console.warn('[contacts] invite cleanup failed:', error);
      }
      inviteCleanup = () => {};
    };

    subscribe(
      'evt:auth:session:ready',
      async () => {
        try {
          await hydrateContacts();
        } catch (error) {
          console.warn('[contacts] hydrate on ready failed:', error);
        }
      },
      { signal: ac.signal },
    );

    subscribe(
      'evt:auth:session:logged-in',
      async () => {
        try {
          await processReferral().catch((e) =>
            console.warn('[contacts] processReferral failed:', e),
          );
          await hydrateContacts().catch((e) =>
            console.warn('[contacts] hydrate on login failed:', e),
          );

          runInviteCleanup();
          const maybeInviteCleanup = setupInviteListener();
          if (typeof maybeInviteCleanup === 'function') {
            inviteCleanup = maybeInviteCleanup;
          }
        } catch (error) {
          console.warn('[contacts] logged-in handler failed:', error);
        }
      },
      { signal: ac.signal },
    );

    subscribe(
      'evt:auth:session:logged-out',
      () => {
        try {
          runInviteCleanup();
          resetContacts();
        } catch (error) {
          console.warn('[contacts] logout teardown failed:', error);
        }
      },
      { signal: ac.signal },
    );

    // Anonymous boot: capture referral from URL → localStorage, hydrate guest
    // contacts. (processReferral applies the captured referral once logged in.)
    await captureReferral();
    await hydrateContacts();

    cleanup = () => {
      runInviteCleanup();
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
