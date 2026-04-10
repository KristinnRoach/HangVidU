# Auth Module Architecture

## Public API
- Entry point: `src/auth/index.js`
- Consumers outside `src/auth/` should import auth functions from this barrel.

## Vendor Boundary
- Firebase Auth gateway: `src/auth/adapters/firebase-auth-adapter.js`
- Only this adapter is allowed to import `firebase/auth` directly.
- Other `src/auth/` files must import Firebase behavior through adapter exports.

## State Boundary
- `src/auth/auth-state.js` is provider-agnostic state and event orchestration.
- Provider callbacks normalize data and feed state through `setState`.

## Conventions
- Keep auth actions (`auth-actions.js`) focused on user-intent flows.
- Keep setup/bootstrap (`auth-setup.js`) focused on initialization and lifecycle.
- Put provider-specific integration logic in `src/auth/adapters/`.
