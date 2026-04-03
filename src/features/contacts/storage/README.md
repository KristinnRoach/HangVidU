## Contacts Storage Draft

This folder is a standalone draft for the contacts storage pattern.

It does not replace the current contacts implementation yet.

### Goal

Provide a minimal, explicit storage boundary for the contacts domain:

- no UI concerns
- no `appBus`
- no i18n fallbacks
- no sorting or lookup helpers
- no hidden auth or backend selection inside the store contract

### Public API

The public store API is intentionally small:

- `get(contactId) -> Promise<ContactRecord | null>`
- `list() -> Promise<ContactRecord[]>`
- `put(contact) -> Promise<ContactRecord>`
- `patch(contactId, patch) -> Promise<ContactRecord | null>`
- `remove(contactId) -> Promise<boolean>`

### Error Policy

- Invalid input throws.
- Backend failures throw.
- "Not found" is not an error:
  - `get()` returns `null`
  - `patch()` returns `null`
  - `remove()` returns `false`

This keeps normal control flow simple while still making real failures visible.

### Canonical Record

```js
{
  contactId: string,
  contactName: string,
  roomId: string | null,
  savedAt: number,
  lastInteractionAt: number
}
```

### Schema

The storage layer now owns the canonical Zod schema for contact records and
patches.

- storage schema lives here, once
- storage normalization helpers parse through that schema
- service code should use storage outputs, not duplicate the same record schema

If the service later needs its own command/input validation, that should be a
separate service-layer schema, not a second copy of the storage record schema.

### Files

- `contacts-store.js`: public storage facade and contract
- `contact-schema.js`: canonical Zod schemas for records and patches
- `contacts-storage-adapter.js`: backend adapter contract
- `contacts-rtdb-adapter.js`: RTDB adapter
- `contacts-local-adapter.js`: localStorage adapter
- `contact-transform.js`: canonical normalization and merge helpers
- `index.js`: entrypoint and factory helpers

### Deferred On Purpose

- auth readiness policy
- backend selection policy
- result envelopes
- query helpers like "get by room id"
- sorting helpers
- migration between guest/local and authenticated/RTDB storage

### Possible Final Split

Keep `contact-transform.js` as one file for now.

When finalizing the standardized storage-layer pattern, consider splitting it if
the file grows enough to make the boundaries clearer:

- `contact-normalizers.js`: pure canonicalization helpers only
- `contact-validators.js`: schema parse/assert entry points
- `contact-merge.js`: patch merge semantics and invariants
