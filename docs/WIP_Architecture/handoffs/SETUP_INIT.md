# Handoff: Setup / Initialization

Narrative log of the setup/init standardization. Setup vs main rules live in [`../STRUCTURE.md`](../STRUCTURE.md). Boundary narrative lives in [`BOUNDARIES.md`](./BOUNDARIES.md).

## Completed

- standardized active setup module state naming: `isReady`, `initPromise`, `cleanup`
- added setup-layer entrypoints: `setupAuth.js`, `setupUserAccount.js`, `setupContacts.js`, `setupNotificationsHandlers.js`
- changed startup ordering so `setupNotificationsHandlers()` runs before `setupContacts()` to avoid dropping referral notification events
- replaced `window.onload` bootstrap with guarded `bootstrapApp()` triggered by `DOMContentLoaded`/readyState
- routed `main.js` bootstrap through callback-driven `src/setup/setupApp.js` (Phase 1 behavior-preserving)
- extracted top-bar/locale setup from `init()` into `src/setup/setupTopBarAndLocale.js`
- extracted `init()` preflight (UI/i18n hydration + critical element validation) into `src/setup/setupInitPreflight.js`
- made bootstrap retry-safe via `setupApp` single-flight (`initPromise`) with explicit `isReady`/`cleanup` lifecycle
- registered service-worker NAVIGATE listener early and queued messages until bootstrap readiness
- aligned preflight contract with startup UI bindings (`hangUpBtn`)
- documented setup direction in [`src/setup/SETUP_MODULE.md`](../../../src/setup/SETUP_MODULE.md)

## Open questions

- whether to formalize a split between module-owned inbound API listeners and app-owned cross-module orchestration/projections
- exact return contract for every `setup<Module>()` (cleanup-only vs richer state object)
- whether bootstrap/preflight/UI event binding should collapse into fewer orchestration layers

## Next goal

- keep migration incremental and low-risk
- reduce startup indirection while preserving current behavior and retry safety
- decide the target split between `main.js` lifecycle wiring, `setupApp` orchestration, and module-level `setup<Module>()` responsibilities
- add focused tests for startup ordering and idempotency
