# State Rules

Pattern for module state that other modules observe (`isLoggedIn`, `isInCall`, `contactsById`, …).

This file is for domain/module state only. Solid reactive stores live in
`src/stores/` and are mirrors over the persistence/realtime layers.

See also: [`NAMING.md`](./NAMING.md), [`STRUCTURE.md`](./STRUCTURE.md), [`EVENTS.md`](./EVENTS.md).

---

## When to use a dedicated state file

A `src/<module>/<module>-state.js` file is **optional**. Use one only when:

- ≥1 non-Solid consumer must observe changes via the event bus, **or**
- the module owns coordinating behavior beyond mirroring storage into a reactive store.

When the only consumers are Solid surfaces in the same feature, a Solid store (`createStore`) inside the module is sufficient — it is the reactive in-memory mirror. Read it directly or via a `use<X>()` hook.

## Shape (when a dedicated state file is used)

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
- Reads are **read-only**: callers must not mutate returned values. Solid stores enforce this naturally; plain objects/maps rely on convention (freeze in dev if needed).
- If the truth lives remotely, the state file mirrors it on change.

## Consumer rules

- External reads: import getters from the module barrel.
- External reactions: `subscribe('evt:<module>:state:changed', …)` when an event-bus reaction is the natural fit; Solid surfaces can read the store directly.
- External writes: see [`EVENTS.md`](./EVENTS.md) — direct barrel calls are fine for typed in-process intent; reserve `cmd:*` for fire-and-forget cross-module triggers.

## Derived state

- No derived state cached across modules.
- If two modules need the same derived value, derive it once inside the owning state file and expose a getter.
- Consumers may cache for rendering only, never for re-publishing.

## Adoption status

| Module    | Shape                                  | Notes                                                              |
| --------- | -------------------------------------- | ------------------------------------------------------------------ |
| auth           | dedicated `auth-state.js`                  | non-Solid consumers subscribe to `evt:auth:session:*`         |
| contacts       | Solid store in `stores/contactsStore.ts`   | Solid-only consumers; no `evt:contacts:state:changed`         |
| messaging-next | —                                          |                                                              |
| call           | —                                          |                                                              |

## Migration notes

- Legacy surfaces stay during migration, get removed when zero callers remain.
- `auth/` still exposes `onAuthStateChanged` and `evt:auth:session:ready|login|logout` alongside the canonical event.

---

## Under Consideration

- None.
