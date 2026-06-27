import { get, ref, remove, runTransaction, set } from 'firebase/database';
import { ContactsDBInterface } from '../contacts-db-interface.js';
import {
  mergeContactRecord,
  normalizeContactRecord,
} from '../contact-transform.js';

// NOTE: Only kept temporarily for reference.
// Not used since 25. june 2026 - Likely needs updating to align correctly with current records if reused.

function assertGetOwnerId(getOwnerId) {
  if (typeof getOwnerId !== 'function') {
    throw new TypeError('getOwnerId must be a function');
  }

  return getOwnerId;
}

function safelyNormalizeContactRecord(record, context) {
  try {
    return normalizeContactRecord(record);
  } catch (error) {
    console.warn(
      `[ContactsRTDBAdapter] Skipping invalid contact record (${context})`,
      error,
    );
    return null;
  }
}

/**
 * RTDB adapter for contacts storage.
 */
export class ContactsRTDBAdapter extends ContactsDBInterface {
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

  #resolveOwnerId() {
    const ownerId = this.getOwnerId();

    if (typeof ownerId !== 'string' || !ownerId.trim()) {
      throw new Error('contacts RTDB adapter requires a valid owner id');
    }

    return ownerId.trim();
  }

  #contactPath(contactId) {
    return `users/${this.#resolveOwnerId()}/contacts/${contactId}`;
  }

  #contactsPath() {
    return `users/${this.#resolveOwnerId()}/contacts`;
  }

  /**
   * @param {string} contactId
   * @returns {Promise<import('../contact-schema.js').ContactRecord|null>}
   */
  async get(contactId) {
    const contactRef = ref(this.database, this.#contactPath(contactId));
    const snapshot = await get(contactRef);
    if (!snapshot.exists()) {
      return null;
    }

    return safelyNormalizeContactRecord(snapshot.val(), `get:${contactId}`);
  }

  /**
   * @returns {Promise<import('../contact-schema.js').ContactRecord[]>}
   */
  async list() {
    const snapshot = await get(ref(this.database, this.#contactsPath()));
    if (!snapshot.exists()) {
      return [];
    }

    return Object.entries(snapshot.val()).flatMap(([contactId, record]) => {
      const normalized = safelyNormalizeContactRecord(
        record,
        `list:${contactId}`,
      );
      return normalized ? [normalized] : [];
    });
  }

  /**
   * @param {import('../contact-schema.js').ContactRecord} contactRecord
   * @returns {Promise<void>}
   */
  async put(contactRecord) {
    if (!contactRecord?.contactId) {
      throw new TypeError('contactRecord.contactId is required');
    }

    await set(
      ref(this.database, this.#contactPath(contactRecord.contactId)),
      contactRecord,
    );
  }

  /**
   * @param {string} contactId
   * @param {import('../contact-schema.js').ContactPatch} patch
   * @returns {Promise<import('../contact-schema.js').ContactRecord|null>}
   */
  async patch(contactId, patch) {
    const contactRef = ref(this.database, this.#contactPath(contactId));

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
    await remove(ref(this.database, this.#contactPath(contactId)));
  }
}

/**
 * @param {ConstructorParameters<typeof ContactsRTDBAdapter>[0]} options
 * @returns {ContactsRTDBAdapter}
 */
export function createContactsRTDBAdapter(options) {
  return new ContactsRTDBAdapter(options);
}
