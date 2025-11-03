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
  };

  const rejectBtn = document.createElement('button');
  rejectBtn.textContent = 'Decline';
  rejectBtn.onclick = async () => {
    if (onReject) await onReject();
    container.remove();
  };

  container.appendChild(msg);
  container.appendChild(acceptBtn);
  container.appendChild(rejectBtn);
  document.body.appendChild(container);
}
