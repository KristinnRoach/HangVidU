# Solid UI State Rules

Pattern for SolidJS UI-only reactive state in `src/components/`.

This file is intentionally minimal for now. Add rules only after they are proven in migration work.

See also: [`STRUCTURE.md`](./STRUCTURE.md), [`STATE_RULES.md`](./STATE_RULES.md), [`EVENTS.md`](./EVENTS.md), [`LINT_ENFORCEMENT.md`](./LINT_ENFORCEMENT.md).

---

## Scope

- Applies to UI-only reactive state used by Solid components in `src/components/`.
- Does **not** replace `<module>-state.js` domain state files.
- UI state may mirror or derive from domain state, but does not own domain truth.

## Current shape

- UI state may live in a `.jsx` component file when the surface is still small.
- Bridge/wiring files in `src/setup/` may write UI state.
- Current example:
  - `src/components/contacts/ContactsList.jsx` owns the contacts row store.
  - `src/setup/setupAppRoot.js` bridges domain events into that store.

## Current rules

- Use `.jsx` for any file that contains JSX.
- Use plain `.js` for bridge/wiring files with no JSX.
- Keep UI state private to the Solid surface unless another migrated UI surface must read it.
- UI state writers must not be re-exported from feature barrels.
- Bridge files read domain state via feature barrels and react via canonical `evt:*` events.
- Bridge files may dispatch canonical `cmd:*` commands for cross-module intent.
- Do not put Firebase, RTDB, or persistence code directly into `src/components/` UI state.

## Open questions

- Whether UI state should stay co-located in component files or move to dedicated `*-ui-state.js` files next to their component.

Resolved: feature-scoped UI lives in `src/components/<name>/` (see STRUCTURE.md).
Resolved: Solid components use the shared i18n seam in `src/shared/i18n/index.js`; prefer `useI18n()` in Solid and keep `t()` compatibility for imperative surfaces during migration.
