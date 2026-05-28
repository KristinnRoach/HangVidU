import { For, Show } from 'solid-js';
import { useI18n } from '../../../shared/i18n/index';
import ContactEntry from './ContactEntry';
import { useContacts } from '../useContacts';

export default function ContactsList() {
  const { t } = useI18n();
  const { contacts } = useContacts();

  return (
    <div class='contacts-container'>
      <Show when={contacts.length > 0} fallback={<p>{t('contact.none')}</p>}>
        <div class='contacts-list'>
          <For each={contacts}>
            {(row) => (
              <ContactEntry
                id={row.id}
                name={row.name}
                conversationId={row.conversationId}
                hasUnread={row.hasUnread}
              />
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
