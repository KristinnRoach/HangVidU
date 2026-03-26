/**
 * Backend adapter contract for contacts storage.
 *
 * Adapters handle backend-specific IO only.
 * They do not validate domain policy, log, sort, localize, or emit events.
 */
export class ContactsStorageAdapter {
  /**
   * Read one contact record by id.
   * @param {string} contactId
   * @returns {Promise<import('./contact-schema.js').ContactRecord|null>}
   */
  async get(contactId) {
    throw new Error('Not implemented');
  }

  /**
   * Read all contact records for the active owner.
   * @returns {Promise<import('./contact-schema.js').ContactRecord[]>}
   */
  async list() {
    throw new Error('Not implemented');
  }

  /**
   * Persist one complete contact record.
   * @param {import('./contact-schema.js').ContactRecord} contactRecord
   * @returns {Promise<void>}
   */
  async put(contactRecord) {
    throw new Error('Not implemented');
  }

  /**
   * Remove one contact record by id.
   * @param {string} contactId
   * @returns {Promise<void>}
   */
  async remove(contactId) {
    throw new Error('Not implemented');
  }
}
