import { createSignal, onCleanup, onMount } from 'solid-js';
import { useI18n } from '../../shared/i18n/index.js';
import { contactsService } from '../../features/contacts/index.js';

export default function SaveContactDialog(props) {
  const { t } = useI18n();
  const [name, setName] = createSignal('');
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [error, setError] = createSignal(null);

  let dialogEl;
  let inputEl;

  const trimmedName = () => name().trim();

  const close = (value) => {
    props.onClose(value);
  };

  const onSave = async (event) => {
    event.preventDefault();
    if (isSubmitting()) return;

    setIsSubmitting(true);

    try {
      setError(null);
      const nextName = trimmedName() || props.contactId;
      const savedContact = await contactsService.saveContact(
        props.contactId,
        nextName,
        props.roomId,
      );

      if (savedContact) {
        close(true);
      } else {
        setError(t('contact.save.error'));
      }
    } catch (_error) {
      setError(t('contact.save.error'));
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
          close(false);
        }
      }}
      onClick={(event) => {
        if (event.target === dialogEl && !isSubmitting()) {
          close(false);
        }
      }}
    >
      <form onSubmit={onSave}>
        <label>
          {t('contact.save.confirm')}
          <input
            ref={inputEl}
            type='text'
            value={name()}
            autofocus
            onInput={(event) => setName(event.currentTarget.value)}
          />
        </label>
        {
          error() && <div class='error-message'>{error()}</div> // TODO: use toast
        }
        <div class='edit-contact-actions'>
          <span class='spacer' />
          <button
            type='button'
            onClick={() => close(false)}
            disabled={isSubmitting()}
          >
            {t('shared.cancel')}
          </button>
          <button type='submit' disabled={isSubmitting()}>
            {t('shared.save')}
          </button>
        </div>
      </form>
    </dialog>
  );
}
