import { sendContactRequest } from '../../../stores/userProfileStore.js';

const DUPLICATE_ERROR_TOKENS = [
  'already_invited',
  'already invited',
  'already exists',
  'invite exists',
  'duplicate_invite',
  'duplicate',
];

function getErrorParts(error) {
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

  return {
    code,
    message,
    normalizedCode: code.toLowerCase(),
    normalizedMessage: message.toLowerCase(),
  };
}

function isPermissionDeniedError(error) {
  const { code, normalizedCode, normalizedMessage } = getErrorParts(error);

  if (error?.name === 'PermissionDenied') {
    return true;
  }

  if (code === 'PERMISSION_DENIED') {
    return true;
  }

  return (
    normalizedCode.includes('permission_denied') ||
    normalizedCode.includes('permission-denied') ||
    normalizedMessage.includes('permission_denied') ||
    normalizedMessage.includes('permission-denied') ||
    normalizedMessage.includes('permission denied')
  );
}

function isAlreadyInvitedError(error) {
  const { normalizedCode, normalizedMessage } = getErrorParts(error);

  return DUPLICATE_ERROR_TOKENS.some((token) => {
    return (
      normalizedCode.includes(token) || normalizedMessage.includes(token)
    );
  });
}

export async function sendContactInvite(toUserId, toName = 'User') {
  try {
    await sendContactRequest(toUserId);
    return { ok: true, status: 'sent' };
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      return { ok: false, status: 'permission_denied', error };
    }

    if (isAlreadyInvitedError(error)) {
      return { ok: false, status: 'already_invited' };
    }

    return { ok: false, status: 'error', error };
  }
}
