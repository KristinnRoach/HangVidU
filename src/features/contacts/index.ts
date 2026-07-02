import { subscribe } from '../../shared/events/index.js';
import { createSingleFlightSetup } from '../../shared/utils/create-single-flight-setup.js';
import {
  captureReferral,
  processReferral,
} from './referrals/referral-handler.js';
import { setupInviteListener } from './invites/invite-listener.js';
import { hydrateContacts, resetContacts } from '../../stores/contactsStore.js';

let inviteCleanup: () => void = () => {};
let authSessionVersion = 0;

function runInviteCleanup() {
  try {
    inviteCleanup();
  } catch (error) {
    console.warn('[contacts] invite cleanup failed:', error);
  }
  inviteCleanup = () => {};
}

async function handleLoggedIn() {
  const sessionVersion = ++authSessionVersion;
  runInviteCleanup();
  try {
    await processReferral().catch((e) =>
      console.warn('[contacts] processReferral failed:', e),
    );
    if (sessionVersion !== authSessionVersion) return;

    await hydrateContacts().catch((e) =>
      console.warn('[contacts] hydrate on login failed:', e),
    );
    if (sessionVersion !== authSessionVersion) return;

    const maybeInviteCleanup = setupInviteListener();
    if (typeof maybeInviteCleanup === 'function') {
      inviteCleanup = maybeInviteCleanup;
    }
  } catch (error) {
    console.warn('[contacts] logged-in handler failed:', error);
  }
}

function handleLoggedOut() {
  try {
    authSessionVersion += 1;
    runInviteCleanup();
    resetContacts();
  } catch (error) {
    console.warn('[contacts] logout teardown failed:', error);
  }
}

function stopContacts() {
  authSessionVersion += 1;
  runInviteCleanup();
}

async function hydrateOnReady() {
  try {
    await hydrateContacts();
  } catch (error) {
    console.warn('[contacts] hydrate on ready failed:', error);
  }
}

async function startContacts() {
  // Anonymous boot: capture referral from URL → localStorage, hydrate guest
  // contacts. (processReferral applies the captured referral once logged in.)
  try {
    await captureReferral();
  } catch (error) {
    console.warn('[contacts] captureReferral failed:', error);
  }
  try {
    await hydrateContacts();
  } catch (error) {
    console.warn('[contacts] initial hydrate failed:', error);
  }
}

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
export const setup = createSingleFlightSetup({
  label: '[contacts]',
  register: (signal) => {
    subscribe('evt:auth:session:ready', hydrateOnReady, { signal });

    subscribe('evt:auth:session:logged-in', handleLoggedIn, { signal });

    subscribe('evt:auth:session:logged-out', handleLoggedOut, { signal });
  },
  start: startContacts,
  stop: stopContacts,
});
