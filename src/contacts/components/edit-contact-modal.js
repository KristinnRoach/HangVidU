import { t } from '../../i18n/index.js';

/**
 * Opens a modal to edit a contact. Returns { action, name } or null if cancelled.
 */
export default function editContactModal(currentName) {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('edit-contact-dialog');
    dialog.innerHTML = `
      <form method="dialog">
        <label>${t('contact.name.edit')}
          <input type="text" autofocus />
        </label>
        <div class="edit-contact-actions">
          <button type="button" data-action="delete" class="danger">${t('contact.action.delete')}</button>
          <span class="spacer"></span>
          <button type="button" data-action="cancel">${t('shared.cancel')}</button>
          <button type="submit" data-action="save">${t('shared.save')}</button>
        </div>
      </form>
    `;

    const input = dialog.querySelector('input');
    input.value = currentName;

    function cleanup(result) {
      dialog.close();
      dialog.remove();
      resolve(result);
    }

    dialog.querySelector('[data-action="delete"]').onclick = () =>
      cleanup({ action: 'delete' });
    dialog.querySelector('[data-action="cancel"]').onclick = () =>
      cleanup(null);
    dialog.querySelector('form').onsubmit = (e) => {
      e.preventDefault();
      const name = input.value.trim();
      if (name && name !== currentName) cleanup({ action: 'rename', name });
      else cleanup(null);
    };
    dialog.addEventListener('cancel', () => cleanup(null));

    document.body.appendChild(dialog);
    dialog.showModal();

    // Track unsaved changes
    let hasUnsavedChanges = false;
    input.addEventListener('input', () => {
      hasUnsavedChanges = input.value.trim() !== currentName;
    });

    // Close on click outside (backdrop click) only if no unsaved changes
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog && !hasUnsavedChanges) {
        cleanup(null);
      }
    });
  });
}
