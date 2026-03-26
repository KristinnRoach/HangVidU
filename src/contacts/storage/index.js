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
} from './contact-record.js';

export function createContactsRTDBStore(options) {
  return new ContactsStore(new ContactsRTDBAdapter(options));
}

export function createContactsLocalStore(options) {
  return new ContactsStore(new ContactsLocalAdapter(options));
}
