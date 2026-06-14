# Retire `onAuthStateChanged()` focused slice

## Objective

Remove the legacy imperative `onAuthStateChanged()` API and standardize on:

- `useAuth()` for Solid UI.
- Event-bus auth lifecycle events for non-UI side effects.
- Getter APIs for action-time snapshots.

This is independent of the Firebase provider migration. The only requirement is
that the auth implementation continues publishing the existing auth-state and
session lifecycle events.

## Files to change

- `src/auth/solid-auth.tsx`
  - Replace `onAuthStateChanged()` with
    `subscribe('evt:auth:state:changed', ({ state }) => setSnapshot(state))`.
  - Keep the initial `getAuthState()` snapshot.

- `src/auth/auth-state.js`
  - Rework `waitForAuthReady()` to subscribe to `evt:auth:state:changed` until
    `state.status` is `authenticated` or `unauthenticated`.
  - Remove `listeners`, `onAuthStateChanged()`, and direct listener fanout from
    `setState()`.
  - Keep publishing `evt:auth:state:changed`,
    `evt:auth:session:ready`, `evt:auth:session:logged-in`, and
    `evt:auth:session:logged-out`.

- `src/auth/index.js`
  - Stop re-exporting `onAuthStateChanged`.
  - Update the module-map comment if needed.

- `src/features/presence/index.js`
  - Move auth lifecycle handling into `setup()` using `subscribe(...)` with the
    setup `AbortController`.
  - `evt:auth:session:logged-in`: initialize presence for
    `getLoggedInUserId()`.
  - `evt:auth:session:logged-out`: clear `initializedForUserId` and
    `lastSeenUserId`.

- Tests/mocks
  - Update `src/auth/solid-auth.test.jsx`.
  - Replace the `onAuthStateChanged` unit test in
    `src/auth/tests/auth-state.test.js` with event-based coverage.
  - Update presence setup tests and any stale auth mocks.

## Important implications

- Preserve setup ordering: `setupPresence()` must register auth event listeners
  before `initAuth()` emits the first stable auth events.
- Do not move non-UI side effects into Solid components.
- Do not remove the getter API: `getLoggedInUserId()`, `getUser()`,
  `getAuthState()`, and `getIsLoggedIn()` remain useful outside UI rendering.
- This should reduce public auth API surface without changing runtime behavior.

## Acceptance checks

- `rg "onAuthStateChanged" src` should only find Firebase adapter internals or
  comments that intentionally mention the removed API.
- Focused tests:
  - `src/auth/solid-auth.test.jsx`
  - `src/auth/tests/auth-state.test.js`
  - `src/features/presence/__tests__/setup.test.js`
- `pnpm build`
