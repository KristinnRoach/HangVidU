# Structure

## Module layout

- Every module has one barrel: `src/<module>/index.js`.
- Outsiders import **only** from the barrel.
- Tests live in `src/<module>/tests/`.

## State files

- One `<module>-state.js` per module, at module root.
- No `state/` subfolder.
- No split state files within a module. Split the module before splitting state.

## Barrel exports

- Re-export read-only getters and legacy subscribe APIs.
- **Do not** re-export writers (`setState`, `set*`, mutation helpers).
- **Do not** re-export persistence internals.

## Imports

- `<module>-state.js` is importable only from files inside its own module directory.
- `<module>-state.js` must not import Firebase, RTDB, or storage layers. State mirrors what the persistence layer feeds it.

## Setup vs main

- `setup/*` is the composition root: startup/lifecycle wiring and cross-feature command/event wiring.
- `main.js` is app-runtime orchestration only, not initialization sequencing.
- Thin out `main.js` opportunistically as setup modules absorb sequencing.

---

## Under Consideration

- None.
