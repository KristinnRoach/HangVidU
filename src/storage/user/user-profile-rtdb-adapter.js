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
   * @returns {Promise<{ userName?: string|null, displayName?: string|null, photoURL?: string|null }|null>}
   */
  async get(userId) {
    const snapshot = await get(ref(this.database, this._profilePath(userId)));
    if (!snapshot.exists()) {
      return null;
    }

    const profile = snapshot.val() || {};
    const userName =
      profile.userName ??
      // TODO(2026-04-08): Remove legacy fallback once profile.displayName migration window ends.
      profile.displayName ??
      null;

    return {
      ...profile,
      userName,
      // TODO(2026-04-08): Remove legacy mirror once profile.displayName migration window ends.
      displayName: profile.displayName ?? userName,
    };
  }

  /**
   * @param {{ uid: string, userName?: string|null, displayName?: string|null, photoURL?: string|null }} user
   * @returns {Promise<void>}
   */
  async save(user) {
    const userName =
      user.userName ??
      // TODO(2026-04-08): Remove legacy fallback once profile.displayName migration window ends.
      user.displayName ??
      null;

    await set(ref(this.database, this._profilePath(user.uid)), {
      userName,
      // TODO(2026-04-08): Remove legacy mirror once profile.displayName migration window ends.
      displayName: userName,
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
