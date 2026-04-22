# Deferred Call Module Issues

These issues are intentionally deferred from PR #488 because they belong to the
broader `src/features/call/` refactor, not the minimal Solid dialog migration.

## Incoming Call Flow

- `src/features/call/room-listeners.js` still owns the real incoming-call
  decision flow via an ad hoc `new Promise(...)` wrapper around dialog-bus
  callbacks and RTDB listeners.
- During the refactor, move incoming-call visibility and dismiss/update state
  into a small Solid-owned store or controller, and keep async call orchestration
  in the workflow layer rather than `room-listeners.js`.

## Outgoing Call Flow

- `src/features/call/outgoing-call-session.js` still mixes dialog entry points
  with non-UI behavior:
  - timeout ownership
  - ringtone lifecycle
  - RTDB outgoing-call state writes/clears
  - fallback room cancellation / leave-room cleanup
  - diagnostic lifecycle logging
- During the refactor, split these concerns so the Solid dialog stays dumb and a
  separate call workflow/controller owns side effects and timing.

## Dialog Host Shape

- `src/components/DialogProvider.jsx` now owns dialog rendering and command
  handlers for call dialogs.
- Revisit whether call dialogs should stay inside the shared dialog provider or
  move to a dedicated call-ui state module once the call feature is untangled.

## Offer-write timing race (Phase 1.6 regression)

**Flagged:** 2026-04-22
**Severity:** Was breaking incoming call detection; currently mitigated joiner-side.

### Symptom
Before Phase 1.6, `RoomService.createNewRoom(offer, ...)` wrote the offer, metadata,
and the initiator-as-member in a single atomic `set()`. After Phase 1.6,
`createRoomMetadata` writes only metadata + members atomically; the offer is
written asynchronously later by `Peer` via `signaling.sendOffer`. This means the
joiner's `onMemberJoined` listener can fire before the offer reaches RTDB, and
the preconditions check bails with `skipReason: 'missing_offer'`.

### Current mitigation (option A — landed 2026-04-22)
`evaluateIncomingCallPreconditions` in `room-listeners.js` now subscribes to
`rooms/{roomId}/offer` for up to 5 s when `!hasOffer && !hasAnswer`. If the
offer arrives within the window, the joiner proceeds; otherwise it skips as
before. Joiner-side only — zero blast radius.

### Proper fix (option B — deferred)
Restore the pre-Phase 1.6 order so the initiator doesn't appear as a member
until the offer is in RTDB:

1. `createRoomAtomically` writes metadata only (no `members`). The atomic
   transaction still guards against concurrent room creation.
2. `createCall` in `call-flow.js` calls `RoomService.joinRoom(roomId, userId)`
   after `peer.start()` resolves (offer write has completed).

**Why it's not landing yet:** concurrent-create recovery (`joinOrCreateRoomWithId` →
`answerExistingRoom`) relies on the losing initiator seeing `hasMembers: true`
immediately after the winner's atomic commit. If members are no longer part of
the atomic write, the loser's `answerCall → checkRoomStatus` can hit
`hasMembers: false` while the winner is still between `createRoomMetadata` and
`joinRoom`. Fixing that cleanly means adding a wait/retry on `hasMembers` inside
`answerCall` (or `answerExistingRoom`), which also needs the joiner-side retry
in `joinOrCreateRoomWithId` factored out and shared. Out of scope for the
WebRTC-extraction cleanup.

### When to fix
When `room.js` / `call-flow.js` get touched for the next signaling refactor —
do B and then remove the option-A mitigation. Update `room-creation.test.js`
to drop the `members` expectation from the atomic transaction.
