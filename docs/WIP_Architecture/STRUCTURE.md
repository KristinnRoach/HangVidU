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

### Three-bucket rule inside `src/app/`

| Bucket | Rule | Examples |
|---|---|---|
| `app/components/` | Generic UI primitives. **No** imports from `features/*`. Eventually absorbs `shared/components/base/`. | `Button`, `Dialog`, `Toast`, `Icon` (none yet; seed on first migration) |
| `app/<feature>/` | Feature-scoped UI + self-subscribing widgets. May import `features/<feature>/`. Eventually absorbs `features/<feature>/components/`. | `contacts/ContactsList.jsx`, `presence/PresenceIndicator.jsx` |
| `app/` (root) | Cross-feature composition, layout shells, mount/bridge files. | `App.jsx`, `mount-app.jsx`, `setupAppRoot.js` |

Rule of thumb: if a component imports from any `features/<x>/` module, it belongs in `app/<x>/`, not `app/components/`.

### Naming conventions in `src/app/`

- **PascalCase `.jsx`** for files that render JSX components (`ContactsList.jsx`, `PresenceIndicator.jsx`).
- **kebab-case `.js`** for bridges, command handlers, and stores-only files (`setupAppRoot.js`, `contacts-command-handlers.js`).
- **Dialog vs modal** convention: `XyzDialog.jsx` is the component; `xyz-modal.jsx` is the imperative `openSolidDialog(...)` bridge that returns a Promise.
- **Tests colocate** next to the file under test (`ContactsList.test.jsx` next to `ContactsList.jsx`). The `tests/` subfolder convention applies to module-root domain tests, not app-layer UI.

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

- Whether service-level writers exported from barrels (e.g., `contactsService.saveContact`) should eventually migrate to `cmd:*` commands, reserving barrel exports for read-only APIs only.
- Whether non-component DOM utilities in `shared/components/ui/utils/` should move to a non-component path (`shared/dom/`) as primitives migrate into `app/components/`.
