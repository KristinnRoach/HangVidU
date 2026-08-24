# State Rules

Pattern for module state that other modules observe (`isLoggedIn`, `isInCall`, …).

Domain/module state only. Solid reactive stores live in `src/stores/` and are
mirrors over the persistence/realtime layers.

See also: [`NAMING.md`](./NAMING.md), [`STRUCTURE.md`](./STRUCTURE.md), [`EVENTS.md`](./EVENTS.md).

## When to use a dedicated state file

**Default: a Solid store** (`createStore`) is the reactive in-memory mirror —
either in `src/stores/` (`contacts-store.ts`) or inside the module for
feature-local state. Read it directly or via a `use<X>()` hook. Most modules need
nothing more.

A `src/<module>/<module>-state.js` file is the **exception**, used only when:

- ≥1 non-Solid consumer must observe changes via the event bus, **or**
- the module owns coordinating behavior beyond mirroring storage into a store.

Current instances: `auth/auth-state.js` and `shared/app-reload/app-reload-state.ts`.

## Shape (when a dedicated state file is used)

- One module-private `state` object.
- One module-private `setState(patch)` writer.
- Sync getters: `getX()`, `getY()`.
- One canonical event: `evt:<module>:state:changed` with `{ state, prev }`.

## Writer rules

- One writer: `setState` in the state file, not re-exported from the barrel.
- Every mutation flows through it, and it publishes
  `evt:<module>:state:changed` on every call.

## Reader rules

- Sync getters only. No `await`, no Firebase, no remote reads.
- Reads are **read-only**: callers must not mutate returned values. Solid stores
  enforce this naturally; plain objects/maps rely on convention.
- If the truth lives remotely, the state file mirrors it on change.

## Consumer rules

- External reads: import getters from the module barrel.
- External reactions: `subscribe('evt:<module>:state:changed', …)` when an
  event-bus reaction is the natural fit; Solid surfaces read the store directly.
- External writes: see [`EVENTS.md`](./EVENTS.md).

## Derived state

- No derived state cached across modules.
- If two modules need the same derived value, derive it once inside the owning
  state file and expose a getter.
- Consumers may cache for rendering only, never for re-publishing.

## Legacy surfaces

`auth` publishes `evt:auth:session:ready` / `:logged-in` / `:logged-out`
alongside the canonical `evt:auth:state:changed`. Legacy surfaces stay during
migration and get removed when zero callers remain.
