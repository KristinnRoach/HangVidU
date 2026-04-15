# State Rules

Pattern for module state that other modules observe (`isLoggedIn`, `isInCall`, `contactsById`, …).

Do not call state a **store**. `store` = persistence only.

See also: [`NAMING.md`](./NAMING.md), [`STRUCTURE.md`](./STRUCTURE.md), [`EVENTS.md`](./EVENTS.md), [`LINT_ENFORCEMENT.md`](./LINT_ENFORCEMENT.md).

---

## Shape

Each module owning cross-module state has one file: `src/<module>/<module>-state.js`.

It exposes:

- One module-private `state` object.
- One module-private `setState(patch)` writer.
- Sync getters: `getX()`, `getY()`.
- One canonical event: `evt:<module>:state:changed` with `{ state, prev }`.

## Writer rules

- One writer: `setState` in the state file.
- `setState` is **not** re-exported from the barrel.
- Every mutation flows through `setState`.
- `setState` publishes `evt:<module>:state:changed` on every call.

## Reader rules

- Sync getters only. No `await`, no Firebase, no remote reads.
- Getters return immutable snapshots (defensive copies).
- If the truth lives remotely, the state file mirrors it on change.

## Consumer rules

- External reads: import getters from the module barrel.
- External reactions: `subscribe('evt:<module>:state:changed', …)`.
- External writes: `dispatchCommand('cmd:<module>:*', …)`.
- No other read, subscribe, or write path.

## Derived state

- No derived state cached across modules.
- If two modules need the same derived value, derive it once inside the owning state file and expose a getter.
- Consumers may cache for rendering only, never for re-publishing.

## Adoption status

| Module    | State file      | `evt:<module>:state:changed` | `setState` private | Boundary enforced |
| --------- | --------------- | ---------------------------- | ------------------ | ----------------- |
| auth      | `auth-state.js` | yes                          | yes                | yes               |
| contacts  | —               | —                            | —                  | —                 |
| messaging | —               | —                            | —                  | —                 |
| call      | —               | —                            | —                  | —                 |

## Migration notes

- Legacy surfaces stay during migration, get removed when zero callers remain.
- `auth/` still exposes `onAuthStateChanged` and `evt:auth:session:ready|login|logout` alongside the canonical event.

---

## Under Consideration

- None.
