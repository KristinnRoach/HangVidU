export function joinRoomForm(container, onSubmit) {
  if (!container) return;

  // Build form structure
  const form = document.createElement('form');
  form.id = 'join-room-form';
  form.className = 'flex-row';
  form.style.marginTop = '20px';

  const label = document.createElement('p');
  label.textContent = 'Join existing room:';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'room-id-input';
  input.placeholder = 'Enter Room ID';

  const button = document.createElement('button');
  button.type = 'submit';
  button.id = 'join-room-btn';
  button.title = 'Join existing room';
  button.textContent = 'Join';

  // Assemble
  form.append(label, input, button);

  // Prevent navigation and invoke provided handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      try {
        await onSubmit(input.value || '');
      } catch (err) {
        // non-fatal; let caller handle errors via status UI
        console.warn('joinRoomForm submit handler error', err);
      }
    }
  });

  // Mount into container
  container.innerHTML = '';
  container.appendChild(form);
}
