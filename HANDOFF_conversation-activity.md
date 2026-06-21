# Handoff: live conversation-list activity (reorder + unread)

Transient working doc for picking this up in a fresh session. Delete when the
feature lands.

## Goal

The contacts/conversation list reorders by most-recent message (MRU) and shows an
unread badge, in real time, without reload. Backend-agnostic at the seam.

## Status

- Branch `feat/conversation-activity-feed`, commit `a685b954` — working spike,
  verified "mostly works" in-browser via `pnpm dev:local` (two users, one DM).
- There are a few core issues to address before refining (below).

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

## Deliberate spike shortcuts to refine (all flagged in code comments)

- **Second mailbox socket** — `conversation-activity` opens its own mailbox WS,
  separate from `CallService`'s. Consolidate to one shared mailbox subscription.
- **Naming** — `call-mailbox` protocol now also carries message activity; rename to a
  general per-user event channel.
- **Boundaries** — `useContacts` and `ConversationPanel` (feature) import
  `stores/conversation-activity`. Re-decide boundaries in refine.
- **DM-only** — live path keys on `senderId == the participant` (true for DMs, all the
  list shows); groups unhandled.
- **Sender's own list** updates on seed refetch, not on their own send.
- **Server N+1** — two correlated subqueries per conversation in the seed; fold into a
  grouped join if the list grows.
- **Read-state** — per-device localStorage for now; cross-device is issue #563.

## Related (context, not to redo)

- PR #562 — draft; abandoned first cut (per-contact client fan-out, watched the wrong
  legacy composite id). Kept for reference only.
- PR #564 — merged; retired the vestigial `contact.conversationId` field.
- Issue #563 — cross-device read state (server `last_read_at`), folds in later.
