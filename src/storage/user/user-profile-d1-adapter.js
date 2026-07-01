import { createWorkerRequest } from '../worker-request.js';

/**
 * D1 adapter for user-profile storage — talks to the hangvidu-data Worker.
 *
 * - `get(userId)` reads any user's public profile by known uid
 *   (GET /users/:id/profile). Used for self and for naming a referrer.
 * - `save(user)` writes the CALLER's own profile (PUT /users/me/profile); the
 *   owner is token-derived server-side, so `user.uid` is only a guard here.
 *
 * Wire fields are the app profile shape: `displayName`, `photoURL`, and the
 * `username` handle.
 */
export class UserProfileD1Adapter {
  /**
   * @param {{ baseUrl: string, getToken: () => Promise<string|null> }} options
   */
  constructor({ baseUrl, getToken }) {
    this._request = createWorkerRequest({ baseUrl, getToken });
  }

  /**
   * @param {string} userId
   * @returns {Promise<{ displayName: string|null, photoURL: string|null, username: string|null }|null>}
   */
  async get(userId) {
    const { profile } = await this._request(
      'GET',
      `/users/${encodeURIComponent(userId)}/profile`,
    );
    return profile ?? null;
  }

  /**
   * @param {{ uid: string, displayName?: string|null, photoURL?: string|null, username?: string|null, emailHash?: string|null }} user
   * @returns {Promise<void>}
   */
  async save(user) {
    if (!user?.uid) throw new TypeError('user.uid is required');
    await this._request('PUT', '/users/me/profile', {
      displayName: user.displayName ?? null,
      photoURL: user.photoURL ?? null,
      username: user.username ?? null,
      emailHash: user.emailHash ?? null,
    });
  }
}

/**
 * @param {ConstructorParameters<typeof UserProfileD1Adapter>[0]} options
 * @returns {UserProfileD1Adapter}
 */
export function createUserProfileD1Adapter(options) {
  return new UserProfileD1Adapter(options);
}
