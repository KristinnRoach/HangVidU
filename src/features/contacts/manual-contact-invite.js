import { contactsService } from './contacts-service.js';
import { findUserByEmail } from './user-discovery.js';
import { sendInvite } from './invitations.js';
import { getUser } from '../../auth/index.js';

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

    await sendInvite(user.uid, user.userName);
    return { ok: true, status: 'sent' };
  } catch (error) {
    if (error?.message?.includes('PERMISSION_DENIED')) {
      return { ok: false, status: 'already_invited' };
    }

    return { ok: false, status: 'error', error };
  }
}
