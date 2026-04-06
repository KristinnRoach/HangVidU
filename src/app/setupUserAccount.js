import { onAuthStateChange } from '../auth/index.js';
import { saveUserProfile } from '../storage/user/index.js';

let cleanupUserAccount = null;

/**
 * Setup user-account sync concerns at app composition level.
 *
 * @returns {() => void}
 */
export function setupUserAccount() {
  if (cleanupUserAccount) {
    return cleanupUserAccount;
  }

  const unsubscribe = onAuthStateChange((state) => {
    if (!state?.isLoggedIn || !state.user) {
      return;
    }

    saveUserProfile(state.user).catch((err) => {
      console.warn('Failed to save user profile:', err);
    });
  });

  cleanupUserAccount = () => {
    unsubscribe();
    cleanupUserAccount = null;
  };

  return cleanupUserAccount;
}
