# Handoff: Setup / Initialization

Current checkpoint is focused on standardizing app setup sequencing and ownership with minimal risk.

Scope of this doc:

- setup/init sequencing and ownership
- `setup<Module>` conventions and rollout
- startup trigger strategy (`DOMContentLoaded` vs `window.onload`)
- boundary rules remain in [HANDOFF.md](./HANDOFF.md)

Completed:

- standardized active setup module state naming to:
  - `isReady`
  - `initializationPromise`
  - `cleanup`
- added app-owned setup entrypoints:
  - `setupAuth.js`
  - `setupUserAccount.js`
  - `setupContacts.js`
  - `setupNotificationsHandlers.js`
- changed startup ordering so `setupNotificationsHandlers()` runs before `setupContacts()` to avoid dropping referral notification events
- replaced `window.onload` bootstrap with guarded `bootstrapApp()` triggered by `DOMContentLoaded`/readyState
- drafted `src/app/setupApp.js` as callback-driven app composition entrypoint (not yet wired into `main.js`)
- documented setup direction in [`src/app/SETUP<MODULE>.md`](../../src/app/SETUP%3CMODULE%3E.md)

Current intended standards:

- app composition owns sequencing in `src/app/setup<Module>.js`
- module internals own domain logic (`init<Module>()`, module-local handlers)
- register required listeners before init when init may emit/publish/dispatch events
- keep setup entrypoints idempotent when practical
- use consistent setup state naming:
  - `isReady`
  - `initializationPromise`
  - `cleanup`
- keep `main.js` as thin orchestration surface; move startup sequencing into app setup modules incrementally

Current open questions:

- whether to formalize a split between:
  - module-owned inbound API listeners
  - app-owned cross-module orchestration/projections
- exact return contract for every `setup<Module>()` (cleanup-only vs richer state object)
- failure semantics for setup retries (how `initializationPromise` and `isReady` reset on failure)

Next goal:

- keep migration incremental and low-risk
- wire `setupApp.js` from `main.js` without changing startup behavior
- move `bootstrapApp()` definition closer to top-level startup section in `main.js`
- then consolidate `bootstrapApp()` + most of `init()` into `setupApp` in small slices
- add focused tests for startup ordering and idempotency

Notes:

- This doc is setup/init focused. Do not duplicate boundary-policy details here.
- Keep cross-reference updated with [HANDOFF.md](./HANDOFF.md) if responsibilities shift.
