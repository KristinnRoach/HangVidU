import {
  requestContactsAccess,
  getUser,
} from '../../auth/index.js';
import { contactsService } from './contacts-service.js';
import { findUsersByEmails } from './user-discovery.js';
import { fetchGoogleContacts } from './google-contacts.js';
import { buildImportableContacts } from './import-contacts-utils.js';

export async function importGoogleContacts({
  onProgress = () => {},
} = {}) {
  try {
    onProgress({ step: 'requesting' });
    const accessToken = await requestContactsAccess({ interactive: true });

    onProgress({ step: 'fetching' });
    const contacts = await fetchGoogleContacts(accessToken);

    if (contacts.length === 0) {
      return {
        status: 'no_email',
        contacts: [],
      };
    }

    onProgress({
      step: 'checking',
      count: contacts.length,
    });

    const savedContacts = await contactsService.getAllContacts();
    const savedContactIds = new Set(Object.keys(savedContacts || {}));
    const registeredUsers = await findUsersByEmails(
      contacts.map((contact) => contact.email),
    );
    const currentUser = getUser();

    return {
      status: 'success',
      contacts: buildImportableContacts({
        contacts,
        registeredUsers,
        savedContactIds,
        currentUserId: currentUser?.uid,
      }),
    };
  } catch (error) {
    if (error.message === 'Authorization cancelled') {
      return {
        status: 'cancelled',
        contacts: [],
      };
    }

    return {
      status: 'error',
      error,
      contacts: [],
    };
  }
}
