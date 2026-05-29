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

```sql
PRAGMA foreign_keys = ON;  -- NOTE: per-connection in D1; verify enforcement on the data path

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

- [ ] Provision D1, add binding to the worker, write the schema migration above.
- [ ] Worker endpoints: `resolveOrCreateDirect(otherUserId) → conversationId`,
      `getConversation(id)`, `listConversations(userId)`.
- [ ] Seed `users` row on auth (upsert current user).
- **Verify:** call the endpoints from the browser console (logged in); confirm
  resolve-or-create returns a stable ID across calls and dedups by `dm_key`.

### Slice B — messages on D1 (replace RTDB read/write path)

- [ ] D1-backed `MessageRepository` (implements existing
      [interfaces.ts](../../src/features/messaging-next/interfaces.ts)):
      `loadMessages`, `send`, `markConversationRead`, activity.
- [ ] Keep realtime delivery as-is (DO/datachannel) for live updates; D1 is the
      persistent record. Reads on open come from D1.
- **Verify:** in the browser, open a DM, send text, reload → messages persist and
  reload from D1. Unread badge reflects `last_read_at`.

### Slice C — ConversationList (rename + opaque IDs end-to-end)

- [ ] Rename `ContactsList` → `ConversationList`, move under messaging-next.
- [ ] List from `listConversations(userId)`; render the other member from
      `conversation_members`, not from splitting the ID.
- [ ] Delete `resolveContactIdFromDirectConversationId` usage; drop `group:`
      prefix handling.
- **Verify:** conversation list renders, opening any conversation works with
  opaque IDs, no ID-splitting code remains on the path.

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
- FK enforcement hardening, pagination/windowing tuning, optimistic send retry.
- Any RTDB removal — RTDB stays as fallback until each slice is proven.
