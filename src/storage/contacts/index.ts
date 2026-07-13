import { ContactsLocalAdapter } from './adapters/contacts-local-adapter.js';
import { ContactsD1Adapter } from './adapters/contacts-d1-adapter.js';
import { ContactsRepository } from './contacts-repository.js';

export {
  ContactIdSchema,
  ContactPatchSchema,
  ContactRecordSchema,
} from './contact-schema.js';
export type { ContactPatch, ContactRecord } from './contact-schema.js';

/** Create a contacts repository backed by the hangvidu-data Worker (D1). */
export function createContactsD1Repository(
  options: ConstructorParameters<typeof ContactsD1Adapter>[0],
) {
  return new ContactsRepository(new ContactsD1Adapter(options));
}

/** Create a contacts repository backed by localStorage. */
export function createContactsLocalStorageRepository(
  options?: ConstructorParameters<typeof ContactsLocalAdapter>[0],
) {
  return new ContactsRepository(new ContactsLocalAdapter(options));
}
