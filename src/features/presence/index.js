import { getLoggedInUserId, onAuthStateChanged } from '../../auth/index.js';
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
