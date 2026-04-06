# Handoff

Current checkpoint is focused on incremental architecture enforcement without blocking unrelated work.

Completed in this branch:

- moved auth from `src/features/auth/` to `src/auth/`
- removed the auth-local bus and standardized auth commands on the shared events API
- made `AuthComponent` dispatch auth commands instead of calling auth actions directly
- simplified ESLint boundary rules to a generic module model with incremental enforcement
- added generic feature typing with captured `featureName` values in `eslint.config.js`
- limited active feature enforcement to `contacts`
- added [ADD_NEXT_FEATURE.md](./ADD_NEXT_FEATURE.md) with the exact template for turning on the next feature
- moved `appBus` and `EventEmitter` from `src/app/` to `src/events/`
- added `src/events/index.js` as the intended public cross-module event entrypoint
- standardized the basic event API around:
  - `dispatchCommand()`
  - `dispatchCommandAndAwait()`
  - `handleCommand()`
  - `publish()`
  - `publishAndAwait()`
  - `subscribe()`
- updated `contacts` -> `messaging` conversation selection to use `dispatchCommand('messaging:conversation:select', ...)`
- updated unread-count flow so `messaging` owns unread subscriptions and publishes unread facts for `contacts`
- removed `src/components/ui/dispatcher.js`
- made `src/events/` explicitly part of shared code in `eslint.config.js`
- moved `src/firebase/presence.js` to `src/features/presence/` with abstracted RTDB layer, added to shared boundary patterns
- removed `contacts-bus` and `setupContactsAppBusBridge`
- changed `contacts-service` to publish cross-module facts directly:
  - `room:id:created`
  - `room:id:updated`
  - `contact:deleted`
- migrated remaining touched feature/app/auth listeners away from direct `appBus` usage where already adjusted in this branch
- moved `resolveDirectConversationId` out of `messaging` into shared `src/utils/direct-conversation-id.js`
- removed direct `contacts -> messaging` import for conversation id helpers
- added app-level notification projection in `src/app/setupNotificationsHandlers.js`
- changed `contacts` invite/referral flows to publish notification facts instead of importing notifications directly
- replaced `setupMainAuthAppBusListeners` with `setupAuth` in `src/app/setupAuth.js`:
  - setup is app-owned and idempotent
  - auth listeners are registered before `initAuth()` runs
- documented setup direction in `src/app/SETUP<MODULE>.md`
- added WIP docs:
  - [LINKS_TO_DOCS.md](./LINKS_TO_DOCS.md)
  - [WIP_TEST_MOCKS_SPY.md](../WIP_TEST_MOCKS_SPY.md)

Current intended standards:

- `shared` may import only `shared`
- an enforced feature module may import `shared`, itself, and intentional upstream modules like `auth`
- an enforced feature module may not import `app` or sibling features unless explicitly allowed
- feature typing is generic, but enforcement is added one feature at a time
- `src/events/` is shared event infrastructure, not part of the `app` layer
- `src/events/index.js` is the intended public cross-module event API
- `dispatchCommand()` asks another module to do work
- `dispatchCommandAndAwait()` asks another module to do work and waits for completion
- `publish()` announces a fact that already happened
- `publishAndAwait()` should be reserved for cases where the publisher truly needs listener completion
- cross-module state observation should prefer producer-owned published facts over direct sibling-feature imports
- direct `appBus` imports outside `src/events/` should be treated as migration leftovers unless there is a strong reason
- app composition should prefer `src/app/setup<Module>.js` entrypoints that own ordering for listener registration vs initialization
- when practical, setup entrypoints should be idempotent

Verified on this branch (April 6, 2026):

- temporary `shared -> feature` allowlist is active for: `call`, `messaging`, `watch`, `notifications`
- `pnpm lint:boundaries` passes
- `contacts -> messaging` boundary dependency is removed by moving the helper to shared utils
- temporary `contacts -> feature` exceptions still active in `eslint.config.js` for:
  - `notifications`
  - `account`
- no direct `appBus` imports were found outside `src/events/` in runtime source files

Next goal:

- keep boundary rollout incremental
- fix the remaining boundary failures in order:
  - first identify code that is simply in the wrong layer/folder
  - second move code to the right place when that is the clean fix
  - third reconsider rules only when the folder placement truly reflects intended dependency direction
  - invent new abstractions only as a last resort
- remove one remaining `contacts` sibling-feature dependency category at a time
- use [ADD_NEXT_FEATURE.md](./ADD_NEXT_FEATURE.md) when turning on enforcement for another feature
- keep `contacts` as the reference implementation for the rollout pattern
- continue migrating remaining direct `appBus` usage onto `src/events/index.js`
- continue moving app bootstrap to `setup<Module>()` entrypoints where it simplifies sequencing and idempotent setup

Notes:

- `src/auth/auth-state.js` still owns the canonical auth snapshot and the internal `subscribe()` implementation
- `src/auth/index.js` is now the intended public auth surface for external consumers
- `contacts` is the only feature currently under active feature-boundary enforcement
- the prior `shared -> auth` violation in `src/firebase/cloud-functions.js` is resolved; cloud-functions auth code now lives in `src/auth/cloud-functions.js`
- temporary `shared -> feature` allowlist is active in `eslint.config.js` for:
  - `call`
  - `messaging`
  - `watch`
  - `notifications`
- remaining `contacts` exception categories are:
  - notifications dependency
  - account dependency
- current `contacts` messaging status:
  - `contacts` no longer imports `messagingController`
  - `contacts` dispatches `messaging:conversation:select`
  - handling lives in app composition
  - unread-count facts are published by `messaging`
  - direct conversation id helper is now shared (`src/utils/direct-conversation-id.js`)
- auth status:
  - auth commands are now wired through the shared `events` API
  - auth lifecycle facts are published from `auth-state` via shared events
  - `setupAuth.js` is the app-owned auth setup entrypoint and owns auth listener/init ordering
  - no auth-local bus remains
