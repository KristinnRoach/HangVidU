let activeIncomingCallCleanup = null;

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
    if (activeIncomingCallCleanup === cleanup) activeIncomingCallCleanup = null;
  };

  const rejectBtn = document.createElement('button');
  rejectBtn.textContent = 'Decline';
  rejectBtn.onclick = async () => {
    if (onReject) await onReject();
    container.remove();
    if (activeIncomingCallCleanup === cleanup) activeIncomingCallCleanup = null;
  };

  // Cleanup function for programmatic dismissal
  function cleanup() {
    container.remove();
    if (activeIncomingCallCleanup === cleanup) activeIncomingCallCleanup = null;
  }

  container.appendChild(msg);
  container.appendChild(acceptBtn);
  container.appendChild(rejectBtn);
  document.body.appendChild(container);

  // Track active cleanup for programmatic dismissal
  activeIncomingCallCleanup = cleanup;
}

/**
 * Dismiss the active incoming call UI (if any)
 * Used when caller cancels before callee responds
 */
export function dismissActiveIncomingCallUI() {
  if (typeof activeIncomingCallCleanup === 'function') {
    try {
      activeIncomingCallCleanup();
    } catch (_) {}
    activeIncomingCallCleanup = null;
    return true;
  }
  return false;
}
