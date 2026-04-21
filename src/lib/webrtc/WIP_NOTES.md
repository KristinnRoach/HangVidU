# `src/lib/webrtc/` — WIP Notes

Context for the next person (or future-you) picking up the extraction work.

---

## Where we are

- **PR [#491](https://github.com/KristinnRoach/HangVidU/pull/491)** (merged) — Phase 1: extracted webrtc primitives (sdp, ice, tracks, data-channel, rtt, config, logger) from `src/features/call/` into this dependency-free module. Signaling plugged via `IceTransport` / `DataSignalingChannel` contracts; Firebase adapters live in `src/features/call/signaling/`.
- **PR [#492](https://github.com/KristinnRoach/HangVidU/pull/492)** (merged) — Phase 1.5: added the `Peer` class on top of the primitives.
- **PR [#493](https://github.com/KristinnRoach/HangVidU/pull/493)** (open) — Phase 1.6: main-call `createCall` / `answerCall` rewritten on top of `Peer` + `createFirebaseCallSignaling`. `CallController.setupAnswerListener` deleted. Public API trimmed to `Peer`, `PEER_STATES`, `generateRoomId`, `setLogger`, `createDataChannel`, `joinDataChannel`, `closeDataConnection`.

## Next concrete step — Phase 1.7

Collapse the standalone `createDataChannel` / `joinDataChannel` entry points into `Peer({ dataChannel: true })`. Today `data-channel.js` duplicates ~90% of what `peer.js` already does (PC construction, ICE wiring, SDP exchange) just to return a data-only `{ pc, dataChannel }` pair. Requires:

1. Extend `Peer` to expose the `RTCDataChannel` once open (already partly in place via `PEER_STATES` + `dataChannel` option).
2. Rewrite `src/features/call/signaling/data-connection.js` to use `new Peer({ ..., dataChannel: true })` against `createFirebaseDataSignaling`.
3. Verify file-transfer end-to-end (send, receive, abort, reconnect) before deleting `data-channel.js`.
4. Drop the three data-channel exports from the public API; `Peer` becomes the sole entry point for any connection kind.

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
