function assertAdapter(adapter) {
  if (!adapter || typeof adapter !== 'object') {
    throw new TypeError('user profile storage adapter is required');
  }

  const requiredMethods = ['get', 'save'];
  for (const methodName of requiredMethods) {
    if (typeof adapter[methodName] !== 'function') {
      throw new TypeError(
        `user profile storage adapter must implement ${methodName}()`,
      );
    }
  }

  return adapter;
}

/**
 * Backend-agnostic user-profile storage.
 * Implementation delegates to adapter.
 */
export class UserProfileRepository {
  /**
   * @param {{ get: (userId: string) => Promise<unknown>, save: (user: unknown) => Promise<void> }} adapter
   */
  constructor(adapter) {
    this.adapter = assertAdapter(adapter);
  }

  /**
   * @param {string} userId
   * @returns {Promise<{ displayName?: string|null, photoURL?: string|null }|null>}
   */
  async getUserProfile(userId) {
    if (!userId) return null;

    try {
      return (await this.adapter.get(userId)) ?? null;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      return null;
    }
  }

  /**
   * @param {{ uid: string, displayName?: string|null, photoURL?: string|null }} user
   * @returns {Promise<void>}
   */
  async saveUserProfile(user) {
    if (!user?.uid) return;

    try {
      await this.adapter.save(user);
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  }
}

/**
 * @param {ConstructorParameters<typeof UserProfileRepository>[0]} adapter
 * @returns {UserProfileRepository}
 */
export function createUserProfileRepository(adapter) {
  return new UserProfileRepository(adapter);
}
