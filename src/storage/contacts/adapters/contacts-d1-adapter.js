import { ContactsDBInterface } from '../contacts-db-interface.js';
import { createWorkerRequest } from '../../worker-request.js';

/**
 * D1 adapter for contacts storage — talks to the hangvidu-data Worker's
 * /users/me/contacts endpoints. The owner is the authenticated caller (uid from
 * the bearer token).
 *
 * Wire shape mirrors ContactRecordSchema, so the worker's rows pass straight
 * through; the repository normalizes them.
 */
export class ContactsD1Adapter extends ContactsDBInterface {
  /**
   * @param {{ baseUrl: string, getToken: () => Promise<string|null> }} options
   */
  constructor({ baseUrl, getToken }) {
    super();
    this._request = createWorkerRequest({ baseUrl, getToken });
  }

  async get(contactId) {
    try {
      const { contact } = await this._request(
        'GET',
        `/users/me/contacts/${encodeURIComponent(contactId)}`,
      );
      return contact ?? null;
    } catch (error) {
      if (error?.status === 404) return null;
      throw error;
    }
  }

  async list() {
    const { contacts } = await this._request('GET', '/users/me/contacts');
    return contacts ?? [];
  }

  async put(contactRecord) {
    if (!contactRecord?.contactId) {
      throw new TypeError('contactRecord.contactId is required');
    }
    await this._request('POST', '/users/me/contacts', contactRecord);
  }

  async patch(contactId, patch) {
    try {
      const { contact } = await this._request(
        'PATCH',
        `/users/me/contacts/${encodeURIComponent(contactId)}`,
        patch,
      );
      return contact ?? null;
    } catch (error) {
      if (error?.status === 404) return null;
      throw error;
    }
  }

  async remove(contactId) {
    await this._request(
      'DELETE',
      `/users/me/contacts/${encodeURIComponent(contactId)}`,
    );
  }
}

/**
 * @param {ConstructorParameters<typeof ContactsD1Adapter>[0]} options
 * @returns {ContactsD1Adapter}
 */
export function createContactsD1Adapter(options) {
  return new ContactsD1Adapter(options);
}
