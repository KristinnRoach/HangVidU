import { get, ref, update } from 'firebase/database';

/**
 * RTDB adapter for user-profile storage.
 */
export class UserProfileRTDBAdapter {
  /**
   * @param {{ database: import('firebase/database').Database }} options
   */
  constructor({ database }) {
    if (!database) {
      throw new TypeError('database is required');
    }

    this.database = database;
  }

  _profilePath(userId) {
    return `users/${userId}/profile`;
  }

  /**
   * @param {string} userId
   * @returns {Promise<{ userName?: string|null, photoURL?: string|null }|null>}
   */
  async get(userId) {
    const snapshot = await get(ref(this.database, this._profilePath(userId)));
    if (!snapshot.exists()) {
      return null;
    }

    const profile = snapshot.val() || {};
    return {
      ...profile,
      userName: profile.userName ?? null,
    };
  }

  /**
   * @param {{ uid: string, userName?: string|null, photoURL?: string|null }} user
   * @returns {Promise<void>}
   */
  async save(user) {
    // update() merges so additional profile fields written by other flows
    // (e.g. `username`, `email` set during password sign-up) are preserved.
    await update(ref(this.database, this._profilePath(user.uid)), {
      userName: user.userName ?? null,
      photoURL: user.photoURL || null,
    });
  }
}

/**
 * @param {ConstructorParameters<typeof UserProfileRTDBAdapter>[0]} options
 * @returns {UserProfileRTDBAdapter}
 */
export function createUserProfileRTDBAdapter(options) {
  return new UserProfileRTDBAdapter(options);
}
