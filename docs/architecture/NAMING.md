# Naming

## Files

- `src/stores/` holds in-memory Solid reactive state — name files `<x>-store.ts` (`contacts-store.ts`, `files-store.ts`).
- `src/storage/` holds persistence — name files `<x>-repository` / `<x>-adapter`, never "store".
- In-memory module state observed via the event bus → `<module>-state.js`.
- Module barrel: `src/<module>/index.{js,ts}`.

## Events

- Canonical regex: `^(cmd|evt):[a-z][a-z0-9-]*:[a-z][a-z0-9-]*:[a-z][a-z0-9-]*$`.
- Shape: `<kind>:<domain>:<entity>:<action>`.
  - `kind` ∈ `cmd` | `evt`.
  - `domain` = owning module (`auth`, `call`, `contacts`, `messaging`).
- State-change event per module: `evt:<module>:state:changed`.
- External write into a module: `cmd:<module>:<entity>:<action>`.
- Enforced by `local/event-name-format` ESLint rule.

## Event payload

- State-change event payload: `{ state, prev }`.
- Both snapshots are full and immutable.
- No partial-diff payloads, no per-field events, unless the info is **not derivable** from `state` / `prev`.

---

## Under Consideration

- Standard suffixes inside a module (`-service`, `-controller`, `-handlers`, `-factory`, `-schema`, `-bus`). Role of each not pinned down yet.
