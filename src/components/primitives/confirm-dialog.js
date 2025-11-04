function confirmDialog(message) {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
      <p>${message}</p>
      <div>
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `;

    const confirmBtn = dialog.querySelector('[data-action="confirm"]');
    const cancelBtn = dialog.querySelector('[data-action="cancel"]');

    if (!confirmBtn || !cancelBtn) {
      console.error('dialog element not found!');
      resolve(false);
      return;
    }

    confirmBtn.addEventListener('click', () => {
      dialog.close();
      resolve(true);
    });

    cancelBtn.addEventListener('click', () => {
      dialog.close();
      resolve(false);
    });

    dialog.addEventListener('cancel', () => resolve(false));

    document.body.appendChild(dialog);
    dialog.showModal();
  });
}

export default confirmDialog;
