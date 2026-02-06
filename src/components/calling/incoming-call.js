// Map of roomId → resolver function for promise-based UI coordination
const activeIncomingCallResolvers = new Map();

export function showIncomingCallUI(call, onAccept, onReject) {
  // Minimal ui for testing: transient DOM node appended to body; style with CSS in your app
  const id = `incoming-call-${call.roomId}`;
  if (document.getElementById(id)) return; // avoid duplicates

  const container = document.createElement('div');
  container.id = id;
  container.className = 'incoming-call-notification';

  const msg = document.createElement('div');
  msg.textContent = `${call.from} is calling...`;

  const acceptBtn = document.createElement('button');
  acceptBtn.textContent = 'Accept';
  acceptBtn.onclick = async () => {
    acceptBtn.disabled = true;
    if (onAccept) await onAccept();
    container.remove();
    activeIncomingCallResolvers.delete(call.roomId);
  };

  const rejectBtn = document.createElement('button');
  rejectBtn.textContent = 'Decline';
  rejectBtn.onclick = async () => {
    if (onReject) await onReject();
    container.remove();
    activeIncomingCallResolvers.delete(call.roomId);
  };

  container.appendChild(msg);
  container.appendChild(acceptBtn);
  container.appendChild(rejectBtn);
  document.body.appendChild(container);

  // Return resolver function for promise-based coordination
  // Caller stores this in the Map to resolve the promise when needed
  const resolver = (result) => {
    try {
      container.remove();
    } catch (_) {}
    activeIncomingCallResolvers.delete(call.roomId);
    return result;
  };

  activeIncomingCallResolvers.set(call.roomId, resolver);
  return resolver;
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
  const container = roomId ? document.getElementById(`incoming-call-${roomId}`) : null;
  if (container) {
    try {
      container.remove();
    } catch (_) {}
    activeIncomingCallResolvers.delete(roomId);
    return true;
  }
  return false;
}
