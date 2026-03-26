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

### Files

- `contacts-store.js`: public storage facade and contract
- `contacts-storage-adapter.js`: backend adapter contract
- `contacts-rtdb-adapter.js`: RTDB adapter
- `contacts-local-adapter.js`: localStorage adapter
- `contact-record.js`: canonical record normalization helpers
- `index.js`: entrypoint and factory helpers

### Deferred On Purpose

- auth readiness policy
- backend selection policy
- result envelopes
- query helpers like "get by room id"
- sorting helpers
- migration between guest/local and authenticated/RTDB storage
