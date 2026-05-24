import { For, Show, createEffect } from 'solid-js';
import { useI18n } from '../../shared/i18n/index';
import ContactEntry from './ContactEntry';
import { useContacts } from '../useContacts';
import type { ConversationSelection } from '../../features/messaging-next/interfaces';

type ContactsListProps = {
  onOpenConversation?: (selection: ConversationSelection) => void;
};

export default function ContactsList(props: ContactsListProps) {
  const { t } = useI18n();
  const { contacts } = useContacts();

  createEffect(() => {
    if (contacts.length === 0) return;
    if (contacts[0].conversationId) {
      props.onOpenConversation?.({
        conversationId: contacts[0].conversationId,
        displayUI: false,
      });
    }
  });

  const openConversation = (selection: ConversationSelection) => {
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
