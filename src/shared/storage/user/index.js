import { rtdb } from '../fb-rtdb/rtdb.js';
import {
  UserProfileRTDBAdapter,
  createUserProfileRTDBAdapter,
} from './user-profile-rtdb-adapter.js';
import { UserProfileStore, createUserProfileStore } from './user-profile-store.js';

export {
  UserProfileSchema,
  PresenceStateSchema,
  DirectoryEntrySchema,
  parseUserProfile,
  parsePresenceState,
  parseDirectoryEntry,
} from './schema.js';
export {
  UserProfileStore,
  createUserProfileStore,
} from './user-profile-store.js';
export {
  UserProfileRTDBAdapter,
  createUserProfileRTDBAdapter,
} from './user-profile-rtdb-adapter.js';

const userProfileStore = createUserProfileStore(
  createUserProfileRTDBAdapter({ database: rtdb }),
);

/**
 * @param {string} userId
 * @returns {Promise<{ userName?: string|null, photoURL?: string|null }|null>}
 */
export function getUserProfile(userId) {
  return userProfileStore.getUserProfile(userId);
}

/**
 * @param {{ uid: string, userName?: string|null, photoURL?: string|null }} user
 * @returns {Promise<void>}
 */
export function saveUserProfile(user) {
  return userProfileStore.saveUserProfile(user);
}
