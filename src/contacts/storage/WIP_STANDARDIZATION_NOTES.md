Updated: March 27th (v1)

## Guidelines

(separate guidelines and explicit rules if/when beneficial for clarity)

- Keep storage API minimal and generic.
- Keep backend adapters thin and backend-specific only.
- Keep storage-layer validation centralized.
- Maintain focused storage-layer tests for store contract and adapter behavior.
- Maintain a stable clearly and explicitly defined public API (AFTER this pattern gets standardized and used by more than one module (currently only in src/contacts/ ))
- Ensure markdown files in this directory are not stale, misleading or ambigous.

## Roadmap ... (not needed?)

## Notes

- Consider splitting `contact-transform.js` if it grows enough to justify clearer boundaries, or ambiguous responsibilites are noticable when using.
- Revisit whether adapter selection helpers belong in storage entrypoints or one level above.
- Revisit storage-specific migration concerns only when guest/auth persistence rules are ready.
- Revisit whether storage should stay per-module or consolidate under `src/storage/` only after `src/contacts/*` contracts are clearly defined and documented, and after event-driven fundamentals are documented for `appBus` / `EventEmitter` usage, boundaries, and when not to use them.
