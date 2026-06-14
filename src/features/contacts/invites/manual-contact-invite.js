import { getAllContacts, hydrateContacts } from '../../../stores/contactsStore.js';
import { lookupRegisteredUserByEmail } from '../../../stores/userDirectoryStore.js';
import { getLoggedInUserId } from '../../../auth/index.js';
import { sendContactInvite } from './send-contact-invite.js';

/**
 * Invite one contact by email unless it resolves to the current user or an already-saved contact.
 *
 * @param {string} email
 * @param {{ onNotFound?: () => void | Promise<void> }} [options]
 * @returns {Promise<
 *   | { ok: true, status: 'not_found' }
 *   | { ok: false, status: 'lookup_error' | 'self' | 'already_saved' | 'error', error?: unknown }
 *   | Awaited<ReturnType<typeof sendContactInvite>>
 * >}
 */
export async function inviteContactByEmail(email, { onNotFound } = {}) {
  try {
    const lookupResult = await lookupRegisteredUserByEmail(email);

    if (lookupResult.status === 'lookup_error') {
      return {
        ok: false,
        status: 'lookup_error',
        error: lookupResult.error,
      };
    }

    if (lookupResult.status === 'not_found') {
      await onNotFound?.();
      return { ok: true, status: 'not_found' };
    }
    const user = lookupResult.user;

    if (user.uid === getLoggedInUserId()) {
      return { ok: false, status: 'self' };
    }

    await hydrateContacts();
    const savedContacts = getAllContacts();
    if (savedContacts && savedContacts[user.uid]) {
      return { ok: false, status: 'already_saved' };
    }

    return await sendContactInvite(user.uid, user.userName);
  } catch (error) {
    return { ok: false, status: 'error', error };
  }
}
