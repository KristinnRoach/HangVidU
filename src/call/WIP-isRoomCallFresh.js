import { get, ref } from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';
import { CALL_TIMEOUT_MS } from './WIP-CallState-rtdb.js';

/**
 * Fallback freshness check for guests (logged-out flows):
 * Use the room's createdAt timestamp to determine if the call is recent.
 * Works because initiator overwrites/creates the room node with a fresh createdAt.
 */
export async function isRoomCallFresh(roomId) {
  if (!roomId) return false;
  try {
    const createdAtRef = ref(rtdb, `rooms/${roomId}/createdAt`);
    const snap = await get(createdAtRef);
    if (!snap.exists()) return false;
    const createdAt = snap.val();
    if (typeof createdAt !== 'number') return false;
    const age = Date.now() - createdAt;
    return age < CALL_TIMEOUT_MS;
  } catch (e) {
    console.warn('Failed to check room freshness', e);
    return false;
  }
}
