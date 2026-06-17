# Slice B: Call-invite mailbox → Durable Object

Migrate the call-invite mailbox off Firebase RTDB to a per-user DO mailbox in the
**existing data worker**. Last RTDB dependency in the conversation/realtime spine
on the call side. Goal: minimal functional core first, manual e2e verify, then
decide refinements.

## Decisions (locked)

- **Per-user mailbox + fan-out.** DO keyed by `userId` (`getByName`). Each
  logged-in client keeps one WS to its own mailbox (receive-only). Caller
  delivers an invite envelope to each callee's mailbox; responses go to the
  caller's mailbox. Envelope carries `roomId` (= conversationId) as the room to
  join. Group-ready (write to N mailboxes); UI stays 1:1 for now.
- **Host in `workers/data`.** Reuses `auth.ts`, origin allowlist, D1 membership
  authz, deploy target. New DO class, existing worker.
- **Clean swap, no flag/shim.** Replace the RTDB transport outright (tiny user
  base, force-immediate SW). RTDB adapter files are left unwired for now so prod
  testing can compare/switch back quickly if the DO mailbox has issues.
- **Drop dead `room-access` RTDB write.** Only `call-service` referenced it; the
  DO signaling worker authorizes by token identity and never reads it.

## Wire model

Caller A → callee B in conversation C (roomId === conversationId):
1. A `POST /calls/invite {conversationId:C, calleeId:B, ...}` → B's mailbox `{t:'invite', invite:{roomId:C, callerId:A, ...}}`
2. A listens own mailbox for `{t:'response'}` filtered by `roomId===C`
3. B `POST /calls/response {conversationId:C, callerId:A, responseType}` → A's mailbox `{t:'response', response:{roomId:C, responseType, by:B}}`; B's mailbox receives `{t:'handled', roomId:C, by:B}` so B's other tabs/devices dismiss the invite
4. Cancel/timeout: A `POST /calls/cancel {conversationId:C, calleeId:B}` → B's mailbox `{t:'cancel', roomId:C, by:A}` → B dialog dismiss
Authz on every POST: authenticated sender AND the target user must both be D1
members of `conversationId`.

## Checklist — minimal core

- [x] `shared/call-mailbox/protocol.ts` — envelope union + `isMailboxEnvelope` guard (plain TS, no deps)
- [x] `workers/data/src/user-mailbox.ts` — `UserMailbox` DO (hibernatable WS, one pending invite with TTL replay, live `deliver(envelope)`)
- [x] `workers/data/src/index.ts` — Env binding, export, `GET /users/me/mailbox/ws`, `POST /calls/{invite,response,cancel}` with D1 authz
- [x] `workers/data/wrangler.jsonc` — `USER_MAILBOX` binding + migration `v2`
- [x] `src/realtime/mailbox-channel.ts` — WS transport to own mailbox (reconnect/backoff, bearer subprotocol; mirrors conversation-channel)
- [x] `src/features/call/call-service.ts` — rewrite onto mailbox (drop rtdb, roomAccess, CallRepository); ctor takes `{localUID, baseUrl, getToken}`
- [x] `src/features/call/call-handshake-controller.ts` — wire `{localUID, baseUrl, getToken}`; thread `callerId` into respond path
- [x] Pending-invite retention: replay on connect while caller is still ringing; clear on cancel/response/expiry
- [x] Cancel/handled correlation + worker cancel/retention/fan-out tests
- [x] `tsc` (app + worker) + boundaries lint clean; data-worker `wrangler deploy --dry-run` builds with both DO bindings + migration v2; updated singleton test passes
- [ ] **Manual e2e**: two accounts, app open both sides — invite, accept→join, decline, busy, cancel, timeout

## Refinements to weigh AFTER manual verify (do not pre-build)

- Delete unwired RTDB files: `call-rtdb-adapter.ts`, `room-access-rtdb-adapter.ts`,
  `call-repository.ts` (+ tests).
- Group-call handshake UI (N responses). Mailbox already retains one pending invite
  per room (per-key `invite:<roomId>` storage), so multiple concurrent incoming
  calls already replay on reconnect; this item is UI only.
- Retain call responses across a caller reconnect (the "lost accept" gap) —
  consumed-once with an ack endpoint. Scoped in
  [FOLLOWUP_CALL_RESPONSE_RETENTION.md](./FOLLOWUP_CALL_RESPONSE_RETENTION.md).
- `ALLOWED_ORIGINS` already shared across workers — no new origin needed.
