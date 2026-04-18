import { createSignal, onCleanup, onMount } from 'solid-js';
import { useI18n } from '../../shared/i18n/index.js';

export default function EditContactDialog(props) {
  const { t } = useI18n();
  const [name, setName] = createSignal(props.currentName);
  let dialogEl;
  let inputEl;

  const trimmedName = () => name().trim();
  const hasUnsavedChanges = () => trimmedName() !== props.currentName;

  const close = (value) => {
    props.onClose(value);
  };

  const onSave = (event) => {
    event.preventDefault();
    const nextName = trimmedName();
    if (nextName && nextName !== props.currentName) {
      close({ action: 'rename', name: nextName });
      return;
    }
    close(null);
  };

  const onBackdropClick = (event) => {
    if (event.target === dialogEl && !hasUnsavedChanges()) {
      close(null);
    }
  };

  onMount(() => {
    dialogEl?.showModal();
    inputEl?.focus();
    inputEl?.select();
  });

  onCleanup(() => {
    if (dialogEl?.open) {
      dialogEl.close();
    }
  });

  return (
    <dialog
      ref={dialogEl}
      class='edit-contact-dialog'
      onCancel={(event) => {
        event.preventDefault();
        close(null);
      }}
      onClick={onBackdropClick}
    >
      <form onSubmit={onSave}>
        <label>
          {t('contact.name.edit')}
          <input
            ref={inputEl}
            type='text'
            value={name()}
            autofocus
            onInput={(event) => setName(event.currentTarget.value)}
          />
        </label>
        <div class='edit-contact-actions'>
          <button
            type='button'
            data-action='delete'
            class='danger'
            onClick={() => close({ action: 'delete' })}
          >
            {t('contact.action.delete')}
          </button>
          <span class='spacer' />
          <button type='button' data-action='cancel' onClick={() => close(null)}>
            {t('shared.cancel')}
          </button>
          <button type='submit' data-action='save'>
            {t('shared.save')}
          </button>
        </div>
      </form>
    </dialog>
  );
}
