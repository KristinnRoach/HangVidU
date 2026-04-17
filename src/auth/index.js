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

// Read-only state API. `setState` is intentionally NOT re-exported — writers live
// inside the auth module only. External consumers read via getters and subscribe
// to `evt:auth:state:changed`. See docs/WIP_Architecture/STATE_RULES.md.
export {
  getAuthState,
  getIsLoggedIn,
  getUser,
  getUserId,
  getLoggedInUserId,
  getUserName,
  waitForAuthReady,
} from './auth-state.js';

// Legacy subscribe API — prefer `subscribe('evt:auth:state:changed', ...)` from
// shared/events. Kept for existing callers; to be migrated incrementally.
export { onAuthStateChanged } from './auth-state.js';

export { initializeAuthUI } from './components/AuthComponent.js';
