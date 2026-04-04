import { getLoggedInUserId, onAuthStateChange } from '../../auth/index.js';
import { writeOnline, writeOffline, observePresence } from './presence-rtdb.js';

let initializedForUserId = null;
let lastSeenUserId = null;

onAuthStateChange((state) => {
  if (state.isLoggedIn) {
    const userId = getLoggedInUserId();
    if (userId && userId !== lastSeenUserId) {
      initializedForUserId = null;
      lastSeenUserId = userId;
    }
    initializePresence().catch((err) => {
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

  try {
    await writeOnline(userId);
    initializedForUserId = userId;
  } catch (error) {
    console.error('Failed to initialize presence:', error);
  }
}

export async function setUserOffline(userId = getLoggedInUserId()) {
  if (!userId) return;

  try {
    await writeOffline(userId);
    initializedForUserId = null;
  } catch (error) {
    console.error('Failed to set offline:', error);
  }
}

export function watchUserPresence(userId, callback) {
  return observePresence(userId, callback);
}
