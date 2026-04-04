import {
  ref,
  set,
  onDisconnect,
  serverTimestamp,
  onValue,
} from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';

function presenceRef(userId) {
  return ref(rtdb, `users/${userId}/presence`);
}

export async function writeOnline(userId) {
  const pRef = presenceRef(userId);
  await set(pRef, {
    state: 'online',
    lastChanged: serverTimestamp(),
  });
  await onDisconnect(pRef).set({
    state: 'offline',
    lastSeen: serverTimestamp(),
    lastChanged: serverTimestamp(),
  });
}

export async function writeOffline(userId) {
  await set(presenceRef(userId), {
    state: 'offline',
    lastSeen: serverTimestamp(),
    lastChanged: serverTimestamp(),
  });
}

export function observePresence(userId, callback) {
  return onValue(presenceRef(userId), (snapshot) => {
    callback(snapshot.val() || { state: 'offline' });
  });
}
