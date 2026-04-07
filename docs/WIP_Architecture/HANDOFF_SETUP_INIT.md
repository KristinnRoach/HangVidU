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
  - `initPromise`
  - `cleanup`
- added app-owned setup entrypoints:
  - `setupAuth.js`
  - `setupUserAccount.js`
  - `setupContacts.js`
  - `setupNotificationsHandlers.js`
- changed startup ordering so `setupNotificationsHandlers()` runs before `setupContacts()` to avoid dropping referral notification events
- replaced `window.onload` bootstrap with guarded `bootstrapApp()` triggered by `DOMContentLoaded`/readyState
- routed `main.js` bootstrap through callback-driven `src/setup/setupApp.js` (Phase 1 behavior-preserving consolidation)
- extracted top-bar/locale setup from `init()` into `src/setup/setupTopBarAndLocale.js` (notification toggle, debug update button, locale toggle) without changing startup order
- extracted `init()` preflight (UI/i18n hydration + critical element validation) into `src/setup/setupInitPreflight.js` without changing startup order
- made bootstrap retry-safe via `setupApp` single-flight (`initPromise`) with explicit `isReady`/`cleanup` lifecycle state
- register service-worker NAVIGATE listener early and queue messages until bootstrap readiness to avoid cold-start drops
- aligned preflight contract with startup UI bindings (`callBtn`, `lobbyCallBtn`, `hangUpBtn`) and guarded early handler assignment
- documented setup direction in [`src/setup/SETUP_MODULE.md`](../../src/setup/SETUP_MODULE.md)

Current intended standards:

- Phase 1 rule: preserve behavior, centralize startup order, defer internal cleanup/refactor details
- setup composition owns sequencing in `src/setup/setup<Module>.js`
- module internals own domain logic (`init<Module>()`, module-local handlers)
- register required listeners before init when init may emit/publish/dispatch events
- keep setup entrypoints idempotent when practical
- use consistent setup state naming:
  - `isReady`
  - `initPromise`
  - `cleanup`
- keep `main.js` as thin orchestration surface; move startup sequencing into app setup modules incrementally

Current open questions:

- whether to formalize a split between:
  - module-owned inbound API listeners
  - app-owned cross-module orchestration/projections
- exact return contract for every `setup<Module>()` (cleanup-only vs richer state object)
- whether bootstrap/preflight/UI event binding should be collapsed into fewer orchestration layers for lower cognitive overhead

Next goal:

- keep migration incremental and low-risk
- reduce startup indirection while preserving current behavior and retry safety
- decide the target split between:
  - `main.js` top-level lifecycle wiring
  - `setupApp` orchestration
  - module-level `setup<Module>()` responsibilities
- add focused tests for startup ordering and idempotency

Notes:

- This doc is setup/init focused. Do not duplicate boundary-policy details here.
- Keep cross-reference updated with [HANDOFF.md](./HANDOFF.md) if responsibilities shift.
