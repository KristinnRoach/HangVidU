import { For, Show, createEffect } from 'solid-js';
import { useI18n } from '../../../shared/i18n/index';
import ContactEntry from './ContactEntry';
import { useContacts } from '../useContacts';
import { open as openSelectedConversation } from '../../../stores/selectedConversationStore';

export default function ContactsList() {
  const { t } = useI18n();
  const { contacts } = useContacts();

  createEffect(() => {
    if (contacts.length === 0) return;
    if (contacts[0].conversationId) {
      openSelectedConversation({
        conversationId: contacts[0].conversationId,
        displayUI: false,
      });
    }
  });

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
              />
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
