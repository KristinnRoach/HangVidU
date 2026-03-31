/**
 * @typedef {import('./storage/contact-schema.js').ContactRecord} ContactRecord
 */

/**
 * Sort contacts by most recent interaction, then by name.
 *
 * @param {ContactRecord[]} contacts
 * @returns {ContactRecord[]}
 */
export function sortContactsByLastInteraction(contacts) {
  return [...contacts].sort((a, b) => {
    const aTime = a?.lastInteractionAt || a?.savedAt || 0;
    const bTime = b?.lastInteractionAt || b?.savedAt || 0;

    if (aTime !== bTime) {
      return bTime - aTime;
    }

    const aName = (a?.contactName || '').toLowerCase();
    const bName = (b?.contactName || '').toLowerCase();
    return aName.localeCompare(bName);
  });
}

/**
 * Convert a contact array into a contact-id keyed map.
 *
 * @param {ContactRecord[]} contacts
 * @returns {Record<string, ContactRecord>}
 */
export function toContactMap(contacts) {
  const map = {};

  for (const contact of contacts) {
    if (!contact?.contactId) {
      continue;
    }

    map[contact.contactId] = contact;
  }

  return map;
}

/**
 * Read all contacts as a map keyed by `contactId`.
 *
 * @param {import('./storage/contacts-store.js').ContactsStore} storage
 * @returns {Promise<Record<string, ContactRecord>>}
 */
export async function getAllContacts(storage) {
  return toContactMap(await storage.list());
}

/**
 * Read all contacts sorted by last interaction time.
 *
 * @param {import('./storage/contacts-store.js').ContactsStore} storage
 * @param {string} [sortedBy='lastInteractionAt']
 * @returns {Promise<ContactRecord[]>}
 */
export async function getAllContactsSorted(
  storage,
  sortedBy = 'lastInteractionAt',
) {
  if (sortedBy !== 'lastInteractionAt') {
    console.warn(
      `[contact-query] Unsupported sort field "${sortedBy}", defaulting to "lastInteractionAt"`,
    );
  }

  return sortContactsByLastInteraction(await storage.list());
}

/**
 * Read the most recently interacted contact.
 *
 * @param {import('./storage/contacts-store.js').ContactsStore} storage
 * @returns {Promise<ContactRecord|null>}
 */
export async function getContactByMostRecentInteraction(storage) {
  const contacts = await storage.list();
  return sortContactsByLastInteraction(contacts)[0] || null;
}

/**
 * Find a contact by room id.
 *
 * @param {import('./storage/contacts-store.js').ContactsStore} storage
 * @param {string|null|undefined} roomId
 * @returns {Promise<ContactRecord|null>}
 */
export async function getContactByRoomId(storage, roomId) {
  if (!roomId) {
    return null;
  }

  const contacts = await storage.list();

  for (const contact of contacts) {
    if (contact?.roomId === roomId) {
      return contact;
    }
  }

  return null;
}
