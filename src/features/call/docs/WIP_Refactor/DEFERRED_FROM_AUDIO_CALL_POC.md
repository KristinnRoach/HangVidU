# Deferred from Audio Call POC (PR #471)

Items raised in PR #471 review (Copilot + CodeRabbit) that were intentionally not addressed in the POC merge to keep the footprint minimal. Most are expected to be touched by the upcoming call-module refactor.

## Behavior / Correctness

- **Stop local video tracks during audio-only mode** — `@kidlib/p2p/tracks` `addLocalTracks` filters `getAudioTracks()` when `audioOnly` is true but does not call `track.stop()` / `removeTrack()` on existing video tracks. If a video stream is reused (`createLocalStream` reuses via `hasLocalStream()`), the camera capture continues even though no video is sent. Fix: stop and remove video tracks from the reused stream before adding to the peer connection.

- **Joiner mode drift** — `src/features/call/call-flow.js` `answerCall` reads `audioOnly` from its options bag and hands it straight to `new Peer({ audioOnly })`. The room record already carries `audioOnly` (fetched via `RoomService.checkRoomStatus` → `roomData.audioOnly`), so if an upstream caller forgets to thread the flag, the joiner can negotiate video while the initiator is audio-only. Fix: derive `effectiveAudioOnly = roomStatus.roomData?.audioOnly === true || audioOnly === true` and pass that into `Peer`.

## UI / Styling

- **CSS for the new audio-call button** — `.messages-topbar-audio-call` does not match the existing top-bar button styling, which targets `.messages-topbar-call` in `src/shared/styles/components/messages.css`. Layout/hover styling will diverge. Fix: add the new selector to the existing rules, or have the button reuse the same class.

## Tests

- **Audio-only branch coverage** — `src/setup/tests/setupMainAppBusListeners.test.js` only asserts the default `{ audioOnly: false }` branch when dispatching `cmd:call:outgoing:initiate`. Add a sibling test that emits the command with `audioOnly: true` and asserts `callContact(..., { audioOnly: true })`.
