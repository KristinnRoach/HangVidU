import { set, remove } from 'firebase/database';
import { getUserOutgoingCallRef } from '../../shared/storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, getUserId } from '../../auth/index.js';

export const CALL_TIMEOUT_MS = import.meta.env.DEV ? 15000 : 60000; // 60 seconds (in prod)

/**
 * Write outgoing call state to RTDB so we can verify call freshness
 */
export async function setOutgoingCallState(roomId, targetContactNickName = null) {
  const userId = getUserId();
  const loggedInUid = getLoggedInUserId();

  // Only track for authenticated users (guests don't need cross-session freshness checks)
  if (!loggedInUid) return;

  const outgoingRef = getUserOutgoingCallRef(loggedInUid);
  await set(outgoingRef, {
    roomId,
    targetContactNickName,
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
