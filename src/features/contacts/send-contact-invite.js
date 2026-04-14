import { sendInvite } from './invitations.js';

export async function sendContactInvite(toUserId, toName = 'User') {
  try {
    await sendInvite(toUserId, toName);
    return { ok: true, status: 'sent' };
  } catch (error) {
    if (error?.message?.includes('PERMISSION_DENIED')) {
      return { ok: false, status: 'already_invited' };
    }

    return { ok: false, status: 'error', error };
  }
}
