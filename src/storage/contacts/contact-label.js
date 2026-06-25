import { t } from '@shared/i18n';

export function getContactLabel(contact) {
  return (
    contact?.nickname ||
    contact?.displayName ||
    contact?.username ||
    t('shared.unknown')
  );
}
