## Storage Roadmap

- Keep storage API minimal and generic.
- Keep backend adapters thin and backend-specific only.
- Keep storage-layer validation centralized.
- Add focused storage-layer tests for store contract and adapter behavior.
- Define final storage-layer public API once before copying the pattern elsewhere.

## Notes

- Consider splitting `contact-transform.js` if it grows enough to justify clearer boundaries.
- Revisit whether adapter selection helpers belong in storage entrypoints or one level above.
- Revisit storage-specific migration concerns only when guest/auth persistence rules are ready.
- Revisit whether storage should stay per-module or consolidate under `src/storage/` only after `src/contacts/*` contracts are clearly defined and documented, and after event-driven fundamentals are documented for `appBus` / `EventEmitter` usage, boundaries, and when not to use them.
