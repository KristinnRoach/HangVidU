Updated: 2026-07-07

## Guidelines

- Keep storage API minimal and generic.
- Keep backend adapters thin and backend-specific only.
- Keep storage-layer validation centralized.
- Maintain focused storage-layer tests for store contract and adapter behavior.
- Keep the public API narrow until another caller needs more.
- Ensure markdown files in this directory are not stale, misleading, or ambiguous.

## Current state

- Contacts now use the storage repository/adapter seam with a D1 adapter in the
  app path.
- Canonical contact fields are `contactId`, `nickname`, `displayName`,
  `username`, `conversationId`, `savedAt`, and `lastInteractionAt`.
- `nickname`, `displayName`, and `username` are normalized to strings at the
  storage boundary; missing labels become `''`, not `null`.
- UI display text should use `getContactLabel(contact)` instead of re-creating
  fallback chains.
- Legacy RTDB contact data may still exist for cleanup/backfill, but app
  storage uses D1.

## Notes

- Consider splitting `contact-transform.js` if it grows enough to justify clearer boundaries, or ambiguous responsibilites are noticable when using.
- Revisit whether adapter selection helpers belong in storage entrypoints or one level above.
- Consider whether contact patch flows need an explicit atomic-update path for adapters that support transactions, or a documented non-atomic limitation if not.
- Consider whether local adapter read/modify/write operations need explicit serialization, or a documented limitation around concurrent writes.
- Consider whether the local adapter should recover safely from corrupted JSON in storage instead of throwing raw parse errors.
