# Structure

## Layers

Import rules between layers are enforced by `eslint.boundaries.config.js`; the
full allow-table lives in [`BOUNDARY_MAP.md`](BOUNDARY_MAP.md).
The two foundational layers:

- **`src/lib/`** — the bottom layer: framework-agnostic primitives with **zero
  app knowledge** (e.g. `event-emitter/`, `utils/`, `media/`). Importable by any
  layer; may only import from `lib` itself. Think "could be published to npm".
- **`src/shared/`** — app-aware cross-cutting code that knows HangVidU concepts
  (canonical event names, i18n, invite/room/conversation helpers). May import
  only `shared` and `lib`.

Rule of thumb for placing a util: if it has no app/domain knowledge and no
imports outside `lib`, it belongs in `src/lib/utils/`; otherwise `src/shared/utils/`.

Two sibling infrastructure layers sit below features, splitting state by lifetime:

- **`src/storage/`** — persistence (durable data: contacts, messages, user). Backed by RTDB.
- **`src/realtime/`** — ephemeral coordination (WebRTC signaling; later media-sync). Backed by a Cloudflare Durable Object (`workers/signaling/`). Holds the DO transport, wire protocol, and `P2PRoomSignaling` adapters behind one barrel.

Both are backend-agnostic behind their ports; features import them (realtime directly, storage via `stores`).

## Module layout

- Every module has one barrel: `src/<module>/index.js` (or `index.ts`).
- **Cross-feature** imports go through the barrel. Same-feature subpath imports (e.g. helpers/components reaching into siblings inside `src/features/<x>/`) are allowed.
- Tests live in `src/<module>/tests/`.

## UI layer layout

- `src/App.jsx` is the SolidJS root component.
- `src/mount-app.jsx` is the imperative mount/cleanup surface called by the bootstrap sequence.
- `src/components/` holds all Solid UI.
- `src/components/` may import `auth`, `feature`, and `shared` — but **not** `setup`. UI composes over data/events; bridges live in `setup/`.
- `src/components/` is **not** a second domain layer. Domain logic stays in the owning module.

### `src/components/` structure

| Subpath                      | Rule                                                                                                                                 | Examples                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `components/*.jsx`           | Generic primitives. **No** imports from `features/*`. Eventually absorbs `shared/components/base/`.                                  | `Button`, `Dialog`, `Toast`, `Icon` (none yet; seed on first migration) |
| `components/<feature>/*.jsx` | Feature-scoped UI + self-subscribing widgets. May import `features/<feature>/`. Eventually absorbs `features/<feature>/components/`. | `contacts/ContactsList.jsx`, `presence/PresenceIndicator.jsx`           |

Rule of thumb: if a component imports from any `features/<x>/` module, it belongs in `components/<x>/`, not at `components/` top level.

### UI bridges live in `setup/`

Imperative-to-reactive bridges (files that subscribe to events, dispatch commands, or orchestrate modals around service writes) are **not** components. They live in `src/setup/`:

- `setup/setupAppRoot.js` — wires domain events into the Solid UI store.
- `setup/setupContactsAppBusHandlers.js` — handles `cmd:contacts:*` commands that open UI.

### Naming conventions

- **PascalCase `.jsx`** for files that render JSX components (`ContactsList.jsx`, `PresenceIndicator.jsx`).
- **kebab-case `.js/.jsx`** for bridges, command handlers, and stores-only files (`setupAppRoot.js`, `edit-contact-modal.jsx`).
- **Dialog vs modal**: `XyzDialog.jsx` is the component; `xyz-modal.jsx` is the imperative `openSolidDialog(...)` bridge that returns a Promise.
- **Tests colocate** next to the file under test (`ContactsList.test.jsx` next to `ContactsList.jsx`). The `tests/` subfolder convention applies to module-root domain tests, not UI tests.

## State files

- One `<module>-state.js` per module, at module root.
- No `state/` subfolder.
- No split state files within a module. Split the module before splitting state.
- These rules apply to domain/module state, not Solid UI state in `src/components/`.

## Barrel exports

- Re-export read-only getters and legacy subscribe APIs.
- **Do not** re-export writers (`setState`, `set*`, mutation helpers).
- **Do not** re-export persistence internals.

## Imports

- `<module>-state.js` is importable only from files inside its own module directory.
- `<module>-state.js` must not import Firebase, RTDB, or storage layers. State mirrors what the persistence layer feeds it.

## Setup vs main

- `setup/*` is the bootstrap/lifecycle root: startup sequencing, cross-feature command/event wiring, and UI bridges.
- `src/App.jsx` + `src/components/` form the UI composition root.
- `main.js` is app-runtime orchestration only, not initialization sequencing.
- Thin out `main.js` opportunistically as setup modules absorb sequencing.

---

## Under Consideration

- Whether service-level writers exported from barrels (e.g., `contactsService.saveContact`) should eventually migrate to `cmd:*` commands, reserving barrel exports for read-only APIs only.
- Whether non-component DOM utilities in `shared/components/ui/utils/` should move to a non-component path (`shared/dom/`) as primitives migrate into `src/components/`.
