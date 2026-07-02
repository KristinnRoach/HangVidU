# WIP Architecture Rules

Where to find each rule category. All docs use bullet lists, no long prose.

| File                                 | Covers                                                  |
| ------------------------------------ | ------------------------------------------------------- |
| [`NAMING.md`](./NAMING.md)           | File names, event names, payload shapes                 |
| [`STRUCTURE.md`](./STRUCTURE.md)     | Folder layout, layers, where files live, barrel exports |
| [`STATE_RULES.md`](./STATE_RULES.md) | In-memory state pattern (`*-state.js`)                  |
| [`EVENTS.md`](./EVENTS.md)           | Event bus usage, single-bus rule                        |
| [`STYLING.md`](./STYLING.md)         | Tailwind v4 rules, tokens, cascade layers, migration    |

Layer import rules are enforced by [`eslint.boundaries.config.js`](../../eslint.boundaries.config.js) — that config is the source of truth for the allow-table.

Each doc ends with an **Under Consideration** section for open questions. Nothing there is binding yet.
