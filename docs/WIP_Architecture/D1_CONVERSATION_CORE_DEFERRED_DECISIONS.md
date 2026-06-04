# D1 Conversation Core — Deferred Decisions

Status: this slice only adds the D1 conversation registry. It does not route
production behavior through it yet.

## Locked for this slice

- `conversationId` is the future spine for conversations, files, calls,
  membership, and eventual message persistence.
- D1 owns the registry shape: `users`, `conversations`, and
  `conversation_members`.
- Direct conversations are resolved by an idempotent worker operation using
  `dm_key` for deduplication, while the public `conversationId` remains opaque.
- Firebase ID tokens are accepted only as the temporary identity seam so the
  worker can know the caller's `userId`.

## Deferred

- **Membership authorization source.** `workers/files` still authorizes through
  RTDB membership. Decide later when D1 membership becomes authoritative for
  R2 downloads/uploads and DO room access.
- **Message realtime contract.** Messages stay on RTDB. Before moving messages
  to D1, define the per-conversation DO push contract for message, read, and
  reaction updates.
- **Auth provider replacement.** Firebase Auth remains in place. BetterAuth,
  Clerk, and Cloudflare-aligned options need a dedicated auth session.
- **Call model.** The target direction is `conversationId` as the stable handle
  for starting and receiving calls, without changing lower-level `@kidlib/p2p`
  behavior until that slice is explicitly scoped.
- **Legacy derived IDs.** Production contacts and message metadata still use
  derived RTDB conversation IDs. Do not delete `resolveDirectConversationId`
  until the open/contact flow has moved to opaque D1 IDs.
