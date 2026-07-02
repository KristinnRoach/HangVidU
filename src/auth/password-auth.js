// src/auth/password-auth.js
// Username/email + password sign-in on top of Firebase Auth.
//
// The Firebase Auth principal is always a synthetic email
// `{username}@{SYNTHETIC_DOMAIN}`, so username uniqueness is enforced by Firebase
// Auth itself. Real email (if provided) is indexed in `usersByEmail/{hash}` so
// email-mode sign-in can resolve email→handle pre-auth (D1's `/users/lookup` is
// token-gated, unusable before sign-in).

import { get, ref, set } from 'firebase/database';
import { rtdb } from '../infra/firebase-rtdb.js';
import {
  createPasswordUser,
  deleteFirebaseUser,
  signInPassword,
  updateFirebaseProfile,
} from './adapters/firebase-auth-adapter.js';
import {
  normalizeAuthErrorCode,
  resolveErrorLookupKey,
} from './shared/auth-error-codes.js';
import { getAuthState, setState, toStableAuthState } from './auth-state.js';
import { logAuthError } from './shared/auth-error-logging.js';
import {
  SYNTHETIC_DOMAIN,
  extractUsernameFromSyntheticEmail,
  isSyntheticEmail,
  syntheticEmail,
} from './shared/synthetic-email.js';
import { hashEmail } from '@lib/utils/email-hash.js';

export {
  SYNTHETIC_DOMAIN,
  extractUsernameFromSyntheticEmail,
  isSyntheticEmail,
};

const USERNAME_RE = /^[a-z0-9_]{3,20}$/;
const MIN_PASSWORD_LENGTH = 8;
// Domain codes we throw ourselves + normalized Firebase codes (see
// normalizeAuthErrorCode). Expected failures are surfaced to the user, not logged.
const EXPECTED_PASSWORD_AUTH_FAILURES = new Set([
  'account_has_no_username',
  'no_account_for_email',
  'username_taken',
  'email-already-in-use',
  'invalid-credentials',
]);

function normalizeUsername(input) {
  return typeof input === 'string' ? input.trim().toLowerCase() : '';
}

export function validateUsername(username) {
  const u = normalizeUsername(username);
  if (!u) return 'username_required';
  if (!USERNAME_RE.test(u)) return 'username_invalid';
  return null;
}

function validatePassword(password) {
  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    return 'password_too_short';
  }
  return null;
}

function isExpectedPasswordAuthFailure(error) {
  return EXPECTED_PASSWORD_AUTH_FAILURES.has(resolveErrorLookupKey(error));
}

async function rollbackCreatedPasswordUser(cred, cause) {
  if (!cred?.user) return;
  try {
    await deleteFirebaseUser(cred.user);
  } catch (rollbackError) {
    console.warn(
      '[AUTH] Failed to roll back password user after signup failure:',
      rollbackError,
      { cause },
    );
  }
}

/**
 * Sign up with username + password and optional email + optional display name.
 * Username uniqueness is enforced by Firebase Auth (synthetic email is unique).
 *
 * @param {{
 *   username: string,
 *   password: string,
 *   email?: string|null,
 *   displayName?: string|null,
 * }} params
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function signUpWithUsername({
  username,
  password,
  email = null,
  displayName = null,
}) {
  const usernameError = validateUsername(username);
  if (usernameError) throw new Error(usernameError);

  const passwordError = validatePassword(password);
  if (passwordError) throw new Error(passwordError);

  const handle = normalizeUsername(username);
  const trimmedEmail =
    typeof email === 'string' && email.trim() ? email.trim() : null;
  const trimmedDisplayName =
    typeof displayName === 'string' && displayName.trim()
      ? displayName.trim()
      : null;
  // Default display name: user-provided > email > username
  const resolvedDisplayName = trimmedDisplayName || trimmedEmail || handle;

  const previousAuthState = getAuthState();
  setState({ status: 'loading' });

  try {
    let cred;
    try {
      cred = await createPasswordUser(syntheticEmail(handle), password);
    } catch (e) {
      if (normalizeAuthErrorCode(e) === 'email-already-in-use') {
        throw new Error('username_taken');
      }
      throw e;
    }

    try {
      // Firebase Auth profile is provider seed data; D1 remains app profile truth.
      await updateFirebaseProfile(cred.user, {
        displayName: resolvedDisplayName,
      });
      if (trimmedEmail) {
        // Populate the email lookup index so email-based sign-in can resolve
        // this account before auth. Password accounts use synthetic Firebase
        // emails, so logged-in D1 profile/discovery hydration cannot repair this.
        await set(ref(rtdb, `usersByEmail/${hashEmail(trimmedEmail)}`), {
          uid: cred.user.uid,
          displayName: resolvedDisplayName,
          photoURL: null,
          registeredAt: Date.now(),
          username: handle,
        });
      }
    } catch (e) {
      await rollbackCreatedPasswordUser(cred, e);
      throw e;
    }

    return cred;
  } catch (e) {
    setState(toStableAuthState(previousAuthState));
    if (!isExpectedPasswordAuthFailure(e)) {
      logAuthError('Sign up (password)', e);
    }
    throw e;
  }
}

/**
 * Sign in with username or email + password.
 * Email-mode requires that the account was registered in `usersByEmail` with
 * its `username` field; D1 lookup is token-gated and not available pre-auth.
 *
 * @param {{ identifier: string, password: string }} params
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function signInWithUsernameOrEmail({ identifier, password }) {
  const raw = typeof identifier === 'string' ? identifier.trim() : '';
  if (!raw) throw new Error('identifier_required');
  if (typeof password !== 'string' || password.length === 0) {
    throw new Error('password_required');
  }

  const previousAuthState = getAuthState();
  setState({ status: 'loading' });

  try {
    let handle;
    if (raw.includes('@')) {
      // Inline directory lookup — auth layer cannot import from storage.
      // Reads the same pre-auth `usersByEmail/{hash}` entry written at sign-up;
      // the `username` field is required.
      const snap = await get(ref(rtdb, `usersByEmail/${hashEmail(raw)}`));
      if (!snap.exists()) throw new Error('no_account_for_email');
      handle = snap.val()?.username;
      if (!handle) throw new Error('account_has_no_username');
    } else {
      const err = validateUsername(raw);
      if (err) throw new Error(err);
      handle = normalizeUsername(raw);
    }

    return await signInPassword(syntheticEmail(handle), password);
  } catch (e) {
    setState(toStableAuthState(previousAuthState));
    if (!isExpectedPasswordAuthFailure(e)) {
      logAuthError('Sign in (password)', e);
    }
    throw e;
  }
}
