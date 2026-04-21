# Call E2E Flow Trace

Reference snapshot of the current call code path, captured while threading the `audioOnly` flag end-to-end. Intended as input to the upcoming refactor that simplifies/decouples this trace via the planned `src/events/` shared API (today located at `src/shared/events/`).

Both paths are listed in execution order. Each step links a function with its file and the line where the function definition starts.

---

## A. Initiator Path (outgoing call)

User taps the call button in the message top bar. The flow ends with the initiator waiting for an SDP answer.

1. **Click handler — `setCallHandler` / `setAudioCallHandler`** — `src/features/messaging/components/messages-ui.js:177`
   Builds the call payload from the current conversation state and dispatches `cmd:call:outgoing:initiate` on the app bus (audio button adds `audioOnly: true`).

2. **`handleCommand('cmd:call:outgoing:initiate')`** — `src/setup/setupMainAppBusListeners.js:152`
   Resolves the contact nickname, optionally selects the conversation in messaging controller, then forwards to `callContact(contactId, name, roomId, { audioOnly })`.

3. **`callContact(contactId, contactNickName, roomId, { audioOnly })`** — `src/features/call/WIP-start-call-refactor.js:153`
   Computes a deterministic room id when none is provided, lazy-imports the calling UI bundle, attaches an incoming listener for the room, then calls `joinOrCreateRoomWithId(roomId, { forceInitiator: true, audioOnly })`.

4. **`listenForIncomingOnRoom(roomId)`** — `src/features/call/room-listeners.js:458`
   Attaches RTDB listeners for member joins, cancellations, and member leaves on the room (used here to receive the joiner's eventual response).

5. **`joinOrCreateRoomWithId(roomId, { forceInitiator, audioOnly })`** — `src/features/call/WIP-start-call-refactor.js:58`
   Initializes local media, then (because `forceInitiator` is true) skips the room-status probe and goes straight to creating the call.

6. **`initLocalStreamAndMedia({ audioOnly })`** — `src/shared/media/WIP-init-local-media.js:19`
   Idempotent setup of the local media stream and media-control buttons; passes `audioOnly` down to `setUpLocalStream`.

7. **`setUpLocalStream(localVideoEl, { audioOnly })`** — `src/shared/media/stream.js:65`
   Acquires the local stream and (for video calls) wires a video-only preview into the local video element. Skips the preview wiring entirely when `audioOnly` is true.

8. **`createLocalStream({ audioOnly })`** — `src/shared/media/stream.js:26`
   Calls `getUserMedia` with `{ video: false, audio }` when `audioOnly`, otherwise both. Reuses an existing stream if one is already set.

9. **`getCallOptions(roomId, { audioOnly })`** — `src/features/call/WIP-start-call-refactor.js:28`
   Bundles the local stream + UI element refs + helpers (`setupRemoteStream`, `setupWatchSync`) + `audioOnly` into the options object passed to `CallController.createCall`.

10. **`CallController.createCall(options)`** — `src/features/call/call-controller.js:392`
    Thin wrapper that delegates to `createCallFlow` and emits lifecycle events on success/failure.

11. **`createCall({ ..., audioOnly })`** — `src/features/call/call-flow.js:48`
    Writes room metadata, constructs the `Peer` (initiator role), wires the `error` listener before `start()` so the synchronous `tracks` error is caught, then `await`s the start. Remote stream + connection-state handlers are attached immediately after `start()` using `peer.pc` (the RTCPeerConnection is created synchronously inside `Peer._initPc`).

12. **`RoomService.createRoomMetadata(userId, roomId, { audioOnly })`** — `src/features/call/room.js:77`
    Writes `{ createdAt, createdBy, audioOnly }` to `rooms/{roomId}` and joins the creator as a member. The offer SDP is written separately by the signaling adapter.

13. **`new Peer({ role: 'initiator', signaling, localStream, audioOnly })` + `peer.start()`** — `src/lib/webrtc/peer.js`
    Creates the `RTCPeerConnection`, adds local tracks (audio-only filters in `addLocalTracks`), attaches ICE candidate handling, generates the SDP offer, and dispatches it through the injected `SignalingChannel`.

14. **`createFirebaseCallSignaling(roomId, 'initiator').sendOffer(offer)`** — `src/features/call/signaling/firebase-call-signaling.js`
    Writes the offer SDP to `rooms/{roomId}/offer` in RTDB. The joiner reads this via the same adapter's `onOffer` listener.

15. **Initiator-side post-success — `callContact`** — `src/features/call/WIP-start-call-refactor.js:153`
    After `joinOrCreateRoomWithId` resolves true, updates `lastInteractionAt` on the contact, shows the outgoing call UI (with cancel/timeout handlers), and fires `getPushNotifications().sendIncomingCall(...)` so the joiner receives an OS-level call notification.

---

## B. Joiner Path (incoming call)

The joiner has previously called `listenForIncomingOnRoom(roomId)` (either from a saved-contact bootstrap or from receiving a push notification). When the initiator joins the room, the member-join listener fires.

1. **`listenForIncomingOnRoom(roomId)`** — `src/features/call/room-listeners.js:458`
   Already attached. Internally registers `RoomService.onMemberJoined(roomId, ...)` whose async callback drives the rest of the joiner flow.

2. **`onMemberJoined` callback** — inside `listenForIncomingOnRoom` at `src/features/call/room-listeners.js:498`
   Filters out self-joins, then runs preconditions, decides notification strategy, plays ringtone, shows the incoming-call UI, and awaits the user's accept/reject.

3. **`evaluateIncomingCallPreconditions({ roomId, joinedContactId, currentUserId, memberData })`** — `src/features/call/room-listeners.js:103`
   Checks call freshness (`joinedAt` and `roomCreatedAt`), reads room data via `RoomService.getRoomData`, ensures `offer` exists and is not yet answered, and reports back `{ canProceed, freshnessResult, audioOnly: !!roomData.audioOnly }`.

4. **`decideIncomingNotificationStrategy(...)`** — `src/features/call/room-listeners.js:280`
   Chooses whether the in-app UI continues alongside a background push notification.

5. **`ringtoneManager.playIncoming()` + `callIndicators.startCallIndicators(callerName)`** — invoked from `room-listeners.js:564`
   Audible + visual ringing.

6. **Dialog command bridge inside `listenForIncomingOnRoom(...)`** — `src/features/call/room-listeners.js`
   Dispatches `cmd:dialog:incoming-call:open`, wires accept/reject callbacks, and resolves the pending promise based on user input or external events (`onCallCancelled`, `onAnswerAdded`).

7. **`handleIncomingCallAccepted({ roomId, joinedContactId, audioOnly })`** — `src/features/call/room-listeners.js:309`
   Publishes `evt:call:incoming:accepted`, removes the room's incoming listeners, dismisses push notifications, updates contact `lastInteractionAt`, then calls `joinOrCreateRoomWithId(roomId, { audioOnly })`.

8. **`joinOrCreateRoomWithId(roomId, { audioOnly })`** — `src/features/call/WIP-start-call-refactor.js:58`
   With no `forceInitiator`, runs `RoomService.checkRoomStatus`, sees the room exists with members (the initiator), and chooses the answer branch.

9. **`initLocalStreamAndMedia({ audioOnly })`** — `src/shared/media/WIP-init-local-media.js:19`
   Same media bootstrap as the initiator path. `audioOnly` propagates to `setUpLocalStream` → `createLocalStream` so the joiner only requests microphone permission when joining an audio-only call.

10. **`getCallOptions(null, { audioOnly })`** — `src/features/call/WIP-start-call-refactor.js:28`
    Bundles the same options for the answer branch.

11. **`CallController.answerCall({ roomId, ...callOptions })`** — `src/features/call/call-controller.js:487`
    Wrapper that delegates to `answerCallFlow` and emits lifecycle events.

12. **`answerCall({ roomId, ..., audioOnly })`** — `src/features/call/call-flow.js:150`
    Re-validates the room via `RoomService.checkRoomStatus`, constructs the joiner `Peer`, attaches the `error` listener, and `await`s `start()`. Remote stream + connection-state handlers are attached against `peer.pc` immediately after `start()`.

13. **`new Peer({ role: 'joiner', signaling, localStream, audioOnly })` + `peer.start()`** — `src/lib/webrtc/peer.js`
    The injected signaling adapter's `onOffer` fires immediately (the offer already lives in RTDB from the initiator). `Peer` sets the remote description, adds local tracks (audio-only filters in `addLocalTracks`), creates the answer, and dispatches it via `sendAnswer`.

14. **`createFirebaseCallSignaling(roomId, 'joiner').sendAnswer(answer)`** — `src/features/call/signaling/firebase-call-signaling.js`
    Writes the answer SDP to `rooms/{roomId}/answer`. The initiator's `Peer` applies it via the same adapter's `onAnswer` listener (no more `CallController.setupAnswerListener`).

15. **`RoomService.joinRoom(roomId, userId)`** — `src/features/call/room.js`
    Adds the joiner to `rooms/{roomId}/members` with `joinedAt`, which the initiator's `onMemberJoined` listener uses to start the active call setup.

---

## Footnotes — Refactor Hooks

These are observations made while threading `audioOnly`. They are pre-decisional — flag for discussion before acting.

1. **Two parallel orchestrators.** `src/features/call/call-flow.js:251` exports its own `joinOrCreateRoom` while `src/features/call/WIP-start-call-refactor.js:58` exports `joinOrCreateRoomWithId`. They overlap. Consolidating to one entry point (and renaming the WIP file) would remove a class of "which path is canonical?" questions.

2. **Options-bag drift.** `getCallOptions` (`WIP-start-call-refactor.js:28`) and the `createCall` / `answerCall` parameter lists (`call-flow.js:48`, `call-flow.js:150`) duplicate the same shape. Threading `audioOnly` required edits in 4 call sites just to forward one flag. A single typed `CallOptions` object passed through unchanged would collapse this.

3. **Receiver mode discovery is implicit.** The joiner only learns `audioOnly` by reading `rooms/{roomId}` *after* the member-join listener fires, inside `evaluateIncomingCallPreconditions` (`room-listeners.js:103`). For push-initiated cold starts the push payload could also carry `audioOnly`, so the OS notification can label "Audio call" vs "Video call" before any RTDB read.

4. **`callContact` does too much.** `src/features/call/WIP-start-call-refactor.js:153` orchestrates: room id derivation, listener attach, media init, peer connection, contact bookkeeping, calling UI, and push notification. Each of these is a candidate `cmd:` / `evt:` boundary in the `src/events/` API — splitting them would shrink the trace dramatically.

5. **Circular import noted by existing TODO.** `room-listeners.js` ↔ `WIP-start-call-refactor.js`. Routing `joinOrCreateRoomWithId` invocations through the app bus (e.g. `cmd:call:join-or-create`) would break this without a runtime change.

6. **Local stream reuse semantics.** `createLocalStream` (`stream.js:26`) reuses an existing stream regardless of mode. An audio-only call that follows a video call inherits the video-bearing stream; the audio-only behavior is preserved only because `addLocalTracks` in `src/lib/webrtc/tracks.js` filters tracks. A clearer model: track-set reconciliation per call mode at the media layer, so downstream code never has to know about it.

7. **UI is unchanged for audio-only.** The video panes still mount with empty video tracks. Acceptable for the MVP; the proper solution (avatar + audio-only top bar) belongs to the call-UI refactor.
