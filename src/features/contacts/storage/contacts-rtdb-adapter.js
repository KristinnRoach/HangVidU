import { get, ref, remove, runTransaction, set } from 'firebase/database';
import { ContactsStorageAdapter } from './contacts-storage-adapter.js';
import { canonicalizeContactRecord, mergeContactRecord } from './contact-transform.js';

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
    const contactRef = ref(this.database, this._contactPath(contactId));
    const snapshot = await get(contactRef);
    if (!snapshot.exists()) {
      return null;
    }

    const { record, didPromoteLegacyContactName } = canonicalizeContactRecord(
      snapshot.val(),
    );
    if (didPromoteLegacyContactName) {
      await set(contactRef, record);
    }

    return record;
  }

  /**
   * @returns {Promise<import('./contact-schema.js').ContactRecord[]>}
   */
  async list() {
    const snapshot = await get(ref(this.database, this._contactsPath()));
    if (!snapshot.exists()) {
      return [];
    }

    const entries = Object.entries(snapshot.val());
    /** @type {import('./contact-schema.js').ContactRecord[]} */
    const records = [];

    for (const [contactId, value] of entries) {
      const { record, didPromoteLegacyContactName } =
        canonicalizeContactRecord(value);
      records.push(record);

      if (didPromoteLegacyContactName) {
        await set(ref(this.database, this._contactPath(contactId)), record);
      }
    }

    return records;
  }

  /**
   * @param {import('./contact-schema.js').ContactRecord} contactRecord
   * @returns {Promise<void>}
   */
  async put(contactRecord) {
    if (!contactRecord?.contactId) {
      throw new TypeError('contactRecord.contactId is required');
    }

    await set(
      ref(this.database, this._contactPath(contactRecord.contactId)),
      contactRecord,
    );
  }

  /**
   * @param {string} contactId
   * @param {import('./contact-schema.js').ContactPatch} patch
   * @returns {Promise<import('./contact-schema.js').ContactRecord|null>}
   */
  async patch(contactId, patch) {
    const contactRef = ref(this.database, this._contactPath(contactId));

    const result = await runTransaction(
      contactRef,
      (current) => {
        if (current == null) {
          // Intentionally abort this transaction attempt on null current state.
          // The fallback get->merge->set path below handles the write when data exists.
          return;
        }

        return mergeContactRecord(current, patch);
      },
      { applyLocally: false },
    );

    if (!result.committed) {
      const latestSnapshot = await get(contactRef);
      if (!latestSnapshot.exists()) {
        return null;
      }

      const mergedRecord = mergeContactRecord(latestSnapshot.val(), patch);
      await set(contactRef, mergedRecord);
      return mergedRecord;
    }

    const nextRecord = result.snapshot.val();
    return nextRecord == null ? null : nextRecord;
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
