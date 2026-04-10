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

## Notes

- This is intentionally minimal for incremental boundary rollout.
- When a new rule is considered, verify whether we are happy to use it across modules - if so, add it here.
