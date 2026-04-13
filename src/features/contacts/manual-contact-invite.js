import { contactsService } from './contacts-service.js';
import { findUserByEmail } from './user-discovery.js';
import { getUser } from '../../auth/index.js';
import { sendContactInvite } from './send-contact-invite.js';

export async function inviteContactByEmail(email, { onNotFound } = {}) {
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      await onNotFound?.();
      return { ok: true, status: 'not_found' };
    }

    const currentUser = getUser();
    if (user.uid === currentUser?.uid) {
      return { ok: false, status: 'self' };
    }

    const savedContacts = await contactsService.getAllContacts();
    if (savedContacts && savedContacts[user.uid]) {
      return { ok: false, status: 'already_saved' };
    }

    return await sendContactInvite(user.uid, user.userName);
  } catch (error) {
    return { ok: false, status: 'error', error };
  }
}
