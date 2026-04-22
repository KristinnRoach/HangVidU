# @kidlib/p2p Consolidation Opportunities

This artifact describes candidate improvements for `@kidlib/p2p` from the perspective of a package maintainer who does not know the consuming application.

The goal is to make the package a more user-friendly WebRTC session API without turning it into an application framework. The package should continue to be signaling-agnostic, UI-agnostic, and storage-provider-agnostic.

## Current Package Shape

The package already owns low-level WebRTC primitives:

- `Peer`
- SDP offer/answer creation and remote-description handling
- ICE candidate setup and candidate queue draining
- media-track attachment to `RTCPeerConnection`
- data-channel setup
- RTT helpers
- configurable logging
- signaling interface typedefs/contracts

This is a good foundation. The main opportunity is to add a higher-level session layer so consumers do not need to manually compose the same primitives every time.

## Design Principles

Keep the core package:

- **signaling-agnostic**: consumers bring `sendOffer`, `onOffer`, `sendAnswer`, `onAnswer`, `sendCandidate`, and `onRemoteCandidate`.
- **UI-agnostic**: no DOM mutation, no toast/dialog behavior, no video element styling.
- **storage-agnostic**: no Firebase, Supabase, WebSocket server, or app database dependency in the core package.
- **framework-agnostic**: no Solid, React, Vue, or app event bus dependency.
- **session-focused**: expose a friendly API for WebRTC lifecycle, remote media, data channels, and connection health.

If provider-specific code is useful, prefer a separate adapter package such as `@kidlib/p2p-firebase` instead of adding Firebase to core.

## High-Value Additions

### 1. Media Session Factory

Consumers currently need to know the correct sequence:

1. construct `Peer`
2. wire error handlers before `start()`
3. call `start()`
4. immediately access `peer.pc`
5. attach remote track handling
6. await the start promise
7. react to lifecycle events

That sequence is easy to get subtly wrong. The package could provide a single media-session API that owns the ordering.

Proposed API:

```js
import { createMediaSession } from '@kidlib/p2p';

const session = createMediaSession({
  role: 'initiator',
  signaling,
  localStream,
  audioOnly: false,
  rtcConfig,
  onRemoteStream({ stream, track, event }) {},
  onTrackError({ error, phase }) {},
});

await session.start();
```

Returned object:

```js
{
  role,
  peer,
  pc,
  state,
  remoteStream,
  start(),
  close(),
  on(type, callback),
  off(type, callback),
  once(type, callback),
}
```

Events:

- `remoteStream`
- `remoteTrack`
- `connected`
- `reconnecting`
- `connectionLost`
- `failed`
- `closed`
- `error`

This should be additive. Keep `Peer` available for advanced users.

### 2. Remote Stream Assembly Helper

Remote media assembly is generic WebRTC work and belongs well in the package. Consumers should not need to repeat `pc.ontrack` stream aggregation and fallback logic.

Proposed API:

```js
import { attachRemoteStream } from '@kidlib/p2p';

const detach = attachRemoteStream(peerOrPc, {
  onStream({ stream, track, event }) {},
  onTrack({ track, stream, event }) {},
});
```

Responsibilities:

- listen for `track` events
- prefer `event.streams[0]` when available
- create a fallback `MediaStream` when no stream is provided
- add later tracks to the current stream
- emit/update when the remote stream changes
- return a cleanup function

Out of scope:

- assigning `video.srcObject`
- changing CSS
- muting media elements
- showing UI state

### 3. Connection Health Monitor

Connection lifecycle policy is often duplicated by WebRTC consumers. The package can provide a reusable monitor over `Peer`/`RTCPeerConnection`.

Proposed API:

```js
import { monitorConnection } from '@kidlib/p2p';

const stopMonitoring = monitorConnection(peer, {
  disconnectGraceMs: 3000,
  restartIceOnFailure: true,
  onConnected() {},
  onReconnecting({ reason }) {},
  onConnectionLost({ reason }) {},
  onFailed({ reason }) {},
});
```

Responsibilities:

- normalize `connected`, `disconnected`, `failed`, and `closed`
- support a configurable grace period for transient disconnects
- optionally call `pc.restartIce()` on ICE failure
- guard callbacks after cleanup
- return a cleanup function

Out of scope:

- deleting rooms
- clearing URLs
- showing call UI
- deciding whether to retry at an application level

### 4. Unified Data Session API

The package currently exposes separate data-channel creation and join helpers. A friendlier API could hide initiator/joiner branching.

Proposed API:

```js
import { createDataSession } from '@kidlib/p2p';

const dataSession = await createDataSession({
  role: 'initiator',
  signaling,
  label: 'data',
  rtcConfig,
});

dataSession.channel.send('hello');
```

Returned object:

```js
{
  role,
  pc,
  channel,
  readyState,
  send(data),
  close(),
  waitUntilOpen(),
  on(type, callback),
}
```

This should wrap the existing `createDataChannel` and `joinDataChannel` primitives rather than replacing them.

### 5. DataChannel Transport and Backpressure Utility

Many applications need a safe wrapper around `RTCDataChannel` that handles readiness, message subscription, cleanup, and buffered amount backpressure.

Proposed API:

```js
import { createDataChannelTransport } from '@kidlib/p2p';

const transport = createDataChannelTransport(channel, {
  backpressureThreshold: 1_000_000,
  messageFilter(data) {
    return true;
  },
});

transport.onMessage((data) => {});
transport.send(data);
await transport.waitForDrain();
transport.close();
```

Responsibilities:

- expose `send`, `onMessage`, `isReady`, `waitForDrain`, and `close`
- use `bufferedAmountLowThreshold` when available
- fall back to polling when needed
- clean up event handlers reliably
- support optional message filtering

Out of scope:

- file metadata protocol
- chunking files
- OPFS or filesystem persistence
- progress UI

### 6. Signaling Contract Validator and Adapter Factory

The package should stay signaling-provider agnostic, but it can make provider integration easier by validating and normalizing user-supplied signaling objects.

Proposed API:

```js
import { createSignalingChannel } from '@kidlib/p2p';

const signaling = createSignalingChannel({
  sendOffer: async (offer) => {},
  sendAnswer: async (answer) => {},
  onOffer: (callback) => unsubscribe,
  onAnswer: (callback) => unsubscribe,
  sendCandidate: async (candidate) => {},
  onRemoteCandidate: (callback) => unsubscribe,
});
```

Responsibilities:

- validate required methods
- normalize unsubscribe return values
- provide clear error messages
- optionally expose `close()` to release listeners

Out of scope for core:

- Firebase imports
- WebSocket client implementation
- database path conventions
- room membership

Provider-specific adapters can live in separate packages:

```js
import { createFirebaseSignaling } from '@kidlib/p2p-firebase';
```

## Lower-Priority Enhancements

### Track Health Events

The package already detects track issues in lower-level helpers. A session layer could standardize event names and payloads:

```js
session.on('trackHealth', ({ kind, readyState, healthy, error }) => {});
```

This would let consumers show their own UI without parsing error strings.

### Media Mode Reconciliation

Audio-only sessions are common. The package could offer utilities to derive the actual tracks that will be sent:

```js
const result = selectLocalTracks(stream, { audioOnly: true });
```

This should remain a utility unless the package is prepared to own stronger media-device behavior. Do not stop camera tracks automatically unless the API makes that explicit.

### Room ID Generation Options

`generateRoomId()` exists. If kept in the package, consider options:

```js
generateRoomId({ length: 7, alphabet: 'lowercase-digits' });
```

This is small and useful, but not as important as session lifecycle APIs.

## What Should Stay Out of `@kidlib/p2p`

Do not move these concerns into the core package:

- app room membership and presence
- user/contact identity
- incoming-call dialogs
- ringtone and notification UI
- push notifications
- URL routing
- call history or missed-call messages
- Firebase Realtime Database path conventions
- file-transfer protocol, chunking, OPFS streaming, or preview-serving behavior
- DOM-specific media element behavior

These concerns can be composed around `@kidlib/p2p`, but they would make the core package less reusable if added directly.

## Suggested Roadmap

### Phase 1: Small Additive Helpers

Add:

- `attachRemoteStream`
- `monitorConnection`
- `createDataChannelTransport`
- `createSignalingChannel`

These are low-risk because they can be implemented as utilities over existing primitives.

### Phase 2: Friendly Session APIs

Add:

- `createMediaSession`
- `createDataSession`

These should use the Phase 1 helpers internally and preserve access to `peer`, `pc`, and `channel` for advanced users.

### Phase 3: Optional Adapter Packages

If repeated provider adapters emerge, create separate packages:

- `@kidlib/p2p-firebase`
- `@kidlib/p2p-websocket`

Do not add provider dependencies to `@kidlib/p2p` core.

## Example End-State Consumer Code

```js
import {
  createMediaSession,
  createDataSession,
  createSignalingChannel,
} from '@kidlib/p2p';

const signaling = createSignalingChannel({
  sendOffer,
  sendAnswer,
  onOffer,
  onAnswer,
  sendCandidate,
  onRemoteCandidate,
});

const mediaSession = createMediaSession({
  role,
  signaling,
  localStream,
  audioOnly,
  onRemoteStream({ stream }) {
    renderRemoteStream(stream);
  },
  connection: {
    disconnectGraceMs: 3000,
    restartIceOnFailure: true,
  },
});

await mediaSession.start();

const dataSession = await createDataSession({
  role,
  signaling: dataSignaling,
  label: 'file-transfer',
});

dataSession.send('ready');
```

This keeps the package focused on reusable WebRTC session mechanics while letting consuming applications own product behavior.
