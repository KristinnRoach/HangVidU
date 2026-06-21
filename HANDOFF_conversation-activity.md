# Handoff: live conversation-list activity (reorder + unread)

Transient working doc for picking this up in a fresh session. Delete when the
feature lands.

## Goal

The contacts/conversation list reorders by most-recent message (MRU) and shows an
unread badge, in real time, without reload. Backend-agnostic at the seam.

## Status

- Branch `feat/conversation-activity-feed` — spike verified in-browser via
  `pnpm dev:local` (two users, one DM). Both deploy-blockers now cleared
  (single socket + sender's own send); additive wire changes, safe to merge.
- Remaining items are deferred refinements (below), not blockers.

## Approach (decided — do not relitigate)

Per-user **push** by reusing the existing `UserMailbox` Durable Object.

- NOT a new per-user DO, NOT one socket per conversation, NOT fetch-on-focus-only.
- Contact-driven list, conversations stay **lazy**, joined by **participant uid**.
  (NOT conversation-driven/eager; NOT doing the contacts→D1 migration first.)

## How it works (the seam)

- **Push:** on message store, `backend/cloudflare/src/data/handlers.ts` fans out an
  `activity` mailbox envelope to every _other_ member. The DO's `deliver()` already
  broadcasts non-persisted envelopes, so no DO change. Envelope defined in
  `shared/call-mailbox/protocol.ts` (`{ t:'activity', conversationId, senderId, sentAt }`).
- **Seed (first paint):** `GET /conversations` (`repo.ts listConversations`) now
  returns `latest_sent_at` / `latest_sender_id` for correct initial order + unread.
- **Client seam:** `src/stores/conversation-activity.ts` — seeds via `GET /conversations`
  - subscribes to the mailbox → reactive `Map<participantUid, activity>`;
    localStorage read-state. `useContacts` consumes it; `ConversationPanel` calls
    `markConversationRead` on open.

## Verify

`pnpm dev:local` (local worker, `APP_ENV=development` allows localhost — avoids the
prod-worker 403 trap). Two users sharing a DM; send from one, watch the other's list
reorder + badge live with no conversation open.

## Resolved (deploy-blockers cleared)

- **Single mailbox socket** — `src/realtime/user-mailbox.ts` is a uid-keyed
  singleton over `createMailboxChannel`; both `CallService` and
  `conversation-activity` subscribe through it. No second per-user WS.
- **Sender's own send** — `recordConversationActivity` bumps the open
  conversation's row from the `watchRecentMessages` callback (DM-only, keyed on
  the peer uid), so the sender's list reorders without a refetch.

## Deliberate spike shortcuts to refine (all flagged in code comments)

- **Naming** — `call-mailbox` protocol now also carries message activity; rename to a
  general per-user event channel (the client `user-mailbox` keeps the `mailbox`
  term until that pass).
- **Boundaries** — `useContacts` and `ConversationPanel` (feature) import
  `stores/conversation-activity`. Re-decide boundaries in refine.
- **DM-only** — live path keys on `senderId == the participant` (true for DMs, all the
  list shows); groups unhandled.
- **Activity after logout/user-switch** — `closeUserMailbox` drops handlers and
  `startConversationActivity` is latched, so activity stops until reload. Dominant
  flow reloads on auth change; fix when in-place user-switch matters.
- **Server N+1** — two correlated subqueries per conversation in the seed; fold into a
  grouped join if the list grows.
- **Read-state** — per-device localStorage for now; cross-device is issue #563.

## Related (context, not to redo)

- PR #562 — draft; abandoned first cut (per-contact client fan-out, watched the wrong
  legacy composite id). Kept for reference only.
- PR #564 — merged; retired the vestigial `contact.conversationId` field.
- Issue #563 — cross-device read state (server `last_read_at`), folds in later.
