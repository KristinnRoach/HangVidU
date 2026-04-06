# Mock Migration: factory → `{ spy: true }`

## Why

In Vitest browser mode (Playwright), `vi.mock('module', () => ({...}))` factory mocks create `ManualMockedModule` objects that call `resolveManualMock` via RPC. If the Playwright RPC channel closes before pending mock resolutions finish (a teardown race), vitest exits with code 1 even though all tests passed. Switching to `{ spy: true }` uses a different internal path that requires no RPC call.

## Scope

26 test files, 143 factory mock calls. All in `src/**/*.test.js` and `tests/**/*.test.js`.

## Rules

- Replace `vi.mock('path', () => ({ ... }))` with `vi.mock('path', { spy: true })`
- `{ spy: true }` keeps real implementations — add `vi.mocked(fn).mockReturnValue(...)` / `.mockImplementation(...)` in `beforeEach` for any function that would throw or hit real services (Firebase, network, DOM)
- Use `vi.spyOn(obj, 'method')` only for overriding a single method on an already-imported object/namespace — not as a replacement for module-level mocking
- `vi.restoreAllMocks()` is already called globally in `tests/setup.js` — do not add it per-file
- Do not change test assertions, only the mock setup

## What NOT to do

- Do not use `vi.mock('path', { spy: true })` if the module's real implementation cannot load in test environment — check for errors first by running the specific test file
- Do not leave any `vi.mock` call with a factory function (`=> ({...})`) — these are the source of the birpc error
- Do not convert `vi.hoisted(...)` blocks — those are fine as-is
- Do not use `{ spy: true }` on a module and then skip setting up mocks for functions that return `undefined` by default but are expected to return specific shapes — the real function will be called and may throw

## Known prerequisite (done)

`src/storage/user/profile.js` previously called `onAuthStateChange()` at module init time, creating a circular dependency: `auth/index.js` → `auth-actions.js` → `push-notifications` → `contacts/index.js` → `referral-handler.js` → `storage/user/profile.js` → back to `auth/index.js`. This caused TDZ errors when `{ spy: true }` loaded the real `auth/index.js`. Fixed by moving auth subscription wiring into `src/app/setupUserAccount.js`.

## Verification per file

After converting each file, run:
```
npx vitest --run <path/to/file.test.js>
```
Confirm all tests pass before moving to the next file.
