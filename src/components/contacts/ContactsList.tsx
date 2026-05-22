import { For, Show, createSignal, createEffect } from 'solid-js';
import { useI18n } from '../../shared/i18n/index.js';
import ContactEntry from './ContactEntry.jsx';
import { useContacts } from '../../contacts/useContacts.js';
import type { ConversationSelection } from '../../features/messaging-next/interfaces.js';

type ContactsListProps = {
  onOpenConversation?: (selection: ConversationSelection) => void;
};

export default function ContactsList(props: ContactsListProps) {
  const { t } = useI18n();
  const { contacts } = useContacts();

  const [mruConversationId, setMruConversationId] = createSignal<string | null>(
    null,
  );

  createEffect(() => {
    if (contacts.length === 0) return;
    if (!mruConversationId() && contacts[0].conversationId) {
      props.onOpenConversation?.({
        conversationId: contacts[0].conversationId,
        displayUI: false,
      });
      setMruConversationId(contacts[0].conversationId);
    }
  });

  const openConversation = (selection: ConversationSelection) => {
    setMruConversationId(selection.conversationId);
    props.onOpenConversation?.(selection);
  };

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
                unreadCount={row.unreadCount}
                onOpenConversation={openConversation}
              />
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
