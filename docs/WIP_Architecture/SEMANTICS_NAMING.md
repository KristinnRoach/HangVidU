# Semantics and Naming (WIP, Minimal)

Goal: keep cross-module patterns easy to reason about and easy to extend.

## Current minimal rules

- Use `handler` for command flow:
  - `dispatchCommand(...)`
  - `dispatchCommandAndAwait(...)`
  - `handleCommand(...)`
- Use `listener` for event/fact flow:
  - `publish(...)`
  - `publishAndAwait(...)`
  - `subscribe(...)`
  - `.on(...)` listeners
- Keep `adapter` reserved for backend/provider/third-party compatibility boundaries, not for app orchestration naming.
- Keep command/event names aligned with existing colon-delimited module-first naming in this repo (for example: `auth:cloud-function:call`, `messaging:conversation:select`).
- `dispatchCommand(...)` is allowed from UI and non-UI code.
  Use it for cross-module intent, not for generic state reads.
- Avoid `*:get-*` commands by default.
  Allowed only for explicitly documented edge cases or explicitly deferred migration steps.
- Cross-feature orchestration ownership:
  - `setup/*` is the composition root for startup/lifecycle wiring and cross-feature command/event wiring.
  - `app/*` is app-runtime orchestration/helpers, not initialization sequencing.
- Bus strategy for now:
  - keep one shared app bus
  - optional `ui:` namespace on that bus for UI-scoped interactions
  - separate dedicated `uiBus` is deferred until there is clear need.

## Notes

- This is intentionally minimal for incremental boundary rollout.
- When a new rule is considered, verify whether we are happy to use it across modules - if so, add it here.
