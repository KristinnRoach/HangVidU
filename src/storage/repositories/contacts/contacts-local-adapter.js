import { ContactsStorageAdapter } from './contacts-storage-adapter.js';
import { mergeContactRecord, normalizeContactRecord } from './contact-transform.js';

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

/**
 * localStorage adapter for contacts storage.
 */
export class ContactsLocalAdapter extends ContactsStorageAdapter {
  /**
   * @param {{
   *   storage?: Pick<Storage, 'getItem' | 'setItem'>,
   *   storageKey?: string
   * }} [options]
   */
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

  /**
   * @param {Record<string, import('./contact-schema.js').ContactRecord>} map
   * @returns {void}
   */
  _writeMap(map) {
    this.storage.setItem(this.storageKey, JSON.stringify(map));
  }

  /**
   * @param {string} contactId
   * @returns {Promise<import('./contact-schema.js').ContactRecord|null>}
   */
  async get(contactId) {
    const map = this._readMap();
    const existing = map[contactId] ?? null;
    if (!existing) {
      return null;
    }

    return normalizeContactRecord(existing);
  }

  /**
   * @returns {Promise<import('./contact-schema.js').ContactRecord[]>}
   */
  async list() {
    const map = this._readMap();
    return Object.values(map).map((record) => normalizeContactRecord(record));
  }

  /**
   * @param {import('./contact-schema.js').ContactRecord} contactRecord
   * @returns {Promise<void>}
   */
  async put(contactRecord) {
    const map = this._readMap();
    map[contactRecord.contactId] = contactRecord;
    this._writeMap(map);
  }

  /**
   * @param {string} contactId
   * @param {import('./contact-schema.js').ContactPatch} patch
   * @returns {Promise<import('./contact-schema.js').ContactRecord|null>}
   */
  async patch(contactId, patch) {
    const map = this._readMap();
    const existing = map[contactId] ?? null;

    if (!existing) {
      return null;
    }

    const nextRecord = mergeContactRecord(existing, patch);
    map[contactId] = nextRecord;
    this._writeMap(map);
    return nextRecord;
  }

  /**
   * @param {string} contactId
   * @returns {Promise<void>}
   */
  async remove(contactId) {
    const map = this._readMap();

    if (!(contactId in map)) {
      return;
    }

    delete map[contactId];
    this._writeMap(map);
  }
}

/**
 * @param {ConstructorParameters<typeof ContactsLocalAdapter>[0]} [options]
 * @returns {ContactsLocalAdapter}
 */
export function createContactsLocalAdapter(options) {
  return new ContactsLocalAdapter(options);
}
