# State Rules

Pattern for module state that other modules need to observe (e.g. `isLoggedIn`, `isInCall`, current conversation list).

**Goal:** one pattern, one event per domain, one writer, one read path. No hidden mirrors, no per-module bespoke pub/sub.

Not to be confused with `store` — that word is reserved for persistence layers (`contacts-store`, `message-store`). In-memory state lives in `<module>-state.js`.

---

## The Pattern

Each module that owns cross-module state exposes **one** file:

```
src/<module>/<module>-state.js
```

That file holds:

1. A single `state` object (module-private).
2. A single `setState(patch)` writer (module-private — not re-exported from the barrel).
3. Synchronous getters: `getX()`, `getY()`.
4. One canonical change event: `evt:<module>:state:changed` with payload `{ state, prev }`.

Every mutation goes through `setState`, which applies the patch and publishes the event on the shared app bus (`src/shared/events/`).

### Consumer contract

- **Read now:** call a getter from the module barrel (`import { getIsLoggedIn } from '../auth'`).
- **React to changes:** `subscribe('evt:<module>:state:changed', ({ state, prev }) => …)`.
- That's it. No other read or subscribe path is allowed.

### Producer contract

- Only files inside the owning module import `<module>-state.js` directly.
- Only the owning module calls `setState`.
- `setState` is not re-exported from the module barrel.

---

## Rules

1. **One state file per module.** Named `<module>-state.js`. No `state/` folder, no split files.
2. **One event per state file.** Canonical name `evt:<module>:state:changed`. Additional events are allowed only when they carry information **not derivable** from `state`/`prev`.
3. **One writer.** `setState` (or equivalent) is module-private. It must not be re-exported from the barrel. External writes happen via commands (`cmd:*`) handled inside the owning module.
4. **Sync getters only.** Getters never await, never touch Firebase. If the truth lives remotely, the state file mirrors it.
5. **No parallel subscription mechanisms.** No local listener sets, no per-module `EventEmitter`. Subscribers use the shared app bus.
6. **No derived state stored elsewhere.** Consumers may cache values for rendering, not for re-publishing. If two modules need the same derived value, derive it once inside the owning module's state file.
7. **Boundary:** `<module>-state.js` is importable only from within its own module directory. Cross-module access goes through the barrel. Enforced incrementally via ESLint `no-restricted-imports` (see `eslint.config.js`).

---

## Event name

`evt:<module>:state:changed` matches the 4-part canonical regex enforced by the `local/event-name-format` rule: `<kind>:<domain>:<entity>:<action>` → `evt:auth:state:changed`, `evt:contacts:state:changed`, `evt:call:state:changed`, etc.

Payload shape:

```js
{
  state: { /* full current snapshot, immutable */ },
  prev:  { /* full previous snapshot, immutable */ },
}
```

Consumers diff `state` vs `prev` if they care about specific transitions.

---

## Adoption status

| Module     | State file        | `evt:<module>:state:changed` | `setState` private | Boundary enforced |
| ---------- | ----------------- | ---------------------------- | ------------------ | ----------------- |
| auth       | `auth-state.js`   | yes                          | yes                | yes               |
| contacts   | —                 | —                            | —                  | —                 |
| messaging  | —                 | —                            | —                  | —                 |

Contacts and messaging will follow. Call module rebuild adopts the pattern from day one.

### Notes during migration

- `auth/` retains the legacy `onAuthStateChanged(fn)` subscribe API and the `evt:auth:session:ready|login|logout` events alongside `evt:auth:state:changed`. Callers migrate incrementally; once zero callers remain, the legacy API is deleted.
