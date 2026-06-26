# Users → D1 Slice (contacts, profile, directory, contact requests)

Move the user-scoped RTDB data onto D1, reusing the existing client adapter seam
and the existing `hangvidu-data` Worker. Also lands **user search by handle** —
finding someone already on HangVidU without a referral link. One-session scope.

> **Architecture verdict (locked 2026-06-25).** The core model is sound — opaque
> `conversationId` + `conversation_members` join + `dm_key` dedup, with the
> contacts/requests social graph kept separate. That's the proven
> Discord/Slack/Matrix shape for an in-app-identity app. Build on it as-is; **no
> redesign.** The locked refinements below (create-on-accept, roomId→conversationId
> collapse, the conversation_id invariant, the referral/request consent split) are
> tightening, not reshaping.

## Scope

**In:** contacts, user profile, directory/discovery (handle search), contact
requests (the request/accept handshake).
**Explicitly out:**
- **Presence** — `onDisconnect` has no D1 equivalent. Stays on RTDB. If ever
  moved it belongs on a DO (WS hibernation + alarm TTL), not D1.
- **Push subscription store** — coupled to Firebase Functions push (admin SDK
  reads it). Stays on RTDB until/unless push itself moves.
- **`firebase-room-signaling.js`** — keep as-is. Zero maintenance, and the
  `@kidlib/p2p` `P2PRoomSignaling` port lets us re-enable RTDB signaling by
  swapping an adapter. Do **not** delete.

Firebase Auth stays regardless (RS256 token seam in `backend/cloudflare/src/auth.ts`).
This slice is query-layer consolidation + the new discovery feature, not Firebase
removal.

## What the legacy code already does (don't rebuild)

`invitations.js` is **already a request/accept handshake**, implemented as RTDB
fan-out: sender writes `users/{to}/incomingInvites/{from}`; accepter saves the
contact and writes `users/{from}/acceptedInvites/{to}`; sender's `onChildAdded`
listener auto-saves. Two live listeners + a referral synthetic-invite path
(`referral-handler.js` calls `acceptInvite` directly).

The D1 version **collapses this**: one `contact_requests` table queried both
directions, delivered live via the existing `UserMailbox` DO (same shape as call
invites). That removes both RTDB listeners. The only genuinely new capability is
**discovery** — the handshake itself is a port, not a redesign.

## Discovery model (decided)

**Search by unique username handle, exact match, gated by a visibility flag.**
Proven minimal model (Signal/Telegram): no full-text search, no ranking, no
enumeration surface.

- `users.username` — the unique searchable public handle.
- `users.discoverable` — `BOOLEAN DEFAULT 1`. Opt-out = `0`; user is then
  unfindable by handle but still addable via referral link (existing path).
- Lookup = `SELECT … FROM users WHERE username = ? AND discoverable = 1` (one
  indexed read). Email-hash lookup stays as a second exact-match path.

**Handle flow:** accounts auto-claim a valid handle on login when missing one.
A one-time prompt lets the user keep or customize it. Existing users become
handle-searchable after that login/claim path runs.

### Username uniqueness

`users.username` is enforced unique in D1. The claim flow still returns
`handle_taken` so the client can re-suggest. `/users/lookup?handle=` keeps
returning an array to preserve the existing identifier-agnostic response shape.

## Decisions (settled)

1. **`users` table: extend, don't add.** D1 already has
   `users(id, display_name, created_at)`, populated as a side-effect of
   conversations (`repo.ts`). Add: `photo_url`, `username` (UNIQUE),
   `email_hash` (UNIQUE), `discoverable` (DEFAULT 1), `registered_at`.
2. **Directory = indexed lookup on `users`**, not a separate node. Keep the
   `emailHash` indirection (store hash, never raw email). Replaces RTDB
   `usersByEmail/{hash}`.
3. **Handle uniqueness is DB-enforced** — `users.username` is the one-account-per-handle
   directory key.
4. **Requests = one `contact_requests` table**, replacing the dual
   `incomingInvites`/`acceptedInvites` mirror. Live nudge via `UserMailbox` DO.
5. **Backfill, not lazy-migrate.** Tiny user base → one-shot script, no dual-read.
   Idiom: idempotent SQL → `wrangler d1 execute --remote --file`. Prod D1
   `hangvidu-data` `cfac7c1c-cb3c-430d-b33d-6fd12aac48d0`.

## Conversation handle model (locked 2026-06-25)

The pair-of-users link had three competing identifiers (`dm_key`, opaque
`conversationId`, legacy deterministic `roomId`). Collapse to one and create the
conversation at accept time — porting the **current (#568)** behavior, not the
pre-#568 lazy version.

1. **Create-on-accept (#568).** The live `invitations.js` already resolves the
   opaque `conversationId` (idempotent resolve-or-create) at accept and stores it
   on the contact. `acceptRequest` must do the same: in one accept operation,
   resolve-or-create the conversation **and** insert both contact rows with the
   real `conversation_id` stamped. Do **not** port a lazy/NULL-window version —
   that's replaced code. (Note: not literally one `db.batch` — resolve needs a
   read between writes — but idempotent + `dm_key`-UNIQUE-safe, same guarantee.)
2. **Collapse `roomId` → `conversationId`.** Drop the legacy deterministic
   `room_id` from `contacts` and `contact_requests`. `conversation_id` is the
   single pair handle. `getContactByRoomId` → `getContactByConversationId`.
3. **Keep the UUID-shape guard.** When reading `conversation_id` off a contact,
   accept only UUID-shaped values; anything else → `null` →
   `resolveDirectConversationId` fallback. This is the guard that fixed the #568
   production 404; carry it into the D1 read paths.
4. **Invariant: `conversation_id` is the only conversation handle.** No code may
   treat the participant pair, `dm_key`, or `roomId` as a conversation key.
   Messaging, calls, and files all route through `conversation_id`.
5. **Eager-create is a deliberate scale tradeoff.** Add a `ponytail:` comment at
   the accept site: *eager create now; switch to lazy-on-first-message if contact
   counts ever grow*. `conversation_id` stays nullable so this is reversible with
   no schema change.

### Referral vs request — two consent models, one primitive

`acceptRequest`'s mutual-insert + create-on-accept is the **shared connect
primitive**. Both flows call it; they differ only in the consent gate:

- **Search request = unilateral** → keeps the pending-accept gate. The recipient
  must accept (`POST /contact-requests/:fromId/accept`), which runs the primitive.
- **Referral link = pre-authorized** (sharer consented by sharing, joiner by
  clicking) → **auto-accepts, no gate**. On sign-in the joiner calls the primitive
  directly via a referral entrypoint authorized by the joiner's token alone
  (net-new server route, e.g. `POST /referrals/connect { referrerId }`).

Retire the `syntheticInvite` hack — referral stops impersonating an invite and
calls the primitive directly.

**Nudge both parties.** `connectUsers` must fire a `contact_request` mailbox
nudge to *both* users, not just the request recipient: the non-acting side
(request sender after accept; referrer after auto-connect) needs a live refresh
to see the new contact without a manual reload.

### Parked follow-ups (do NOT build this slice)

- **Forgeable referral link.** `?ref=<uid>` is a raw, guessable uid. Fix later
  with an unguessable referral *token*, not an approval gate. (Also resolves the
  pre-login banner-name gap: `captureReferral()` can't read the referrer's profile
  pre-auth against the auth-gated worker, so the pre-login banner is generic; the
  name resolves post-login where auto-connect happens. Cosmetic until the token
  work lands.)
- **Auth principal welded to the handle.** Password login's Firebase principal is
  a synthetic email built from the username, so the handle is the credential
  (immutable, and the free uniqueness authority). The D1 `username` is
  already free to diverge from the login credential later with **no migration**;
  that's the enabling step this slice delivers. Out of scope here.

  **Deferral verdict (2026-06-26): defer to the handle-editor / settings slice,
  and ship the two together.** Deploying this slice first is harmless:
  - It does **not** touch Firebase Auth, so password login is unchanged — no
    lockout vector is introduced.
  - It backfills password users' D1 `username = their existing handle` (login ==
    handle initially); the decoupling only *adds* the ability to change a handle,
    it never has to undo this.
  - The only divergence vector — *editing* a handle — is not in this slice. The
    auto-claim customizer is gated by `if (profile?.username) return`, so it never
    fires for password users (they already have a handle). They cannot diverge yet.

  **Target shape (lower-risk than the re-key implied above):** keep `uid` as the
  stable id; **freeze the synthetic email at signup as an opaque login key** (stop
  treating its local-part as the handle); `users.username` is the mutable public
  @handle; add a **pre-auth resolve index** `handle → uid` (mirror `usersByEmail`,
  token-less) so `signInWithUsernameOrEmail` resolves by lookup instead of
  templating. Handle edits touch D1 + that index only — **never Firebase Auth**, so
  no re-key and no lockout. Migration is one-shot (backfill the `handle → uid`
  index). **Rule:** do not ship a handle editor for password users without this
  resolve index, or a renamed user keeps logging in only by their old name.

## Server (Worker `backend/cloudflare/`)

> **Note (2026-06-25):** the server items below were built against the pre-lock
> plan. Locked-model server revisions (`room_id` cleanup, create-on-accept,
> `/referrals/connect`) are now done; remaining work is mostly client wiring.
> The concrete revise/build sequence lives in
> [`USERS_TO_D1_TASKLIST.md`](./USERS_TO_D1_TASKLIST.md).

- [x] **Migration `migrations/0006_users_profile.sql`**:
  - `ALTER users` add `photo_url`, `username`, `email_hash`, `discoverable`
    (DEFAULT 1), `registered_at`; UNIQUE indexes on `username` and `email_hash`.
  - `contacts(owner_id, contact_id, nickname, conversation_id, saved_at,
    last_interaction_at, PRIMARY KEY(owner_id, contact_id))` — **no `room_id`**
    (roomId→conversationId collapse). `conversation_id` nullable (reversibility).
  - `contact_requests(from_id, to_id, status TEXT, created_at,
    PRIMARY KEY(from_id, to_id))` — `status` in `pending|accepted|declined`.
    **No `room_id`** — the conversation is created at accept, not carried on the
    request. (0006 has not been applied to remote D1 yet, so revise it in place
    rather than adding a migration; see tasklist.)
- [x] **`data/repo.ts`**: add queries next to the conversation ones —
      contacts CRUD; profile get/upsert; `lookupByHandle`/`lookupByEmailHash`
      (both `AND discoverable = 1`); request create/list-incoming/accept/decline.
      Done in server cleanup: factor a shared `connectUsers(a, b)` primitive =
      resolve-or-create conversation + upsert both contact rows with
      `conversation_id` stamped (create-on-accept #568). `acceptRequest` =
      verify pending request → `connectUsers` → mark `accepted`. Referral calls
      `connectUsers` directly. `room_id` handling is already removed.
      Keep one repo file; split to `data/user-repo.ts` only if unwieldy.
- [x] **`data/handlers.ts` + `src/index.ts`**: add routes on the existing
      regex-router + `auth.ts` verify (uid from token = owner; never
      client-supplied):
  - `/users/me/profile` (GET/PUT), `/users/me/discoverable` (PUT)
  - `/users/lookup?handle=` and `/users/lookup?emailHash=` (GET, exact)
  - `/users/me/contacts` (GET/POST), `/users/me/contacts/:id` (PATCH/DELETE)
  - `/contact-requests` (POST send, GET list incoming),
    `/contact-requests/:fromId/accept` (POST), `/.../decline` (POST)
  - `/referrals/connect` (POST `{ referrerId }`) — referral
    auto-connect, authorized by the joiner's token alone (no pending request).
- [x] **`UserMailbox` DO**: add a `contact_request` event type pushed to the
      recipient (mirror the call-invite push). Recipient client also fetches
      pending on load from D1, so the push is a nudge, not the source of truth.
- [x] Worker tests in `test/` mirroring `data-worker.test.ts`.

## Client (`src/storage/`)

Seam exists — repositories wrap a `*DBInterface` adapter via a factory in each
`index.js`. Add D1 adapters parallel to the RTDB ones; no domain/repository
changes.

- [x] **Contacts**: `src/storage/contacts/adapters/contacts-d1-adapter.js`
      implementing `ContactsDBInterface` (get/list/put/patch/remove) against the
      Worker. Add `createContactsD1Repository(options)` to
      `src/storage/contacts/index.js`. Switch `src/stores/contactsStore.ts` from
      `createContactsRTDBRepository`. Done in cleanup: drop `roomId` from the
      contact shape; rename `getContactByRoomId` → `getContactByConversationId`;
      apply the UUID-shape guard when reading `conversation_id` (non-UUID →
      `null` → `resolveDirectConversationId` fallback).
- [x] **Profile**: `src/storage/user/user-profile-d1-adapter.js`; wire it in
      `src/storage/user/index.js`. Add `discoverable` + `username` to
      `UserProfileSchema`.
- [x] **Discovery**: port `user-discovery.js` to call `/users/lookup`. Keep
      `hashEmail` client-side. Add a `searchByHandle(handle)` call. New UI: a
      search box that resolves a handle → "send request" button.
- [x] **Handle customizer**: auto-claim a valid handle when missing; one-time
      prompt lets the user keep or customize it. PUT to `/users/me/profile`,
      handle 409 (taken) by re-suggesting.
- [x] **Contact requests**: replace `invitations.js` +
      `invite-listener.js` with calls to `/contact-requests*`; subscribe to the
      `UserMailbox` `contact_request` event instead of the two RTDB
      `onChildAdded` listeners.
      **Referral (locked 2026-06-25): auto-accept, not a pending request.**
      Re-point `referral-handler.js` to call `/referrals/connect` on sign-in
      (the shared connect primitive); retire the `syntheticInvite` hack. Search
      requests keep the pending-accept gate. (Supersedes the earlier Option-B /
      pending-request lean.)
- [ ] Reuse zod schemas in `src/storage/user/schema.js` / `contact-schema.js`
      for response parsing.

## Backfill

`backend/cloudflare/scripts/backfill-users-to-d1.mjs` exists and is the idiom
(RTDB `/users` JSON dump → idempotent SQL → `wrangler d1 execute`). **Status: WIP,
not final** — verified applying to **local** D1 only; not yet exercised end-to-end
via `dev:local`, and the cohort/identity model is still under review (see open
question below). Currently covers **users + contacts**:

- **Users.** Rich rows for the Google cohort (`userName`, no handle →
  `display_name` + `photo_url`, `username` NULL) and handle accounts
  (`username` present → `display_name` + `username`). Deleted / identity-less
  nodes get a bare FK stub only if a contact edge references them. `email_hash`
  NULL (not in RTDB) and `username` for Google users are both filled on next
  login (`registerInUserDirectory` / `ensureHandle`). `discoverable` → DB
  default 1. Fill-only UPSERT (`COALESCE` existing first) so it never clobbers
  data a live login already wrote.
- **Contacts.** One row per `users/{owner}/contacts/{contactId}` edge;
  `contact_id` is the map key. `conversation_id` is set **NULL on purpose** —
  the canonical id resolves by `dm_key` on first chat open (the RTDB
  `conversationId` is not the D1 id), and a standalone contacts backfill has no
  `conversations` rows for the FK. Nickname empty → `''` (NOT NULL).

Still TODO before this is "done": exercise via `dev:local`; decide
preserve-vs-prune for contacts pointing at deleted/stub users; pending invites →
`contact_requests(status='pending')`; a `--limit=N`/dry-run ergonomics pass if
wanted for the remote run.

**Open question (under research, may reshape the user/handle model).** Whether to
internally **decouple the public `@handle` from the non-email username-login
credential**. Today password login's Firebase principal is a synthetic email
built from the username, so the login name *is* the handle. The D1 `username` is
already free to diverge with no migration (see "Auth principal welded to the
handle" parked follow-up), but the cleanest long-term shape — and how comparable
apps separate login identity from a mutable public handle — is still being
looked at. The handle-account half of the backfill may change depending on that
outcome; the Google half (no handle, auto-claim on login) is unaffected.

## Cutover

- [ ] Backfill prod D1.
- [x] Flip client factories to D1 repositories; mount handle customizer.
- [ ] Smoke: search by handle → send request → accept on other account → both
      sides connected **with a live `conversation_id`** (open chat immediately);
      referral link → open → sign in → **auto-connected** (no gate). Verified on
      `dev:local` 2026-06-26.
- [ ] Follow-up, not this PR: scaffold account settings UI for editing profile,
      handle, and discoverability; add contact edit/delete UI.
- [ ] Leave RTDB nodes in place (no destructive delete) until verified in prod;
      sweep later.

## Out-of-scope reminders left on RTDB

`presence/`, push subscription store, `firebase-room-signaling.js`. Do not touch.
