// src/auth/password-auth.js
// Username/email + password sign-in on top of Firebase Auth.
//
// The Firebase Auth principal is always a synthetic email
// `{username}@{SYNTHETIC_DOMAIN}`. Real email (if provided) is stored as
// profile metadata under `users/{uid}/profile/email`. This keeps username
// uniqueness enforced by Firebase Auth itself (no separate registry node,
// no RTDB rules changes).

import { get, ref, set } from 'firebase/database';
import { rtdb } from '../infra/firebase-rtdb.js';
import {
  createPasswordUser,
  signInPassword,
  updateFirebaseProfile,
} from './adapters/firebase-auth-adapter.js';
import {
  getAuthState,
  setState,
  toStableAuthState,
} from './auth-state.js';
import { logAuthError } from './shared/auth-error-logging.js';
import {
  SYNTHETIC_DOMAIN,
  extractUsernameFromSyntheticEmail,
  isSyntheticEmail,
  syntheticEmail,
} from './shared/synthetic-email.js';
import { hashEmail } from '@lib/utils/email-hash.js';

export { SYNTHETIC_DOMAIN, extractUsernameFromSyntheticEmail, isSyntheticEmail };

const USERNAME_RE = /^[a-z0-9_]{3,20}$/;
const MIN_PASSWORD_LENGTH = 8;
const EXPECTED_PASSWORD_AUTH_FAILURES = new Set([
  'account_has_no_username',
  'auth/email-already-in-use',
  'auth/invalid-credential',
  'auth/user-not-found',
  'auth/wrong-password',
  'no_account_for_email',
  'username_taken',
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
  return EXPECTED_PASSWORD_AUTH_FAILURES.has(error?.code || error?.message);
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
      if (e?.code === 'auth/email-already-in-use') {
        throw new Error('username_taken');
      }
      throw e;
    }

    // Firebase Auth `displayName` is the canonical source for the display
    // name (`authState.user.userName`); `username` is the unique login handle.
    await updateFirebaseProfile(cred.user, {
      displayName: resolvedDisplayName,
    });
    await set(ref(rtdb, `users/${cred.user.uid}/profile/username`), handle);
    if (trimmedEmail) {
      await set(
        ref(rtdb, `users/${cred.user.uid}/profile/email`),
        trimmedEmail,
      );
      // Populate the email lookup index so email-based sign-in and
      // contact-add-by-email can resolve this account. Mirrors the write in
      // `registerUserInDirectory` (src/storage/user/user-discovery.js);
      // inlined here because the auth layer doesn't import from storage,
      // and authState.user.email is null for password accounts (the
      // Firebase Auth principal is synthetic), so the post-login registration
      // in auth-orchestration.js skips them.
      await set(ref(rtdb, `usersByEmail/${hashEmail(trimmedEmail)}`), {
        uid: cred.user.uid,
        userName: resolvedDisplayName,
        photoURL: null,
        registeredAt: Date.now(),
        username: handle,
      }).catch((err) =>
        console.warn(
          '[AUTH] Failed to register password user in email directory:',
          err,
        ),
      );
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
 * its `username` field — see registerUserInDirectory.
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
      // Reads the same `usersByEmail/{hash}` entry maintained by
      // registerUserInDirectory; the `username` field is required.
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
