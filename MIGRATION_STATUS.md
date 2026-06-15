# Backend Migration Status & Remaining Steps

> Migration from Firebase-coupled code to backend-agnostic interfaces with
> Cloudflare implementations (D1 / R2 / Durable Objects), keyed by an opaque
> `conversationId`. Last updated: 2026-06-11.

## Where we are

| Concern | Backend | Status |
| --- | --- | --- |
| WebRTC room signaling | Durable Object (`workers/signaling`) | ✅ Live, default (`VITE_SIGNALING_BACKEND=do`) |
| Image files | R2 (`workers/files`) | ✅ Live (authz still reads RTDB membership) |
| Conversation registry | D1 (`workers/data`) | ✅ Live (PR #534) — users, conversations, members; opaque UUID ids |
| Call room handle | Opaque `conversationId` from registry | ✅ Live (PR #535) — fallback to one-off UUID if registry unreachable |
| Messages | Firebase RTDB | ⬜ To migrate (D1) |
| Contacts, user profiles | Firebase RTDB | ⬜ To migrate (later, lowest priority) |
| Call-invite mailbox | Firebase RTDB | ⬜ To migrate (Durable Object) |
| Auth | Firebase Auth | Stays for now (workers verify ID tokens via a swappable `auth.ts` seam) |

The shared mechanism every consumer needs — "open conversation → resolve-or-create
opaque id" — exists and is exercised by calls (`src/stores/conversations-client.ts`).

## Remaining steps (in order)

### 1. Messages + files on opaque ids (one slice — files are file-messages)
The big one. Both currently key stored data by derived `a_b` ids, so they cut over together.
- New branch from `main`. Copy the valuable parts from the frozen `D1-R2-migration`
  branch (worker message endpoints, `messaging-next/adapters/d1.ts`, message-repository
  wiring) — do **not** merge that branch; its worker base and schema are stale.
- Message/attachment/reaction tables = **new `0002` migration**. Never edit
  `0001_init.sql` — it is applied to the live remote D1.
- Repoint `workers/files` membership authz from RTDB to the D1 registry; R2 keys
  become `{conversationId}/{fileId}` with opaque ids.
- Open-conversation flow resolves the opaque id (reuse `resolveDirectConversationId`).
- Decide: start clean vs backfill old RTDB messages (old derived ids are not portable).

### 2. Retire derived-id plumbing
After (1), nothing should compute ids from user ids:
- Delete `src/shared/utils/direct-conversation-id.js`, `resolveContactIdFromDirectConversationId`,
  the `group:` prefix hack, and legacy fallbacks in `MainContent.tsx` / `contactsStore.ts`.
- Fix push deep-link open flow (`SWNavigation.tsx` opens raw ids).
- Render conversation list from `conversation_members` instead of ID-splitting
  (ContactsList → ConversationList rename, deferred from old Slice C).

### 3. Call-invite mailbox → Durable Object
Call invites are ephemeral coordination but live on RTDB. Move to `src/realtime/` +
a DO mailbox (reuse the signaling transport + protocol envelope). Keyed by the
same opaque `conversationId`. Media-playback-sync follows the same pattern.

### 4. Live message push (after 1)
Messages on D1 are load-on-open. Add live cross-client push via a per-conversation
DO channel (old Slice E1) so received messages appear without reload.

### 5. Cleanup
- Archive/delete branches: `D1-R2-migration`, `codex/d1-conversation-core` (merged),
  plus stale `codex/*` experiment branches.
- Update `docs/WIP_Architecture/D1_R2_MIGRATION.md` to reflect what actually shipped
  (registry-first path, calls as first consumer) or fold it into a fresh doc.
- `workers/signaling` stale pnpm config (see `workers/signaling/TODO.md`).
- Eventually: generate worker `ALLOWED_ORIGINS` from `config/origins.json` instead
  of hand-syncing three wrangler.jsonc files.

### Future: eager DM creation on connect-accept (contacts→D1 slice)
Move DM creation from lazy (on first open) to eager (when a connect request is
accepted), so both users hold the same `conversationId` from the start. This is
**additive and non-breaking** — defer it to the contacts→D1 migration, do NOT
bundle into the messages slice:
- The data model is unchanged; only the *creation trigger* moves earlier.
- `resolveOrCreateDirect` is idempotent on `dm_key`, so the accept handler calls
  it eagerly and the existing lazy `resolveDirectConversationId` on open becomes a
  no-op fast path / permanent fallback (legacy contacts, re-adds, races, message
  before accept propagates). Keep both; keep `dm_key` as the convergence guard.
- Implementation: one `resolveOrCreateDirect(A,B)` call in the accept path, store
  the returned id on the contact row as a durable cache.
- `dm_key` only fully retires if we later go invite→accept where the id is minted
  once and carried in the invite — bigger protocol change, out of scope here.

## End state

RTDB remains only for contacts/user-directory (and auth stays Firebase Auth behind
the worker `auth.ts` seam). Everything conversation-shaped — messages, files, calls,
presence, sync — hangs off the opaque `conversationId` spine: D1 for relational
persistence, R2 for blobs, one DO room per conversation for realtime.
