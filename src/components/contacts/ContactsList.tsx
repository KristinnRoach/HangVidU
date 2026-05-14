import { For, Show } from 'solid-js';
import { useI18n } from '../../shared/i18n/index.js';
import ContactEntry from './ContactEntry.jsx';
import { useContactsList } from './useContactsList';

export default function ContactsList() {
  const { t } = useI18n();
  const contacts = useContactsList();

  return (
    <div class='contacts-container'>
      <Show when={contacts.length > 0} fallback={<p>{t('contact.none')}</p>}>
        <div class='contacts-list'>
          <For each={contacts}>
            {(row) => (
              <ContactEntry
                id={row.id}
                name={row.name}
                roomId={row.roomId}
                conversationId={row.conversationId}
                unreadCount={row.unreadCount}
              />
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
