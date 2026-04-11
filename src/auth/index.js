// src/auth/index.js — barrel re-exports (public API)

export {
  initAuth,
  getCurrentUserAsync,
  getLoggedInUserToken,
} from './auth-setup.js';

export {
  signInWithAccountSelection,
  signOutUser,
  deleteAccount,
  isSafariExternalOpenArmed,
  setSafariExternalOpenArmed,
} from './auth-commands.js';

export {
  requestContactsAccess,
  requestGmailSendAccess,
  clearGISTokenCache,
} from './gis-tokens.js';

export {
  getAuthState,
  getIsLoggedIn,
  getUser,
  getUserId,
  getLoggedInUserId,
  getUserName,
  setState,
  waitForAuthReady,
} from './auth-state.js';

export { onAuthStateChanged } from './auth-state.js';

export { initializeAuthUI } from './components/AuthComponent.js';
