import { createSignal, onCleanup, onMount } from 'solid-js';
import { useI18n } from '../../../shared/i18n/index.js';
import { deleteContact, updateContact } from '../../../stores/contact-store.js';

export default function EditContactDialog(props) {
  const { t } = useI18n();
  const [name, setName] = createSignal(
    typeof props.currentName === 'string' ? props.currentName : '',
  );
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  let dialogEl;
  let inputEl;

  const trimmedName = () => name().trim();
  const normalizedCurrentName =
    typeof props.currentName === 'string' ? props.currentName : '';
  const hasUnsavedChanges = () => trimmedName() !== normalizedCurrentName;

  const close = (value) => {
    props.onClose(value);
  };

  const onSave = async (event) => {
    event.preventDefault();
    if (isSubmitting()) return;

    const nextName = trimmedName();

    if (!nextName || nextName === normalizedCurrentName) {
      close();
      return;
    }

    setIsSubmitting(true);

    try {
      const updated = await updateContact(
        props.contactId,
        nextName,
        props.roomId,
      );

      if (updated) {
        close();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onBackdropClick = (event) => {
    if (event.target === dialogEl && !hasUnsavedChanges() && !isSubmitting()) {
      close();
    }
  };

  const onDelete = async () => {
    if (isSubmitting()) return;

    setIsSubmitting(true);

    try {
      const deleted = await deleteContact(props.contactId);
      if (deleted) {
        close();
      }
    } finally {
      setIsSubmitting(false);
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
        if (!isSubmitting()) {
          close();
        }
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
            onClick={onDelete}
            disabled={isSubmitting()}
          >
            {t('contact.action.delete')}
          </button>
          <span class='spacer' />
          <button
            type='button'
            data-action='cancel'
            onClick={() => close()}
            disabled={isSubmitting()}
          >
            {t('shared.cancel')}
          </button>
          <button type='submit' data-action='save' disabled={isSubmitting()}>
            {t('shared.save')}
          </button>
        </div>
      </form>
    </dialog>
  );
}
