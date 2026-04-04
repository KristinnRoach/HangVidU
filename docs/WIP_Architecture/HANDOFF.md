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
- added `src/events/index.js` as the intended public cross-module event entrypoint
- standardized the basic event API around:
  - `dispatchCommand()`
  - `handleCommand()`
  - `publish()`
  - `publishAndAwait()`
  - `subscribe()`
- updated `contacts` -> `messaging` conversation selection to use `dispatchCommand('messaging:conversation:select', ...)`
- updated unread-count flow so `messaging` owns unread subscriptions and publishes unread facts for `contacts`
- removed `src/components/ui/dispatcher.js`
- made `src/events/` explicitly part of shared code in `eslint.config.js`
- removed `contacts-bus` and `setupContactsAppBusBridge`
- changed `contacts-service` to publish cross-module facts directly:
  - `room:id:created`
  - `room:id:updated`
  - `contact:deleted`
- migrated remaining touched feature/app/auth listeners away from direct `appBus` usage where already adjusted in this branch

Current intended standards:
- `shared` may import only `shared`
- an enforced feature module may import only `shared` and itself
- an enforced feature module may not import `auth`, `app`, or sibling features
- feature typing is generic, but enforcement is added one feature at a time
- `src/events/` is shared event infrastructure, not part of the `app` layer
- `src/events/index.js` is the intended public cross-module event API
- `dispatchCommand()` asks another module to do work
- `publish()` announces a fact that already happened
- `publishAndAwait()` should be reserved for cases where the publisher truly needs listener completion
- cross-module state observation should prefer producer-owned published facts over direct sibling-feature imports
- direct `appBus` imports outside `src/events/` should be treated as migration leftovers unless there is a strong reason

Verified at this checkpoint:
- focused vitest suites around contacts/messaging/call/auth event migration
- `pnpm build`

Next goal:
- keep boundary rollout incremental
- remove one remaining `contacts` dependency category at a time
- use [ADD_NEXT_FEATURE.md](./ADD_NEXT_FEATURE.md) when turning on enforcement for another feature
- keep `contacts` as the reference implementation for the rollout pattern
- continue migrating remaining direct `appBus` usage onto `src/events/index.js`
- inspect likely redundancy in auth event plumbing before making larger auth changes

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
  - `contacts` no longer imports `messagingController`
  - `contacts` dispatches `messaging:conversation:select`
  - handling lives in app composition
  - unread-count facts are published by `messaging`
- auth area follow-up:
  - `authBus` still has current value because it carries both internal auth intents and auth lifecycle facts
  - `setupMainAuthAppBusListeners.js` is not redundant; it owns real app reactions
  - `setupAuthAppBusBridge.js` is still suspiciously thin and should be revisited
  - likely redundancy review targets:
    - `setupAuthAppBusBridge.js`
    - `auth-intent-listeners.js`
    - `auth-bus.js`
    - `auth-state.js`
    - `setupMainAuthAppBusListeners.js`
