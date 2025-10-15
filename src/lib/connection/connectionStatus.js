// src/lib/connectionStatus.js

import { db } from '../../storage/firebaseRealTimeDB.js';

export function setConnectionStatus(roomId, role, status) {
  if (!roomId || !role) return;

  const path = `rooms/${roomId}/connections/${role}`;
  return db.ref(path).set({
    status,
    timestamp: Date.now(),
  });
}

export function listenForPartnerReconnection(roomId, role, callback) {
  if (!roomId || !role) return null;

  const partnerRole = role === 'initiator' ? 'joiner' : 'initiator';
  const path = `rooms/${roomId}/connections/${partnerRole}/status`;
  const ref = db.ref(path);

  const listener = (snapshot) => {
    const status = snapshot.val();
    if (status === 'reconnecting') {
      callback();
    }
  };

  ref.on('value', listener);

  // Return cleanup function
  return () => ref.off('value', listener);
}

export function clearConnectionStatus(roomId, role) {
  if (!roomId || !role) return;

  const path = `rooms/${roomId}/connections/${role}`;
  return db.ref(path).remove();
}
