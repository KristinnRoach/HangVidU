import { ContactsRepository } from './contacts-repository.js';
import { ContactsLocalAdapter } from './adapters/contacts-local-adapter.js';
import { ContactsD1Adapter } from './adapters/contacts-d1-adapter.js';

export { ContactsRepository } from './contacts-repository.js';
export { ContactsDBInterface } from './contacts-db-interface.js';
export { ContactsD1Adapter } from './adapters/contacts-d1-adapter.js';
export { ContactsLocalAdapter } from './adapters/contacts-local-adapter.js';
export {
  assertContactId,
  mergeContactRecord,
  normalizeContactPatch,
  normalizeContactRecord,
} from './contact-transform.js';
export {
  ContactIdSchema,
  ContactConversationIdSchema,
  ContactNicknameSchema,
  ContactPatchSchema,
  ContactRecordSchema,
  ContactTimestampSchema,
} from './contact-schema.js';

/**
 * Create a contacts repository backed by the hangvidu-data Worker (D1).
 * @param {ConstructorParameters<typeof ContactsD1Adapter>[0]} options
 * @returns {ContactsRepository}
 */
export function createContactsD1Repository(options) {
  return new ContactsRepository(new ContactsD1Adapter(options));
}

/**
 * Create a contacts repository backed by localStorage.
 * @param {ConstructorParameters<typeof ContactsLocalAdapter>[0]} [options]
 * @returns {ContactsRepository}
 */
export function createContactsLocalStorageRepository(options) {
  return new ContactsRepository(new ContactsLocalAdapter(options));
}
