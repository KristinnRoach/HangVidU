import { requestContactsAccess, getUser } from '../auth/index.js';
import { getAllContacts, hydrateContacts } from '../stores/contactsStore.js';
import { findUsersByEmails } from '../shared/storage/user/user-discovery.js';
import { fetchGoogleContacts } from '../shared/utils/google/google-contacts.js';
import { buildImportableContacts } from './import-contacts-utils.js';

/**
 * Import Google contacts and annotate each result against saved contacts and registered users.
 *
 * @param {{ onProgress?: (update: { step: string, count?: number }) => void }} [options]
 * @returns {Promise<
 *   | { status: 'success', contacts: unknown[] }
 *   | { status: 'no_email' | 'cancelled', contacts: [] }
 *   | { status: 'error', error: unknown, contacts: [] }
 * >}
 */
export async function importGoogleContacts({ onProgress = () => {} } = {}) {
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

    await hydrateContacts();
    const savedContacts = getAllContacts();
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
