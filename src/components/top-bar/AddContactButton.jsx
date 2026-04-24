import { onMount } from 'solid-js';
import { useI18n } from '../../shared/i18n/index.js';
import { initIcons } from '../../shared/components/ui/icons.js';

export default function AddContactButton() {
  const { t } = useI18n();
  let rootEl;

  onMount(() => {
    initIcons(rootEl);
  });

  async function handleClick() {
    try {
      const { showAddContactModal } = await import(
        '../../features/contacts/index.js'
      );
      await showAddContactModal();
    } catch (error) {
      console.error('[AddContactButton] failed to open modal:', error);
    }
  }

  return (
    <button
      ref={rootEl}
      type='button'
      title={t('a11y.add_contact')}
      aria-label={t('a11y.add_contact')}
      id='add-contact-btn'
      onClick={handleClick}
    >
      <i data-lucide='user-plus' />
    </button>
  );
}
