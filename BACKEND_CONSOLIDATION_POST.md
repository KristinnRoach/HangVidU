# Backend Consolidation — Post-migration Work

**Status:** deferred · **Start after:** consolidated `hangvidu-data` is deployed,
verified, and stable.

This is the source of truth for work deliberately excluded from
[`BACKEND_CONSOLIDATION_PLAN.md`](./BACKEND_CONSOLIDATION_PLAN.md). Add future
post-cutover tasks here instead of widening the consolidation PR.

## 1. Provider-neutral attachment metadata

Implement as its own PR after consolidation. It is not required for the
`FileObjectStore`/`R2FileObjectStore` seam: that seam lands during consolidation
and initially encapsulates the existing `r2_key` and `bucket` fields.

Target persistence:

- `storage_provider` — adapter identifier, initially `r2`;
- `storage_locator` — opaque provider-specific locator interpreted by the adapter.

Do not add `storage_connection_id` until connected user storage is designed and
there is a concrete ownership/lifecycle model for connections.

Checklist:

- [ ] Design the forward D1 migration from `r2_key`/`bucket`
- [ ] Preserve every existing row as provider `r2` with its current key as locator
- [ ] Keep the browser-facing file/message contract stable
- [ ] Keep the R2 bucket in deployment configuration, not attachment domain data
- [ ] Update repository types/queries and `R2FileObjectStore` mapping
- [ ] Test migration on a production-shaped D1 copy
- [ ] Verify upload, download, delete, and existing attachment rendering
- [ ] Deploy and verify independently from any Durable Object migration

This migration must complete before adding a second storage provider.

## 2. Firebase source relocation

Move `functions/` under `backend/firebase/` only as a separate repository-layout
change. Update Firebase config, npm scripts, maintenance scripts, secret-file
paths, ignore rules, CI, and documentation together.

- [ ] Write a focused move plan and inventory all `functions/` path references
- [ ] Move and verify Firebase Functions in its own PR
