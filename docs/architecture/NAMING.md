# Naming

## Files

- `src/stores/` holds in-memory Solid reactive state — name files `<x>-store.ts`
  (`contacts-store.ts`, `files-store.ts`).
- `src/storage/` holds persistence — name files `<x>-repository` / `<x>-adapter`,
  never "store".
- Module state observed via the event bus → `<module>-state.js` (see
  [`STATE_RULES.md`](./STATE_RULES.md)).
- Module barrel: `src/<module>/index.{js,ts}`.

## Events

- Shape: `<kind>:<domain>:<entity>:<action>`, where `kind` ∈ `cmd` | `evt`.
- The canonical regex lives in `src/shared/events/naming.js` and is enforced at
  runtime plus by the `local/event-name-format` ESLint rule.
- Domain inventory: `src/shared/events/DOMAINS.md`.
- State-change event per module: `evt:<module>:state:changed`.
- External write into a module: `cmd:<module>:<entity>:<action>`.

## Event payload

- State-change event payload: `{ state, prev }`.
- Both snapshots are full and immutable.
- No partial-diff payloads, no per-field events, unless the info is **not
  derivable** from `state` / `prev`.
