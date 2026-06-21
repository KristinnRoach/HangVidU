# Auth Module Architecture

TODO: Review this again in a dedicated session addressing the concerns listed in ./TODO.md

## Public API

- Entry point: `src/auth/index.js`
- Consumers outside `src/auth/` should import auth functions from this barrel.

## Vendor Boundary

- Firebase Auth gateway: `src/auth/adapters/firebase-auth-adapter.js`
- Only this adapter is allowed to import `firebase/auth` directly.
- Other `src/auth/` files must import Firebase behavior through adapter exports.
- Error codes: never branch on raw `auth/...` Firebase error strings outside
  the adapter. Use `normalizeAuthErrorCode(error)` from the adapter and branch
  on its generic codes instead. (Known pre-existing exceptions not yet
  migrated: `auth-commands.js`, `onetap.js`, `password-auth.js`,
  `components/UsernamePasswordForm.jsx` — migrate opportunistically when
  touching those files.)

## State Boundary

- `src/auth/auth-state.js` is provider-agnostic state and event orchestration.
- Provider callbacks normalize data and feed state through `setState`.

## Conventions

- Keep auth commands (`auth-commands.js`) focused on user-intent flows.
- Keep setup/bootstrap (`auth-setup.js`) focused on initialization and lifecycle.
- Put provider-specific integration logic in `src/auth/adapters/`.
