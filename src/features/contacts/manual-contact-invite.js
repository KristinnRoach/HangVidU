import { getAllContacts } from './contacts-state.js';
import { lookupUserByEmail } from './user-discovery.js';
import { getUser } from '../../auth/index.js';
import { sendContactInvite } from './send-contact-invite.js';

export async function inviteContactByEmail(email, { onNotFound } = {}) {
  try {
    const lookupResult = await lookupUserByEmail(email);

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

    const currentUser = getUser();
    if (user.uid === currentUser?.uid) {
      return { ok: false, status: 'self' };
    }

    const savedContacts = getAllContacts();
    if (savedContacts && savedContacts[user.uid]) {
      return { ok: false, status: 'already_saved' };
    }

    return await sendContactInvite(user.uid, user.userName);
  } catch (error) {
    return { ok: false, status: 'error', error };
  }
}
