# Slice: Messages + Files on opaque conversationId, with live push

> Self-contained brief for this branch (`feat/d1-messages-live-push`, draft PR).
> Companion docs: `MIGRATION_STATUS.md` (overall roadmap), `docs/WIP_Architecture/D1_R2_MIGRATION.md` (original design, partially stale).

## Goal

Move conversation **messages** (text + file-messages) from Firebase RTDB to Cloudflare D1,
keyed by the **opaque `conversationId`** from the live D1 registry, with **live cross-client
push** via a Durable Object so received messages appear without reload. Files keep living
on R2 but become keyed by opaque ids, with membership authz from D1 instead of RTDB.

Messages and live push ship **together in this one PR** — load-on-open D1 messages without
push would be a UX regression vs RTDB listeners.

## Locked decisions (do not re-litigate)

1. **Push DO lives in `workers/data`** (new DO class, e.g. `ConversationChannel`). The
   message-write handler notifies it in-worker; client subscribes over WebSocket reusing
   the `src/realtime/` transport patterns. `workers/signaling` stays untouched.
2. **Start clean — no history backfill.** New D1 conversations start empty. Old RTDB
   messages (derived `a_b` ids) are not migrated.
3. **Flag flip with RTDB fallback.** `VITE_MESSAGE_BACKEND` default flips to `d1`;
   the `rtdb` adapter stays selectable as an escape hatch. As part of this slice, write
   `RTDB_MESSAGES_RETIREMENT.md` (repo root) listing every legacy path to delete later
   (see "Cleanup doc" below) so retirement is a mechanical follow-up PR.
4. **Files migrate with messages** (file-sends are file-_messages_). Same id cutover.

### Resolved 2026-06-15 (this slice)

5. **Scope = messages + files + push only.** Text + file messages, D1 persistence, DO live
   push, history. **Reactions and read/unread badges are deferred to a fast-follow PR.**
   The DO + `0002` schema land here, so the follow-up is purely additive (it can still
   include the `message_reactions` table and `last_read_at` column now — see §1 — but the
   client/worker reaction + read endpoints and UI are out of scope for this PR).
6. **DO push = broadcast to all, dedupe by id.** The DO broadcasts the event to every
   connected socket **including the sender**; the client dedupes against its optimistic row
   using the server-allocated message id. One code path, self-healing if optimistic state
   drifts. (Supersedes the RTDB `msg.from === myUserId` receiver-only skip.)
7. **Include `width`/`height` in `0002`** (nullable) and capture at upload — confirmed.
8. **Default backend stays `rtdb` in code this PR.** Exercise `d1` via
   `VITE_MESSAGE_BACKEND=d1` in env for e2e + prod soak; a follow-up commit flips the code
   default once proven.

## Current state (what already exists on main, all deployed)

- **D1 registry** (`workers/data/`, PR #534): tables `users`, `conversations`,
  `conversation_members` in `migrations/0001_init.sql`. Endpoints: `GET /health`, `GET /me`,
  `POST /conversations/resolve-direct`, `GET /conversations`, `GET /conversations/:id`
  (membership-guarded, 404 to non-members). Auth: `src/auth.ts` Firebase RS256 verify.
  Remote D1 `hangvidu-data` (id in `wrangler.jsonc`) — **`0001` is applied remotely; NEVER
  edit it. New tables go in a new `0002` migration.**
- **Resolve-or-create client** (PR #535): `src/storage/conversations/data-client.ts`
  (HTTP client, 8s timeout, token injected) + `src/stores/conversations-client.ts`
  (singleton, `resolveDirectConversationId()` with user-scoped session cache, reset on
  logout via `src/app/setupAuth.js`). Calls already use the opaque id as room handle.
- **R2 images** (`workers/files/`, PR #533): authenticated upload/download, but keyed by
  derived `a_b` conversation ids, and `authorizeConversation` checks membership by fetching
  RTDB (`FIREBASE_DATABASE_URL` → `conversations/{id}/members/{uid}.json`).
- **Messaging runtime**: `src/features/messaging-next/` — `messaging-runtime.ts` is a
  module singleton (called from `ConversationPanel.tsx` + `contacts/useContacts.ts`) that
  currently hardwires `adapters/rtdb.ts`. **There is NO `VITE_MESSAGE_BACKEND` selection
  and NO `src/stores/message-repository.ts` on main** — both lived only on the frozen
  `D1-R2-migration` branch (88ef2de9). This slice builds the selector + stores bridge;
  it does not "flip a default" (see Client step below).
  - **`adapters/rtdb.ts` now takes `{ database }`** (DI refactor 33cd6408). Both repo
    factories require it; the runtime injects the `rtdb` singleton. Any flag wiring copied
    from 88ef2de9 must use `createRTDBMessageRepository({ database: rtdb })`, not the old
    no-arg call — a raw `git cherry-pick` of that file will conflict.
  - Token injection is already solved by `getConversationsClient()` (PR #535 singleton,
    carries the auth token). The stores bridge is ~6 lines wrapping it — no component
    rewiring needed.
- **Boundary rules** (`eslint.boundaries.config.js`): features may NOT import `storage`
  or `auth`+`storage` together — `stores` is the wiring layer (token injection pattern).
  Realtime client code belongs in `src/realtime/`.

## Prototype code to copy (NOT merge) from frozen branch `D1-R2-migration`

That branch's worker base + schema are **stale** (6-table `0001`, pre-auth-fixes). Copy
logic only, adapt to current main:

- `git show 88ef2de9:workers/data/src/index.ts` / `repo.ts` — message endpoints:
  `GET/POST /conversations/:id/messages`, `POST .../read`, `GET .../activity`,
  `POST .../messages/:mid/reactions` (all membership-guarded 404; server allocates
  message id + `created_at`, bumps `conversations.updated_at`).
- `git show 88ef2de9:src/features/messaging-next/adapters/d1.ts` — D1 adapter behind an
  injected `D1MessageClient` interface (boundary-clean). Its `watch*` methods emitted one
  snapshot + no-op unsub — **this slice replaces that with real live events from the DO**.
- `git show 88ef2de9:src/stores/selectedConversationStore.ts` — `openDirectConversation`
  resolve-or-create when flag=d1 (note: main now has `resolveDirectConversationId` in
  `src/stores/conversations-client.ts` — use that, don't duplicate).
- `git show 7159fa52:workers/data/src/repo.ts` — per-conversation activity in
  `listConversations` (unread + list ordering).
- Message-method signatures previously trimmed from `src/storage/conversations/data-client.ts`
  exist in `git show D1-R2-migration:src/storage/conversations/data-client.ts`
  (loadMessages/sendMessage/markRead/activity/setReaction + MessageRecord/ReactionMap types).

## Implementation plan

### 1. Schema — `workers/data/migrations/0002_messages.sql`

- `messages` (id TEXT PK uuid, conversation_id FK→conversations ON DELETE CASCADE,
  sender_id FK→users, kind TEXT 'text'|'file', body TEXT NULL, created_at INTEGER),
- `message_attachments` (id, message_id FK→messages CASCADE, r2_key, mime, size, name),
  - Suggestion: add nullable `width`/`height` (natural image px) and capture them at
    upload. The renderer already reserves layout space when `MessageAttachment.width/height`
    are present (PR #538) — populating them here prevents scroll/layout shift as images load.
- `message_reactions` (message_id FK CASCADE, user_id, emoji, PK(message_id,user_id,emoji)),
- `ALTER TABLE conversation_members ADD COLUMN last_read_at INTEGER NOT NULL DEFAULT 0`,
- Indexes: `messages(conversation_id, created_at)`, `message_attachments(message_id)`.
- Apply: `pnpm -C workers/data migrate:local`, later `migrate:remote` (remote D1 always
  enforces FKs; `PRAGMA foreign_keys = ON` is a no-op there).

### 2. Worker — message endpoints + push DO (`workers/data/`)

- Port the 88ef2de9 endpoints onto current `index.ts`/`repo.ts` (keep current auth + CORS +
  404 conventions; trim/adapt to 0002 schema).
- New DO class `ConversationChannel` (one instance per conversationId):
  - `GET /conversations/:id/ws` — authenticate (same `auth.ts`), check membership in D1,
    then upgrade and forward to the DO (`idFromName(conversationId)`). Use WebSocket
    hibernation API (`state.acceptWebSocket`) — see `workers/signaling/src/` for the
    house style.
  - After successful message/reaction/read writes, the route handler notifies the DO
    (stub fetch/RPC) → DO broadcasts a small event envelope
    `{ type: 'message'|'reaction'|'read', conversationId, payload }` to connected sockets.
    Persistence stays in D1 — the DO holds no authoritative state.
- `wrangler.jsonc`: DO binding + `migrations` tag (`new_sqlite_classes` or `new_classes`
  — check current wrangler docs; hibernation needs no special class config).
- Worker tests optional; manual e2e is the bar (matches Slice A/B precedent).

### 3. Client

- **Build the backend selector + stores bridge (does not exist on main):**
  - Recreate `src/stores/message-repository.ts` from 88ef2de9 — near-verbatim:
    `createD1MessageRepositoryFromEnv()` = `createD1MessageRepository(getConversationsClient())`.
    Its deps resolve once `data-client.ts` message methods + `adapters/d1.ts` are in place.
  - Add `selectMessageRepository()` to `messaging-runtime.ts` reading `VITE_MESSAGE_BACKEND`
    (default `rtdb`), mirroring 88ef2de9 — **but adapt the RTDB branch to the DI signature:**
    `createRTDBMessageRepository({ database: rtdb })`. Do not `git cherry-pick` that file
    (it'll conflict on the no-arg call); hand-port the ~10 lines.
- Restore message methods on `src/storage/conversations/data-client.ts` (from the frozen
  branch version) — now they'll actually have live endpoints. These satisfy the
  `D1MessageClient` interface that `adapters/d1.ts` expects via `getConversationsClient()`.
- New `src/realtime/` adapter for the conversation channel WebSocket (reuse
  `signaling-socket.ts` transport + a `shared/` protocol envelope, mirroring how
  `do-room-signaling.ts` is structured). Boundary: `realtime → auth` is allowed, so the
  socket can attach the token itself.
- `src/features/messaging-next/adapters/d1.ts`: copy from 88ef2de9, then wire `watch*`
  to the channel events (initial snapshot via HTTP load, then live deltas).
- Open flow: `openDirectConversation` resolves opaque id via existing
  `resolveDirectConversationId` when backend=d1 (88ef2de9 shows where).
  Already done on main (ea4f83fa): `calleeId` flows from `ContactEntry.jsx` →
  `src/app/MainContent.tsx`, preferring `selection.remoteParticipantIds[0]`; legacy
  pair-id derivation renamed to `deriveLegacyDirectConversationId`; ids are
  format-agnostic in schema.ts.
- Files: image send path uses the opaque conversationId for `workers/files` upload keys
  (`{conversationId}/{fileId}`); insert a file-message + `message_attachments` row.
- `workers/files` authz: replace the RTDB membership fetch in `authorizeConversation`
  with a D1 check — add the same D1 binding (`database_id` from `workers/data/wrangler.jsonc`)
  and query `conversation_members` directly (one DB, two workers is fine; no service
  binding needed).

### 4. Flag flip + env

- `VITE_MESSAGE_BACKEND=d1` in `.env.development` + local `.env.production` (gitignored)
  - `.env.production.example`. Default in `messaging-runtime.ts` stays `rtdb` until
    manual e2e passes, then flip the default in code.

### 5. Cleanup doc (required deliverable): `RTDB_MESSAGES_RETIREMENT.md`

Enumerate, with file paths, everything that becomes deletable once d1 is proven:
`adapters/rtdb.ts` message path, `src/shared/utils/direct-conversation-id.js`,
`resolveContactIdFromDirectConversationId`, `group:` prefix handling, legacy fallbacks in
`MainContent.tsx` / `contactsStore.ts`, `SWNavigation.tsx` raw-id deep-link open,
RTDB `conversations/*` security rules + data, `FIREBASE_DATABASE_URL` in workers/files.

## Verification checklist (manual, two browsers/accounts)

- [ ] `pnpm ts`, `pnpm lint`, `pnpm lint:boundaries` clean
- [ ] `pnpm -C workers/data migrate:local` applies 0002; worker boots (`pnpm dev:data`)
- [ ] Open contact → opaque id resolved (same id both accounts)
- [ ] Send text → appears on sender instantly AND on receiver **without reload** (DO push)
- [ ] Reload both → history persists from D1
- [ ] ~~Reactions + read/unread badge work both directions~~ (deferred to fast-follow — decision 5)
- [ ] Image send → uploads under `{conversationId}/…`, receiver sees file-message live,
      download authorized (and 404/403 for a third account)
- [ ] `VITE_MESSAGE_BACKEND=rtdb` still works (escape hatch intact)
- [ ] Deploy: `migrate:remote`, `pnpm deploy:data`, `pnpm deploy:files`, `pnpm deploy:fb`;
      repeat the live-push test on prod

## Gotchas (learned the hard way)

- `workers/data` installs with **plain `pnpm install`** (NOT `--ignore-workspace`) —
  its local `pnpm-workspace.yaml` carries `allowBuilds` for workerd.
- Local D1 (`pnpm dev:data`) is the same store across sessions — no whole-table DELETEs.
- Ports: data 8788, signaling 8787, files 8789. Dev consumes deployed workers via
  `.env.development` URLs; switch to localhost per-worker only while iterating on it.
- Worker `ALLOWED_ORIGINS` must include dev origins (data/files/signaling all do now).
- `conversations.updated_at` bump on send drives list ordering — keep it.
- No inline styles in UI code; small single-consumer helpers get inlined, not new files.
