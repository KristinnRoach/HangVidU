export function initJoinRoomForm(container, onSubmit) {
  if (!container) return;

  // Build form structure
  const form = document.createElement('form');
  form.id = 'join-room-form';

  const inputAndButtonContainer = document.createElement('div');
  inputAndButtonContainer.style.display = 'flex';
  inputAndButtonContainer.style.gap = '10px';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'room-id-input';
  input.placeholder = 'Enter Room ID';
  input.autocomplete = 'off';

  const button = document.createElement('button');
  button.type = 'submit';
  button.id = 'join-room-btn';
  button.title = 'Join existing room';
  button.textContent = 'Join';

  // Assemble
  inputAndButtonContainer.append(input, button);
  form.append(inputAndButtonContainer);

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
