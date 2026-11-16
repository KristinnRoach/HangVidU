import { getAuthState, getLoggedInUserId } from '@auth';
import { requestContactsAccess } from '@shared/utils/google/gis-tokens.js';
import {
  getAllContacts,
  hydrateContacts,
} from '../../../stores/contacts-store.js';
import { findRegisteredUsersByEmails } from '../../../stores/user-profile-store.js';
import { fetchGoogleContacts } from '@shared/utils/google/google-contacts.js';
import { buildImportableContacts } from './import-contacts-utils.js';

/**
 * Import Google contacts and annotate each result against saved contacts and registered users.
 *
 * @param {{ onProgress?: (update: { step: string, count?: number }) => void, isCurrent?: () => boolean }} [options]
 * @returns {Promise<
 *   | { status: 'success', contacts: import('./types').ImportContact[] }
 *   | { status: 'no_email' | 'cancelled' | 'stale', contacts: [] }
 *   | { status: 'error', error: unknown, contacts: [] }
 * >}
 */
export async function importGoogleContacts({
  onProgress = () => {},
  isCurrent = () => true,
} = {}) {
  try {
    onProgress({ step: 'requesting' });
    const accessToken = await requestContactsAccess({
      interactive: true,
      hint: getAuthState().user?.email ?? undefined,
    });

    if (!isCurrent()) return { status: 'stale', contacts: [] };
    onProgress({ step: 'fetching' });
    const contacts = await fetchGoogleContacts(accessToken);

    if (!isCurrent()) return { status: 'stale', contacts: [] };
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
    if (!isCurrent()) return { status: 'stale', contacts: [] };
    const savedContacts = getAllContacts();
    const savedContactIds = new Set(Object.keys(savedContacts || {}));
    const registeredUsers = await findRegisteredUsersByEmails(
      contacts.map((contact) => contact.email),
    );

    if (!isCurrent()) return { status: 'stale', contacts: [] };
    return {
      status: 'success',
      contacts: buildImportableContacts({
        contacts,
        registeredUsers,
        savedContactIds,
        currentUserId: getLoggedInUserId(),
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
