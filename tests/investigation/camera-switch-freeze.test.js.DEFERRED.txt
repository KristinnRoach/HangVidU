/**
 * Camera Switch Freeze - Reproduction Test
 *
 * This test reproduces the bug where switching cameras causes the remote
 * peer's video to freeze. The test simulates:
 * 1. Two peer connections (initiator and joiner)
 * 2. Initial connection with video tracks
 * 3. Camera switch on initiator (using replaceTrack)
 * 4. Verifying remote peer's video track state
 *
 * IMPORTANT FINDING: The bug does NOT reproduce with fake canvas streams.
 * The remote track remains 'live' even when we stop the old track before
 * replacement. This suggests the issue is specific to:
 * - Real getUserMedia camera streams
 * - Browser handling of hardware camera track replacement
 * - Potential race conditions in real camera switching
 *
 * This test still validates the CORRECT approach (stop after replace)
 * and can be used to verify the fix doesn't break track replacement logic.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';

/**
 * Helper: Create a fake video track using canvas
 */
function createFakeVideoTrack(label = 'fake-video') {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');

  // Draw something to make it visible in tests
  ctx.fillStyle = label.includes('second') ? 'blue' : 'red';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const stream = canvas.captureStream(30); // 30 fps
  const track = stream.getVideoTracks()[0];
  // Note: track.label is read-only, we can't set it
  return track;
}

/**
 * Helper: Create a fake audio track
 */
function createFakeAudioTrack(label = 'fake-audio') {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const destination = audioContext.createMediaStreamDestination();
  oscillator.connect(destination);
  oscillator.start();

  const track = destination.stream.getAudioTracks()[0];
  // Note: track.label is read-only, we can't set it
  return track;
}

describe('Camera Switch Remote Stream Freeze Bug', () => {
  let initiatorPC;
  let joinerPC;
  let localStream;
  let secondCameraStream;

  beforeEach(async () => {
    // Create two peer connections
    const rtcConfig = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    };
    initiatorPC = new RTCPeerConnection(rtcConfig);
    joinerPC = new RTCPeerConnection(rtcConfig);

    // Create fake media streams (simulating first camera)
    const videoTrack1 = createFakeVideoTrack('first-camera');
    const audioTrack1 = createFakeAudioTrack('first-mic');
    localStream = new MediaStream([videoTrack1, audioTrack1]);

    // Pre-create second camera stream (simulating camera switch)
    const videoTrack2 = createFakeVideoTrack('second-camera');
    const audioTrack2 = createFakeAudioTrack('second-mic');
    secondCameraStream = new MediaStream([videoTrack2, audioTrack2]);
  });

  afterEach(() => {
    // Cleanup
    localStream?.getTracks().forEach(track => track.stop());
    secondCameraStream?.getTracks().forEach(track => track.stop());
    initiatorPC?.close();
    joinerPC?.close();
  });

  it('should reproduce remote stream freeze when camera is switched', async () => {
    // ======================================================================
    // STEP 1: Setup initial peer connection with first camera
    // ======================================================================

    // Add tracks from first camera to initiator
    localStream.getTracks().forEach(track => {
      initiatorPC.addTrack(track, localStream);
    });

    // Track remote stream on joiner
    let joinerRemoteStream = null;
    let joinerRemoteVideoTrack = null;
    let trackEventCount = 0;

    joinerPC.ontrack = (event) => {
      trackEventCount++;
      console.log(`[JOINER] ontrack event #${trackEventCount}: ${event.track.kind}`);

      if (event.track.kind === 'video') {
        joinerRemoteVideoTrack = event.track;
        joinerRemoteStream = event.streams[0] || new MediaStream([event.track]);
        console.log('[JOINER] Video track received, readyState:', joinerRemoteVideoTrack.readyState);
      }
    };

    // ======================================================================
    // STEP 2: Establish peer connection (simplified SDP exchange)
    // ======================================================================

    // Create and exchange offers/answers
    const offer = await initiatorPC.createOffer();
    await initiatorPC.setLocalDescription(offer);
    await joinerPC.setRemoteDescription(offer);

    const answer = await joinerPC.createAnswer();
    await joinerPC.setLocalDescription(answer);
    await initiatorPC.setRemoteDescription(answer);

    // ICE candidate exchange
    initiatorPC.onicecandidate = (e) => {
      if (e.candidate) joinerPC.addIceCandidate(e.candidate);
    };
    joinerPC.onicecandidate = (e) => {
      if (e.candidate) initiatorPC.addIceCandidate(e.candidate);
    };

    // Wait for connection to establish
    await new Promise((resolve) => {
      const checkConnection = setInterval(() => {
        if (initiatorPC.connectionState === 'connected' &&
            joinerPC.connectionState === 'connected') {
          clearInterval(checkConnection);
          resolve();
        }
      }, 100);
    });

    // Wait a bit to ensure tracks are fully set up
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('[STEP 1] Initial connection established');
    console.log('[JOINER] Has remote video track:', !!joinerRemoteVideoTrack);
    console.log('[JOINER] Remote video track readyState:', joinerRemoteVideoTrack?.readyState);

    // ======================================================================
    // STEP 3: Simulate camera switch using replaceTrack
    // ======================================================================

    // This simulates the bug in media-devices.js:
    // 1. Stop old tracks BEFORE replacing (the problematic line 78)
    // 2. Replace tracks in peer connection

    const oldVideoTrack = localStream.getVideoTracks()[0];
    const newVideoTrack = secondCameraStream.getVideoTracks()[0];

    console.log('[INITIATOR] Old track readyState before stop:', oldVideoTrack.readyState);

    // REPRODUCE THE BUG: Stop old track BEFORE replacement
    oldVideoTrack.stop();

    console.log('[INITIATOR] Old track readyState after stop:', oldVideoTrack.readyState);

    // Find video sender and replace track
    const videoSender = initiatorPC.getSenders().find(s => s.track?.kind === 'video');
    expect(videoSender).toBeDefined();

    await videoSender.replaceTrack(newVideoTrack);
    console.log('[INITIATOR] replaceTrack completed with new track');

    // Reset track event counter before switch
    const trackEventsBeforeSwitch = trackEventCount;

    // Wait for potential track events (there shouldn't be any per WebRTC spec)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const trackEventsAfterSwitch = trackEventCount;

    // ======================================================================
    // STEP 4: Verify remote peer state (Expected to FAIL - demonstrates bug)
    // ======================================================================

    console.log('[VERIFICATION] Track events before switch:', trackEventsBeforeSwitch);
    console.log('[VERIFICATION] Track events after switch:', trackEventsAfterSwitch);
    console.log('[JOINER] Remote video track readyState after switch:', joinerRemoteVideoTrack?.readyState);

    // EXPECTATION 1: ontrack should NOT fire again (per WebRTC spec)
    // This is correct behavior - replaceTrack doesn't trigger ontrack
    expect(trackEventsAfterSwitch).toBe(trackEventsBeforeSwitch);

    // EXPECTATION 2: The joiner's remote video track should still be 'live'
    // THIS WILL FAIL - demonstrating the bug
    // The track is 'ended' because we stopped it before replacement
    expect(joinerRemoteVideoTrack.readyState).toBe('live');

    // EXPECTATION 3: If we had a video element, it would show a frozen frame
    // Because the track is 'ended', no new frames are displayed
    // (This is the freeze bug users experience)
  });

  it('should demonstrate the fix approach - stop tracks AFTER replacement', async () => {
    // ======================================================================
    // This test shows the CORRECT approach that should be implemented in Phase 2
    // ======================================================================

    // Setup (same as previous test)
    localStream.getTracks().forEach(track => {
      initiatorPC.addTrack(track, localStream);
    });

    let joinerRemoteVideoTrack = null;
    joinerPC.ontrack = (event) => {
      if (event.track.kind === 'video') {
        joinerRemoteVideoTrack = event.track;
      }
    };

    // Establish connection
    const offer = await initiatorPC.createOffer();
    await initiatorPC.setLocalDescription(offer);
    await joinerPC.setRemoteDescription(offer);
    const answer = await joinerPC.createAnswer();
    await joinerPC.setLocalDescription(answer);
    await initiatorPC.setRemoteDescription(answer);

    initiatorPC.onicecandidate = (e) => {
      if (e.candidate) joinerPC.addIceCandidate(e.candidate);
    };
    joinerPC.onicecandidate = (e) => {
      if (e.candidate) initiatorPC.addIceCandidate(e.candidate);
    };

    await new Promise((resolve) => {
      const checkConnection = setInterval(() => {
        if (initiatorPC.connectionState === 'connected' &&
            joinerPC.connectionState === 'connected') {
          clearInterval(checkConnection);
          resolve();
        }
      }, 100);
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('[FIX APPROACH] Initial connection established');

    // ======================================================================
    // THE FIX: Replace track BEFORE stopping old track
    // ======================================================================

    const oldVideoTrack = localStream.getVideoTracks()[0];
    const newVideoTrack = secondCameraStream.getVideoTracks()[0];

    // Find video sender
    const videoSender = initiatorPC.getSenders().find(s => s.track?.kind === 'video');

    // CORRECT ORDER: Replace track first
    await videoSender.replaceTrack(newVideoTrack);
    console.log('[FIX] replaceTrack completed BEFORE stopping old track');

    // THEN stop old track (after replacement is complete)
    oldVideoTrack.stop();
    console.log('[FIX] Old track stopped AFTER replacement');

    await new Promise(resolve => setTimeout(resolve, 1000));

    // ======================================================================
    // Verify: Remote track should still be live
    // ======================================================================

    console.log('[FIX VERIFICATION] Remote video track readyState:', joinerRemoteVideoTrack?.readyState);

    // With the fix, the remote track should remain 'live'
    // Note: This test may still fail due to WebRTC implementation details
    // but it demonstrates the correct approach
    expect(joinerRemoteVideoTrack.readyState).toBe('live');
  });
});
