# Handoff: Boundaries

Narrative log of the boundary/dependency enforcement rollout. Rules and current enforcement status live in [`../LINT_ENFORCEMENT.md`](../LINT_ENFORCEMENT.md), [`../STRUCTURE.md`](../STRUCTURE.md), [`../EVENTS.md`](../EVENTS.md). Setup/init narrative lives in [`SETUP_INIT.md`](./SETUP_INIT.md).

## Completed in this branch

- moved auth from `src/features/auth/` to `src/auth/`
- removed the auth-local bus and standardized auth commands on the shared events API
- made `AuthComponent` dispatch auth commands instead of calling auth actions directly
- simplified ESLint boundary rules to a generic module model with incremental enforcement
- added generic feature typing with captured `featureName` values in `eslint.boundaries.config.js`
- expanded active feature enforcement beyond `contacts`
- added [ADD_NEXT_FEATURE.md](./ADD_NEXT_FEATURE.md) with the exact template for turning on the next feature
- moved the shared event bus infrastructure into `src/shared/events/`
- added `src/shared/events/index.js` as the intended public cross-module event entrypoint
- standardized the basic event API (`dispatchCommand`, `dispatchCommandAndAwait`, `handleCommand`, `publish`, `publishAndAwait`, `subscribe`)
- updated `contacts` -> `messaging` conversation selection to use `dispatchCommand('cmd:messaging:conversation:select', ...)`
- updated unread-count flow so `messaging` owns unread subscriptions and publishes unread facts for `contacts`
- removed `src/shared/components/ui/dispatcher.js`
- made `src/shared/events/` explicitly part of shared code in `eslint.boundaries.config.js`
- moved legacy shared presence logic into `src/features/presence/` with abstracted RTDB layer
- removed `contacts-bus` and `setupContactsAppBusBridge`
- changed `contacts-service` to publish cross-module facts directly (`evt:contacts:room:created`, `evt:contacts:room:updated`, `evt:contacts:contact:deleted`)
- migrated remaining touched feature/app/auth listeners away from direct `appBus` usage
- moved `resolveDirectConversationId` out of `messaging` into `src/shared/utils/direct-conversation-id.js`
- added app-level notification projection in `src/setup/setupNotificationsHandlers.js`
- changed `contacts` invite/referral flows to publish notification facts instead of importing notifications directly
- decoupled push notifications from direct `auth`/`contacts` imports via shared commands (`cmd:auth:cloud-function:call`, `cmd:contacts:contact:get-by-room-id`, `cmd:push:subscription:disable`)
- replaced `setupMainAuthAppBusListeners` with `setupAuth` in `src/setup/setupAuth.js`
- moved account profile storage under `src/shared/storage/user/`
- added `src/setup/setupUserAccount.js` for auth-driven profile sync
- split `src/shared/storage/user/` profile access into `user-profile-store.js` + `user-profile-rtdb-adapter.js`
- added `src/setup/setupContacts.js` for contacts pre-init concerns (`captureReferral`)

## Next goal

- keep boundary rollout incremental
- fix the remaining boundary failures in order:
  - first identify code that is simply in the wrong layer/folder
  - second move code to the right place when that is the clean fix
  - third reconsider rules only when the folder placement reflects intended dependency direction
  - invent new abstractions only as a last resort
- remove one remaining `contacts` sibling-feature dependency category at a time
- use [ADD_NEXT_FEATURE.md](./ADD_NEXT_FEATURE.md) when turning on enforcement for another feature
- keep `contacts` as the reference implementation for the rollout pattern

## Notes

- `src/auth/auth-state.js` owns the canonical auth snapshot
- `src/auth/index.js` is the public auth surface for external consumers
- prior `shared -> auth` cloud-functions violation is resolved (now in `src/auth/cloud-functions.js`)
- storage:
  - `src/shared/storage/user/` is shared and auth-agnostic
  - auth-driven profile persistence is handled in setup composition via `setupUserAccount.js`
- contacts/messaging:
  - `contacts` no longer imports `messagingController`
  - `contacts` dispatches `cmd:messaging:conversation:select`
  - unread-count facts are published by `messaging`
  - direct conversation id helper is shared
- deferred:
  - moving shared folders under `src/shared/` is under consideration; defer until rollout stabilizes and temporary shared-to-feature exceptions are removed
