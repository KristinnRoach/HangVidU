import { ContactsStorageAdapter } from './contacts-storage-adapter.js';

function getDefaultStorage() {
  if (!globalThis.localStorage) {
    throw new Error('localStorage is not available');
  }

  return globalThis.localStorage;
}

function assertStorageKey(storageKey) {
  if (typeof storageKey !== 'string' || !storageKey.trim()) {
    throw new TypeError('storageKey must be a non-empty string');
  }

  return storageKey.trim();
}

export class ContactsLocalAdapter extends ContactsStorageAdapter {
  constructor({ storage = getDefaultStorage(), storageKey = 'contacts' } = {}) {
    super();
    this.storage = storage;
    this.storageKey = assertStorageKey(storageKey);
  }

  _readMap() {
    const raw = this.storage.getItem(this.storageKey);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new TypeError('contacts local storage payload must be an object');
    }

    return parsed;
  }

  _writeMap(map) {
    this.storage.setItem(this.storageKey, JSON.stringify(map));
  }

  async get(contactId) {
    const map = this._readMap();
    return map[contactId] ?? null;
  }

  async list() {
    const map = this._readMap();
    return Object.values(map);
  }

  async put(contactRecord) {
    const map = this._readMap();
    map[contactRecord.contactId] = contactRecord;
    this._writeMap(map);
  }

  async remove(contactId) {
    const map = this._readMap();

    if (!(contactId in map)) {
      return;
    }

    delete map[contactId];
    this._writeMap(map);
  }
}

export function createContactsLocalAdapter(options) {
  return new ContactsLocalAdapter(options);
}
