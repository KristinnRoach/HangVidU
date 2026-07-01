# Auth Module Architecture

Firebase-Auth-backed identity: sign-in/out (Google popup, One Tap,
username/password), auth state, and ID-token access. Nothing else lives here —
Google OAuth *scope* tokens (Contacts/Gmail) are in `shared/utils/google/`, and
authed Cloud Function calls are in `features/push-notifications/`.

## Public API

- Entry point: `src/auth/index.js` — consumers outside `src/auth/` import from
  this barrel only.
- Solid components read reactive state via `useAuth()` from `./solid-auth`.
- All other code reads via the getters (`getAuthState`, `getIsLoggedIn`,
  `getLoggedInUserId`, `waitForAuthReady`) and calls commands directly
  (`signInWithAccountSelection`, `signOutUser`, `signUpWithUsername`, …).
- There is no command bus: call the exported functions directly.

## State Boundary

- `auth-state.js` is the provider-agnostic state store + lifecycle events.
- Writes to auth state happen ONLY inside this module. External code reads via
  getters and subscribes to `evt:auth:*` events. See
  `docs/architecture/STATE_RULES.md`.

## Vendor Boundary

- `adapters/firebase-auth-adapter.js` is the only file allowed to import
  `firebase/auth`. Everything else goes through its exports.
- Never branch on raw `auth/...` Firebase error strings outside the adapter; use
  `normalizeAuthErrorCode(error)`. (Pre-existing exceptions not yet migrated:
  `auth-commands.js`, `onetap.js`, `password-auth.js`,
  `components/UsernamePasswordForm.jsx` — migrate opportunistically.)

## App-level wiring

There is no cross-feature orchestrator. Each feature subscribes to the auth
lifecycle events it cares about from its own `setup()` (contacts, conversations,
presence, …). App-level auth wiring — logout localStorage housekeeping and
calling `initAuth()` last, after all subscribers register — lives in
`src/auth/setup.js`, invoked by `main.tsx`.
