import { createSignal, onCleanup, onMount } from 'solid-js';
import { t } from '../../../shared/i18n/index.js';

export default function SaveContactNameDialog(props) {
  const [name, setName] = createSignal(props.initialName);
  let dialogEl;
  let inputEl;

  const trimmedName = () => name().trim();

  const close = (value) => {
    props.onClose(value);
  };

  const onSave = (event) => {
    event.preventDefault();
    const nextName = trimmedName();
    close(nextName || null);
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
      onClick={(event) => {
        if (event.target === dialogEl) {
          close(null);
        }
      }}
    >
      <form onSubmit={onSave}>
        <label>
          {t('contact.name.prompt')}
          <input
            ref={inputEl}
            type='text'
            value={name()}
            autofocus
            onInput={(event) => setName(event.currentTarget.value)}
          />
        </label>
        <div class='edit-contact-actions'>
          <span class='spacer' />
          <button type='button' onClick={() => close(null)}>
            {t('shared.cancel')}
          </button>
          <button type='submit'>{t('shared.save')}</button>
        </div>
      </form>
    </dialog>
  );
}
