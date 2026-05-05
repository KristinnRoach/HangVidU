import { rtdb } from '../fb-rtdb/rtdb.js';

import {
  UserProfileRepository,
  createUserProfileRepository,
} from './user-profile-repository.js';
import {
  UserProfileRTDBAdapter,
  createUserProfileRTDBAdapter,
} from './user-profile-rtdb-adapter.js';

import { CallRepository, createCallRepository } from './call-repository.js';
import { CallRTDBAdapter, createCallRTDBAdapter } from './call-rtdb-adapter.js';

export {
  UserProfileSchema,
  PresenceStateSchema,
  DirectoryEntrySchema,
  parseUserProfile,
  parsePresenceState,
  parseDirectoryEntry,
} from './schema.js';

// TODO: possibly move the below into services

const userProfileRepo = createUserProfileRepository(
  createUserProfileRTDBAdapter({ database: rtdb }),
);

/**
 * @param {string} userId
 * @returns {Promise<{ userName?: string|null, photoURL?: string|null }|null>}
 */
export function getUserProfile(userId) {
  return userProfileRepo.getUserProfile(userId);
}

/**
 * @param {{ uid: string, userName?: string|null, photoURL?: string|null }} user
 * @returns {Promise<void>}
 */
export function saveUserProfile(user) {
  return userProfileRepo.saveUserProfile(user);
}
