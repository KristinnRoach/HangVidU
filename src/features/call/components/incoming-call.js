import {
  dispatchCommand,
  dispatchCommandAndAwait,
} from '../../../shared/events/index.js';

// Map of roomId → resolver function for promise-based UI coordination
const activeIncomingCallResolvers = new Map();

export function showIncomingCallUI(call, onAccept, onReject) {
  if (!call?.roomId || activeIncomingCallResolvers.has(call.roomId)) return;

  const cleanup = () => {
    activeIncomingCallResolvers.delete(call.roomId);
    dispatchCommand('cmd:dialog:incoming-call:close', { roomId: call.roomId });
  };

  // Store resolver function for promise-based coordination via resolveIncomingCallUI()
  const resolver = (result) => {
    try {
      cleanup();
    } catch (_) {}
    return result;
  };

  activeIncomingCallResolvers.set(call.roomId, resolver);

  dispatchCommandAndAwait('cmd:dialog:incoming-call:open', {
    roomId: call.roomId,
    callerName: call.from,
    onAccept: async () => {
      try {
        if (onAccept) await onAccept();
      } finally {
        cleanup();
      }
    },
    onDecline: async () => {
      try {
        if (onReject) await onReject();
      } finally {
        cleanup();
      }
    },
  }).catch((error) => {
    console.warn('[incoming-call] failed to open incoming call dialog:', error);
  });
}

/**
 * Resolve the pending incoming call promise with a given result.
 * Called when call is answered elsewhere, caller cancels, or UI is dismissed.
 * @param {string} roomId - The room ID
 * @param {*} result - The result to resolve the promise with
 */
export function resolveIncomingCallUI(roomId, result) {
  const resolver = activeIncomingCallResolvers.get(roomId);
  if (resolver) {
    resolver(result);
  }
}

/**
 * Dismiss the incoming call UI for a specific room.
 * Used when caller cancels before callee responds or call is answered elsewhere.
 * @param {string} roomId - The room ID to dismiss
 */
export function dismissActiveIncomingCallUI(roomId) {
  if (roomId && activeIncomingCallResolvers.has(roomId)) {
    activeIncomingCallResolvers.delete(roomId);
    dispatchCommand('cmd:dialog:incoming-call:close', { roomId });
    return true;
  }
  return false;
}
