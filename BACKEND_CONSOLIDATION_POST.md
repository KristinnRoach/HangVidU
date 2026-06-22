# Backend Consolidation — Post-migration Work

**Status:** deferred · **Start after:** consolidated `hangvidu-data` is deployed,
verified, and stable.

This is the source of truth for work deliberately excluded from
[`BACKEND_CONSOLIDATION_PLAN.md`](./BACKEND_CONSOLIDATION_PLAN.md). Add future
post-cutover tasks here instead of widening the consolidation implementation.

## Required before adding a second file-storage provider

### Provider-neutral attachment metadata

The existing `FileObjectStore`/`R2FileObjectStore` seam encapsulates object
operations while persistence retains `r2_key` and `bucket`. Implement the metadata
migration as its own PR after consolidation.

Target persistence:

- `storage_provider` — adapter identifier, initially `r2`;
- `storage_locator` — opaque provider-specific locator interpreted by the adapter.

Do not add `storage_connection_id` until connected user storage has a concrete
ownership and lifecycle design.

- [ ] Design the forward D1 migration from `r2_key`/`bucket`
- [ ] Preserve existing rows as provider `r2` with their current key as locator
- [ ] Keep the browser-facing file/message contract stable
- [ ] Keep the R2 bucket in deployment configuration
- [ ] Update repository types/queries and R2 adapter mapping
- [ ] Test on a production-shaped D1 copy
- [ ] Verify existing attachment rendering and all file operations
- [ ] Deploy independently from any Durable Object migration

## Conversation-list activity follow-ups

Live DM ordering and unread badges shipped in PR #565. Activity uses the shared
per-user mailbox for push, `GET /conversations` for the initial snapshot, and
per-device local storage for read state.

- [x] Rename the call-mailbox protocol/module if it continues carrying non-call
      user events — `shared/call-mailbox/` → `shared/user-mailbox/`
- [ ] Generalize the participant-keyed activity model before showing group
      conversations in the contacts list; the live path is intentionally DM-only
- [ ] Move read state to server-side `last_read_at` when cross-device consistency
      is implemented (issue #563)
- [ ] Restart conversation activity after an in-place user switch if auth stops
      reloading the app; logout currently closes the shared mailbox and clears its
      subscribers
- [ ] Replace the two correlated latest-message subqueries only if conversation-list
      scale makes them measurable

## OPTIONAL — undecided or nonessential

These are not commitments. Promote an item into a dedicated plan only when its
value justifies the added operational or maintenance cost.

### Custom API domain

Move from the current Workers endpoint to a stable first-party domain such as
`https://api.hangvidu.com`. This is a straightforward later change:

- [ ] Configure the Worker custom domain/route and DNS
- [ ] Add the domain to production CORS origins
- [ ] Change `VITE_HANGVIDU_API_URL` and deploy the client
- [ ] Keep the workers.dev endpoint temporarily if a transition window is useful

### Named staging environment

- [ ] Define separate Worker name, D1/R2/DO resources, bindings, migrations, vars,
      secrets, and deploy commands before introducing a Wrangler named environment

### Expanded observability and architecture enforcement

- [ ] Add structured route-family logging if production diagnosis needs it
- [ ] Extend boundary linting to `backend/cloudflare` if folder conventions drift
- [ ] Add an exhaustive auth/CORS header parity matrix if core tests prove insufficient

### Firebase source relocation

- [x] Write a focused move plan and inventory all `functions/` path references
- [x] Move `functions/` under `backend/firebase/` in its own PR
