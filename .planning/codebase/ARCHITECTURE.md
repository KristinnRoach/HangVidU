# Architecture

**Analysis Date:** 2026-01-08

## Pattern Overview

**Overall:** Layered Monolith with Event-Driven Communication

**Key Characteristics:**
- Single-page application (SPA) using vanilla JavaScript with selective Lit web components
- Event emitter pattern for WebRTC state management
- Firebase RTDB as single source of truth for real-time synchronization
- Module-level state management with getter/setter functions
- Lazy media initialization to avoid triggering device "call mode" prematurely

## Layers

**WebRTC Layer:**
- Purpose: Manage peer-to-peer video connections and media streams
- Contains: Call orchestration, ICE handling, data channels
- Location: `src/webrtc/`
  - `call-controller.js` - Event-based API wrapper with state management
  - `call-flow.js` - Core connection establishment (offer/answer/ICE)
  - `webrtc.js` - PeerConnection factory and configuration
  - `ice.js` - ICE candidate handling
  - `data-channel.js` - DataChannel setup (currently disabled in favor of RTDB messaging)
- Depends on: Media Layer (for streams), Storage Layer (for signaling via RTDB)
- Used by: Main app orchestration (`src/main.js`)

**Firebase Layer:**
- Purpose: Real-time synchronization and authentication
- Contains: Auth, RTDB operations, watch-together sync, contact messaging, presence
- Location: `src/firebase/`
  - `auth.js` - Google OAuth + guest authentication
  - `firebase.js` - Firebase app initialization
  - `watch-sync.js` - YouTube/video synchronization via RTDB
  - `messaging.js` - RTDB-based contact messaging (NEW as of Jan 2026)
  - `presence.js` - User online/offline tracking
  - `onetap.js` - Google One Tap UI integration
- Depends on: Storage Layer (RTDB abstractions)
- Used by: All layers requiring real-time data or authentication

**Storage Layer:**
- Purpose: Data persistence and retrieval abstractions
- Contains: Firebase RTDB wrappers, IndexedDB (Dexie), LocalStorage utilities
- Location: `src/storage/`
  - `fb-rtdb/rtdb.js` - Firebase RTDB API with listener tracking and cleanup
  - `idb/idb.js` - Dexie wrapper for IndexedDB (persistent contacts, messages)
  - `local/recent-rooms-local.js` - LocalStorage utilities for guest users
- Depends on: Firebase SDK
- Used by: Firebase Layer, Component Layer

**Media Layer:**
- Purpose: Camera/mic stream management and YouTube player control
- Contains: Local/remote MediaStream creation, constraints, YouTube API integration
- Location: `src/media/`
  - `stream.js` - Local/remote stream setup
  - `state.js` - Stream state singleton
  - `media-controls.js` - Camera/mic UI controls
  - `constraints.js` - Video/audio constraints
  - `media-devices.js` - Device enumeration
  - `audio/ringtone-manager.js` - Call ringtone management
  - `youtube/youtube-player.js` - YouTube IFrame API wrapper
  - `youtube/youtube-search.js` - YouTube search UI
- Depends on: Browser MediaDevices APIs, YouTube IFrame API
- Used by: WebRTC Layer, Component Layer

**Component Layer:**
- Purpose: UI components and user interactions
- Contains: Authentication UI, calling UI, contacts, messages, lobby, notifications
- Location: `src/components/`
  - `auth/` - Google One Tap container
  - `base/` - Reusable components (buttons, dialogs, modals)
  - `calling/` - Incoming call UI
  - `contacts/` - Contact list + presence (currently owns message toggles - refactoring pending)
  - `lobby/` - Main lobby UI
  - `messages/` - In-call chat (RTDB-based as of Jan 2026)
    - `messages-ui.js` - Main messaging UI
    - `message-toggle.js` - Reusable toggle component with badge
    - `OLD_messages-ui.js` - Deprecated DataChannel implementation
  - `notifications/` - Toasts + PWA updates
  - `recent-calls/` - Recent call history
  - `ui/` - State-driven UI (call-mode.js, watch-mode.js)
  - `select/` - Device selection dropdown
- Depends on: All other layers (orchestrates interactions)
- Used by: Main app entry point

**Utility Layer:**
- Purpose: Shared helpers and cross-cutting concerns
- Contains: Dev logging, UI utilities, DOM helpers, environment detection
- Location: `src/utils/`
  - `dev/` - Dev logging + diagnostics
  - `ui/` - UI helpers (show/hide, visibility)
  - `dom/` - DOM utilities + component helpers
  - `env/` - Environment detection (iOS PWA handling)
- Depends on: Nothing (pure utilities)
- Used by: All layers

## Data Flow

**Call Initiation Flow:**

1. User clicks "Call" → `handleCall()` in `src/main.js`
2. `initLocalStreamAndMedia()` - Lazy initialization of camera/mic
3. `CallController.createCall(options)`
4. `call-flow.js::createCall()`:
   - Create RTCPeerConnection
   - Add local media tracks
   - Setup data channel (disabled) & remote stream handler
   - Setup ICE candidate exchange via RTDB
   - Create SDP offer
   - Save offer to Firebase RTDB (`rooms/{roomId}`)
   - `setupWatchSync()` for video synchronization
5. Returns `{pc, roomId, roomLink, dataChannel}`
6. `CallController.setupAnswerListener()` → listens for answer on `rooms/{roomId}/answer`
7. Partner opens link → `joinOrCreateRoomWithId(roomId)`
   - Check room status
   - If empty: create as initiator (race condition handling)
   - If has members: join as joiner
8. `call-flow.js::answerCall()`:
   - Retrieve offer from `rooms/{roomId}`
   - Create RTCPeerConnection
   - Add local tracks & setup remote stream
   - Create SDP answer
   - Save answer to Firebase RTDB
   - Setup ICE candidates
   - `setupWatchSync()` for sync
9. ICE candidates exchanged via `rooms/{roomId}/iceCandidates/`
10. PeerConnection established → emit `memberJoined` event
11. UI transitions to call-mode

**Incoming Call Detection Flow:**

1. `startListeningForSavedRooms()` on page load
2. Read recent calls from:
   - Firebase RTDB (logged-in users)
   - LocalStorage (guests)
3. For each saved `roomId`: `listenForIncomingOnRoom(roomId)`
4. `RoomService.onMemberJoined()` listener triggers when partner joins
5. Validate call freshness (check timestamp, reject if stale >20 seconds)
6. Prompt user with `confirmDialog("Incoming call from {name}. Accept?")`
   - Play ringtone & visual indicators
7. If accepted: `joinOrCreateRoomWithId(roomId)`
   If rejected: `RoomService.rejectCall(roomId, reason)`

**Watch-Together Sync Flow:**

1. `setupWatchSync(roomId, role, userId)`
2. Listen to `watch/{roomId}` in Firebase RTDB
3. On video load (YouTube or URL):
   - Update watch state: `{videoId, position, isPlaying, updatedBy}`
   - Save to Firebase
   - `enterWatchMode()`
4. Partner receives update via `onDataChange` listener
5. Sync remote playback:
   - Load video
   - Seek to position
   - Match play/pause state
   - Debounce fast updates to prevent feedback loops

**Contact Messaging Flow (NEW as of Jan 2026):**

1. User clicks contact message toggle
2. `openContactMessages(contactId, contactName)` in `src/components/contacts/contacts.js`
3. Initialize messages UI with `initMessagesUI()` from `src/components/messages/messages-ui.js`
4. Set up message sending via `sendMessageToRTDB()` from `src/firebase/messaging.js`
5. Listen for messages via `listenToContactMessages()`
6. Store session in `activeMessageSessions` Map for cleanup
7. Mark messages as read when UI is open
8. Real-time unread badge updates via Firebase listeners

## Key Abstractions

**CallController:**
- Purpose: Singleton event emitter managing active call state
- Location: `src/webrtc/call-controller.js`
- Pattern: Event emitter with in-memory state
- State shape: `{state, roomId, roomLink, role, partnerId, pc, dataChannel, messagesUI}`
- Events: `memberJoined`, `memberLeft`, `cleanup`
- Example usage: `CallController.createCall(options)`, `CallController.on('memberJoined', callback)`

**RoomService:**
- Purpose: Singleton managing room lifecycle
- Location: `src/room.js`
- Pattern: Firebase RTDB abstractions for room operations
- Methods: `createNewRoom()`, `joinRoom()`, `checkRoomStatus()`, `rejectCall()`
- Example usage: `RoomService.createNewRoom(offer, userId, userName)`

**RTDB Listener Management:**
- Purpose: Central registry tracking all Firebase listeners
- Location: `src/storage/fb-rtdb/rtdb.js`
- Pattern: Listener tracking with scoped cleanup
- Functions: `addRTDBListener()`, `removeRTDBListenersForRoom()`, `removeAllRTDBListeners()`
- Example usage: `addRTDBListener(ref, 'value', callback, roomId)`

**Element Registry:**
- Purpose: Centralized DOM element caching
- Location: `src/elements.js`
- Pattern: Query-on-demand with late initialization
- Example usage: `const { localVideoEl, remoteVideoEl } = getElements()`

**Message Session Management:**
- Purpose: Track active per-contact message sessions
- Location: `src/firebase/messaging.js`
- Pattern: Map-based session registry with cleanup functions
- State: `activeMessageSessions` Map storing `{messagesUI, unsubscribe, contactId, contactName, toggle}`
- Example usage: `getActiveMessageSession()`, `closeMessageSession(contactId)`, `closeAllMessageSessions()`

## Entry Points

**Main HTML:**
- Location: `index.html`
- Triggers: Page load
- Responsibilities: Load `/src/main.js`, define static HTML structure

**Primary Entry:**
- Location: `src/main.js` (1,342 lines)
- Triggers: DOM content loaded
- Responsibilities: Initialize app (auth, media, listeners), handle call lifecycle, event subscriptions to CallController

**WebRTC Entry:**
- Location: `src/webrtc/call-controller.js`
- Triggers: Imported as ES6 module
- Responsibilities: Provide event-based API for call operations

**Firebase Init:**
- Location: `src/firebase/firebase.js`
- Triggers: Imported by services needing Firebase
- Responsibilities: Initialize Firebase app, App Check with reCAPTCHA

**iOS PWA Redirect:**
- Location: `src/utils/env/redirectIOSPWA.js`
- Triggers: Before main.js (inline script in HTML)
- Responsibilities: Handle iOS Safari OAuth fallback

## Error Handling

**Strategy:** Throw errors from services, catch at component/orchestration level, log and notify user

**Patterns:**
- Services throw `Error` with descriptive messages
- Call orchestration catches errors, logs to console with context
- UI shows generic error messages to users
- Sentry captures unhandled errors in production

**Current Gap:** Many empty `catch (_) {}` blocks silence errors (23 instances found)

## Cross-Cutting Concerns

**Logging:**
- Dev mode: `devDebug()` from `src/utils/dev/dev-utils.js`
- Production: Sentry error tracking (`src/initSentry.js`)
- Diagnostic logging: `getDiagnosticLogger()` for complex debugging

**Validation:**
- Environment variables validated on app init
- User input sanitization: **Missing** (XSS risk in contact names via `innerHTML`)
- Firebase rules enforce server-side validation

**Authentication:**
- Firebase Auth handles token management
- Fallback persistence: IndexedDB → LocalStorage → in-memory
- Guest users get random cached IDs

**State Management:**
- Module-level state in key files (main.js, call-controller.js, watch-sync.js, messaging.js)
- No centralized state store (Redux, Zustand, etc.)
- State shape documented in each module

---

*Architecture analysis: 2026-01-08*
*Update when major patterns change*
