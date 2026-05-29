# D1 + R2 Migration — Conversation-Centric Core

## Goal

Make `conversationId` the single spine of the data model and split persistence
from realtime cleanly across Cloudflare primitives:

```
conversationId
├── D1 (relational, persistent)
│   ├── users
│   ├── conversations
│   ├── conversation_members
│   ├── messages
│   ├── message_attachments
│   └── message_reactions          # added vs the original sketch (see below)
├── R2 (files)
│   └── {conversationId}/{fileId}
└── Durable Object (realtime)
    └── one room per conversationId  (signaling + presence + call handshake)
```

Everything is owned by a conversation. A DM, a group, a call, a file, a message
— all hang off one stable, **opaque** `conversationId`.

This builds on Slice 1 ([SIGNALING_DO_SLICE1.md](./SIGNALING_DO_SLICE1.md)),
which already put room signaling on a DO behind `src/realtime/`.

---

## THE FUNDAMENTAL CHANGE: opaque conversationId

Read this section before anything else. It changes how the model behaves, not
just how an ID looks.

### Today (derived)

`conversationId = [userA, userB].sort().join('_')`
([direct-conversation-id.js](../../src/shared/utils/direct-conversation-id.js)).
The ID **is** the membership. Given two users you can compute the ID; given the
ID you can recover the two users by `split('_')`.

### After (opaque)

`conversationId` is a random `uuid`/`ulid`. It encodes nothing. Membership lives
**only** in `conversation_members`. You never parse a conversationId again.

### Practical implications you must be aware of

1. **You can no longer compute a conversation's ID from its participants.**
   Opening a DM with someone becomes a *lookup*, not a *calculation*:
   "find the direct conversation whose members are exactly {me, them}; if none
   exists, create one." Dedup moves to a `dm_key UNIQUE` column (below), not the
   primary key.

2. **"Create conversation" becomes an explicit step.** Today a DM exists
   implicitly the moment you know both user IDs. With opaque IDs the
   `conversations` row must be inserted (and its ID allocated) before you can
   send a message, open the DO room, or upload a file. This is the biggest
   behavioral shift: the first interaction with a new contact must first
   *resolve-or-create* the conversation, then proceed.

3. **You can no longer recover the "other user" from the ID.**
   `resolveContactIdFromDirectConversationId` disappears. The UI gets the other
   participant from `conversation_members` (already loaded for the list), not by
   splitting a string. This removes the underscore-in-userId bug class entirely.

4. **The DO room is keyed by the opaque ID** (`idFromName(conversationId)`).
   Because the room is created on demand, the conversation row must exist first
   (see #2). The room no longer needs to know or encode who is in it.

5. **Direct vs group stops being special.** No more `group:` prefix hack in the
   schema. `kind` is a column; a direct conversation is just one with two members
   and a non-null `dm_key`. Converting a DM to a group later is adding members +
   nulling `dm_key`, not minting a new ID.

6. **Existing RTDB data does not carry over its IDs.** Old `a_b` conversation
   IDs, their messages, and their RTDB file references are not portable as-is.
   Migration strategy for this slice: **start clean** (new D1 store, no
   backfill). If we later need history, we map old `a_b` → new opaque IDs once,
   in a dedicated backfill, not on the hot path. This is acceptable because the
   app is pre-production and the realtime/persistence split is still settling.

### The dedup mechanism (keeps "one DM per pair" without derived IDs)

```sql
CREATE TABLE conversations (
  id          TEXT PRIMARY KEY,            -- opaque uuid/ulid (the spine)
  kind        TEXT NOT NULL CHECK (kind IN ('direct','group')),
  dm_key      TEXT UNIQUE,                 -- sorted "a:b" for direct, NULL for group
  title       TEXT,
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL
);
```

`dm_key` is the *old* `sort().join` rule demoted from identity to a lookup key.
`UNIQUE` enforces no-duplicate-DM. Resolve-or-create a DM = `INSERT ... ON
CONFLICT(dm_key) DO NOTHING` then `SELECT id WHERE dm_key = ?`. Groups leave
`dm_key` NULL (NULLs don't collide under UNIQUE in SQLite/D1).

---

## Schema (D1)

D1 enforces foreign keys by default (equivalent to `PRAGMA foreign_keys = on`)
and, because every query runs in an implicit transaction, user queries cannot
disable it — so no `PRAGMA` is needed here. To temporarily violate constraints
during a migration/import, use `PRAGMA defer_foreign_keys = on` (holds until the
end of that transaction only). Note: `defer_foreign_keys` does **not** suppress
`ON DELETE CASCADE` — cascades still fire.

```sql
CREATE TABLE users (
  id           TEXT PRIMARY KEY,
  display_name TEXT,
  created_at   INTEGER NOT NULL
);

CREATE TABLE conversations (
  id          TEXT PRIMARY KEY,
  kind        TEXT NOT NULL CHECK (kind IN ('direct','group')),
  dm_key      TEXT UNIQUE,
  title       TEXT,
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL
);

CREATE TABLE conversation_members (
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id         TEXT NOT NULL REFERENCES users(id)         ON DELETE CASCADE,
  role            TEXT NOT NULL DEFAULT 'member',   -- owner|admin|member
  status          TEXT NOT NULL DEFAULT 'active',   -- active|left|removed
  joined_at       INTEGER NOT NULL,
  last_read_at    INTEGER NOT NULL DEFAULT 0,       -- unread badge source
  PRIMARY KEY (conversation_id, user_id)
);
CREATE INDEX idx_members_user ON conversation_members(user_id);

CREATE TABLE messages (
  id              TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       TEXT NOT NULL REFERENCES users(id),
  kind            TEXT NOT NULL,                    -- text|file|event|system
  body            TEXT,
  created_at      INTEGER NOT NULL
);
CREATE INDEX idx_messages_convo_time ON messages(conversation_id, created_at);

CREATE TABLE message_attachments (
  id          TEXT PRIMARY KEY,
  message_id  TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  r2_key      TEXT NOT NULL,                        -- "{conversation_id}/{file_id}"
  file_name   TEXT NOT NULL,
  mime_type   TEXT NOT NULL,
  file_size   INTEGER NOT NULL
);
CREATE INDEX idx_attachments_message ON message_attachments(message_id);

CREATE TABLE message_reactions (
  message_id TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id    TEXT NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  emoji      TEXT NOT NULL,
  PRIMARY KEY (message_id, user_id, emoji)
);
```

Decisions baked in:
- `last_read_at` lives on `conversation_members` (it is per-conversation-per-user
  by definition). `ConversationActivity` becomes a join, no separate store.
- `message_reactions` replaces the RTDB `emoji → userId → true` nesting.
- R2 key (`{conversationId}/{fileId}`) is stored whole in `message_attachments`;
  never string-built at read time. Deleting a conversation = delete the R2 prefix.

---

## Slices

Each slice ends in something testable in the browser. Tests, edge cases, and
refinement are deferred until after manual e2e verification per slice.

### Slice A — D1 schema + conversation resolve/create (no UI change yet)

Decisions (locked):
- **Worker:** new `workers/data/` (separate persistence worker; mirrors
  `workers/signaling/`). Keeps the realtime/persistence split at the deploy
  boundary.
- **IDs:** opaque UUID v4 via `crypto.randomUUID()` (Workers built-in). Ordering
  comes from `created_at` columns, not the ID.
- **Client transport:** HTTPS `fetch` to the worker with the Firebase ID token as
  a `Bearer` header (CRUD); realtime stays on the DO socket.
- **Auth:** reuse the signaling worker's RS256 `authenticate()` seam.

Tasks:
- [ ] Scaffold `workers/data/` (package.json, wrangler.jsonc, tsconfig), D1
      binding, local dev.
- [x] `migrations/0001_init.sql` — 6 tables + FKs + 3 indexes + `dm_key UNIQUE`.
      Applied to local D1; dedup + joins validated via `wrangler d1 execute`.
- [x] Share/port `authenticate()` (Firebase RS256) into the data worker —
      `src/auth.ts`, HTTPS `Authorization: Bearer` variant.
- [x] Upsert caller into `users` on each authenticated request (optional
      `?name=` seeds `display_name`).
- [x] `resolveOrCreateDirect(otherUserId) → conversationId` — `src/repo.ts`.
      `dm_key` = sorted pair, `INSERT ... ON CONFLICT(dm_key) DO NOTHING`, insert
      both `conversation_members`, return id. Idempotent + race-safe.
- [x] `getConversation(id)` — row + members, membership-guarded.
- [x] `listConversations(userId)` — caller's conversations + member(s).
- [x] Client caller (HTTPS + bearer): `src/storage/conversations/data-client.ts`
      (boundary-clean, token injected) + `src/stores/dev-data-client.ts` exposes
      `window.dataClient` (dev only). `VITE_DATA_URL` (default `:8788`).
- [x] **Verify (browser console) — DONE 2026-05-29.** Logged in, `me()` →
      caller uid; `resolveDirect('OTHER_UID')` twice → same opaque id (dedup via
      `dm_key UNIQUE`); `list()` showed it; `get(id)` returned both members with
      correctly sorted `dm_key`. Local only; remote D1 still to provision.

Decisions made during implementation (carry forward):
- **Stub `users` row for the other participant** in `resolveOrCreateDirect` —
  FK requires it; `display_name` backfills when that user later authenticates.
- **404 (not 403)** for non-member conversation access, so ids can't be probed.
- pnpm 11 build-scripts: data worker uses `allowBuilds:` in `pnpm-workspace.yaml`
  and must install with plain `pnpm install` (NOT `--ignore-workspace`).
  Signaling worker's stale `onlyBuiltDependencies` deferred in
  `workers/signaling/TODO.md`.

Not yet done in Slice A (before calling it complete):
- Remote D1: run `wrangler d1 create hangvidu-data`, paste `database_id` into
  `workers/data/wrangler.jsonc`, `pnpm -C workers/data migrate:remote`, deploy,
  set prod `VITE_DATA_URL`. (Local dev needs none of this.)
- Tests deferred per workflow (after manual e2e sign-off).

### Slice B — messages on D1 (replace RTDB read/write path)

Decision (locked): **pure D1, load-on-open.** D1 is the source of truth; reads
happen on conversation open and after each send. The `MessageRepository.watch*`
methods emit one current snapshot then return a no-op unsubscribe — live
cross-browser push is deferred to Slice E (per-conversation DO). Trade-off
accepted: two users not in an active call won't see new messages until they
reopen/reload, during the B→E window.

Backend + adapter (DONE 2026-05-29, behind `VITE_MESSAGE_BACKEND=d1`):
- [x] Worker message endpoints (`workers/data/src/index.ts` + `repo.ts`), all
      membership-guarded (404 to non-members), reusing the 6 tables from
      `0001_init.sql` (no new migration):
      `GET /conversations/:id/messages?limit=N` (oldest-first, default 50, cap
      200, reactions batched in); `POST .../messages {kind?,body}` (server
      allocates id + `created_at`, bumps `conversations.updated_at`);
      `POST .../read`; `GET .../activity`; `POST .../messages/:mid/reactions
      {emoji,active}`.
- [x] Client methods on `data-client.ts`: `loadMessages`, `sendMessage`,
      `markRead`, `activity`, `setReaction` (+ `MessageRecord` / reaction types).
- [x] D1 `MessageRepository` adapter
      [adapters/d1.ts](../../src/features/messaging-next/adapters/d1.ts) —
      boundary-clean (feature can't import storage, so a `D1MessageClient`
      structural interface is injected). Text-only payload for this slice.
- [x] `stores/message-repository.ts` injects the real client (token + baseUrl)
      → repo (stores is the only layer allowed both auth + storage + feature).
- [x] `messaging-runtime.ts` selects backend via `VITE_MESSAGE_BACKEND`
      (`rtdb` default | `d1`); conversation metadata stays on RTDB until Slice C.
- [x] `pnpm ts`, `pnpm lint`, `pnpm lint:boundaries` clean.
- [x] **Verify (console) — DONE 2026-05-29.** With servers up: `id =
      resolveDirect('OTHER_UID')`; `sendMessage(id,'hi')`; `loadMessages(id)`
      shows it; reload page → `loadMessages(id)` still returns it (persisted in
      D1); `markRead(id)` + `activity(id)` reflect `lastReadAt`; `setReaction`
      then `loadMessages` shows the reaction map.

Remaining for full UI swap (entangled with Slice C — see note):
- [ ] **Open-flow must resolve-or-create the D1 conversation and use the opaque
      id before messaging.** Today the UI opens a DM by the derived `a_b` id,
      which does not exist in D1 → the membership guard 404s. So flipping
      `VITE_MESSAGE_BACKEND=d1` for the *UI* requires the opaque-id open flow
      that Slice C builds. The D1 message layer itself is done and verified via
      console; the UI flip rides on Slice C.
- **Verify (UI, after Slice C):** open a DM, send text, reload → messages
  persist and reload from D1. Unread badge reflects `last_read_at`.

### Slice C — opaque-ID open flow (MINIMAL slice done; full rename deferred)

Scope intentionally trimmed to "just enough to make the `VITE_MESSAGE_BACKEND=d1`
UI flip testable." The list rename and member-driven rendering are deferred.

Done (2026-05-29, uncommitted):
- [x] Opaque-id open flow. `openDirectConversation({contactId, fallbackConversationId,
      contactNickName})` in [selectedConversationStore.ts](../../src/stores/selectedConversationStore.ts):
      when `VITE_MESSAGE_BACKEND=d1` it `resolveDirect(contactId)`s the opaque id
      (resolve-or-create) before selecting; otherwise uses the legacy derived id.
      `ContactEntry` now calls this instead of `open()` with a precomputed id.
- [x] Shared data-worker client singleton
      [stores/conversations-client.ts](../../src/stores/conversations-client.ts)
      (reused by the message repo + the opener).
- [x] `MainContent` `calleeId` no longer hard-splits the id — prefers
      `selection.remoteParticipantIds[0]` (opaque-safe), falls back to
      `resolveContactIdFromDirectConversationId` only for legacy derived ids.
- [x] `pnpm ts` / `lint` / `lint:boundaries` / `build` clean.
- **Verify (UI — pending manual):** `pnpm dev:data` + `pnpm dev:local` with
  `VITE_MESSAGE_BACKEND=d1` (e.g. in `.env.local`), log in, click a contact →
  conversation opens on a fresh opaque id, send text, reload → message persists
  from D1. Second account opening the same contact resolves the same id (dedup)
  and sees the history on open. Live cross-browser updates only on reopen/reload
  until Slice E (per the Slice B decision).

Unread badge + list reorder fix (DONE & VERIFIED 2026-05-29, commits 7159fa52 +
82eca6a9). Root cause was an id mismatch, not missing live push: the list watched
`/activity` per contact using the **derived `a_b`** id from `contactsStore`, which
D1 404s (D1 only has opaque ids). Contained fix:
- [x] Worker `listConversations` now returns per-conversation `activity`
      ({latestSentAt, latestSenderId, lastReadAt}) in one query.
- [x] `useContacts` (d1 backend) replaces the N per-contact derived-id activity
      watchers with one `loadConversationsList()` call, mapping activity onto the
      matching contact by the other member's userId (opaque conversationId). Kills
      the 404 storm; unread + reorder now correct **on reload**. RTDB path
      unchanged (branches on `getMessageBackend()`).
- Note: list is still **contact-driven** (all contacts show; ones with no D1
  conversation just have empty activity). Still reload-based — live push is Slice E.

Deferred from Slice C (do later):
- [ ] Rename `ContactsList` → `ConversationList`, move under messaging-next; go
      fully conversation-driven (render the other member from `conversation_members`).
- [ ] Remove `resolveContactIdFromDirectConversationId` + `group:` prefix
      handling entirely (still referenced as the legacy fallback in `MainContent`
      and `contactsStore`).
- [ ] Opaque-id open flow for the push-notification deep link
      ([SWNavigation.tsx](../../src/features/push-notifications/SWNavigation.tsx)
      still calls `open()` with a raw id).
- [ ] Empty conversation history on open (regression A) is by-design clean-start
      (old RTDB messages not in D1); only the optional Slice F backfill restores it.

### Slice D — files on R2

- [ ] Worker: presigned/proxied upload to `{conversationId}/{fileId}`; on success
      insert `message_attachments` + a `file` message.
- [ ] Download/serve guarded by conversation membership.
- **Verify:** send a file in a conversation, reload, re-download from R2.

### Slice E — call handshake on the conversation DO

- [ ] Key the DO room by `conversationId`; fold the call handshake into messages
      on that room (reuse `src/realtime/` transport + protocol envelope).
- [ ] Caller path: resolve-or-create conversation → open room → handshake.
- **Verify:** start a call from a conversation; 2-peer call connects through the
  conversation's DO room.

### Slice F (deferred) — RTDB history backfill (only if needed)

Map old `a_b` IDs → opaque IDs once, copy messages/files. Off the hot path. Skip
unless we decide old history must survive.

---

## What this explicitly defers

- Contact metadata (display name, avatar) as a concern that *decorates* a member
  — not folded back into the conversation model.
- Tests (unit/integration/E2E) until manual e2e per slice is reported back.
- Pagination/windowing tuning, optimistic send retry.
- Any RTDB removal — RTDB stays as fallback until each slice is proven.
