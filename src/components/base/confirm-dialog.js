let activeCleanup = null;

function confirmDialog(message, options = {}) {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
      <p>${message}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `;

    dialog.classList.add('confirm-dialog');

    const confirmBtn = dialog.querySelector('[data-action="confirm"]');
    const cancelBtn = dialog.querySelector('[data-action="cancel"]');

    if (!confirmBtn || !cancelBtn) {
      console.error('dialog element not found!');
      resolve(false);
      return;
    }

    let autoRemoveTimer = null;
    function cleanup(result) {
      if (autoRemoveTimer) clearTimeout(autoRemoveTimer);
      dialog.close();
      dialog.remove();
      if (activeCleanup === cleanup) activeCleanup = null;
      resolve(result);
    }

    confirmBtn.addEventListener('click', () => {
      cleanup(true);
    });

    cancelBtn.addEventListener('click', () => {
      cleanup(false);
    });

    dialog.addEventListener('cancel', () => cleanup(false));

    document.body.appendChild(dialog);
    dialog.showModal();

    // Track active cleanup handler for programmatic dismissal
    activeCleanup = cleanup;

    // Auto-remove after X seconds if options.autoRemoveSeconds is set
    if (
      options.autoRemoveSeconds &&
      typeof options.autoRemoveSeconds === 'number' &&
      options.autoRemoveSeconds > 0
    ) {
      autoRemoveTimer = setTimeout(() => {
        cleanup(false);
      }, options.autoRemoveSeconds * 1000);
    }
  });
}

export default confirmDialog;
export function dismissActiveConfirmDialog() {
  if (typeof activeCleanup === 'function') {
    try {
      activeCleanup(false);
    } catch (_) {}
    activeCleanup = null;
    return true;
  }
  return false;
}
