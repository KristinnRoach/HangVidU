// src/auth/shared/auth-error-codes.js
// Maps Firebase's 'auth/...' error codes to provider-agnostic codes so the rest
// of src/auth never branches on Firebase-specific strings directly.
//
// Pure (no `firebase/auth` import) so UI components can normalize errors without
// pulling the Firebase SDK into their bundle/tests. The adapter re-exports this.

const ERROR_CODE_MAP = {
  'auth/popup-closed-by-user': 'cancelled',
  'auth/cancelled-popup-request': 'cancelled',
  'auth/popup-blocked': 'popup-blocked',
  'auth/network-request-failed': 'network-error',
  'auth/unauthorized-domain': 'unauthorized-domain',
  'auth/account-exists-with-different-credential': 'account-exists',
  'auth/email-already-in-use': 'email-already-in-use',
  'auth/invalid-credential': 'invalid-credentials',
  'auth/user-not-found': 'invalid-credentials',
  'auth/wrong-password': 'invalid-credentials',
};

/**
 * @param {{ code?: string } | null | undefined} error
 * @returns {'cancelled'|'popup-blocked'|'network-error'|'unauthorized-domain'|'account-exists'|'email-already-in-use'|'invalid-credentials'|'unknown'}
 */
export function normalizeAuthErrorCode(error) {
  return ERROR_CODE_MAP[error?.code] ?? 'unknown';
}

export function resolveErrorLookupKey(error) {
  const normalized = normalizeAuthErrorCode(error);
  return normalized !== 'unknown' ? normalized : error?.code || error?.message;
}
