import {
  dismissIncomingCallDialog,
  showIncomingCallDialog,
} from '../../../components/AppDialogHost.jsx';

// Map of roomId → resolver function for promise-based UI coordination
const activeIncomingCallResolvers = new Map();

export function showIncomingCallUI(call, onAccept, onReject) {
  if (!call?.roomId || activeIncomingCallResolvers.has(call.roomId)) return;

  const cleanup = () => {
    activeIncomingCallResolvers.delete(call.roomId);
    dismissIncomingCallDialog(call.roomId);
  };

  // Store resolver function for promise-based coordination via resolveIncomingCallUI()
  const resolver = (result) => {
    try {
      cleanup();
    } catch (_) {}
    return result;
  };

  activeIncomingCallResolvers.set(call.roomId, resolver);

  showIncomingCallDialog({
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
    dismissIncomingCallDialog(roomId);
    return true;
  }
  return false;
}
