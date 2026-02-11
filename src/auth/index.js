// src/auth/index.js — barrel re-exports (public API)

export { auth, initAuth, getCurrentUserAsync, getLoggedInUserToken } from './auth-setup.js';

export {
  signInWithAccountSelection,
  signOutUser,
  deleteAccount,
  isSafariExternalOpenArmed,
  setSafariExternalOpenArmed,
} from './auth-actions.js';

export { requestContactsAccess, requestGmailSendAccess, clearGISTokenCache } from './gis-tokens.js';

export {
  getAuthState,
  getIsLoggedIn,
  getUser,
  getUserId,
  getLoggedInUserId,
  getUserName,
  subscribe,
  setState,
  waitForAuthReady,
} from './auth-state.js';
