// src/lib/connectionStatus.js

import { db } from '../../storage/firebase.js';
import { ref, set, onValue, off, remove } from 'firebase/database';

export function setConnectionStatus(roomId, role, status) {
  if (!roomId || !role) return;

  const path = `rooms/${roomId}/connections/${role}`;
  const statusRef = ref(db, path);
  return set(statusRef, {
    status,
    timestamp: Date.now(),
  });
}

export function listenForPartnerReconnection(roomId, role, callback) {
  if (!roomId || !role) return null;

  const partnerRole = role === 'initiator' ? 'joiner' : 'initiator';
  const path = `rooms/${roomId}/connections/${partnerRole}/status`;
  const statusRef = ref(db, path);

  const listener = (snapshot) => {
    const status = snapshot.val();
    if (status === 'reconnecting') {
      callback();
    }
  };

  onValue(statusRef, listener);

  // Return cleanup function
  return () => off(statusRef, 'value', listener);
}

export function clearConnectionStatus(roomId, role) {
  if (!roomId || !role) return;

  const path = `rooms/${roomId}/connections/${role}`;
  const statusRef = ref(db, path);
  return remove(statusRef);
}
