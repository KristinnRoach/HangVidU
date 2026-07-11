// src/auth/index.js — imperative public API for the auth module.
//
// Module map:
//   auth-state.js   — state store + read-only getters + lifecycle events
//   auth-setup.js   — Firebase init (`initAuth`), persistence, token access
//   auth-commands.js / password-auth.js — auth operations (Google + username)
//   onetap.js       — Google One Tap sign-in
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
//         `contacts`, `conversations`) (re)wire on these from their own
//         `setup()` so they survive a login that completes after setup.
//     See docs/architecture/STATE_RULES.md.
//
// App-level auth wiring (logout housekeeping + calling `initAuth()` last) lives
// in `src/auth/setup.js`, which main.tsx invokes after feature setups.

export { AuthProvider, useAuth } from './solid-auth.js';
export { default as AuthControls } from './components/AuthControls.jsx';
export { default as LoginButton } from './components/LoginButton.js';
export { setup } from './setup.js';

export {
  initAuth,
  getAuthProviderProfileSeed,
  getLoggedInUserToken,
  signInAsGuest,
} from './auth-setup.js';

export { signInWithAccountSelection, signOutUser } from './auth-commands.js';

export {
  signUpWithUsername,
  signInWithUsernameOrEmail,
  validateUsername,
} from './password-auth.js';

// Read-only state API. `setState` is intentionally NOT re-exported — writers live
// inside the auth module only. External consumers read via getters and subscribe
// to `evt:auth:state:changed`. See docs/architecture/STATE_RULES.md.
export {
  getAuthState,
  getIsLoggedIn,
  getLoggedInUserId,
  waitForAuthReady,
} from './auth-state.js';
