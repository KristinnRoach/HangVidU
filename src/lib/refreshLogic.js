// src/lib/refreshLogic.js

/**
 * Decide what action to take on refresh based on URL and saved state.
 * @param {Object} params
 * @param {string|null} params.urlRoomId - Room ID from URL (if any)
 * @param {Object} params.savedState - State loaded from storage (if any)
 * @returns {Object} { action: 'idle'|'join'|'reconnect', roomId? }
 */
export function decideRefreshAction({ urlRoomId, savedState }) {
  const roomId = urlRoomId || savedState?.roomId;
  if (!roomId) return { action: 'idle' };
  const isSameRoom = savedState?.roomId === roomId;
  const hadConnection = savedState?.wasConnected === true;
  if (isSameRoom && hadConnection) {
    return { action: 'reconnect', roomId };
  } else {
    return { action: 'join', roomId };
  }
}
