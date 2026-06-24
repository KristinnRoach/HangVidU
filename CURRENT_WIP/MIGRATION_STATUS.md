# Backend Migration Status & Remaining Steps

> Migration from Firebase-coupled code to backend-agnostic interfaces with
> Cloudflare implementations (D1 / R2 / Durable Objects), keyed by an opaque
> `conversationId`. Last updated: 2026-06-21.

> Server side is now a **single Cloudflare Worker** at `backend/cloudflare/`
> (deployed script name `hangvidu-data`), organized by capability folder
> `data/ files/ realtime/`. The former three-worker split (`workers/data`,
> `workers/files`, `workers/signaling`) was consolidated and deployed in PR #556;
> table rows below name the folder, not a separate worker.

## Where we are

| Concern | Backend | Status |
| --- | --- | --- |
| WebRTC room signaling | Durable Object (`realtime/`) | ✅ Live, default (`VITE_SIGNALING_BACKEND=do`) |
| Attachments | R2 (`files/`) | ✅ Live — authz reads D1 membership (PR #536) |
| Conversation registry | D1 (`data/`) | ✅ Live (PR #534) — users, conversations, members; opaque UUID ids |
| Call room handle | Opaque `conversationId` from registry | ✅ Live (PR #535) — fallback to one-off UUID if registry unreachable |
| Messages | D1 (`data/`) | ✅ Live (PR #536) — D1 persistence + `ConversationChannel` DO live push. Legacy RTDB message path + derived-`a_b` id plumbing removed from the client (PR #551); only RTDB rules/data deletion remains (see Deferred below) |
| Live message push | Durable Object (`ConversationChannel`) | ✅ Live (PR #536) |
| Per-user mailbox | Durable Object (`UserMailbox`, `realtime/mailbox-channel.ts`) | ✅ Live (PRs #553, #565) — carries call events and conversation activity; replaced the RTDB `users/{uid}/calls/*` mailbox |
| Conversation metadata | Firebase RTDB | ⬜ To migrate (Slice C) — `messaging-runtime.ts` still uses `createRTDBConversationRepository` |
| Contacts, user profiles | Firebase RTDB | ⬜ To migrate (later, lowest priority) |
| Auth | Firebase Auth | Stays for now (workers verify ID tokens via a swappable `auth.ts` seam) |

The shared mechanism every consumer needs — "open conversation → resolve-or-create
opaque id" — exists and is exercised by calls (`src/stores/conversations-client.ts`).

## Remaining steps (in order)

### 1. Messages + files on opaque ids ✅ SHIPPED (PR #536)
Messages, attachments and reactions are on D1 (migration `0002`); `files/`
authz reads the D1 registry; R2 keys are
`conversation-files/{conversationId}/{objectId}`; live push runs through the
`ConversationChannel` DO. Started clean — old derived-`a_b` history was not
backfilled (decision #2). Code default is `d1`; the dormant RTDB message path and
derived-id plumbing were retired in PR #551 (see step 2).

### 2. Retire derived-id plumbing ✅ SHIPPED (PR #551)
Forward `a_b` derivation is gone: the message backend is d1-only, `saveContact`
no longer stores a derived id, the push deep-link flow resolves opaque ids, and
`deriveLegacyDirectConversationId` is deleted. One inert residual remains:
`resolveContactIdFromDirectConversationId` (reverse `a_b` → contact) is still
imported by `MainContent.tsx` as a best-effort fallback. It returns null for
opaque ids, so it is dead under d1; delete once the call-button callee path always
carries `remoteParticipantIds`. (Live message push already shipped in #536 via the
`ConversationChannel` DO — it is not a remaining step.)

## Minimal path to a stable, RTDB-free conversation core

The conversation/realtime spine (messages, files, calls, signaling) is the core.
Three slices take it fully off RTDB; each is independently shippable and is gated
on a backend-agnostic port so the RTDB adapter can be deleted, not just bypassed.
Slice B has shipped (#553); Slices A and C remain. Do them cheapest-first.

### Slice A — Delete the legacy RTDB signaling fallback (pure deletion)
DO signaling is the proven default. Remove `firebase-room-signaling.js`, the
`VITE_SIGNALING_BACKEND=rtdb` branch in `src/realtime/signaling/index.js`, the
`env.d.ts` flag, and `reference-examples/SimpleRoomExample.tsx` if it only demoed
the RTDB path. No new code; removes one RTDB consumer and one config fork.

### Slice B — Call-invite mailbox → Durable Object ✅ SHIPPED (PR #553)
Call invites now ride the per-user `UserMailbox` DO via
`src/realtime/mailbox-channel.ts`, consumed by `call-service.ts`; roomId is the
opaque `conversationId`. The old RTDB `users/{uid}/calls/*` mailbox is gone.
Residual dead code to delete: `src/features/call/model/call-rtdb-adapter.ts` and
`room-access-rtdb-adapter.ts` (plus their tests) — no non-test importers remain.
After Slice A this leaves only Slice C; media-playback-sync later reuses the same
mailbox pattern.

### Slice C — Conversation metadata → D1 (last persistence RTDB dep in the spine)
`createRTDBConversationRepository` (`ConversationNode`) is the only RTDB code left
behind the messaging `conversationRepository` port. Add a D1-backed client adapter
using the existing `backend/cloudflare/src/data` endpoints, swap it in
`messaging-runtime.ts`, and delete `adapters/rtdb.ts`. Fold in the two items that
were waiting on this migration:
the `group:`-prefix conversation-id rework (`schema.ts`) and rendering the
conversation list from `conversation_members` (ContactsList → ConversationList)
instead of ID-splitting.

**After A+B+C the core is stable:** messages, files, calls, signaling, presence-in-call,
and conversation metadata all hang off the opaque `conversationId` spine with no
RTDB. RTDB then remains only for the peripheral, explicitly-deferred concerns below.

## Deferred (peripheral — post-core, lowest priority)
- **Contacts + invites** (`contacts-rtdb-adapter.js`, `invites/invitations.js`),
  **user profile/directory** (`user-profile-rtdb-adapter.js`, `user-discovery.js`),
  and **global presence** (`presence-rtdb.js`) stay on RTDB. Migrate behind their
  existing storage seams when contacts moves to D1 (see the eager-DM note below).
- RTDB **prod-ops cleanup** (from the now-folded messages retirement): delete the
  `conversations/*` security rules covering `messages`/`members` and the stored
  message/member data after any backup. Old `a_b` history is intentionally not
  backfilled (decision #2).

## Cleanup
- Delete dead RTDB call adapters: `src/features/call/model/call-rtdb-adapter.ts`
  and `room-access-rtdb-adapter.ts` (+ tests) — superseded by the DO mailbox (#553).
- Archive/delete branches: `D1-R2-migration`, `codex/d1-conversation-core` (merged),
  plus stale `codex/*` experiment branches.
- Update `docs/WIP_Architecture/D1_R2_MIGRATION.md` to reflect what actually shipped
  (registry-first path, calls as first consumer) or fold it into a fresh doc.
- Post-cutover: retire the old `hangvidu-files` + `hangvidu-signaling` Workers after
  the seven-day window (see `BACKEND_CONSOLIDATION_RUNBOOK.md`).

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
