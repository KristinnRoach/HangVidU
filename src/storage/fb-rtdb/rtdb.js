import { getDatabase, ref, get, onValue, off } from 'firebase/database';
import { app } from '../../firebase/firebase';

export const rtdb = getDatabase(app);

// ============================================================================
// LISTENER TRACKING
// ============================================================================

const listeners = [];

/**
 * Track a firebase listener for cleanup.
 * Keeps internal registry so cleanup functions can purge them by scope.
 * @param {DatabaseReference} fbRef - Firebase database reference
 * @param {string} type - Event type ('value', 'child_added', etc.)
 * @param {Function} callback - Listener callback
 * @param {string} [roomId] - Optional room ID for room-scoped cleanup
 */
export function trackRTDBListener(fbRef, type, callback, roomId = null) {
  listeners.push({ ref: fbRef, type, callback, roomId });
}

/**
 * Remove all tracked listeners and clear registry.
 * Use this for global app teardown.
 */
export function removeAllRTDBListeners() {
  listeners.forEach(({ ref: fbRef, type, callback }) => {
    try {
      off(fbRef, type, callback);
    } catch (err) {
      console.warn('Failed to remove firebase rtdb listener', err);
    }
  });
  listeners.length = 0;
}

/**
 * Remove all tracked listeners for a specific room.
 * Use this when leaving a call to clean up room-specific listeners
 * while preserving global/saved-contact listeners.
 * @param {string} roomId - Room ID to clean up listeners for
 */
export function removeRTDBListenersForRoom(roomId) {
  if (!roomId) return;

  const toRemove = listeners.filter((l) => l.roomId === roomId);
  toRemove.forEach(({ ref: fbRef, type, callback }) => {
    try {
      off(fbRef, type, callback);
    } catch (err) {
      console.warn(`Failed to remove listener for room ${roomId}`, err);
    }
  });

  // Remove from tracking array
  const remaining = listeners.filter((l) => l.roomId !== roomId);
  listeners.length = 0;
  listeners.push(...remaining);
}

/**
 * Attach a listener for data changes and track it for cleanup.
 * @param {DatabaseReference} fbRef - Firebase database reference
 * @param {Function} callback - Listener callback
 * @param {string} [roomId] - Optional room ID for room-scoped cleanup
 */
export function onDataChange(fbRef, callback, roomId = null) {
  onValue(fbRef, callback);
  trackRTDBListener(fbRef, 'value', callback, roomId);
}

// ============================================================================
// REF BUILDERS
// ============================================================================

// Room refs
export const getRoomRef = (roomId) => ref(rtdb, `rooms/${roomId}`);
export const getRoomMembersRef = (roomId) =>
  ref(rtdb, `rooms/${roomId}/members`);
export const getRoomMemberRef = (roomId, userId) =>
  ref(rtdb, `rooms/${roomId}/members/${userId}`);
export const getRoomOfferRef = (roomId) => ref(rtdb, `rooms/${roomId}/offer`);
export const getRoomAnswerRef = (roomId) => ref(rtdb, `rooms/${roomId}/answer`);

// Watch-together refs
export const getWatchRef = (roomId) => ref(rtdb, `rooms/${roomId}/watch`);
export const getWatchVideoRef = (roomId) =>
  ref(rtdb, `rooms/${roomId}/watch/video`);
export const getWatchPlaybackRef = (roomId) =>
  ref(rtdb, `rooms/${roomId}/watch/playback`);

// User refs
export const getUserRef = (userId) => ref(rtdb, `users/${userId}`);
export const getUserContactsRef = (userId) =>
  ref(rtdb, `users/${userId}/contacts`);
export const getUserRecentCallsRef = (userId) =>
  ref(rtdb, `users/${userId}/recentCalls`);
export const getUserOutgoingCallRef = (userId) =>
  ref(rtdb, `users/${userId}/outgoingCall`);

// ICE candidate refs
export const getOfferCandidatesRef = (roomId) =>
  ref(rtdb, `rooms/${roomId}/offerCandidates`);
export const getAnswerCandidatesRef = (roomId) =>
  ref(rtdb, `rooms/${roomId}/answerCandidates`);

// ============================================================================
// DATA FETCH UTILITIES
// ============================================================================

/**
 * Fetch data from a database reference, safely handling missing data.
 * @param {DatabaseReference} dbRef - Firebase database reference
 * @param {boolean} shouldThrow - If true, throws error when data not found. If false, logs warning and returns null
 * @param {string} errorMsg - Custom error/warning message
 * @returns {Promise<any>} The fetched data, or null if not found
 */
export async function fetchRTDBData(
  dbRef,
  shouldThrow = true,
  errorMsg = 'Data not found'
) {
  const snapshot = await get(dbRef);
  if (!snapshot.exists()) {
    if (shouldThrow) {
      throw new Error(errorMsg);
    } else {
      console.warn(errorMsg);
      return null;
    }
  }
  return snapshot.val();
}

// ============================================================================
// DOMAIN-SPECIFIC FETCH FUNCTIONS (Compose ref + fetch)
// ============================================================================

/**
 * Fetch complete room data including offer, answer, metadata
 */
export async function getRoomDataFB(roomId) {
  return fetchRTDBData(getRoomRef(roomId), true, `Room ${roomId} not found`);
}

/**
 * Fetch room offer (used by joiner to answer)
 */
export async function getRoomOfferFB(roomId) {
  return fetchRTDBData(
    getRoomOfferRef(roomId),
    true,
    `No offer found for room ${roomId}`
  );
}

/**
 * Fetch room's members list
 */
export async function getRoomMembersFB(roomId) {
  return fetchRTDBData(
    getRoomMembersRef(roomId),
    false, // Don't throw if no members yet
    `No members in room ${roomId}`
  );
}

/**
 * Fetch a specific member's data
 */
export async function getRoomMemberFB(roomId, userId) {
  return fetchRTDBData(
    getRoomMemberRef(roomId, userId),
    false,
    `Member ${userId} not found in room ${roomId}`
  );
}

/**
 * Fetch watch-together sync state
 */
export async function getWatchSyncDataFB(roomId) {
  return fetchRTDBData(
    getWatchRef(roomId),
    false,
    `No watch state for room ${roomId}`
  );
}
