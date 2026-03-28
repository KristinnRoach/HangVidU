import { ContactsStore } from './contacts-store.js';
import { ContactsLocalAdapter } from './contacts-local-adapter.js';
import { ContactsRTDBAdapter } from './contacts-rtdb-adapter.js';

export { ContactsStore } from './contacts-store.js';
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
  ContactNameSchema,
  ContactPatchSchema,
  ContactRecordSchema,
  ContactRoomIdSchema,
  ContactTimestampSchema,
} from './contact-schema.js';

/**
 * Create a contacts store backed by Firebase RTDB.
 * @param {ConstructorParameters<typeof ContactsRTDBAdapter>[0]} options
 * @returns {ContactsStore}
 */
export function createContactsRTDBStore(options) {
  return new ContactsStore(new ContactsRTDBAdapter(options));
}

/**
 * Create a contacts store backed by localStorage.
 * @param {ConstructorParameters<typeof ContactsLocalAdapter>[0]} [options]
 * @returns {ContactsStore}
 */
export function createContactsLocalStore(options) {
  return new ContactsStore(new ContactsLocalAdapter(options));
}
