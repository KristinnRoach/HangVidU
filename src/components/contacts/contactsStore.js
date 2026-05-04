import { createStore } from 'solid-js/store';
import {
  contactsService,
  ensureContactsHydrated,
  resetContactsState,
} from '../../features/contacts/contacts-service.js';

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
 * Currently written to by `setup/setupAppRoot.js`.
 *
 * Exposed as a store tuple: `[contacts, setContacts]`.
 *
 * @type {[ContactRow[], import('solid-js/store').SetStoreFunction<ContactRow[]>]}
 */
export const [contacts, setContacts] = createStore(
  /** @type {ContactRow[]} */ ([]),
);
