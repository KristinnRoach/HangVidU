import {
  assertContactId,
  mergeContactRecord,
  normalizeContactPatch,
  normalizeContactRecord,
} from './contact-record.js';

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
  constructor(adapter) {
    this.adapter = assertAdapter(adapter);
  }

  async get(contactId) {
    const normalizedContactId = assertContactId(contactId);
    const record = await this.adapter.get(normalizedContactId);
    return record ? normalizeContactRecord(record) : null;
  }

  async list() {
    const records = await this.adapter.list();

    if (!Array.isArray(records)) {
      throw new TypeError('contacts storage adapter list() must return an array');
    }

    return records.map((record) => normalizeContactRecord(record));
  }

  async put(contact) {
    const record = normalizeContactRecord(contact);
    await this.adapter.put(record);
    return record;
  }

  async patch(contactId, patch) {
    const normalizedContactId = assertContactId(contactId);
    normalizeContactPatch(patch);

    const existing = await this.get(normalizedContactId);
    if (!existing) {
      return null;
    }

    const nextRecord = mergeContactRecord(existing, patch);
    await this.adapter.put(nextRecord);
    return nextRecord;
  }

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

export function createContactsStore(adapter) {
  return new ContactsStore(adapter);
}
