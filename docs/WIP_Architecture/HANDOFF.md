# Handoff

Current checkpoint is focused on incremental architecture enforcement without blocking unrelated work.

Completed in this branch:
- moved auth from `src/features/auth/` to `src/auth/`
- added auth intent events and auth intent listeners
- made `AuthComponent` emit auth intent events instead of calling auth actions directly
- simplified ESLint boundary rules to a generic module model with incremental enforcement
- added generic feature typing with captured `featureName` values in `eslint.config.js`
- limited active feature enforcement to `contacts`
- added [ADD_NEXT_FEATURE.md](./ADD_NEXT_FEATURE.md) with the exact template for turning on the next feature
- moved `appBus` and `EventEmitter` from `src/app/` to `src/events/`
- changed contacts conversation selection to emit `messaging:conversation:selected:requested`
- added minimal app-side handling for `messaging:conversation:selected:requested`

Current intended standards:
- `shared` may import only `shared`
- an enforced feature module may import only `shared` and itself
- an enforced feature module may not import `auth`, `app`, or sibling features
- feature typing is generic, but enforcement is added one feature at a time
- `src/events/` is shared event infrastructure, not part of the `app` layer
- `appBus` is used for cross-module intents and coordination
- cross-module state observation should prefer producer-owned `appBus` events over direct sibling-feature imports

Verified at this checkpoint:
- `pnpm lint:boundaries`
- `pnpm test`

Next goal:
- keep boundary rollout incremental
- remove one remaining `contacts` dependency category at a time
- use [ADD_NEXT_FEATURE.md](./ADD_NEXT_FEATURE.md) when turning on enforcement for another feature
- keep `contacts` as the reference implementation for the rollout pattern

Notes:
- `src/auth/auth-state.js` still owns the canonical auth snapshot and the internal `subscribe()` implementation
- `src/auth/index.js` is now the intended public auth surface for external consumers
- `contacts` is the only feature currently under active feature-boundary enforcement
- current `contacts` violation categories are:
  - auth dependency
  - app dependency
  - messaging dependency
  - notifications dependency
  - account/profile dependency
- current `contacts` messaging change:
  - `contacts` no longer calls `messagingController.selectConversation()` directly from the contacts list UI
  - `contacts` emits `messaging:conversation:selected:requested`
  - handling currently lives in app composition
