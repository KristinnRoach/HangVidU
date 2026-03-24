# Media Next Session Guide

Read this at the start and end of every session on `codex/media-module-sketch`.

This branch is for designing and validating a replacement media module without contaminating the active production architecture.

## Top-level rules

- Keep all new work isolated under `src/media-next/` and the dedicated lab entrypoint unless a small integration change is explicitly required.
- Do not patch legacy production code just to make the new module fit old assumptions.
- Keep the core module UI-agnostic.
- Keep public contracts explicit, minimal, and schema-first.
- Treat MediaBunny as an implementation detail, not a domain model.
- Prefer deletion, simplification, and clearer boundaries over additive glue code.

## Session goals

Each session should do at least one of these:

- clarify a contract
- simplify a boundary
- validate a design assumption
- improve the lab harness
- remove dead, redundant, or misleading code in the new module

If a session does not improve clarity, it is probably adding noise.

## Start-of-session checklist

1. Read [ARCHITECTURE.md](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/media-next/ARCHITECTURE.md).
2. Read [WIP_DIAGRAM.md](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/media-next/WIP_DIAGRAM.md).
3. Read this guide.
4. Check git status and understand any uncommitted work before editing.
5. Decide whether the session is about design, scaffolding, implementation, testing, or cleanup.

## Git workflow

- Keep commits small, scoped, and explain intent clearly.
- Commit when the branch reaches a coherent checkpoint, not only at the end of a large batch.
- Do not mix architectural design changes with unrelated cleanup.
- Do not rewrite or revert other work unless explicitly required.
- If a design direction changes, update the docs in the same commit or immediately after.

## Documentation rules

- Keep docs in sync with code and contracts.
- Update [ARCHITECTURE.md](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/media-next/ARCHITECTURE.md) when a significant top-level decision, boundary, or naming rule changes.
- Update [WIP_DIAGRAM.md](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/media-next/WIP_DIAGRAM.md) when the high-level structure changes.
- Create focused docs as concepts become concrete enough to need their own source of truth.
- When a focused doc is created, link it from [ARCHITECTURE.md](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/media-next/ARCHITECTURE.md) and keep it aligned with implementation and adjacent docs.
- Add short rationale, not long essays.
- Prefer explicit decisions and unresolved questions over vague commentary.

## Testing rules

- Tests and harnesses must stay aligned with the current contracts.
- Use the isolated lab entrypoint for interactive validation.
- Add or update automated tests when behavior or contracts become concrete enough to verify.
- Do not leave stale tests, stale placeholders, or misleading demos behind.
- If something is intentionally untested, state that clearly in docs or handoff.

## Cleanup rules

- When dead, redundant, or misleading code is encountered in `src/media-next/`, simplify or remove it in the same session when practical.
- Avoid “temporary” compatibility layers unless they unlock a clear next step.
- Do not accumulate duplicate schemas, duplicate state shapes, or duplicate helpers.
- If cleanup would materially distract from the main task, document it as follow-up instead of half-fixing it.

## Boundaries and naming

- Keep domain boundaries strict: `schemas`, `playback`, `live-stream`, `storage`, `convert`, `sync`, `lab`.
- Keep naming consistent across `state`, `events`, `actions`, `storage`, `schema`, and pure `utils`.
- Do not leak implementation-specific shapes across module boundaries.
- If two modules need the same shape, define it once in `schemas/`.

## End-of-session checklist

1. Remove dead or abandoned code introduced during the session.
2. Update docs if decisions or boundaries changed.
3. Run the relevant validation for the session scope.
4. Leave the branch in a coherent state.
5. Write a handoff note in the final response:
   what changed, what remains unresolved, and what the next sensible step is.

## Handoff standard

Every handoff should briefly state:

- what changed
- which files define the latest source of truth
- what was verified
- what remains undecided
- what should happen next
