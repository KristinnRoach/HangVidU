import { For, Show } from 'solid-js';
import { useI18n } from '../../shared/i18n/index.js';
import ContactEntry from './ContactEntry.jsx';
import { useContactsList } from './useContactsList';
import type { ConversationSelection } from '../../features/messaging-next/interfaces.js';

type ContactsListProps = {
  onOpenConversation?: (selection: ConversationSelection) => void;
};

export default function ContactsList(props: ContactsListProps) {
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
                onOpenConversation={props.onOpenConversation}
              />
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
