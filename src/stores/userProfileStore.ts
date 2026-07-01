// Wiring layer for user profiles and lookup indexes. `stores` is the only layer
// allowed to import both storage and auth, so the bearer-token provider is
// injected here and the D1-backed repo/discovery singletons are built lazily.

import { ref, set } from 'firebase/database';
import { createSignal } from 'solid-js';
import {
  getAuthProviderProfileSeed,
  getAuthState,
  getLoggedInUserToken,
} from '../auth/index.js';
import { rtdb } from '../infra/firebase-rtdb.js';
import { getHangViduApiBaseUrl } from '../infra/hangvidu-api-url';
import { hashEmail } from '@lib/utils/email-hash.js';
import { convertToEnglishLetters } from '../../shared/utils/transliteration';
import { subscribe } from '../shared/events/index.js';
import {
  createUserProfileRepository,
  createUserProfileD1Adapter,
  createUserDiscovery,
} from '../storage/user/index.js';
import { createWorkerRequest } from '../storage/worker-request.js';

type AuthUser = {
  uid: string;
  email: string | null;
};

type AuthProviderProfileSeed = AuthUser & {
  displayName: string | null;
  username: string | null;
  photoURL: string | null;
};

type UserLike = {
  uid?: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
};

export type UserProfile = {
  displayName?: string | null;
  photoURL?: string | null;
  username?: string | null;
  discoverable?: boolean;
};

export type UserSearchResult = {
  uid: string;
  displayName: string;
  photoURL?: string | null;
  username?: string | null;
};

export type LoggedInUserProfile = {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  username: string | null;
  email: string | null;
  discoverable?: boolean;
};

type ProfileRepo = {
  getUserProfile(userId: string): Promise<UserProfile | null>;
  saveUserProfile(user: UserLike): Promise<void>;
};
type Discovery = {
  register(
    user: {
      uid: string;
      email: string;
      displayName?: string | null;
      photoURL?: string | null;
    },
    opts?: { username?: string | null },
  ): Promise<void>;
  lookupByEmail(email: string): Promise<unknown>;
  findByEmails(emails: string[]): Promise<unknown>;
  searchByHandle(handle: string): Promise<UserSearchResult[]>;
};
type WorkerRequest = ReturnType<typeof createWorkerRequest>;

let profileRepo: ProfileRepo | null = null;
function getProfileRepo() {
  if (profileRepo) return profileRepo;
  profileRepo = createUserProfileRepository(
    createUserProfileD1Adapter({
      baseUrl: getHangViduApiBaseUrl(),
      getToken: getLoggedInUserToken,
    }) as never,
  ) as ProfileRepo;
  return profileRepo;
}

let discovery: Discovery | null = null;
function getDiscovery() {
  return (discovery ??= createUserDiscovery({
    baseUrl: getHangViduApiBaseUrl(),
    getToken: getLoggedInUserToken,
  }) as Discovery);
}

let request: WorkerRequest | null = null;
function getRequest() {
  return (request ??= createWorkerRequest({
    baseUrl: getHangViduApiBaseUrl(),
    getToken: getLoggedInUserToken,
  }));
}

const [loggedInUserProfile, setLoggedInUserProfile] =
  createSignal<LoggedInUserProfile | null>(null);
let subscribedToAuth = false;

function logProfileLoadFailure(error: unknown) {
  console.error('[userProfileStore] Failed to load logged-in profile:', error);
}

export function getLoggedInUserProfile(): LoggedInUserProfile | null {
  const cached = loggedInUserProfile();
  if (!cached) {
    void loadLoggedInUserProfile().catch(logProfileLoadFailure);
  }
  return cached;
}

// ponytail: no in-flight dedup — concurrent cache-miss loads may fire a few
// redundant reads during the brief pre-populate window; the stale-write guard
// in hydrate keeps the result correct. Add dedup only if those reads matter.
async function loadLoggedInUserProfile(): Promise<LoggedInUserProfile | null> {
  const user = getAuthState().user as AuthUser | null;
  if (!user?.uid) {
    setLoggedInUserProfile(null);
    return null;
  }
  return hydrateLoggedInUserProfile(user);
}

async function hydrateLoggedInUserProfile(
  user: AuthUser,
): Promise<LoggedInUserProfile | null> {
  const seed = getAuthProviderProfileSeed() ?? {
    uid: user.uid,
    displayName: null,
    username: null,
    email: user.email,
    photoURL: null,
  };
  let profile = await getUserProfileById(user.uid);
  if (!profile?.displayName && !profile?.photoURL) {
    await savePublicUserProfile(seed);
  }

  const { handle } = await ensureHandle(seed);
  if (user.email) {
    await syncLoggedInUserEmailLookup(seed, { username: handle });
  }

  profile = await getUserProfileById(user.uid);
  const next = {
    uid: user.uid,
    displayName: profile?.displayName ?? null,
    photoURL: profile?.photoURL ?? null,
    username: profile?.username ?? handle ?? null,
    email: user.email,
    discoverable: profile?.discoverable,
  };
  // The session may have moved on (logout/user switch) while this was in
  // flight — don't clobber a newer profile (or null) with stale data.
  if ((getAuthState().user as AuthUser | null)?.uid !== user.uid) return null;
  setLoggedInUserProfile(next);
  return next;
}

function setupLoggedInUserProfileSync() {
  if (subscribedToAuth) return;
  subscribedToAuth = true;

  subscribe('evt:auth:session:logged-in', () => {
    void loadLoggedInUserProfile().catch(logProfileLoadFailure);
  });
  subscribe('evt:auth:session:logged-out', () => {
    setLoggedInUserProfile(null);
  });

  if (getAuthState().isLoggedIn) {
    void loadLoggedInUserProfile().catch(logProfileLoadFailure);
  }
}

setupLoggedInUserProfileSync();

export function getUserProfileById(userId: string) {
  return getProfileRepo().getUserProfile(userId);
}

export function savePublicUserProfile(user: UserLike) {
  return getProfileRepo().saveUserProfile(user);
}

export async function claimUsername(user: UserLike, username: string) {
  if (!user?.uid) throw new Error('user required');
  const body: {
    displayName: string | null;
    photoURL: string | null;
    username: string;
    emailHash?: string;
  } = {
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    username,
  };
  if (user.email) body.emailHash = hashEmail(user.email);
  const { profile } = await getRequest()('PUT', '/users/me/profile', body);
  return profile ?? null;
}

/**
 * Derive a default handle from the user's display name / email / uid, normalized
 * to the handle charset (lowercase, 3–20 of [a-z0-9_]). `suffix` is appended for
 * collision retries. Shared by the login auto-assign and the claim prompt.
 * Romanizes first (Davíð → david) via the same util the worker's search
 * normalization uses, so generation and search agree on one rule.
 * @param {{ displayName?: string|null, email?: string|null, uid?: string }} user
 * @param {string} [suffix]
 */
export function suggestHandle(
  user: UserLike,
  suffix = '',
) {
  const source = user?.displayName || user?.email?.split('@')[0] || user?.uid || '';
  const base = convertToEnglishLetters(source)
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
// Unbiased 10..99, via rejection sampling so we don't skew handle suffixes
// (and to satisfy CodeQL's biased-crypto-random rule).
function randomSuffix(): number {
  const limit = Math.floor(0xffffffff / 90) * 90;
  const buf = new Uint32Array(1);
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return 10 + (x % 90);
}

export async function ensureHandle(
  user: UserLike,
) {
  if (!user?.uid) return { handle: null, assigned: false };
  const profile = await getUserProfileById(user.uid);
  if (profile?.username) return { handle: profile.username, assigned: false };

  for (let attempt = 0; attempt < 5; attempt++) {
    const suffix = attempt === 0 ? '' : String(randomSuffix());
    try {
      const saved = await claimUsername(user, suggestHandle(user, suffix));
      return { handle: saved?.username ?? null, assigned: true };
    } catch (error) {
      if ((error as { status?: number })?.status !== 409) throw error;
    }
  }
  return { handle: null, assigned: false };
}

async function syncLoggedInUserEmailLookup(
  user: AuthProviderProfileSeed,
  opts: { username?: string | null } = {},
) {
  // Keep D1's email-hash/handle lookup fields current for this account.
  if (user.email) {
    await getDiscovery().register({ ...user, email: user.email }, opts);
  }

  // Legacy RTDB usersByEmail: NOT migratable yet. signInWithUsernameOrEmail resolves
  // email→handle by reading this node BEFORE the user is authenticated, so it
  // can't use the token-gated D1 lookup. Keep writing it until password email
  // login moves off the pre-auth read. ponytail: dual-write, drop the RTDB half
  // once a public (token-less) handle-resolve endpoint exists.
  if (user?.uid && user?.email) {
    const entry: {
      uid: string;
      displayName: string;
      photoURL: string | null;
      registeredAt: number;
      username?: string;
    } = {
      uid: user.uid,
      displayName: user.displayName || 'Anonymous',
      photoURL: user.photoURL || null,
      registeredAt: Date.now(),
    };
    if (opts?.username) entry.username = opts.username;
    await set(ref(rtdb, `usersByEmail/${hashEmail(user.email)}`), entry);
  }
}

export function lookupRegisteredUserByEmail(email: string) {
  return getDiscovery().lookupByEmail(email);
}

export function findRegisteredUsersByEmails(emails: string[]) {
  return getDiscovery().findByEmails(emails);
}

/** Handle search for the add-contact profile search box. */
export function searchUsersByHandle(handle: string) {
  return getDiscovery().searchByHandle(handle);
}

export async function sendContactRequest(toId: string) {
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

export async function acceptContactRequest(fromId: string) {
  return getRequest()(
    'POST',
    `/contact-requests/${encodeURIComponent(fromId)}/accept`,
  );
}

export async function declineContactRequest(fromId: string) {
  return getRequest()(
    'POST',
    `/contact-requests/${encodeURIComponent(fromId)}/decline`,
  );
}

export async function connectReferral(referrerId: string) {
  return getRequest()('POST', '/referrals/connect', { referrerId });
}
