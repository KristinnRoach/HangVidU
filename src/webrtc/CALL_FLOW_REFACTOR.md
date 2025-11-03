# Call Flow Refactoring - Draft

## Overview

Created two new modules to extract and clarify the WebRTC call flow logic from `main.js`:

1. **`webrtc-utils.js`** - Low-level WebRTC utilities and boilerplate
2. **`call-flow.js`** - High-level, crystal-clear call orchestration APIs

## New Files

### `src/webrtc/webrtc-utils.js`

**Purpose**: Extract verbose RTC boilerplate to keep call flow focused on logic.

**Exports**:

- `rtcConfig` - RTC configuration with STUN servers
- `isDuplicateSdp(pc, type, sdp)` - Prevent duplicate SDP processing (Firebase RTDB can trigger multiple callbacks)
- `isValidSignalingState(pc, expectedType)` - Validate state before setting remote description
- `addLocalTracks(pc, localStream)` - Add media tracks to peer connection
- `createOffer(pc)` - Create and set local offer
- `createAnswer(pc)` - Create and set local answer
- `setRemoteDescription(pc, sdp, drainQueue)` - Set remote description with validation and deduplication
- `generateRoomId()` - Generate random room ID

**Key Improvements**:

- **SDP Deduplication**: Uses `WeakMap` instead of global variables for per-connection cache
- **State Validation**: Centralized signaling state checks
- **Error Handling**: Consistent error handling and logging

### `src/webrtc/call-flow.js`

**Purpose**: Provide crystal-clear, unambiguous APIs for initiator and joiner flows.

**Exports**:

#### `createCall(options)` - Initiator Flow

Creates a new call and waits for partner to join.

```javascript
const result = await createCall({
  localStream,           // Required: Local media stream
  remoteVideoEl,         // Required: Remote video element
  mutePartnerBtn,        // Required: Mute partner button
  setupRemoteStream,     // Required: Function to setup remote stream
  setupWatchSync,        // Required: Function to setup watch-together
  onMemberJoined,        // Required: Callback when partner joins
  onMemberLeft,          // Required: Callback when partner leaves
  targetRoomId,          // Optional: Specific room ID (generates random if omitted)
});

// Returns:
{
  success: true,
  pc,                    // RTCPeerConnection
  roomId,                // Room ID
  roomLink,              // Full shareable link
  dataChannel,           // RTCDataChannel for chat
  messagesUI,            // Messages UI handler
  role: 'initiator'
}
```

**Flow Steps** (clearly numbered and commented):

1. Validate prerequisites (local stream available)
2. Create peer connection with local tracks
3. Setup components (data channel, remote stream, ICE, connection handlers)
4. Create and save offer SDP
5. Listen for answer from joiner
6. Setup room membership and watch-together sync
7. Return success with connection artifacts

#### `answerCall(options)` - Joiner Flow

Answers an existing call.

```javascript
const result = await answerCall({
  roomId,                // Required: Room ID to join
  localStream,           // Required: Local media stream
  remoteVideoEl,         // Required: Remote video element
  mutePartnerBtn,        // Required: Mute partner button
  setupRemoteStream,     // Required: Function to setup remote stream
  setupWatchSync,        // Required: Function to setup watch-together
  onMemberJoined,        // Required: Callback when partner joins
  onMemberLeft,          // Required: Callback when partner leaves
});

// Returns:
{
  success: true,
  pc,                    // RTCPeerConnection
  roomId,                // Room ID
  dataChannel,           // RTCDataChannel for chat
  messagesUI,            // Messages UI handler
  role: 'joiner'
}
```

**Flow Steps** (clearly numbered and commented):

1. Validate prerequisites (local stream, room exists with offer)
2. Create peer connection with local tracks
3. Setup components (data channel, remote stream, ICE, connection handlers)
4. Set remote offer, create answer, save to Firebase
5. Join room as member and setup listeners
6. Return success with connection artifacts

#### `joinOrCreateRoom(customRoomId, createOptions, answerOptions)` - Flexible Flow

Determines whether to create or join based on room status.

**Decision Logic**:

- Room doesn't exist → Create new room with custom ID
- Room exists but empty → Create new room with custom ID
- Room exists with members → Join as joiner

## Architecture Benefits

### 1. **Crystal Clear Flow**

Each function reads top-to-bottom with numbered steps:

```javascript
// ─────────────────────────────────────────────────────────────────────────
// 1. VALIDATE PREREQUISITES
// ─────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────
// 2. CREATE PEER CONNECTION
// ─────────────────────────────────────────────────────────────────────────
```

### 2. **Separated Concerns**

- **call-flow.js**: High-level orchestration (WHAT happens in what order)
- **webrtc-utils.js**: Low-level operations (HOW to do WebRTC operations)
- **webrtc.js**: Connection state monitoring
- **data-channel.js**: Chat/file transfer
- **ice.js**: ICE candidate handling

### 3. **Explicit Dependencies**

All required dependencies are passed as options object:

```javascript
const result = await createCall({
  localStream, // Clear: needs local media
  remoteVideoEl, // Clear: needs video element
  setupRemoteStream, // Clear: needs remote stream handler
  // ... all dependencies explicit
});
```

### 4. **Testable**

- Pure functions with clear inputs/outputs
- No hidden global state (WeakMap instead of module-level variables)
- Easy to mock dependencies

### 5. **Consistent Error Handling**

- Always returns `{ success: boolean, ... }` pattern
- Cleans up on failure (calls `pc.close()`)
- User-friendly status updates

## Migration Path (Next Steps)

The draft is complete. When ready to migrate `main.js`:

1. **Import new modules**:

   ```javascript
   import {
     createCall,
     answerCall,
     joinOrCreateRoom,
   } from './webrtc/call-flow.js';
   ```

2. **Replace `createCall()` in main.js**:

   ```javascript
   // Old: Complex inline implementation
   async function createCall(targetRoomId = null) { ... }

   // New: Simple wrapper
   async function createCall(targetRoomId = null) {
     const result = await createCall({
       localStream: getLocalStream(),
       remoteVideoEl,
       mutePartnerBtn,
       setupRemoteStream,
       setupWatchSync,
       onMemberJoined: handleMemberJoined,
       onMemberLeft: handleMemberLeft,
       targetRoomId,
     });

     if (!result.success) return false;

     // Store connection state
     pc = result.pc;
     role = result.role;
     dataChannel = result.dataChannel;
     messagesUI = result.messagesUI;
     currentRoomId = result.roomId;
     currentRoomLink = result.roomLink;

     // Show copy link modal if needed
     if (!targetRoomId) {
       showCopyLinkModal(currentRoomLink, { ... });
     }

     copyLinkBtn.disabled = false;
     return true;
   }
   ```

3. **Replace `answerCall()` in main.js** (similar pattern)

4. **Replace `joinOrCreateRoomWithId()` in main.js**:

   ```javascript
   async function joinOrCreateRoomWithId(customRoomId) {
     const result = await joinOrCreateRoom(
       customRoomId,
       {
         /* createCall options */
       },
       {
         /* answerCall options */
       }
     );

     if (!result.success) return false;

     // Store connection state
     pc = result.pc;
     // ... etc

     return true;
   }
   ```

5. **Remove old implementations** from main.js (~200 lines)

6. **Test thoroughly** - all call scenarios should work identically

## What's Not Included

The draft focuses on core call flow. These remain in `main.js` for now:

- UI callbacks (`handleMemberJoined`, `handleMemberLeft`, etc.)
- Global state management (`pc`, `dataChannel`, etc.)
- Recent calls tracking
- Copy link modal logic
- Cleanup functions

These can be addressed in future refactoring passes.

## Build Status

✅ **Build successful** - No errors, no breaking changes to existing code.

The new modules are self-contained and don't affect current functionality.
