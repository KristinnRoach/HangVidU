## Contacts Storage

This folder owns the storage boundary for contacts.

### Goal

Provide a minimal, explicit storage boundary for the contacts domain:

- no UI concerns
- no `appBus`
- no i18n fallbacks
- no sorting or lookup helpers
- no hidden auth or backend selection inside the store contract

### Repository API

The public repository API is intentionally small:

- `get(contactId) -> Promise<ContactRecord | null>`
- `list() -> Promise<ContactRecord[]>`
- `put(contact) -> Promise<ContactRecord>`
- `patch(contactId, patch) -> Promise<ContactRecord | null>`
- `remove(contactId) -> Promise<boolean>`

Adapters are lower-level IO shims. They return records only for reads and
patches; `put()` and `remove()` return `void`, and the repository owns the
normalized return value / missing-record policy above.

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
  nickname: string,
  displayName: string,
  username: string,
  conversationId: string | null,
  savedAt: number,
  lastInteractionAt: number
}
```

### Schema

The storage layer now owns the canonical Zod schema for contact records and
patches.

- storage schema lives here, once
- storage normalization helpers parse through that schema
- callers should use storage outputs, not duplicate the same record schema

If another layer later needs its own command/input validation, that should be a
separate schema, not a second copy of the storage record schema.

### Deferred On Purpose

- auth readiness policy
- backend selection policy
- result envelopes
- query helpers like "get by conversation id"
- sorting helpers
- migration between guest/local and authenticated/RTDB storage

### Possible Final Split

Keep `contact-transform.js` as one file for now.

When finalizing the standardized storage-layer pattern, consider splitting it if
the file grows enough to make the boundaries clearer:

- `contact-normalizers.js`: pure canonicalization helpers only
- `contact-validators.js`: schema parse/assert entry points
- `contact-merge.js`: patch merge semantics and invariants
