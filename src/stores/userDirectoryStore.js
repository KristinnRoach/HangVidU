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
      userName: user.userName || 'Anonymous',
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

/** Exact handle search — the new directory search box's data source. */
export function searchUsersByHandle(handle) {
  return getDiscovery().searchByHandle(handle);
}

export async function sendContactRequest(toId) {
  await getRequest()('POST', '/contact-requests', { toId });
}
