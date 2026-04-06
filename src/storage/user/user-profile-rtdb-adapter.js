import { get, ref, set } from 'firebase/database';

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
   * @returns {Promise<{ displayName?: string|null, photoURL?: string|null }|null>}
   */
  async get(userId) {
    const snapshot = await get(ref(this.database, this._profilePath(userId)));
    return snapshot.exists() ? snapshot.val() : null;
  }

  /**
   * @param {{ uid: string, displayName?: string|null, photoURL?: string|null }} user
   * @returns {Promise<void>}
   */
  async save(user) {
    await set(ref(this.database, this._profilePath(user.uid)), {
      displayName: user.displayName || null,
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
