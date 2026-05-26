import { getLoggedInUserId, onAuthStateChanged } from '../../auth/index.js';
import { handleCommand } from '../../shared/events/index.js';
import { writeOnline, writeOffline, observePresence } from './presence-rtdb.js';

let initializedForUserId = null;
let lastSeenUserId = null;
let presenceWriteChain = Promise.resolve();

function enqueuePresenceWrite(task) {
  const run = presenceWriteChain.then(task, task);
  presenceWriteChain = run.catch(() => {});
  return run;
}

onAuthStateChanged((state) => {
  if (state.isLoggedIn) {
    const userId = getLoggedInUserId();
    if (userId && userId !== lastSeenUserId) {
      initializedForUserId = null;
      lastSeenUserId = userId;
    }
    enqueuePresenceWrite(() => initializePresence()).catch((err) => {
      console.warn('Failed to initialize presence:', err);
    });
  } else {
    initializedForUserId = null;
    lastSeenUserId = null;
  }
});

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

let isReady = false;
let initPromise = null;
let cleanup = () => {
  isReady = false;
};

/**
 * Setup contract:
 * - idempotent: returns existing cleanup when already ready
 * - single-flight: concurrent callers share one init promise
 * - teardown: cleanup aborts registered command handlers
 *
 * @returns {Promise<() => void>}
 */
export function setup() {
  if (isReady) {
    return Promise.resolve(cleanup);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = Promise.resolve()
    .then(() => {
      const ac = new AbortController();

      handleCommand(
        'cmd:user:presence:set-offline',
        async ({ userId } = {}) => {
          try {
            await setUserOffline(userId);
          } catch (e) {
            console.warn('Failed to set user presence offline:', e);
          }
        },
        { signal: ac.signal },
      );

      cleanup = () => {
        try {
          ac.abort();
        } catch (error) {
          console.warn(
            '[presence] cleanup failed to abort handlers:',
            error,
          );
        } finally {
          isReady = false;
        }
      };
      isReady = true;
      return cleanup;
    })
    .finally(() => {
      initPromise = null;
    });

  return initPromise;
}
