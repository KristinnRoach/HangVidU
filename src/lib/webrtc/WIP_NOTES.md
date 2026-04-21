# `src/lib/webrtc/` — WIP Notes

Context for the next person (or future-you) picking up the extraction work.

---

## Where we are

- **PR [#491](https://github.com/KristinnRoach/HangVidU/pull/491)** (merged) — Phase 1: extracted webrtc primitives (sdp, ice, tracks, data-channel, rtt, config, logger) from `src/features/call/` into this dependency-free module. Signaling plugged via `IceTransport` / `DataSignalingChannel` contracts; Firebase adapters live in `src/features/call/signaling/`.
- **PR [#492](https://github.com/KristinnRoach/HangVidU/pull/492)** (open) — Phase 1.5: added the `Peer` class. **Not yet wired into `call-controller`/`call-flow`.**

## Next concrete step — Phase 1.6

Refactor `src/features/call/call-flow.js` and `src/features/call/call-controller.js` to use the `Peer` class. Expect meaningful LoC reduction in the controller: the `createCall`/`answerCall` paths currently hand-roll PC construction + `setupIceCandidates` + SDP + track plumbing that the `Peer` class now encapsulates.

Suggested order:
1. Build a thin Firebase adapter that satisfies the full `SignalingChannel` contract for the *main call* (offer/answer/ice on `offer`/`answer`/`offerCandidates`/`answerCandidates` buckets). The existing `createFirebaseIceTransport` covers the ICE half.
2. Swap `createCall` over to `new Peer({ role: 'initiator', signaling, localStream })` and wire its events to what the controller currently emits (`evt:call:session:*`). Keep the call-flow return shape unchanged.
3. Do the same for `answerCall`.
4. Delete the now-dead hand-rolled PC setup.
5. If the single-purpose `createDataChannel`/`joinDataChannel` helpers become redundant against `Peer({ dataChannel: true })`, collapse them — but verify file-transfer flows still work end-to-end first.

## Design decisions worth preserving

- **`Peer` extends native `EventTarget`** (not the project's `EventEmitter` class) so `lib/webrtc` stays zero-deps and publishable. `on`/`off`/`once` are sugar on top of `addEventListener`.
- **Pluggable logger** (`setLogger`) — the lib must be silent by default. `data-channel.js` still has `console.warn` in two catch blocks and `console.error` in `closeDataConnection`; these are acceptable for internal use but should route through `log` before external publishing.
- **Input validation scope** — `tracks.js` now has boundary-style `TypeError` checks because we expect this lib to become an independent package. Other primitives (`sdp`, `ice`) don't yet; add them if/when we publish.

## Phase 2 (external package) — open questions

Before publishing to npm:
- Resolve `DEFERRED_ISSUES.md`.
- Decide: bundle signaling adapters (Firebase) as an optional subpath export, or keep them as separate packages? Current structure (adapters in `src/features/call/signaling/`) already treats them as separate.
- Add input validation to remaining primitives consistent with `tracks.js`.
- Publish `Peer` as the primary entry point, with sdp/ice/tracks helpers available for power users who want to orchestrate manually.
- TypeScript types — currently JSDoc-typed. Probably worth an actual `.d.ts` pass before publishing.
