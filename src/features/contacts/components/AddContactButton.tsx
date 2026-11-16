import { createSignal } from 'solid-js';
import { useI18n } from '@shared/i18n/index.js';
import { UserPlus } from 'lucide-solid';
import { AddContactDialog } from './AddContactDialog';

export function AddContactButton() {
  const { t } = useI18n();
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <button
        type='button'
        title={t('a11y.add_contact')}
        aria-label={t('a11y.add_contact')}
        id='add-contact-btn'
        onClick={() => setOpen(true)}
      >
        <UserPlus />
      </button>

      <AddContactDialog open={open()} onOpenChange={setOpen} />
    </>
  );
}
