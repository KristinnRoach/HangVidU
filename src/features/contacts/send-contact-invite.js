import { sendInvite } from './invitations.js';

const DUPLICATE_ERROR_TOKENS = ['PERMISSION_DENIED', 'permission_denied'];

function isAlreadyInvitedError(error) {
  const code =
    typeof error?.code === 'string'
      ? error.code
      : typeof error?.name === 'string'
        ? error.name
        : '';
  const message =
    typeof error?.message === 'string'
      ? error.message
      : typeof error === 'string'
        ? error
        : '';

  return DUPLICATE_ERROR_TOKENS.some((token) => {
    return code.includes(token) || message.includes(token);
  });
}

export async function sendContactInvite(toUserId, toName = 'User') {
  try {
    await sendInvite(toUserId, toName);
    return { ok: true, status: 'sent' };
  } catch (error) {
    if (isAlreadyInvitedError(error)) {
      return { ok: false, status: 'already_invited' };
    }

    return { ok: false, status: 'error', error };
  }
}
