# Migrate Component To SolidJS

Notes on migrating one UI surface at a time into `src/components/`.

See also: [`STRUCTURE.md`](./STRUCTURE.md), [`SOLID_UI_STATE_RULES.md`](./SOLID_UI_STATE_RULES.md), [`STATE_RULES.md`](./STATE_RULES.md), [`EVENTS.md`](./EVENTS.md).

- Put Solid UI in `src/components/`.
- Keep imperative bootstrap, app-bus wiring, and other bridges in `src/setup/`.
- Keep domain logic in the owning `features/*` or `auth/*` module.
- Read domain state through the module barrel. Do not import persistence directly into Solid UI.
- UI-only reactive state may live with the Solid surface while it is still small.
- Prefer feature-scoped paths like `src/components/contacts/` for feature UI.
- Use `PascalCase.jsx` for JSX components.
- Use `kebab-case.js` or `kebab-case.jsx` for imperative bridges such as modal openers.
- `XyzDialog.jsx` is the component. `xyz-modal.jsx` is the imperative promise wrapper if one is needed.
- Do NOT add tests prematurely for migrated components, only AFTER I have manually tested and verified the implementation (and only valuable tests that are flexible and unlikely to become redundant maintenance burden).

## i18n

- During migration, keep one shared i18n entrypoint: `src/shared/i18n/index.js`.
- Keep dictionaries in `src/shared/i18n/en.json` and `src/shared/i18n/is.json`.
- Do not introduce a second component-local or feature-local i18n system.
- In Solid components, prefer `useI18n()` from the shared i18n module.
- In imperative or legacy code, keep using `t(...)`, `getLocale()`, `setLocale()`, and `onLocaleChange(...)` from the same shared module.
- Locale updates must go through the shared i18n seam. Do not add per-component locale workarounds.

## Example

- Surface: contacts list
- Existing file(s): legacy contacts-list rendering and related imperative wiring
- New Solid component(s): `src/components/contacts/ContactsList.jsx`, `src/components/contacts/ContactEntry.jsx`
- Bridge file(s) needed in `src/setup/`: `src/setup/setupAppRoot.js`, `src/setup/setupContactsAppBusHandlers.js`
- Domain module(s) read from: `src/features/contacts/index.js`
- Commands/events touched: `cmd:contacts:*`, `evt:contacts:state:changed`, `evt:messaging:conversation:unread-count-changed`
- i18n keys added or reused: reuse shared keys via `src/shared/i18n/index.js`
- Tests added or updated: `src/components/contacts/ContactsList.test.jsx`
