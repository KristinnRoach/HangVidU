# Media Next Session Guide

This is the canonical entry point for starting or resuming work on `src/media-next/` in a new context.

Read this at the start and end of every session on `codex/media-module-sketch`.

This branch is for designing and validating a replacement media module without contaminating the active production architecture.

## Top-level rules

- Keep all new work isolated under `src/media-next/` and the dedicated ui test pages unless a small integration change is explicitly required.
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

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md).
2. Read [DIAGRAM_CURRENT.md](./DIAGRAM_CURRENT.md).
3. Read this guide.
4. Create or refresh [CURRENT_SESSION.md](../CURRENT_SESSION.md) for the current session goal, task list, and decisions to review.
5. Check git status and understand any uncommitted work before editing.
6. Decide whether the session is about design, scaffolding, implementation, testing, or cleanup.

## Git workflow

- Keep commits small, scoped, and explain intent clearly.
- Commit when the branch reaches a coherent checkpoint, not only at the end of a large batch.
- Propose a commit checkpoint after each distinct phase of work.
- Do not mix architectural design changes with unrelated cleanup.
- Do not rewrite or revert other work unless explicitly required.
- If a design direction changes, update the docs in the same commit or immediately after.

## GitHub workflow

- Prefer the simplest possible GitHub workflow.
- Use one branch per coherent session goal, not per tiny commit.
- Open PRs directly into `main` unless there is a concrete reason to stack branches.
- Avoid maintaining an intermediate integration branch unless the work truly requires stacked PRs.
- Keep the workflow simple:
  session branch -> `main`

Suggested branch naming:

- `codex/media-next-<short-goal>`

Suggested rule of thumb:

- use a session PR when the session changed contracts, docs, or testable behavior
- skip opening a PR only for truly trivial housekeeping

## Documentation rules

- Keep docs in sync with code and contracts.
- Review all affected `src/media-next/` docs at the end of each session and update them if needed.
- Update [ARCHITECTURE.md](./ARCHITECTURE.md) when a significant top-level decision, boundary, or naming rule changes.
- Update [DIAGRAM_CURRENT.md](./DIAGRAM_CURRENT.md) when the high-level structure changes.
- Keep [CURRENT_SESSION.md](../CURRENT_SESSION.md) fresh for the active session only.
- Create focused docs as concepts become concrete enough to need their own source of truth.
- When a focused doc is created, link it from [ARCHITECTURE.md](./ARCHITECTURE.md) and keep it aligned with implementation and adjacent docs.
- Use repo-relative Markdown links only in `src/media-next/` docs.
- When an encountered issue or a syntax/style decision is likely to recur, add it to `src/media-next/docs/solved-issues/` in a topic-oriented file such as `zod.md`, `state.md`, `func-defs.md`, `naming.md`, or `browser-runtime.md`.
- Add short rationale, not long essays.
- Prefer explicit decisions and unresolved questions over vague commentary.

## Current session file

- `CURRENT_SESSION.md` is a temporary working document for the active session.
- Create it fresh at the start of a session if it does not exist.
- Refresh or replace it if it reflects stale goals from a previous session.
- Keep goal, task list, validation notes, and decisions to review current as the session progresses.
- Archive it into `history/YYYY-MM-DD_SESSION.md` at the end of the session when the work is fully resolved and handed off cleanly.
- Delete it only after the session has been archived.
- If the goal is not fully reached, use the final handoff to state what remains and decide whether to:
  keep `CURRENT_SESSION.md` into the next session, or
  roll the unresolved items into a more durable focused doc.

## Session archive and roadmap

- Keep archived session summaries under `src/media-next/docs/history/`.
- Archive files should stay concise and outcome-focused.
- Keep a durable [ROADMAP.md](./ROADMAP.md) for current milestones and open tracks.
- Update `ROADMAP.md` only when priorities, milestones, or the next recommended work materially changes.

## Testing rules

- Tests and harnesses must stay aligned with the current contracts.
- Use the isolated ui test pages for interactive validation.
- Add or update automated tests when behavior or contracts become concrete enough to verify.
- Do not leave stale tests, stale placeholders, or misleading demos behind.
- If something is intentionally untested, state that clearly in docs or handoff.

## Cleanup rules

- When dead, redundant, or misleading code is encountered in `src/media-next/`, simplify or remove it in the same session when practical.
- Avoid “temporary” compatibility layers unless they unlock a clear next step.
- Do not accumulate duplicate schemas, duplicate state shapes, or duplicate helpers.
- If cleanup would materially distract from the main task, document it as follow-up instead of half-fixing it.

## Boundaries and naming

- Keep domain boundaries strict: `schemas`, `playback`, `live-stream`, `storage`, `convert`, `sync`, `ui`.
- Keep naming consistent across `state`, `events`, `actions`, `storage`, `schema`, and pure `utils`.
- Do not leak implementation-specific shapes across module boundaries.
- If two modules need the same shape, define it once in `schemas/`.

## End-of-session checklist

1. Remove dead or abandoned code introduced during the session.
2. Review all affected `src/media-next/` docs and update them if needed.
3. Run the relevant validation for the session scope.
4. Archive [CURRENT_SESSION.md](../CURRENT_SESSION.md) into `history/YYYY-MM-DD_SESSION.md` if the session reached a clean checkpoint.
5. Update [ROADMAP.md](./ROADMAP.md) if the next recommended work changed materially.
6. Resolve or intentionally preserve [CURRENT_SESSION.md](../CURRENT_SESSION.md) based on whether the session goal was actually completed.
7. Propose or create a final coherent commit checkpoint for the session.
8. Leave the branch in a coherent state.
9. Write a handoff note in the final response:
   what changed, what remains unresolved, and what the next sensible step is.

## Handoff standard

Every handoff should briefly state:

- what changed
- which files define the latest source of truth
- what was verified
- what remains undecided
- what should happen next
