// Wiring layer for user profile + directory. `stores` is the only layer allowed
// to import both storage and auth, so the bearer-token provider is injected here
// and the D1-backed repo/discovery singletons are built lazily. Public function
// names are unchanged so feature consumers don't move.

import { ref, set } from 'firebase/database';
import { getLoggedInUserToken } from '../auth/index.js';
import { rtdb } from '../infra/firebase-rtdb.js';
import { getHangViduApiBaseUrl } from '../infra/hangvidu-api-url';
import { hashEmail } from '@lib/utils/email-hash.js';
import {
  createUserProfileRepository,
  createUserProfileD1Adapter,
  createUserDiscovery,
} from '../storage/user/index.js';
import { createWorkerRequest } from '../storage/worker-request.js';

let profileRepo = null;
function getProfileRepo() {
  return (profileRepo ??= createUserProfileRepository(
    createUserProfileD1Adapter({
      baseUrl: getHangViduApiBaseUrl(),
      getToken: getLoggedInUserToken,
    }),
  ));
}

let discovery = null;
function getDiscovery() {
  return (discovery ??= createUserDiscovery({
    baseUrl: getHangViduApiBaseUrl(),
    getToken: getLoggedInUserToken,
  }));
}

let request = null;
function getRequest() {
  return (request ??= createWorkerRequest({
    baseUrl: getHangViduApiBaseUrl(),
    getToken: getLoggedInUserToken,
  }));
}

export function getPublicUserProfile(userId) {
  return getProfileRepo().getUserProfile(userId);
}

export function savePublicUserProfile(user) {
  return getProfileRepo().saveUserProfile(user);
}

export async function claimUsername(user, username) {
  if (!user?.uid) throw new Error('user required');
  const body = {
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    username,
  };
  if (user.email) body.emailHash = hashEmail(user.email);
  const { profile } = await getRequest()('PUT', '/users/me/profile', body);
  return profile ?? null;
}

/**
 * Romanize to ASCII so accented/Icelandic names produce readable handles instead
 * of underscore soup (Davíð → david, Hafrún → hafrun, þór → thor). NFD strips
 * combining accents (á→a, ö→o); the explicit map covers letters with no Unicode
 * decomposition (ð, þ, æ, ø). KEEP IN SYNC with the backfill script's
 * slugifyHandle (backend/cloudflare/scripts/backfill-users-to-d1.mjs) — both must
 * produce the same slug so login and backfill never diverge on the same account.
 */
function transliterate(source) {
  return String(source ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // combining diacritics from NFD
    .replace(/[ðÐ]/g, 'd') // ð Ð
    .replace(/[þÞ]/g, 'th') // þ Þ
    .replace(/[æÆ]/g, 'ae') // æ Æ
    .replace(/[øØ]/g, 'o'); // ø Ø
}

/**
 * Derive a default handle from the user's display name / email / uid, normalized
 * to the handle charset (lowercase, 3–20 of [a-z0-9_]). `suffix` is appended for
 * collision retries. Shared by the login auto-assign and the claim prompt.
 * @param {{ displayName?: string|null, email?: string|null, uid?: string }} user
 * @param {string} [suffix]
 */
export function suggestHandle(user, suffix = '') {
  const source = user?.displayName || user?.email?.split('@')[0] || user?.uid || '';
  const base = transliterate(source)
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, Math.max(3, 20 - String(suffix).length));
  return `${(base || 'user').padEnd(3, '_')}${suffix}`.slice(0, 20);
}

/**
 * Guarantee the account has a handle (the "username always required" invariant).
 * No-op when one already exists (password accounts, returning users). Otherwise
 * derive a default and claim it, retrying with a random suffix on a soft
 * collision (409). Returns the resulting handle, or null if none could be set.
 * @param {{ uid?: string, displayName?: string|null, email?: string|null, photoURL?: string|null }} user
 * @returns {Promise<{ handle: string|null, assigned: boolean }>}
 */
export async function ensureHandle(user) {
  if (!user?.uid) return { handle: null, assigned: false };
  const profile = await getPublicUserProfile(user.uid);
  if (profile?.username) return { handle: profile.username, assigned: false };

  for (let attempt = 0; attempt < 5; attempt++) {
    const suffix =
      attempt === 0 ? '' : String(Math.floor(Math.random() * 90 + 10));
    try {
      const saved = await claimUsername(user, suggestHandle(user, suffix));
      return { handle: saved?.username ?? null, assigned: true };
    } catch (error) {
      if (error?.status !== 409) throw error;
    }
  }
  return { handle: null, assigned: false };
}

export async function registerInUserDirectory(user, opts) {
  // D1 directory: powers authed handle search + email-hash discovery (the new
  // path consumed by manual-invite / google-import).
  await getDiscovery().register(user, opts);

  // RTDB usersByEmail: NOT migratable yet. signInWithUsernameOrEmail resolves
  // email→handle by reading this node BEFORE the user is authenticated, so it
  // can't use the token-gated D1 lookup. Keep writing it until password email
  // login moves off the pre-auth read. ponytail: dual-write, drop the RTDB half
  // once a public (token-less) handle-resolve endpoint exists.
  if (user?.uid && user?.email) {
    const entry = {
      uid: user.uid,
      displayName: user.displayName || 'Anonymous',
      photoURL: user.photoURL || null,
      registeredAt: Date.now(),
    };
    if (opts?.username) entry.username = opts.username;
    await set(ref(rtdb, `usersByEmail/${hashEmail(user.email)}`), entry);
  }
}

export function lookupRegisteredUserByEmail(email) {
  return getDiscovery().lookupByEmail(email);
}

export function findRegisteredUsersByEmails(emails) {
  return getDiscovery().findByEmails(emails);
}

/** Handle search — the new directory search box's data source. */
export function searchUsersByHandle(handle) {
  return getDiscovery().searchByHandle(handle);
}

export async function sendContactRequest(toId) {
  await getRequest()('POST', '/contact-requests', { toId });
}

export async function listIncomingContactRequests() {
  const { requests } = await getRequest()('GET', '/contact-requests');
  return Array.isArray(requests) ? requests : [];
}

export async function listOutgoingContactRequests() {
  const { requests } = await getRequest()(
    'GET',
    '/contact-requests?direction=outgoing',
  );
  return Array.isArray(requests) ? requests : [];
}

export async function acceptContactRequest(fromId) {
  return getRequest()(
    'POST',
    `/contact-requests/${encodeURIComponent(fromId)}/accept`,
  );
}

export async function declineContactRequest(fromId) {
  return getRequest()(
    'POST',
    `/contact-requests/${encodeURIComponent(fromId)}/decline`,
  );
}

export async function connectReferral(referrerId) {
  return getRequest()('POST', '/referrals/connect', { referrerId });
}
