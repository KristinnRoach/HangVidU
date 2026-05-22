import { ContactsRepository } from './contacts-repository.js';
import { ContactsLocalAdapter } from './contacts-local-adapter.js';
import { ContactsRTDBAdapter } from './contacts-rtdb-adapter.js';

export { ContactsRepository } from './contacts-repository.js';
export { ContactsStorageAdapter } from './contacts-storage-adapter.js';
export { ContactsRTDBAdapter } from './contacts-rtdb-adapter.js';
export { ContactsLocalAdapter } from './contacts-local-adapter.js';
export {
  assertContactId,
  mergeContactRecord,
  normalizeContactPatch,
  normalizeContactRecord,
} from './contact-transform.js';
export {
  ContactIdSchema,
  ContactNickNameSchema,
  ContactPatchSchema,
  ContactRecordSchema,
  ContactRoomIdSchema,
  ContactTimestampSchema,
} from './contact-schema.js';

/**
 * Create a contacts store backed by Firebase RTDB.
 * @param {ConstructorParameters<typeof ContactsRTDBAdapter>[0]} options
 * @returns {ContactsRepository}
 */
export function createContactsRTDBStoreRepository(options) {
  return new ContactsRepository(new ContactsRTDBAdapter(options));
}

/**
 * Create a contacts store backed by localStorage.
 * @param {ConstructorParameters<typeof ContactsLocalAdapter>[0]} [options]
 * @returns {ContactsRepository}
 */
export function createContactsLocalStorageRepository(options) {
  return new ContactsRepository(new ContactsLocalAdapter(options));
}
