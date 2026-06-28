// src/auth/index.js — imperative public API for the auth module.
//
// Module map:
//   auth-state.js   — state store + read-only getters + lifecycle events
//   auth-setup.js   — Firebase init (`initAuth`), persistence, token access
//   auth-commands.js / password-auth.js / gis-tokens.js — auth operations
//   shared/         — small auth-internal leaf helpers used by multiple modules
//   solid-auth.tsx  — Solid reactive surface (`AuthProvider` / `useAuth`)
//
// Which surface to use:
//   - Solid components → `useAuth()` from `./solid-auth` (reactive).
//   - All other code   → the imperative getters/commands below.
//   - Writes to auth state happen ONLY inside this module; external code reads
//     via getters and subscribes to auth events:
//       - `evt:auth:state:changed` — every status transition (incl. `loading`).
//       - `evt:auth:session:logged-in` / `:logged-out` / `:ready` — login/logout
//         lifecycle. Non-Solid auth-scoped listeners (e.g. `presence`,
//         `wireAuthReactions`) (re)wire on these so they survive a login that
//         completes after setup.
//     See docs/architecture/STATE_RULES.md.
//
// App-level cross-feature wiring lives in `app/auth-orchestration.js`
// (`wireAuthReactions`), which is NOT part of this module.

export { initAuth, getLoggedInUserToken, signInAsGuest } from './auth-setup.js';

export {
  signInWithAccountSelection,
  signOutUser,
  isSafariExternalOpenArmed,
  setSafariExternalOpenArmed,
} from './auth-commands.js';

export {
  signUpWithUsername,
  signInWithUsernameOrEmail,
  validateUsername,
} from './password-auth.js';

export {
  requestContactsAccess,
  requestGmailSendAccess,
  clearGISTokenCache,
} from './gis-tokens.js';

// Read-only state API. `setState` is intentionally NOT re-exported — writers live
// inside the auth module only. External consumers read via getters and subscribe
// to `evt:auth:state:changed`. See docs/architecture/STATE_RULES.md.
export {
  getAuthState,
  getIsLoggedIn,
  getUser,
  getLoggedInUserId,
  getUserName,
  waitForAuthReady,
} from './auth-state.js';
