import { get, ref, remove, set } from 'firebase/database';
import { ContactsStorageAdapter } from './contacts-storage-adapter.js';

function assertGetOwnerId(getOwnerId) {
  if (typeof getOwnerId !== 'function') {
    throw new TypeError('getOwnerId must be a function');
  }

  return getOwnerId;
}

/**
 * RTDB adapter for contacts storage.
 */
export class ContactsRTDBAdapter extends ContactsStorageAdapter {
  /**
   * @param {{
   *   database: import('firebase/database').Database,
   *   getOwnerId: () => string
   * }} options
   */
  constructor({ database, getOwnerId }) {
    super();

    if (!database) {
      throw new TypeError('database is required');
    }

    this.database = database;
    this.getOwnerId = assertGetOwnerId(getOwnerId);
  }

  _resolveOwnerId() {
    const ownerId = this.getOwnerId();

    if (typeof ownerId !== 'string' || !ownerId.trim()) {
      throw new Error('contacts RTDB adapter requires a valid owner id');
    }

    return ownerId.trim();
  }

  _contactPath(contactId) {
    return `users/${this._resolveOwnerId()}/contacts/${contactId}`;
  }

  _contactsPath() {
    return `users/${this._resolveOwnerId()}/contacts`;
  }

  /**
   * @param {string} contactId
   * @returns {Promise<import('./contact-schema.js').ContactRecord|null>}
   */
  async get(contactId) {
    const snapshot = await get(ref(this.database, this._contactPath(contactId)));
    return snapshot.exists() ? snapshot.val() : null;
  }

  /**
   * @returns {Promise<import('./contact-schema.js').ContactRecord[]>}
   */
  async list() {
    const snapshot = await get(ref(this.database, this._contactsPath()));
    if (!snapshot.exists()) {
      return [];
    }

    return Object.values(snapshot.val());
  }

  /**
   * @param {import('./contact-schema.js').ContactRecord} contactRecord
   * @returns {Promise<void>}
   */
  async put(contactRecord) {
    await set(
      ref(this.database, this._contactPath(contactRecord.contactId)),
      contactRecord,
    );
  }

  /**
   * @param {string} contactId
   * @returns {Promise<void>}
   */
  async remove(contactId) {
    await remove(ref(this.database, this._contactPath(contactId)));
  }
}

/**
 * @param {ConstructorParameters<typeof ContactsRTDBAdapter>[0]} options
 * @returns {ContactsRTDBAdapter}
 */
export function createContactsRTDBAdapter(options) {
  return new ContactsRTDBAdapter(options);
}
