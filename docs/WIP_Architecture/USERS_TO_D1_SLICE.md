# Users → D1 Slice (contacts, profile, directory, invitations)

Move the user-scoped RTDB data onto D1, reusing the existing client adapter seam
and the existing `hangvidu-data` Worker. One-session scope.

## Scope

**In:** contacts, user profile, directory/discovery, invitations.
**Explicitly out:**
- **Presence** — `onDisconnect` has no D1 equivalent. Stays on RTDB. If ever
  moved it belongs on a DO (WS hibernation + alarm TTL), not D1.
- **Push subscription store** — coupled to Firebase Functions push (admin SDK
  reads it). Stays on RTDB until/unless push itself moves.
- **`firebase-room-signaling.js`** — keep as-is. Zero maintenance, and the
  `@kidlib/p2p` `P2PRoomSignaling` port lets us re-enable RTDB signaling by
  swapping an adapter. Do **not** delete.

Firebase Auth stays regardless (RS256 token seam in `backend/cloudflare/src/auth.ts`).
This slice is query-layer consolidation, not Firebase removal.

## Decisions (settle before coding)

1. **`users` table: extend, don't add.** D1 already has
   `users(id, display_name, created_at)`, populated as a side-effect of
   conversations (`repo.ts`). Add profile columns here rather than a new
   `user_profiles` table — fewer joins. New cols: `photo_url`, `username`
   (handle), `email_hash`, `registered_at`.
2. **Directory = indexed lookup on `users`.** Keep the `emailHash` indirection
   (store `email_hash`, never raw email); add a UNIQUE index. Replaces the
   RTDB `usersByEmail/{hash}` node.
3. **Username handle: real UNIQUE constraint** — D1 gives us what RTDB couldn't.
   `username` UNIQUE (nullable). Decide collision behavior = reject on insert.
4. **Backfill, not lazy-migrate.** Tiny user base → one-shot script, no dual-read
   code. Repo idiom: generate idempotent SQL, apply via
   `wrangler d1 execute --remote --file`. Prod D1 `hangvidu-data`
   `cfac7c1c-cb3c-430d-b33d-6fd12aac48d0`.

## Server (Worker `backend/cloudflare/`)

- [ ] **Migration `migrations/0006_users_profile.sql`**: add cols to `users`
      (`photo_url`, `username`, `email_hash`, `registered_at`); UNIQUE on
      `username`, UNIQUE index on `email_hash`. New table
      `contacts(owner_id, contact_id, nickname, room_id, created_at, updated_at,
      PRIMARY KEY(owner_id, contact_id))`. New table
      `invitations(...)` mirroring `invitations.js` shape.
- [ ] **`data/repo.ts`**: add user/contacts/invitation queries next to the
      conversation ones (get/list/put/patch/remove contacts; get/upsert profile;
      lookup-by-email-hash; create/list/consume invitation). Keep one repo file;
      split to `data/user-repo.ts` only if it gets unwieldy.
- [ ] **`data/handlers.ts` + `src/index.ts`**: add routes. Reuse the existing
      regex-router + `auth.ts` token verify (uid from token = `owner_id`, no
      client-supplied owner). Suggested paths:
      `/users/me/profile` (GET/PUT), `/users/lookup` (GET, by email hash),
      `/users/me/contacts` (GET/POST), `/users/me/contacts/:id` (PATCH/DELETE),
      `/invitations` (POST/GET), `/invitations/:id/consume` (POST).
- [ ] Worker tests in `test/` mirroring `data-worker.test.ts`.

## Client (`src/storage/`)

The seam already exists — repositories wrap a `*DBInterface` adapter, selected by
a factory in each `index.js`. Add D1 adapters parallel to the RTDB ones; no
domain/repository changes.

- [ ] **Contacts**: `src/storage/contacts/adapters/contacts-d1-adapter.js`
      implementing `ContactsDBInterface` (get/list/put/patch/remove) against the
      Worker. Add `createContactsD1Repository(options)` to
      `src/storage/contacts/index.js`. Switch the call site from
      `createContactsRTDBRepository`.
- [ ] **Profile**: `src/storage/user/user-profile-d1-adapter.js`; wire
      `createUserProfileRepository(createUserProfileD1Adapter(...))` in
      `src/storage/user/index.js`.
- [ ] **Directory**: port `user-discovery.js` (`registerUserInDirectory`,
      `lookupUserByEmail`) to call `/users/lookup` + profile PUT. Keep `hashEmail`
      on the client (server stores the hash).
- [ ] **Invitations**: port `src/features/contacts/invites/invitations.js` to the
      `/invitations` routes.
- [ ] Reuse existing zod schemas in `src/storage/user/schema.js` /
      `contact-schema.js` for response parsing.

## Backfill

- [ ] Script `backend/cloudflare/scripts/backfill-users-to-d1.mjs`: read RTDB
      (`users/{uid}/profile`, `users/{uid}/contacts`, `usersByEmail`,
      invitations) → emit idempotent `INSERT … ON CONFLICT DO UPDATE` SQL →
      apply with `wrangler d1 execute --remote --file`. Dry-run default,
      `--limit=N` to validate on one row first (mirrors
      `scripts/migrate-d1-attachment-keys.mjs`).

## Cutover

- [ ] Backfill prod D1.
- [ ] Flip client factories to D1 repositories.
- [ ] Smoke: add/edit/remove contact, edit profile, email lookup, invite flow.
- [ ] Leave RTDB nodes in place (no destructive delete) until verified in prod;
      sweep later.

## Out-of-scope reminders left on RTDB

`presence/`, push subscription store, `firebase-room-signaling.js`. Do not touch.
