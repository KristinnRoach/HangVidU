export { getUserProfile } from './profile.js';
export {
  UserProfileSchema,
  PresenceStateSchema,
  DirectoryEntrySchema,
  parseUserProfile,
  parsePresenceState,
  parseDirectoryEntry,
} from './schema.js';

import { initProfile } from './profile.js';

/**
 * Initialize account-related features.
 * Currently just profile management
 *
 * NOTE: AUTH needs to be initialized before this.
 */
export function initAccount() {
  initProfile();
}
