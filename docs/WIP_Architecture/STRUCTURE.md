# Structure

## Module layout

- Every module has one barrel: `src/<module>/index.js`.
- Outsiders import **only** from the barrel.
- Tests live in `src/<module>/tests/`.

## App layout

- `src/app/` is the UI composition root for SolidJS surfaces.
- `src/app/App.jsx` is the current root component for migrated UI.
- `src/app/` may import `feature`, `auth`, `shared`, and `setup` as allowed by boundaries.
- `src/app/` owns app-specific UI composition, UI bridges, and UI-only reactive state.
- `src/app/` is **not** a second domain layer. Domain logic stays in the owning module.

## State files

- One `<module>-state.js` per module, at module root.
- No `state/` subfolder.
- No split state files within a module. Split the module before splitting state.
- These rules apply to domain/module state, not Solid UI state in `src/app/`.

## Barrel exports

- Re-export read-only getters and legacy subscribe APIs.
- **Do not** re-export writers (`setState`, `set*`, mutation helpers).
- **Do not** re-export persistence internals.

## Imports

- `<module>-state.js` is importable only from files inside its own module directory.
- `<module>-state.js` must not import Firebase, RTDB, or storage layers. State mirrors what the persistence layer feeds it.

## Setup vs main

- `setup/*` is the bootstrap/lifecycle root: startup sequencing and cross-feature command/event wiring.
- `src/app/` is the UI composition root.
- `main.js` is app-runtime orchestration only, not initialization sequencing.
- Thin out `main.js` opportunistically as setup modules absorb sequencing.

---

## Under Consideration

- Whether app-specific UI for reusable-leaning modules (for example `contacts`) should move from `src/features/<name>/components/` into `src/app/<name>/`.
- Whether service-level writers exported from barrels (e.g., `contactsService.saveContact`) should eventually migrate to `cmd:*` commands, reserving barrel exports for read-only APIs only.
