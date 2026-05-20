import { onMount } from 'solid-js';
import { useI18n } from '../../../shared/i18n/index.js';
import { UserPlus } from 'lucide-solid';

export default function AddContactButton() {
  const { t } = useI18n();

  async function handleClick() {
    try {
      const { showAddContactModal } = await import('../index.js');
      await showAddContactModal();
    } catch (error) {
      console.error('[AddContactButton] failed to open modal:', error);
    }
  }

  return (
    <button
      type='button'
      title={t('a11y.add_contact')}
      aria-label={t('a11y.add_contact')}
      id='add-contact-btn'
      onClick={handleClick}
    >
      <UserPlus />
    </button>
  );
}
