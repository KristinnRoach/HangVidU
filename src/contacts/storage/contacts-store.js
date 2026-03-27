import {
  assertContactId,
  mergeContactRecord,
  normalizeContactPatch,
  normalizeContactRecord,
} from './contact-transform.js';

function assertAdapter(adapter) {
  if (!adapter || typeof adapter !== 'object') {
    throw new TypeError('contacts storage adapter is required');
  }

  const requiredMethods = ['get', 'list', 'put', 'remove'];

  for (const methodName of requiredMethods) {
    if (typeof adapter[methodName] !== 'function') {
      throw new TypeError(
        `contacts storage adapter must implement ${methodName}()`,
      );
    }
  }

  return adapter;
}

/**
 * Public storage facade for the contacts module.
 *
 * Contract:
 * - throws on invalid input and backend failures
 * - returns plain domain values for normal outcomes
 * - stays backend-agnostic
 */
export class ContactsStore {
  /**
   * @param {import('./contacts-storage-adapter.js').ContactsStorageAdapter} adapter
   */
  constructor(adapter) {
    this.adapter = assertAdapter(adapter);
  }

  /**
   * Read one contact from storage.
   * @param {string} contactId
   * @returns {Promise<import('./contact-schema.js').ContactRecord|null>}
   */
  async get(contactId) {
    const normalizedContactId = assertContactId(contactId);
    const record = await this.adapter.get(normalizedContactId);
    return record ? normalizeContactRecord(record) : null;
  }

  /**
   * Read all contacts from storage.
   * @returns {Promise<import('./contact-schema.js').ContactRecord[]>}
   */
  async list() {
    const records = await this.adapter.list();

    if (!Array.isArray(records)) {
      throw new TypeError(
        'contacts storage adapter list() must return an array',
      );
    }

    return records.map((record) => normalizeContactRecord(record));
  }

  /**
   * Persist one complete contact record.
   * @param {unknown} contact
   * @returns {Promise<import('./contact-schema.js').ContactRecord>}
   */
  async put(contact) {
    const record = normalizeContactRecord(contact);
    await this.adapter.put(record);
    return record;
  }

  /**
   * Apply a partial update to an existing contact.
   * Returns `null` when the contact does not exist.
   *
   * @param {string} contactId
   * @param {unknown} patch
   * @returns {Promise<import('./contact-schema.js').ContactRecord|null>}
   */
  async patch(contactId, patch) {
    const normalizedContactId = assertContactId(contactId);
    const normalizedPatch = normalizeContactPatch(patch);

    const existing = await this.get(normalizedContactId);
    if (!existing) {
      return null;
    }

    const nextRecord = mergeContactRecord(existing, normalizedPatch);
    await this.adapter.put(nextRecord);
    return nextRecord;
  }

  /**
   * Remove a contact from storage.
   * Returns `false` when the contact does not exist.
   *
   * @param {string} contactId
   * @returns {Promise<boolean>}
   */
  async remove(contactId) {
    const normalizedContactId = assertContactId(contactId);
    const existing = await this.adapter.get(normalizedContactId);

    if (!existing) {
      return false;
    }

    await this.adapter.remove(normalizedContactId);
    return true;
  }
}

/**
 * @param {import('./contacts-storage-adapter.js').ContactsStorageAdapter} adapter
 * @returns {ContactsStore}
 */
export function createContactsStore(adapter) {
  return new ContactsStore(adapter);
}
