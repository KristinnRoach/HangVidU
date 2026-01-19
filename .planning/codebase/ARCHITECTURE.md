# Architecture

**Analysis Date:** 2025-01-19

## Pattern Overview

**Overall:** Event-Driven Controller Architecture with Firebase Signaling

**Key Characteristics:**
- Vanilla JavaScript with minimal framework dependencies (Lit for some components)
- WebRTC peer-to-peer connections with Firebase RTDB as signaling server
- Controller-based abstraction for WebRTC call lifecycle
- Event emitter pattern for loose coupling between modules
- Module-level singleton state management
- Centralized DOM element management via `elements.js`

## Layers

**Presentation Layer:**
- Purpose: User interface rendering and interaction handling
- Location: `src/components/`
- Contains: UI components (vanilla JS and Lit), modals, notifications, contact management
- Depends on: Elements layer, UI utilities, Media state
- Used by: Main orchestration layer

**Controller Layer:**
- Purpose: Business logic and state coordination for calls and messaging
- Location: `src/webrtc/call-controller.js`, `src/messaging/messaging-controller.js`
- Contains: Call lifecycle management, event emission, listener tracking, messaging session management
- Depends on: WebRTC layer, Room service, Firebase layer
- Used by: Main orchestration, UI components

**WebRTC Layer:**
- Purpose: Peer connection establishment and media handling
- Location: `src/webrtc/`
- Contains: Call flow orchestration (`call-flow.js`), ICE handling (`ice.js`), connection utilities (`webrtc-utils.js`, `webrtc.js`)
- Depends on: Room service, Media layer
- Used by: Controller layer

**Room/Signaling Layer:**
- Purpose: Firebase RTDB room management and signaling
- Location: `src/room.js`, `src/storage/fb-rtdb/rtdb.js`
- Contains: Room CRUD operations, member join/leave listeners, offer/answer exchange, cancellation signals
- Depends on: Firebase SDK
- Used by: WebRTC layer, Controller layer

**Firebase Layer:**
- Purpose: Firebase service initialization and domain-specific Firebase operations
- Location: `src/firebase/`
- Contains: Auth (`auth.js`), watch-together sync (`watch-sync.js`), presence (`presence.js`), One Tap (`onetap.js`)
- Depends on: Firebase SDK
- Used by: All layers requiring auth or sync

**Media Layer:**
- Purpose: Local/remote stream management, device controls, YouTube integration
- Location: `src/media/`
- Contains: Stream setup (`stream.js`), media state (`state.js`), controls (`media-controls.js`), YouTube player/search, audio (ringtones)
- Depends on: Browser MediaDevices API, YouTube IFrame API
- Used by: WebRTC layer, UI components

**Storage Layer:**
- Purpose: Data persistence abstractions
- Location: `src/storage/`
- Contains: Firebase RTDB helpers (`fb-rtdb/rtdb.js`), IndexedDB wrapper (`idb/`), localStorage utilities (`local/`)
- Depends on: Firebase SDK, Dexie (IndexedDB)
- Used by: Room service, Contacts, Recent calls

**Utilities Layer:**
- Purpose: Shared helpers and cross-cutting concerns
- Location: `src/utils/`
- Contains: UI helpers (`ui/`), DOM utilities (`dom/`), environment detection (`env/`), dev tools (`dev/`), URL parsing
- Depends on: Browser APIs
- Used by: All layers

## Data Flow

**Call Initiation (Initiator):**
1. User clicks "Start Call" -> `main.js` -> `CallController.createCall()`
2. `call-flow.js:createCall()` creates RTCPeerConnection, adds local tracks
3. SDP offer generated and saved to Firebase RTDB via `RoomService.createNewRoom()`
4. Room link generated and shown to user via modal
5. CallController sets up listeners: answer, cancellation, rejection, member-joined/left
6. Waits for joiner via Firebase RTDB listener on `rooms/{roomId}/answer`

**Call Joining (Joiner):**
1. User opens room link -> `main.js:autoJoinFromUrl()` or paste-join
2. `joinOrCreateRoomWithId()` checks room status via `RoomService.checkRoomStatus()`
3. `CallController.answerCall()` -> `call-flow.js:answerCall()`
4. Retrieves SDP offer from Firebase RTDB
5. Creates RTCPeerConnection, sets remote description
6. Generates SDP answer, saves to Firebase RTDB via `RoomService.saveAnswer()`
7. ICE candidates exchanged via Firebase RTDB
8. `pc.ontrack` fires -> `setupRemoteStream()` attaches remote video

**Watch-Together Sync:**
1. User selects video (YouTube URL or local file) -> `watch-sync.js:handleVideoSelection()`
2. Video state saved to Firebase RTDB: `rooms/{roomId}/watch`
3. Remote user receives update via `onDataChange()` listener
4. `handleWatchUpdate()` syncs playback state (play/pause/seek)
5. Local events (play, pause, seeked) trigger Firebase updates to sync remote

**State Management:**
- Call state: `CallController` singleton with event emitter pattern
- Media state: Module-level variables in `src/media/state.js`
- UI state: Module-level flags in `call-mode.js`, `watch-mode.js`
- Auth state: Firebase Auth SDK with `onAuthStateChanged` subscriptions
- Room state: Firebase RTDB with real-time listeners

## Key Abstractions

**CallController (`src/webrtc/call-controller.js`):**
- Purpose: Thin wrapper over call-flow with event-based API
- Pattern: Singleton with SimpleEmitter for events
- Events: `created`, `answered`, `memberJoined`, `memberLeft`, `cleanup`, `error`, `hangup`, `remoteHangup`, `callFailed`
- State: `roomId`, `partnerId`, `pc`, `dataChannel`, `role` (initiator/joiner)

**RoomService (`src/room.js`):**
- Purpose: Firebase RTDB room operations abstraction
- Pattern: Singleton service class
- Methods: `createNewRoom()`, `joinRoom()`, `leaveRoom()`, `checkRoomStatus()`, `saveAnswer()`, `cancelCall()`, `rejectCall()`, `onMemberJoined()`, `onMemberLeft()`

**MessagingController (`src/messaging/messaging-controller.js`):**
- Purpose: Transport-agnostic messaging API
- Pattern: Session-based with pluggable transports
- Transports: `RTDBMessagingTransport` (text), `DataChannelFileTransport` (files during calls)
- Methods: `openSession()`, `closeSession()`, `sendFile()`, `onFileReceived()`

**Elements (`src/elements.js`):**
- Purpose: Centralized DOM element access with lazy initialization
- Pattern: Query-on-demand with module-level caching
- Exports: Individual element references plus `getElements()` getter
- Utilities: `robustElementAccess()`, `waitForElements()` for dynamic elements

## Entry Points

**Main Entry (`src/main.js`):**
- Location: `src/main.js`
- Triggers: `window.onload`
- Responsibilities: Initialize app, setup auth UI, register event handlers, auto-join from URL, manage incoming call listeners, orchestrate call lifecycle via CallController events

**HTML Entry (`index.html`):**
- Location: `/index.html`
- Triggers: Browser page load
- Responsibilities: Define DOM structure, load external scripts (Google Identity Services, YouTube IFrame API), bootstrap `src/main.js`

**PWA Entry (`src/pwa/PWA.js`):**
- Location: `src/pwa/PWA.js`
- Triggers: Dynamic import from `main.js` when PWA enabled
- Responsibilities: Service worker registration, update handling, install prompt

## Error Handling

**Strategy:** Best-effort with graceful degradation

**Patterns:**
- WebRTC errors: Logged, user notified via alerts, cleanup triggered
- Firebase errors: Caught and logged, operations marked as failed (non-fatal for signaling race conditions)
- Media permission errors: User-friendly alerts with guidance, cleanup of initialization state
- Auth errors: Centralized handler `handleSignInError()` with iOS PWA Safari fallback
- Listener cleanup: Always tracked for removal, wrapped in try-catch

**Recovery:**
- Call failures trigger `CallController.cleanupCall()` which resets state and emits `cleanup` event
- Stale call detection prevents showing notifications for old room data
- Room status checks with retry logic for race conditions during simultaneous join

## Cross-Cutting Concerns

**Logging:**
- Development: `devDebug()` utility for conditional logging
- Diagnostics: `DiagnosticLogger` for detailed call flow tracing (disabled by default)
- Production: Sentry integration via `initSentry.js`

**Validation:**
- Critical elements validated on init via `getElements()` check
- Room existence validated via `RoomService.checkRoomStatus()` before joining
- Call freshness validation to prevent stale call notifications (20s threshold)

**Authentication:**
- Firebase Auth with Google provider
- Supports: Authenticated users (Firebase UID), Guest users (generated ID with 48h TTL)
- iOS PWA: Safari external fallback for blocked popups
- Presence: Online/offline tracking via Firebase RTDB

**Cleanup:**
- RTDB listeners: Tracked by room ID for scoped cleanup via `addRTDBListener()`
- CallController: `removeTrackedListeners()` removes all call-specific listeners
- Media streams: `cleanupLocalStream()`, `cleanupRemoteStream()` stop tracks
- UI: `cleanupCallModeUI()` removes event handlers and PiP state

---

*Architecture analysis: 2025-01-19*
