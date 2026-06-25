// User discovery — find other users via the hangvidu-data Worker's directory
// (the D1 `users` table). Replaces the RTDB `usersByEmail` index. Email is never
// sent to the server: `hashEmail` stays client-side and only the hash is queried
// (mirrors the old indirection). Handle search is the new exact-match path.
//
// Factory shape (not a module singleton) so storage stays boundary-clean: the
// bearer token arrives via an injected `getToken`. The wiring + public function
// names live in src/stores/userDirectoryStore.js.

import { hashEmail } from '@lib/utils/email-hash.js';
import { createWorkerRequest } from '../worker-request.js';

function canonicalizeDirectoryUser(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const userName =
    typeof entry.userName === 'string' && entry.userName.trim()
      ? entry.userName.trim()
      : 'Anonymous';
  return { ...entry, userName };
}

/**
 * @param {{ baseUrl: string, getToken: () => Promise<string|null> }} options
 */
export function createUserDiscovery({ baseUrl, getToken }) {
  const request = createWorkerRequest({ baseUrl, getToken });

  /** Exact directory lookup; always returns an array (identifier-agnostic). */
  async function lookup(queryString) {
    const { users } = await request('GET', `/users/lookup?${queryString}`);
    return users ?? [];
  }

  /**
   * Register/refresh the caller's directory fields (email hash + optional
   * handle). The D1 directory IS the `users` row, so this is a profile write;
   * the worker stamps registered_at once and COALESCEs unset fields.
   * @param {{ uid: string, email: string, userName?: string, photoURL?: string|null }} user
   * @param {{ username?: string|null }} [opts]
   */
  async function register(user, { username = null } = {}) {
    if (!user || !user.uid || !user.email) {
      throw new Error('Invalid user: must have uid and email');
    }
    await request('PUT', '/users/me/profile', {
      userName: user.userName || 'Anonymous',
      photoURL: user.photoURL || null,
      username: username || null,
      emailHash: hashEmail(user.email),
    });
  }

  /**
   * @param {string} email
   * @returns {Promise<{status: 'found'|'not_found'|'lookup_error', user: Object|null, error?: unknown}>}
   */
  async function lookupByEmail(email) {
    if (!email || typeof email !== 'string' || !email.trim()) {
      return { status: 'not_found', user: null };
    }
    try {
      const hash = hashEmail(email.trim());
      const users = await lookup(`emailHash=${encodeURIComponent(hash)}`);
      const user = users.length ? canonicalizeDirectoryUser(users[0]) : null;
      return user
        ? { status: 'found', user }
        : { status: 'not_found', user: null };
    } catch (error) {
      console.error('[USER DISCOVERY] Failed to find user by email:', error);
      return { status: 'lookup_error', user: null, error };
    }
  }

  /**
   * @param {string[]} emails
   * @returns {Promise<Record<string, Object|null>>}
   */
  async function findByEmails(emails) {
    if (!Array.isArray(emails)) {
      throw new Error('Invalid emails: must be an array');
    }
    const results = {};
    await Promise.all(
      emails.map(async (email) => {
        const r = await lookupByEmail(email);
        results[email] = r.status === 'found' ? r.user : null;
      }),
    );
    return results;
  }

  /**
   * Exact handle search — the new "find someone on HangVidU without a referral"
   * path. Returns directory entries (≤1 today under the soft-unique handle).
   * @param {string} handle
   * @returns {Promise<Object[]>}
   */
  async function searchByHandle(handle) {
    if (!handle || typeof handle !== 'string' || !handle.trim()) return [];
    const users = await lookup(`handle=${encodeURIComponent(handle.trim())}`);
    return users.map(canonicalizeDirectoryUser).filter(Boolean);
  }

  return { register, lookupByEmail, findByEmails, searchByHandle };
}
