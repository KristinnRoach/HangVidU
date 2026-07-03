import { For, Show } from 'solid-js';
import { Spinner } from '../../../components/app/Spinner';
import { useI18n } from '../../../shared/i18n/index';
import ContactEntry from './ContactEntry';
import { useContacts } from '../useContacts';

export default function ContactsList() {
  const { t } = useI18n();
  const { contacts, isLoading } = useContacts();

  return (
    <div class="contacts-container">
      <Show when={!isLoading()} fallback={<Spinner size={32} />}>
        <Show
          when={contacts.length > 0}
          fallback={
            <div class="contacts-list empty">
              <p>{t('contact.none')}</p>
            </div>
          }
        >
          <div class="contacts-list">
            <For each={contacts}>
              {(row) => (
                <ContactEntry
                  id={row.id}
                  label={row.label}
                  hasUnread={row.hasUnread}
                />
              )}
            </For>
          </div>
        </Show>
      </Show>
    </div>
  );
}
