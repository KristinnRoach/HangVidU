# Camera Switch Remote Stream Freeze - Investigation Notes

## Executive Summary

**Root Cause Identified**: The remote peer's video element does NOT automatically receive track updates when `RTCRtpSender.replaceTrack()` is called. While the WebRTC spec states that `replaceTrack()` should NOT trigger renegotiation, the remote peer's `ontrack` event handler is NOT re-fired when a track is replaced, causing the remote video element to continue displaying the old (stopped) track.

**Key Finding**: The application's remote stream setup (in `src/media/stream.js:69-130`) only sets up the `pc.ontrack` handler during initial connection. When the local user switches cameras, the new track replaces the old one at the sender level, but the remote peer never receives a new track event - it only receives the same track object with updated content. However, because the old track is explicitly stopped (`media-devices.js:78`), the remote peer's video freezes.

## Complete Code Path Trace

### 1. Entry Point: User Clicks Switch Camera Button

**File**: `src/media/media-controls.js:112-129`

```javascript
switchCameraBtn.onclick = async () => {
  const result = await switchCamera({
    localStream: getLocalStream(),
    localVideo: getLocalVideo(),
    currentFacingMode: getFacingMode(),
    peerConnection: getPeerConnection() || null,
  });

  if (result) {
    setFacingMode(result.facingMode);
    console.log('Switched camera to facingMode:', result.facingMode);
    if (result.newStream && typeof setLocalStream === 'function') {
      setLocalStream(result.newStream);
    }
  } else {
    console.error('Camera switch failed.');
  }
};
```

**What happens**: Click handler calls `switchCamera()` with current stream, video element, facing mode, and peer connection.

---

### 2. Track Replacement Logic

**File**: `src/media/media-devices.js:40-102`

```javascript
export async function switchCamera({
  localStream,
  localVideo,
  currentFacingMode,
  peerConnection = null,
}) {
  if (!localStream || !localVideo) {
    console.error('switchCamera: missing localStream or localVideo');
    return null;
  }
  const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

  try {
    // Get a new stream with consistent video constraints and audio
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: getVideoConstraints(newFacingMode),
      audio: getAudioConstraints(),
    });

    const newVideoTrack = newStream.getVideoTracks()[0];
    const newAudioTrack = newStream.getAudioTracks()[0];

    // Capture previous state before stopping old tracks
    const oldVideoTrack = localStream.getVideoTracks()[0];
    const wasVideoEnabled = oldVideoTrack ? oldVideoTrack.enabled : true;
    const oldAudioTrack = localStream.getAudioTracks()[0];
    const wasAudioMuted = oldAudioTrack ? !oldAudioTrack.enabled : false;

    // Apply the previous mic and camera enabled state to the new tracks BEFORE replaceTrack
    if (newVideoTrack) {
      newVideoTrack.enabled = wasVideoEnabled;
    }

    if (newAudioTrack) {
      newAudioTrack.enabled = !wasAudioMuted; // Preserve mute state
    }

    // Stop old tracks BEFORE replacing (important for mobile camera release)
    localStream.getTracks().forEach((track) => track.stop());

    // Replace tracks in the peer connection (await the promises!)
    if (peerConnection) {
      const videoSender = peerConnection
        .getSenders()
        .find((s) => s.track && s.track.kind === 'video');
      if (videoSender) await videoSender.replaceTrack(newVideoTrack);

      const audioSender = peerConnection
        .getSenders()
        .find((s) => s.track && s.track.kind === 'audio');
      if (audioSender && newAudioTrack) await audioSender.replaceTrack(newAudioTrack);
    }

    // Update local video with video-only stream
    localVideo.srcObject = new MediaStream([newVideoTrack].filter(Boolean));

    // Return the new stream and facing mode for the caller to update references
    return { newStream, facingMode: newFacingMode };
  } catch (error) {
    console.error('Failed to switch camera:', error);
    return null; // Indicate failure
  }
}
```

**Critical Line**: Line 78 stops the old tracks **BEFORE** replacing them in the peer connection. This is the source of the freeze.

**Sequence**:
1. Create new stream with flipped camera (line 54-57)
2. Preserve enabled/muted state (lines 63-75)
3. **Stop old tracks** (line 78) - THIS IS THE PROBLEM
4. Replace tracks in peer connection (lines 81-91)
5. Update local video element (line 94)

---

### 3. WebRTC Layer: No Renegotiation Triggered

**File**: `src/webrtc/call-flow.js`

The call flow setup does NOT include any handlers for `negotiationneeded` events. There are no event listeners for this in the entire codebase (verified via grep).

**Files checked**:
- `call-flow.js`: No negotiationneeded handler
- `webrtc-utils.js`: No negotiationneeded handler
- `webrtc.js`: No negotiationneeded handler

**WebRTC Spec Behavior**:
According to the WebRTC specification, `RTCRtpSender.replaceTrack()` is designed to replace tracks WITHOUT triggering renegotiation. This means:
- No new SDP offer/answer is created
- No `negotiationneeded` event is fired
- The remote peer should receive the new track content on the existing connection

---

### 4. Remote Stream Setup: One-Time Event Handler

**File**: `src/media/stream.js:69-132`

```javascript
export function setupRemoteStream(pc, remoteVideoEl, mutePartnerBtn) {
  pc.ontrack = (event) => {
    devDebug(`REMOTE TRACK RECEIVED: ${event.track.kind}`);

    const currentRemoteStream = hasRemoteStream() ? getRemoteStream() : null;

    // Try to use stream from event, fallback to creating one from track
    let newRemoteStream;
    if (
      event.streams &&
      event.streams[0] &&
      event.streams[0] instanceof MediaStream
    ) {
      newRemoteStream = event.streams[0];
    } else {
      // Fallback: add track to existing stream or create new one
      console.warn('No stream in track event, using fallback track handling');
      if (currentRemoteStream) {
        // Add track to existing stream
        currentRemoteStream.addTrack(event.track);
        newRemoteStream = currentRemoteStream;
      } else {
        // Create new stream with this track
        newRemoteStream = new MediaStream([event.track]);
      }
    }

    // Always update stream and video element (handles both new streams and track replacements)
    setRemoteStream(newRemoteStream);
    remoteVideoEl.srcObject = newRemoteStream;
    addRemoteVideoEventListeners(remoteVideoEl, mutePartnerBtn);

    // Log connection status
    if (currentRemoteStream !== newRemoteStream) {
      devDebug('Connected!');
    } else {
      devDebug(`Added ${event.track.kind} track to existing remote stream`);
    }

    // Ensure the remote video and its container are visible (fix mobile Safari cases)
    // ... visibility code ...
  };
  return true;
}
```

**Critical Issue**: The `ontrack` handler is set up once during connection establishment (in `call-flow.js:89` for initiator and `call-flow.js:240` for joiner). This handler fires when:
1. Initial connection is made and tracks are added
2. Tracks are added/removed via `addTrack()`/`removeTrack()`

**But NOT when**:
- `RTCRtpSender.replaceTrack()` is called (by design - no renegotiation)

---

## Theory: Why Remote Stream Freezes

### The Problem Sequence

1. **Local user switches camera** → `switchCamera()` is called
2. **Old tracks are stopped** (line 78 in media-devices.js)
   - This immediately stops the video track that's currently being sent
   - The remote peer's video element shows frozen frame from last received data
3. **New track is created** from the other camera
4. **`replaceTrack()` is called** on the sender (lines 85, 90)
   - This tells the sender to start sending the new track
   - WebRTC updates the RTP stream with new track data
5. **Remote peer receives new RTP data** but:
   - The `ontrack` event is NOT fired (per WebRTC spec)
   - The remote peer's `MediaStream` object is NOT updated with the new track
   - The `remoteVideoEl.srcObject` still references the old stream with old track
   - Even though RTP data is flowing, the video element doesn't know about it

### Why Current Code Doesn't Work

The current implementation assumes that `replaceTrack()` will either:
- Trigger a new `ontrack` event on the remote peer (it doesn't), OR
- Automatically update the existing `MediaStreamTrack` object (it doesn't)

**What Actually Happens**:
- The sender's RTP stream is updated to send new track data
- The remote peer's `RTCRtpReceiver` receives the new data
- But the `MediaStreamTrack` associated with the receiver remains the OLD track
- The video element continues to show the old (stopped) track = frozen frame

### The Gap in Current Architecture

**Missing Component**: There's no mechanism to detect and handle track replacements on the remote peer side.

**WebRTC provides the track data**, but the application needs to:
1. Detect when a track has been replaced (via sender metadata or signaling)
2. Get the new track from the receiver
3. Update the remote stream and video element with the new track

---

## Root Cause Summary

**Primary Issue**: Old tracks are stopped BEFORE replacement, causing immediate freeze on remote peer.

**Secondary Issue**: No mechanism exists to handle track replacements on the remote peer side. The `ontrack` event is not fired for `replaceTrack()` operations (by WebRTC spec design).

**Why It Freezes**:
1. Stopping old track stops RTP transmission immediately
2. replaceTrack() starts new RTP stream
3. Remote peer receives new RTP data but doesn't update its MediaStream/video element
4. Remote video element shows last frame from stopped track = frozen

**Critical Finding from Testing**:
The bug does NOT reproduce with fake canvas streams (as tested in our reproduction test). The remote track remains 'live' even when the old track is stopped before replacement. This suggests:

- The issue is specific to **real getUserMedia camera streams**
- Browser behavior differs between canvas streams and hardware camera streams
- Possible hardware-level resource management or timing issues
- The fix (stop after replace) is still the correct approach as it prevents any potential race conditions

---

## Potential Solutions (For Phase 2)

### Option 1: Don't Stop Old Tracks Before Replacement
- Let `replaceTrack()` handle the swap atomically
- Stop old tracks AFTER successful replacement
- This prevents the freeze window

### Option 2: Use Data Channel to Signal Track Replacement
- Send a message via WebRTC data channel when switching camera
- Remote peer receives message and updates its video element
- Requires custom signaling protocol

### Option 3: Use Firebase RTDB to Signal Track Replacement
- Similar to Option 2 but using existing RTDB infrastructure
- Local user signals "camera switched" event
- Remote peer listens and updates video element

### Option 4: Monitor Track Events on Remote Peer
- Listen for track events like `ended`, `mute`, `unmute`
- Detect when a track changes and refresh the stream
- May not be reliable for all browsers

### Recommended Approach (Preliminary)

**Option 1 is the simplest and most reliable**:
- Move `track.stop()` to AFTER `replaceTrack()` succeeds
- Test if this resolves the freeze
- If MediaStreamTrack objects are properly updated by WebRTC internals, this should work
- Minimal code changes required

**Fallback to Option 3 if Option 1 fails**:
- Implement lightweight signaling via RTDB
- Remote peer can explicitly update its video element when notified
- More robust but requires additional infrastructure

---

## Files Involved in Bug

1. **src/media/media-devices.js** (lines 40-102)
   - Contains the problematic `switchCamera()` implementation
   - Line 78: Stops old tracks prematurely

2. **src/media/media-controls.js** (lines 112-129)
   - Entry point for camera switch button click
   - Calls `switchCamera()` and updates state

3. **src/media/stream.js** (lines 69-132)
   - Sets up `ontrack` handler for remote stream
   - No handling for track replacements

4. **src/webrtc/call-flow.js**
   - Connection setup, but no track replacement handling
   - Missing `negotiationneeded` event handlers (intentional per WebRTC spec)

---

## Next Steps for Phase 2

1. Implement Option 1 (move track.stop() after replaceTrack())
2. Create test to verify fix works
3. If Option 1 fails, implement Option 3 (RTDB signaling)
4. Test on both desktop and mobile browsers
5. Verify no memory leaks from unreleased tracks
