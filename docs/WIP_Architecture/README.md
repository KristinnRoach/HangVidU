# WIP Architecture Rules

Where to find each rule category. All docs use bullet lists, no long prose.

| File                    | Covers                                                              |
| ----------------------- | ------------------------------------------------------------------- |
| [`NAMING.md`](./NAMING.md)             | File names, event names, payload shapes                  |
| [`STRUCTURE.md`](./STRUCTURE.md)       | Folder layout, where files live, barrel exports          |
| [`STATE_RULES.md`](./STATE_RULES.md)   | In-memory state pattern (`*-state.js`)                   |
| [`SOLID_UI_STATE_RULES.md`](./SOLID_UI_STATE_RULES.md) | Solid UI-only reactive state in `src/components/` |
| [`EVENTS.md`](./EVENTS.md)             | Event bus usage, single-bus rule                         |
| [`LINT_ENFORCEMENT.md`](./LINT_ENFORCEMENT.md) | What is enforced in lint today                   |

Each doc ends with an **Under Consideration** section for open questions. Nothing there is binding yet.

## Supporting material

| Folder              | Contains                                       |
| ------------------- | ---------------------------------------------- |
| `handoffs/`         | Narrative logs of in-flight rollouts           |
| `audit/`            | Point-in-time codebase audits                  |
| `lint/`             | Generated boundary reports                     |
| `references/`       | External docs and inspirations                 |

Legacy WIP docs (`WIP_HANGVIDU_ARCHITECTURE.md`, `WIP_HANGVIDU_REFERENCE_ARCHITECTURE.md`) will be updated to align with these files.
