// src/lib/roomService.js

import { db } from './firebase.js';

export async function createRoom(roomId, offer) {
  const roomRef = db.ref(`rooms/${roomId}`);
  await roomRef.set({
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  });
  return roomRef;
}

export async function joinRoom(roomId) {
  const roomRef = db.ref(`rooms/${roomId}`);
  const roomSnapshot = await roomRef.once('value');
  return { roomRef, roomSnapshot };
}

export async function removeRoom(roomId) {
  console.log(
    '[ROOM-DEBUG] removeRoom called for roomId:',
    roomId,
    'at',
    new Date().toISOString()
  );
  await db.ref(`rooms/${roomId}`).remove();
}
