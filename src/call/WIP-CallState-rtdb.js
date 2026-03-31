import { set, remove, get } from 'firebase/database';
import { getUserOutgoingCallRef } from '../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, getUserId } from '../auth/auth-state.js';

export const CALL_TIMEOUT_MS = import.meta.env.DEV ? 15000 : 60000; // 60 seconds (in prod)

/**
 * Write outgoing call state to RTDB so we can verify call freshness
 */
export async function setOutgoingCallState(roomId, targetContactName = null) {
  const userId = getUserId();
  const loggedInUid = getLoggedInUserId();

  // Only track for authenticated users (guests don't need cross-session freshness checks)
  if (!loggedInUid) return;

  const outgoingRef = getUserOutgoingCallRef(loggedInUid);
  await set(outgoingRef, {
    roomId,
    targetContactName,
    initiatedAt: Date.now(),
    callerUserId: userId,
  });
}

/**
 * Remove outgoing call state (on answer, cancel, or timeout)
 */
export async function clearOutgoingCallState() {
  const loggedInUid = getLoggedInUserId();
  if (!loggedInUid) return;

  const outgoingRef = getUserOutgoingCallRef(loggedInUid);
  await remove(outgoingRef).catch(() => {});
}

/**
 * Check if an outgoing call state exists and is fresh (< 30s old)
 */
export async function isOutgoingCallFresh(callerUid, roomId) {
  if (!callerUid) return false;

  try {
    const outgoingRef = getUserOutgoingCallRef(callerUid);
    const snap = await get(outgoingRef);
    if (!snap.exists()) return false;

    const data = snap.val();
    if (data.roomId !== roomId) return false;

    const age = Date.now() - data.initiatedAt;
    return age < CALL_TIMEOUT_MS;
  } catch (e) {
    console.warn('Failed to check outgoing call freshness', e);
    return false;
  }
}
