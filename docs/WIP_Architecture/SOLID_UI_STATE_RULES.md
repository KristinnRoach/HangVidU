# Solid UI State Rules

Pattern for SolidJS UI-only reactive state in `src/app/`.

This file is intentionally minimal for now. Add rules only after they are proven in migration work.

See also: [`STRUCTURE.md`](./STRUCTURE.md), [`STATE_RULES.md`](./STATE_RULES.md), [`EVENTS.md`](./EVENTS.md), [`LINT_ENFORCEMENT.md`](./LINT_ENFORCEMENT.md).

---

## Scope

- Applies to UI-only reactive state used by Solid components in `src/app/`.
- Does **not** replace `<module>-state.js` domain state files.
- UI state may mirror or derive from domain state, but does not own domain truth.

## Current shape

- UI state may live in a `.jsx` component file when the surface is still small.
- Bridge/wiring files in `src/app/` may write UI state.
- Current example:
  - `src/app/components/ContactsList.jsx` owns the contacts row store.
  - `src/app/setupAppRoot.js` bridges domain events into that store.

## Current rules

- Use `.jsx` for any file that contains JSX.
- Use plain `.js` for app bridge/wiring files with no JSX.
- Keep UI state private to the Solid surface unless another migrated UI surface must read it.
- UI state writers must not be re-exported from feature barrels.
- Bridge files read domain state via feature barrels and react via canonical `evt:*` events.
- Bridge files may dispatch canonical `cmd:*` commands for cross-module intent.
- Do not put Firebase, RTDB, or persistence code directly into `src/app/` UI state.

## Open questions

- Whether UI state should stay co-located in component files or move to dedicated `*-ui-state.js` files in `src/app/`.
- Whether app-specific UI for a feature should live in `src/features/<name>/components/` or `src/app/<name>/`.
- How locale reactivity should be standardized for Solid surfaces.
