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

    if (
      !dialog.querySelector('[data-action="confirm"]') |
      dialog.querySelector('[data-action="cancel"]')
    ) {
      console.error('dialog element not found!');
      return;
    }

    dialog
      .querySelector('[data-action="confirm"]')
      .addEventListener('click', () => {
        dialog.close();
        resolve(true);
      });

    dialog
      .querySelector('[data-action="cancel"]')
      .addEventListener('click', () => {
        dialog.close();
        resolve(false);
      });

    dialog.addEventListener('cancel', () => resolve(false));

    document.body.appendChild(dialog);
    dialog.showModal();
  });
}

export default confirmDialog;
