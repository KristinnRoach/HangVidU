# Architecture

**Analysis Date:** 2025-12-26

## Pattern Overview

**Overall:** Layered Monolith with Module-Based Organization (Client-side SPA + PWA)

**Key Characteristics:**
- Single-page application (SPA) with no backend server code
- Module-based organization by functional domain (webrtc, firebase, media, components)
- Event-driven communication between modules via CallController
- Firebase Realtime Database for P2P signaling and watch-together synchronization
- WebRTC for direct peer-to-peer video/audio connections
- Progressive Web App with service worker for offline capability

## Layers

**Presentation Layer** (`src/components/`, `src/styles/`):
- Purpose: UI rendering and user interactions
- Contains: Vanilla JS components and Lit web components organized by feature
- Key directories: `auth/`, `calling/`, `contacts/`, `lobby/`, `messages/`, `notifications/`, `modal/`, `base/`
- Depends on: Business logic layer (CallController, media, room service)
- Used by: Main application orchestrator (`src/main.js`)
- Patterns: Function-based component initialization with cleanup lifecycle

**State Management Layer** (`src/main.js`, module-level state):
- Purpose: Application state coordination and event orchestration
- Contains: CallController event emitter, module-level state containers, Firebase RTDB sync
- Key modules: `src/webrtc/call-controller.js`, `src/firebase/watch-sync.js`, `src/media/state.js`
- Depends on: Storage layer for persistence
- Used by: Components for state access
- Patterns: Event emitter for loose coupling, getter/setter pairs for encapsulation

**Business Logic / Service Layer** (`src/webrtc/`, `src/firebase/`, `src/media/`, `src/room.js`):
- Purpose: Core application functionality and domain logic
- Contains:
  - WebRTC Module: Call flow orchestration, peer connections, ICE handling (`src/webrtc/`)
  - Firebase Module: Authentication, watch-together sync (`src/firebase/`)
  - Room Service: Room lifecycle, membership management (`src/room.js`)
  - Media Module: Stream management, device handling, YouTube integration (`src/media/`)
- Depends on: Data access layer for Firebase/IndexedDB operations
- Used by: State management layer and presentation layer
- Patterns: Service modules with exported functions, CallController facade

**Data Access Layer** (`src/storage/`):
- Purpose: Abstract data persistence and external service communication
- Contains:
  - Firebase RTDB abstraction (`src/storage/fb-rtdb/rtdb.js`) with listener tracking
  - IndexedDB wrapper (`src/storage/idb.js`) using Dexie
  - LocalStorage utilities (`src/storage/local/`)
- Depends on: Firebase SDK, Dexie, browser storage APIs
- Used by: Service layer
- Patterns: Scoped listener cleanup, persistence fallback chains (IDB → localStorage → in-memory)

**Infrastructure/Utilities** (`src/utils/`, `src/pwa/`):
- Purpose: Shared helpers and cross-cutting concerns
- Contains:
  - UI utilities (`src/utils/ui/`): Visibility, animations, modals, notifications
  - DOM utilities (`src/utils/dom/`): Component helpers, event management
  - Dev utilities (`src/utils/dev/`): Debug logging, diagnostics
  - Environment utilities (`src/utils/env/`): iOS PWA detection, redirects
  - PWA module (`src/pwa/`): Service worker registration, update notifications
- Depends on: Browser APIs only
- Used by: All layers
- Patterns: Pure functions, no state dependencies

## Data Flow

**Call Creation Flow (Initiator):**
1. User clicks "Call" button → triggers `CallController.createCall()`
2. Local stream initialized via `setUpLocalStream()` in `src/media/stream.js`
3. CallController → `src/webrtc/call-flow.js` → `createCall()` function
4. Creates RTCPeerConnection with local tracks (`src/webrtc/webrtc.js`)
5. Sets up ICE candidates (`src/webrtc/ice.js`), data channel (`src/webrtc/data-channel.js`), connection handlers
6. Generates SDP offer via `createOffer()`
7. RoomService.createNewRoom() → writes offer to Firebase RTDB (`src/room.js`)
8. Listens for partner's answer in Firebase (`src/storage/fb-rtdb/rtdb.js`)
9. On answer received → `setRemoteDescription()`
10. ICE candidates exchanged via RTDB listeners
11. Connection established → `setupRemoteStream()` attaches remote video
12. Watch-together sync initialized via Firebase listener (`src/firebase/watch-sync.js`)

**Call Joining Flow (Joiner):**
1. User opens shared link → URL parsed for room ID
2. `CallController.answerCall()` → `src/webrtc/call-flow.js` → `answerCall()`
3. Creates RTCPeerConnection
4. Retrieves offer from Firebase RTDB
5. Sets remote description from offer
6. Generates answer SDP via `createAnswer()`
7. Sends answer to Firebase
8. ICE candidates exchanged
9. Connection established → remote stream attached
10. Watch sync activated

**Watch-Together Sync Flow:**
1. User searches/loads YouTube video
2. `src/firebase/watch-sync.js` detects video load via YouTube player events
3. Updates Firebase RTDB under `watch/{roomId}` with video state
4. Remote user receives update via `onDataChange()` listener
5. Remote video synchronization through event handlers
6. Bidirectional sync with debouncing to prevent feedback loops

**Message Flow (DataChannel):**
1. CallController creates DataChannel during connection setup
2. `src/webrtc/data-channel.js` handles setup
3. Messages handled via `setupMessagesUI()` in `src/main.js`
4. Outgoing messages sent via `pc.send()`
5. Incoming messages via `ondatachannel` event

## Key Abstractions

**CallController (Event-Based Facade):**
- Location: `src/webrtc/call-controller.js`
- Purpose: High-level API wrapper over call-flow.js with event emitter pattern
- State: `{ state, roomId, roomLink, role, partnerId, pc, dataChannel }`
- Events: 'call-ringing', 'call-connected', 'call-failed', 'call-cancelled', 'hangup-complete'
- Pattern: Singleton facade with event emitter for loose coupling
- Usage: `CallController.createCall()`, `CallController.answerCall()`, `CallController.hangUp()`

**RoomService (Signaling Manager):**
- Location: `src/room.js`
- Purpose: Firebase RTDB abstraction for room lifecycle and WebRTC signaling
- Methods: `createNewRoom()`, `checkRoomStatus()`, `joinRoom()`, `leaveRoom()`
- Pattern: Service module with exported functions
- Usage: Called by call-flow.js for room operations

**Firebase RTDB Listener Tracking:**
- Location: `src/storage/fb-rtdb/rtdb.js`
- Purpose: Centralized listener registry with scope-based cleanup to prevent memory leaks
- Functions: `addRTDBListener()`, `removeRTDBListenersForRoom()`, `removeAllRTDBListeners()`
- Pattern: Listener registry with Map-based tracking
- Usage: All Firebase RTDB operations use this abstraction

**Media State Management:**
- Location: `src/media/state.js`, `src/media/stream.js`
- Purpose: Centralized media stream lifecycle
- Exports: `getLocalStream()`, `setLocalStream()`, `hasLocalStream()`, `cleanupLocalStream()`
- Pattern: Module-level state with getter/setter pairs
- Usage: WebRTC layer and media controls access streams through this abstraction

**Component Pattern (Vanilla JS):**
- Location: `src/components/*/`
- Purpose: Initialize UI with event listeners, cleanup on teardown
- Pattern: Functions that initialize/cleanup UI components
- Lifecycle: `initialize*()` → attach listeners → `cleanup*()` on call end
- Examples: `initializeSearchUI()`, `initializeMediaControls()`, `setupMessagesUI()`

**Watch Sync State Machine:**
- Location: `src/firebase/watch-sync.js`
- Purpose: Bidirectional YouTube/shared video synchronization
- State: `watchMode`, `lastWatched` ('yt'|'url'|'none'), `currentVideoUrl`
- Pattern: Firebase listener-driven synchronization with debounce logic
- Usage: Automatically syncs video playback state between peers

## Entry Points

**Main Application Entry:**
- HTML: `index.html`
- Main Script: `src/main.js` (1,342 lines, main orchestrator)
- DOM Element Registry: `src/elements.js` (centralized query-on-demand pattern)
- Initialization: `init()` function called on DOMContentLoaded

**Initialization Sequence:**
1. `index.html` loads `src/main.js`
2. `src/main.js` imports all modules
3. Sentry initialized via `src/initSentry.js`
4. `init()` function called on DOMContentLoaded
5. `authReady` promise awaits Firebase auth setup
6. Media streams lazily initialized on first call

**Secondary Entry Points:**
- PWA Setup: `src/pwa/PWA.js` → Service worker registration
- Tests: `tests/setup.js` → Vitest browser mode configuration
- Experiments: `experiments.html` (dev-only feature experiments page)

## Error Handling

**Strategy:** Try-catch blocks at service boundaries, errors propagated to CallController event emitter

**Patterns:**
- Service layer: Throw errors with descriptive messages
- CallController: Emit 'error' events for UI handling
- Async operations: try-catch with error logging to Sentry
- Firebase operations: Error callbacks with listener cleanup

**Gaps:**
- Some Firebase write operations only log errors (no retry)
- Promise catch blocks occasionally silent (`.catch(() => {})`)

## Cross-Cutting Concerns

**Logging:**
- Development: `src/utils/dev/diagnostic-logger.js` (696 lines)
- Production: Sentry error tracking (`src/initSentry.js`)
- Pattern: console.log for dev, Sentry for production errors

**State Synchronization:**
- Firebase RTDB for room state, watch-together sync
- Event emitter pattern for local state changes
- Listener cleanup on component teardown

**Resource Cleanup:**
- Firebase RTDB: Scoped listener removal
- Media streams: `cleanupLocalStream()`, `cleanupRemoteStream()`
- Event listeners: cleanup functions returned from initialization
- Pattern: Cleanup arrays/maps populated during setup, cleared on teardown

---

*Architecture analysis: 2025-12-26*
*Update when major patterns change*
