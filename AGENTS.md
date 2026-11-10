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
- Create PR titles without prefixes such as `[codex]` unless requested. Leave merging to the user unless explicitly asked to merge.

## Usage and delegation

Use the smallest workflow that fully completes the task. Keep exploration, output, and validation proportionate to the change, while preserving correctness and required checks.

Work in the current agent by default. Ask for explicit approval before involving additional agents or starting independent AI review or repeated AI review/fix cycles. General requests to implement, fix, test, or review do not authorize delegation. Explain the expected benefit and scope before asking; once approved, proceed within that scope without asking again.

Before starting a costly or lengthy investigation, check whether a focused question or a quick manual check by me would resolve the uncertainty. If so, ask first and explain exactly what information or action would help. Handle routine, inexpensive work yourself.

Avoid redundant searches, repeated checks without new evidence, and unnecessary artifacts. Do not switch to a more expensive model or paid service without explicit approval.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.js` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.js` first, and run `vp run <name>` when the project defines a script or task with that name.

## Running Scripts

Run TypeScript and JavaScript files with `vpx <file>`, for example `vpx ./scripts/seed.ts --dry-run`. It handles enums, decorators, JSX, and tsconfig `paths`, so do not add `tsx` or `ts-node` to run scripts. `vpx --watch <file>` reruns the file when a file it uses changes, in place of `tsx watch`. `vp node <file>` runs plain Node.js.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.js` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
