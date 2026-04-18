# Lint Enforcement

What is automatically enforced today. Source of truth: `eslint.config.js`, `eslint.boundaries.config.js`.

## Active rules

- `local/event-name-format` — event/command names must match canonical regex.
- `no-restricted-imports`
  - Block direct `firebase/auth` imports (route through adapter).
  - Block `**/auth-state`, `**/auth-state.js` imports outside `src/auth/`.
- `boundaries/dependencies` — per-module import boundaries (incremental rollout).
- JSX parsing is enabled for `src/**/*.jsx`.
- Boundary lint includes the `components` layer in addition to `setup`, `auth`, `feature`, and `shared`.

## Current status (April 15, 2026)

- Enforced features (default mode): `contacts`, `push-notifications`, `messaging`, `call`.
- Temporary `shared -> feature` allowlist: `watch`, `notifications`.
- `pnpm lint:boundaries` currently fails with 13 errors (pre-existing, in `call/`).

## Run

- `pnpm lint` — ESLint first, then boundary rules.
- `pnpm lint:boundaries` — boundaries only.
- `pnpm lint:b:all` — boundaries with every feature enforced.

## Adding a new state file to the privacy rule

When `contacts-state.js`, `messaging-state.js`, or `call-state.js` lands, extend the `no-restricted-imports` patterns block in `eslint.config.js` with the same shape used for `auth-state`.

## Current Solid coverage

- `src/components/**` is linted as the `components` layer.
- `components` may import `components`, `auth`, `feature`, and `shared`.
- `setup` may import `components` so bootstrap code can bridge Solid UI.

---

## Under Consideration

- Custom rule: no `new EventEmitter()` inside `src/features/**`.
- Custom rule: barrels may not re-export symbols matching `/^set[A-Z]/` from `*-state.js`.
- Custom rule: `*-state.js` may not import `firebase/*` or `**/storage/**`.
