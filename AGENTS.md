# Working on HangVidU

## Start here

This is a solo-maintained app. Make it easy to understand, extend, and maintain.

- [Roadmap](docs/ROADMAP.md): priorities, current limitations, and decisions still open. Read before feature or structural work; ordinary fixes need no roadmap change.
- [Code map](docs/architecture/README.md): where responsibilities live and the styling transition. Read the relevant section, then inspect the code and tests.
- [Development](docs/dev/README.md): setup and validation. [Operations](docs/dev/OPERATIONS.md) is only needed for deployment or production checks.

This file owns working conventions; the roadmap owns priorities. Module docs
explain local constraints, not competing architecture rules. If code and guidance
conflict, identify the mismatch and correct it within the task's scope. Neither
old documentation nor nearby legacy code is automatically the desired pattern.

## Baseline conventions

- Keep changes focused on the requested outcome. Reuse the nearest maintained pattern; add an abstraction only for a concrete need. Remove superseded code in the touched area, not unrelated systems.
- Give state one owner. Expose named actions and read-only views; keep raw setters and persistence internals private. Derive values from their owner instead of keeping competing copies.
- Give asynchronous work an explicit lifetime (login, conversation, call, or component). Clean up resources and subscriptions, and reject stale results after that lifetime changes. Surface failures with a useful recovery path.
- Prefer direct calls for actions and their results. Publish facts through `src/shared/events` when independent consumers react. Existing bus commands remain supported; do not add dispatch layers around ordinary function calls.
- Use Solid and TypeScript for new application UI and logic. Follow existing file naming and public module entry points. Migrate JS only when it helps the change; do not reorganize folders just to match a preference.
- Use Tailwind for new UI and shared tokens for recurring visual roles. Migrate existing styling one complete component at a time, removing replaced rules. Reuse accessible controls; preserve keyboard, focus, and reduced-motion behaviour.
- Add focused regression tests for meaningful behaviour changes. Keep browser workarounds and ownership rationale documented; avoid comments that narrate code or prescribe speculative future implementations.
- Update the authoritative doc when behaviour or a convention changes. Keep plans in the roadmap or issues, not new scattered TODO/specification files. Do not turn deferred roadmap items into work without a task requesting them.
- Once the decision to merge into `main` is made and no changes remain, run the full CI workflow via manual dispatch on the final PR branch and confirm it passes before merging. It includes the slow browser compatibility suite; avoid running it for trivial edits or routine PR updates. Use focused checks while iterating, and repeat the final guard if further changes are made.
- Create PR titles without prefixes such as `[codex]` unless requested. Leave merging to the user unless explicitly asked to merge.

## Usage and delegation

Use the smallest workflow that fully completes the task. Keep exploration, output, and validation proportionate to the change, while preserving correctness and required checks.

Work in the current agent by default. Ask for explicit approval before involving additional agents or starting independent AI review or repeated AI review/fix cycles. General requests to implement, fix, test, or review do not authorize delegation. Explain the expected benefit and scope before asking; once approved, proceed within that scope without asking again.

Before starting a costly or lengthy investigation, check whether a focused question or a quick manual check by me would resolve the uncertainty. If so, ask first and explain exactly what information or action would help. Handle routine, inexpensive work yourself.

Avoid redundant searches, repeated checks without new evidence, and unnecessary artifacts. Do not switch to a more expensive model or paid service without explicit approval.

## Toolchain

This project uses [Vite+](https://viteplus.dev/guide/) (`vp`). Commands and validation steps are in the [development guide](docs/dev/README.md).
