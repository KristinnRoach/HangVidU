import { getLoggedInUserId } from '../../auth/index.js';
import { handleCommand, subscribe } from '../../shared/events/index.js';
import { createSingleFlightSetup } from '../../shared/utils/create-single-flight-setup.js';
import { writeOnline, writeOffline, observePresence } from './presence-rtdb.js';

let initializedForUserId = null;
let lastSeenUserId = null;
let presenceWriteChain = Promise.resolve();

function enqueuePresenceWrite(task) {
  const run = presenceWriteChain.then(task, task);
  presenceWriteChain = run.catch(() => {});
  return run;
}

function handleLoggedIn() {
  const userId = getLoggedInUserId();
  if (userId && userId !== lastSeenUserId) {
    initializedForUserId = null;
    lastSeenUserId = userId;
  }
  enqueuePresenceWrite(() => initializePresence()).catch((err) => {
    console.warn('Failed to initialize presence:', err);
  });
}

function handleLoggedOut() {
  initializedForUserId = null;
  lastSeenUserId = null;
}

async function initializePresence() {
  const userId = getLoggedInUserId();
  if (!userId || initializedForUserId === userId) return;

  await writeOnline(userId);
  initializedForUserId = userId;
}

export async function setUserOffline(userId = getLoggedInUserId()) {
  if (!userId) return;

  return enqueuePresenceWrite(async () => {
    await writeOffline(userId);
    initializedForUserId = null;
  }).catch((error) => {
    console.error('Failed to set offline:', error);
  });
}

export function watchUserPresence(userId, callback) {
  return observePresence(userId, callback);
}

/**
 * Registers presence command/event handlers.
 * See the setup contract in `createSingleFlightSetup`.
 *
 * @type {() => Promise<() => void>}
 */
export const setup = createSingleFlightSetup({
  label: '[presence]',
  register: (signal) => {
    // Registered before initAuth() fires its first lifecycle events
    // (main.tsx orders setupPresence() ahead of wireAuthReactions()).
    subscribe('evt:auth:session:logged-in', handleLoggedIn, { signal });
    subscribe('evt:auth:session:logged-out', handleLoggedOut, { signal });

    handleCommand(
      'cmd:user:presence:set-offline',
      async ({ userId } = {}) => {
        try {
          await setUserOffline(userId);
        } catch (e) {
          console.warn('Failed to set user presence offline:', e);
        }
      },
      { signal },
    );
  },
});
