import { get, ref, remove, set } from 'firebase/database';
import { ContactsStorageAdapter } from './contacts-storage-adapter.js';

function assertGetOwnerId(getOwnerId) {
  if (typeof getOwnerId !== 'function') {
    throw new TypeError('getOwnerId must be a function');
  }

  return getOwnerId;
}

export class ContactsRTDBAdapter extends ContactsStorageAdapter {
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

  async get(contactId) {
    const snapshot = await get(ref(this.database, this._contactPath(contactId)));
    return snapshot.exists() ? snapshot.val() : null;
  }

  async list() {
    const snapshot = await get(ref(this.database, this._contactsPath()));
    if (!snapshot.exists()) {
      return [];
    }

    return Object.values(snapshot.val());
  }

  async put(contactRecord) {
    await set(
      ref(this.database, this._contactPath(contactRecord.contactId)),
      contactRecord,
    );
  }

  async remove(contactId) {
    await remove(ref(this.database, this._contactPath(contactId)));
  }
}

export function createContactsRTDBAdapter(options) {
  return new ContactsRTDBAdapter(options);
}
