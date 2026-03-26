/**
 * Backend adapter contract for contacts storage.
 *
 * Adapters handle backend-specific IO only.
 * They do not validate domain policy, log, sort, localize, or emit events.
 */
export class ContactsStorageAdapter {
  /**
   * @param {string} contactId
   * @returns {Promise<Object|null>}
   */
  async get(contactId) {
    throw new Error('Not implemented');
  }

  /**
   * @returns {Promise<Object[]>}
   */
  async list() {
    throw new Error('Not implemented');
  }

  /**
   * @param {Object} contactRecord
   * @returns {Promise<void>}
   */
  async put(contactRecord) {
    throw new Error('Not implemented');
  }

  /**
   * @param {string} contactId
   * @returns {Promise<void>}
   */
  async remove(contactId) {
    throw new Error('Not implemented');
  }
}
