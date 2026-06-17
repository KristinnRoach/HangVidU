# Follow-up: retain call responses across a caller reconnect

**Status:** deferred from the call-invite mailbox slice ([SLICE_B_CALL_INVITE_MAILBOX.md](./SLICE_B_CALL_INVITE_MAILBOX.md)). Not started.

## Intent

Close the one asymmetric gap in the DO mailbox model: **invites are retained and
replayed on reconnect, responses are not.**

Scenario (the "lost accept"): caller A is ringing callee B. A's mailbox WebSocket
briefly drops (network blip, tab throttle) in the ~30s ring window. B taps accept;
the worker delivers `{t:'response', responseType:'accepted'}` to A's mailbox — but
A has no live socket and the response is fan-out-only, so it is dropped. A never
learns of the accept, times out at 30s; B joins the room and sits alone.

Today this degrades safely (it is **not** stuck): B detects it is alone via
`onMemberLeft` (`memberCount === 1`) and auto-exits, A shows "no answer". The
follow-up upgrades that to "A actually joins."

## Why this was deferred (read before implementing)

You cannot just mirror invite retention. An invite is a *standing offer* — replaying
it re-shows a dialog, which is idempotent and harmless. A retained `accepted`
response is an *action trigger* — replaying it makes A **join the room**. If a
stored accept replays after A already acted (joined, the call ended, A reconnects
while the response is still within TTL), A phantom-rejoins a dead room.

This is the exact bug class fixed earlier (commit `9a26876a` "Fix call resume
playback and signaling races"; the call-invite-wedge phantom-join note). So the
response must be **consumed-once**, not merely TTL-bounded.

## Chosen approach: consumed-once retention with an ack

1. On `POST /calls/response`, in addition to delivering to A's mailbox, **store** the
   response in A's mailbox DO keyed by `roomId` (same per-key prefix style as
   invites — see "store per-key" in `user-mailbox.ts`). Only worth storing
   `accepted` (the action-bearing type); `rejected`/`busy` can stay transient since
   losing them only delays A's dialog dismiss until the 30s timeout, which is
   harmless.
2. On mailbox connect, replay fresh stored responses just like invites (in
   `UserMailbox.fetch`).
3. Add `POST /calls/response/ack { conversationId }`. The client calls it from
   `onCalleeResponse` **after** it has acted on the response (joined or moved on).
   The worker calls a new `UserMailbox.clearPendingResponse(roomId)` on the
   **caller's own** mailbox. TTL (`CALLING_TTL_MS`) is only a backstop; the ack is
   the real clear, which is what prevents the phantom re-join.

Edge to handle: A reconnects, replays `accepted`, joins — then the ack must fire so
a *second* reconnect does not replay-and-rejoin. Keep the ack on the success path of
`onCalleeResponse`, mirroring how invites are cleared on cancel/response.

## Files to read for full context

Server (Cloudflare data worker):
- `workers/data/src/user-mailbox.ts` — the DO. Mirror the per-key invite storage
  (`PENDING_INVITE_PREFIX`, `inviteKey`, `getFreshPendingInvites`, `clearPendingInvite`)
  for responses. Add `storePendingResponse` / `getFreshPendingResponses` /
  `clearPendingResponse`. `deliver()` is where invite store/clear already hooks in.
- `workers/data/src/index.ts` — routes. See `POST /calls/response` (stores + delivers;
  already clears the responder's own pending *invite*) and `POST /calls/cancel`. Add
  the `POST /calls/response/ack` route with the same D1-membership authz pattern.
- `shared/call-mailbox/protocol.ts` — the `MailboxResponse` / `MailboxEnvelope` union
  and `isMailboxEnvelope` guard. Responses already carry `expiresAt`; no shape change
  needed unless you add an ack envelope (you don't — ack is REST-only, no DO→client
  message).
- `shared/constants/index.ts` — `CALLING_TTL_MS` (TTL backstop).

Client:
- `src/features/call/call-service.ts` — `onCalleeResponse` (where A consumes the
  response; add the ack call here) and the `post()` helper. Add an
  `ackCallResponse({ roomId })` method calling `POST /calls/response/ack`.
- `src/features/call/call-handshake-controller.ts` — `sendOutgoingCallInvite`'s
  `svc.onCalleeResponse(...)` handler (lines ~189-216): the accept path calls
  `enterRoom`; the ack should fire once that resolves (and on the non-accept paths
  too, so the stored accept — if any — is cleared).

Tests:
- `workers/data/test/worker.test.ts` — `describe('call invite retention')` is the
  pattern to copy. Add a `call response retention` block: store-accept →
  reconnect-replays; ack → no replay; expiry → no replay. Helpers `connectMailbox`,
  `nextOrNoMessage`, `NO_MESSAGE`, `jsonPost` are reusable as-is.

## Checklist (when picked up)

- [ ] DO: per-key response store + replay + `clearPendingResponse` (accepted only)
- [ ] Worker: `POST /calls/response` stores the accept; new `POST /calls/response/ack`
- [ ] Client: `ackCallResponse`; call it from the controller's response handler on all paths
- [ ] Tests: response-retention replay / ack-clears / expiry-clears
- [ ] Manual e2e: kill caller WS mid-ring, accept on callee, confirm caller joins on reconnect; then confirm a later reconnect does NOT rejoin
