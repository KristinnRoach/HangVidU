# Deferred from Audio Call POC (PR #471)

Items raised in PR #471 review (Copilot + CodeRabbit) that were intentionally not addressed in the POC merge to keep the footprint minimal. Most are expected to be touched by the upcoming call-module refactor.

## Behavior / Correctness

- **Stop local video tracks during audio-only mode** — `src/features/call/webrtc-utils.js:76` `addLocalTracks` currently filters `getAudioTracks()` when `audioOnly` is true, but does not call `track.stop()` / `removeTrack()` on existing video tracks. If a video stream is reused (`createLocalStream` reuses via `hasLocalStream()`), the camera capture continues even though no video is sent. Fix: stop and remove video tracks from the reused stream before adding to the peer connection.

- **Joiner mode drift** — `src/features/call/call-flow.js:171` `answerCall` reads the `audioOnly` flag from its options bag, not from the room state it already fetches at line 209. If an upstream caller forgets to thread the flag, joiner can negotiate video while initiator is audio-only. Fix: derive an `effectiveAudioOnly = roomData.audioOnly === true || audioOnly === true` after `getRoomData` and use it for `addLocalTracks`.

## UI / Styling

- **CSS for the new audio-call button** — `.messages-topbar-audio-call` does not match the existing top-bar button styling, which targets `.messages-topbar-call` in `src/shared/styles/components/messages.css`. Layout/hover styling will diverge. Fix: add the new selector to the existing rules, or have the button reuse the same class.

## Tests

- **Audio-only branch coverage** — `src/setup/tests/setupMainAppBusListeners.test.js` only asserts the default `{ audioOnly: false }` branch when dispatching `cmd:call:outgoing:initiate`. Add a sibling test that emits the command with `audioOnly: true` and asserts `callContact(..., { audioOnly: true })`.
