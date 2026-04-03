import { t } from '../../../i18n/index.js';

// Map of roomId → resolver function for promise-based UI coordination
const activeIncomingCallResolvers = new Map();

export function showIncomingCallUI(call, onAccept, onReject) {
  const id = `incoming-call-${call.roomId}`;
  if (document.getElementById(id)) return; // avoid duplicates

  const container = document.createElement('dialog');
  container.id = id;
  container.className = 'incoming-call-dialog';

  // Prevent ESC key from closing the dialog
  container.addEventListener('cancel', (e) => {
    e.preventDefault();
  });

  const msg = document.createElement('div');
  msg.textContent = t('call.incoming', { name: call.from });

  const cleanup = () => {
    container.close();
    container.remove();
    activeIncomingCallResolvers.delete(call.roomId);
  };

  const acceptBtn = document.createElement('button');
  acceptBtn.textContent = t('call.accept');
  acceptBtn.onclick = async () => {
    acceptBtn.disabled = true;
    try {
      if (onAccept) await onAccept();
    } finally {
      cleanup();
    }
  };

  const rejectBtn = document.createElement('button');
  rejectBtn.textContent = t('call.decline');
  rejectBtn.onclick = async () => {
    rejectBtn.disabled = true;
    try {
      if (onReject) await onReject();
    } finally {
      cleanup();
    }
  };

  container.appendChild(msg);
  container.appendChild(acceptBtn);
  container.appendChild(rejectBtn);
  document.body.appendChild(container);

  // Show as modal dialog (blocks interaction with page)
  container.showModal();

  // Store resolver function for promise-based coordination via resolveIncomingCallUI()
  const resolver = (result) => {
    try {
      cleanup();
    } catch (_) {}
    return result;
  };

  activeIncomingCallResolvers.set(call.roomId, resolver);
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
  const container = roomId
    ? document.getElementById(`incoming-call-${roomId}`)
    : null;
  if (container) {
    try {
      if (container.open) container.close();
      container.remove();
    } catch (_) {}
    activeIncomingCallResolvers.delete(roomId);
    return true;
  }
  return false;
}
