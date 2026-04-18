import { For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { t } from '../../shared/i18n/index.js';
import ContactEntry from './ContactEntry.jsx';

/**
 * @typedef {Object} ContactRow
 * @property {string} id
 * @property {string|null} name
 * @property {string|null} roomId
 * @property {string|null} conversationId
 * @property {number} unreadCount
 */

/**
 * Module-level reactive store for the contacts list.
 * Written to by `setup/setupAppRoot.js`.
 * Read by the `<ContactsList />` component below.
 *
 * Exposed as a store tuple: `[contacts, setContacts]`.
 *
 * @type {[ContactRow[], import('solid-js/store').SetStoreFunction<ContactRow[]>]}
 */
export const [contacts, setContacts] = createStore(/** @type {ContactRow[]} */ ([]));

/**
 * Contacts list view. Pure — reads the store, renders rows or empty state.
 * All side effects live in `setup/setupAppRoot.js`.
 */
export default function ContactsList() {
  return (
    <div class="contacts-container">
      <Show
        when={contacts.length > 0}
        fallback={<p>{t('contact.none')}</p>}
      >
        <div class="contacts-list">
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
