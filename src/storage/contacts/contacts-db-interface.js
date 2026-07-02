/**
 * Backend adapter contract for contacts storage.
 *
 * Adapters handle backend-specific IO only.
 * They do not validate domain policy, log, sort, localize, or emit events.
 */
export class ContactsDBInterface {
  /**
   * Read one contact record by id.
   * @param {string} contactId
   * @returns {Promise<import('./contact-schema.js').ContactRecord|null>}
   */
  async get(_contactId) {
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
  async put(_contactRecord) {
    throw new Error('Not implemented');
  }

  /**
   * Apply a partial update to one contact record.
   * Returns the updated record, or `null` when the contact does not exist.
   *
   * @param {string} contactId
   * @param {import('./contact-schema.js').ContactPatch} patch
   * @returns {Promise<import('./contact-schema.js').ContactRecord|null>}
   */
  async patch(_contactId, _patch) {
    throw new Error('Not implemented');
  }

  /**
   * Remove one contact record by id.
   * @param {string} contactId
   * @returns {Promise<void>}
   */
  async remove(_contactId) {
    throw new Error('Not implemented');
  }
}
