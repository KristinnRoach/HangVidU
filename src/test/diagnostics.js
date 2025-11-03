// REMOTE VIDEO DIAGNOSTIC SCRIPT
// ============================================================================
// Copy-paste this into browser console when issue occurs
// ============================================================================

// Quick diagnostic - shows exactly what's wrong
function diagnoseRemoteVideo() {
  console.log('=== REMOTE VIDEO DIAGNOSTICS ===\n');

  // Check 1: Element exists
  const remoteVideoEl = document.getElementById('remote-video-el');
  console.log('1. Remote video element exists:', !!remoteVideoEl);
  if (!remoteVideoEl) {
    console.error('   ERROR: Element not found! Check elements.js');
    return;
  }

  // Check 2: Element is in DOM
  console.log('2. Element is in DOM:', document.body.contains(remoteVideoEl));

  // Check 3: Element is visible
  const isHidden =
    remoteVideoEl.closest('.hidden') ||
    remoteVideoEl.classList.contains('hidden');
  console.log('3. Element is visible (not hidden):', !isHidden);
  if (isHidden) {
    console.warn(
      '   ⚠ Element is hidden - enterCallMode() may not have been called'
    );
  }

  // Check 4: Stream is attached
  const hasStream = !!remoteVideoEl.srcObject;
  console.log('4. Stream attached to element:', hasStream);
  if (hasStream) {
    const stream = remoteVideoEl.srcObject;
    console.log('   └─ Stream:', stream);
    console.log('   └─ Video tracks:', stream.getVideoTracks().length);
    console.log('   └─ Audio tracks:', stream.getAudioTracks().length);

    if (stream.getVideoTracks().length === 0) {
      console.error('   ERROR: No video tracks in stream!');
    }
  } else {
    console.error('   ERROR: No stream attached to video element!');
  }

  // Check 5: Video element has required attributes
  console.log('5. Video element attributes:');
  console.log('   - autoplay:', remoteVideoEl.autoplay);
  console.log('   - playsinline:', remoteVideoEl.playsInline);
  console.log('   - muted:', remoteVideoEl.muted);

  if (!remoteVideoEl.autoplay) {
    console.warn('   ⚠ Missing autoplay attribute!');
  }
  if (!remoteVideoEl.playsInline) {
    console.warn('   ⚠ Missing playsinline attribute (needed for mobile)!');
  }

  // Check 6: Video readyState
  console.log('6. Video element readyState:', remoteVideoEl.readyState);
  console.log('   - 0 = HAVE_NOTHING');
  console.log('   - 1 = HAVE_METADATA');
  console.log('   - 2 = HAVE_CURRENT_DATA');
  console.log('   - 3 = HAVE_FUTURE_DATA');
  console.log('   - 4 = HAVE_ENOUGH_DATA');

  // Check 7: Room/Connection state
  if (typeof room !== 'undefined' && room) {
    console.log('7. Connection state:', room.getConnectionState());
    console.log('   └─ ICE state:', room.getIceConnectionState());
  } else {
    console.log('7. Room not initialized yet');
  }

  // Check 8: Computed styles
  const styles = window.getComputedStyle(remoteVideoEl);
  console.log('8. Computed styles:');
  console.log('   - display:', styles.display);
  console.log('   - visibility:', styles.visibility);
  console.log('   - opacity:', styles.opacity);
  console.log('   - width:', styles.width);
  console.log('   - height:', styles.height);

  console.log('\n=== RECOMMENDATIONS ===');

  if (!hasStream) {
    console.log('✗ Remote stream not received yet. Options:');
    console.log('  1. Wait for connection to fully establish');
    console.log('  2. Check firewall/network blocking WebRTC');
    console.log('  3. Check remote peer is sending video track');
    console.log('  4. Check ICE candidates are exchanging');
  }

  if (isHidden) {
    console.log('✗ Video element is hidden. Call enterCallMode() or check CSS');
  }

  if (!remoteVideoEl.autoplay) {
    console.log('✗ Missing autoplay attribute - add to HTML:');
    console.log('  <video id="remote-video-el" autoplay playsinline></video>');
  }

  console.log('\n=== END DIAGNOSTICS ===');
}

// Run it
diagnoseRemoteVideo();

// ============================================================================
// DEEPER DIAGNOSTICS - Inspect WebRTC internals
// ============================================================================

function deepDiagnostics() {
  console.log('\n=== DEEP WEBRTC DIAGNOSTICS ===\n');

  if (!window.room) {
    console.log('Room not initialized');
    return;
  }

  const pc = window.room.getPeerConnection();
  if (!pc) {
    console.log('No peer connection');
    return;
  }

  console.log('Connection State Machine:');
  console.log('- connectionState:', pc.connectionState);
  console.log('- iceConnectionState:', pc.iceConnectionState);
  console.log('- iceGatheringState:', pc.iceGatheringState);
  console.log('- signalingState:', pc.signalingState);

  console.log('\nRTP Senders (what we send):');
  pc.getSenders().forEach((sender, i) => {
    console.log(
      `  ${i}: ${sender.track?.kind} - ${
        sender.track?.enabled ? 'enabled' : 'disabled'
      }`
    );
  });

  console.log('\nRTP Receivers (what we receive):');
  pc.getReceivers().forEach((receiver, i) => {
    console.log(
      `  ${i}: ${receiver.track?.kind} - ${
        receiver.track?.enabled ? 'enabled' : 'disabled'
      }`
    );
    if (receiver.track?.kind === 'video') {
      console.log('     ↳ This is the remote video track!');
    }
  });

  console.log('\nConnection Stats (may be empty until connected):');
  pc.getStats().then((stats) => {
    stats.forEach((report) => {
      if (report.type === 'inbound-rtp' && report.kind === 'video') {
        console.log('Inbound Video:');
        console.log('  - bytesReceived:', report.bytesReceived);
        console.log('  - packetsLost:', report.packetsLost);
        console.log('  - frameRate:', report.framesPerSecond);
      }
    });
  });
}

// Run it
deepDiagnostics();

// ============================================================================
// EVENT LISTENER DIAGNOSTICS
// ============================================================================

function checkEventListeners() {
  console.log('\n=== EVENT LISTENER DIAGNOSTICS ===\n');

  // Check if onremotestream event is wired
  console.log('Checking WebRTCPeer callbacks...');

  // Unfortunately, we can't directly inspect callbacks, but we can monitor them
  const remoteVideoEl = document.getElementById('remote-video-el');

  // Listen for when stream gets attached
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
        console.log('✓ VIDEO SRC CHANGED');
      }
    });
  });

  // Monitor video element changes
  observer.observe(remoteVideoEl, {
    attributes: true,
    attributeFilter: ['src'],
  });

  // Also listen to loadstart event
  remoteVideoEl.addEventListener('loadstart', () => {
    console.log('✓ VIDEO loadstart event fired');
  });

  remoteVideoEl.addEventListener('loadedmetadata', () => {
    console.log('✓ VIDEO loadedmetadata event fired');
    console.log('  - Duration:', remoteVideoEl.duration);
    console.log(
      '  - Video dimensions:',
      remoteVideoEl.videoWidth,
      'x',
      remoteVideoEl.videoHeight
    );
  });

  remoteVideoEl.addEventListener('playing', () => {
    console.log('✓ VIDEO playing event fired');
  });

  remoteVideoEl.addEventListener('error', (e) => {
    console.error('✗ VIDEO error event:', e);
  });

  console.log('Event listeners attached. Waiting for video events...');
}

// Run it
checkEventListeners();

// ============================================================================
// Firebase Signaling Diagnostics
// ============================================================================

function checkFirebaseSignaling() {
  console.log('\n=== FIREBASE SIGNALING DIAGNOSTICS ===\n');

  // Check if signals are being received
  const rtdb = window.rtdb; // Should be imported in your app
  if (!rtdb) {
    console.log('Firebase RTDB not accessible from window');
    return;
  }

  if (!window.roomId) {
    console.log('No active room');
    return;
  }

  console.log('Active room:', window.roomId);
  console.log('Your peerId:', window.peerId);

  // You can manually check Firebase to see if signals are being stored
  console.log('To verify signals in Firebase:');
  console.log(`1. Go to Firebase Console`);
  console.log(`2. Look in: rooms/${window.roomId}`);
  console.log(`3. You should see:`);
  console.log(`   - Your peerId (with offer/candidates)`);
  console.log(`   - Remote peerId (with answer/candidates)`);
}

checkFirebaseSignaling();

// ============================================================================
// CONVENIENCE FUNCTION - Auto-fix common issues
// ============================================================================

function autoFixRemoteVideo() {
  console.log('\n=== AUTO-FIX ATTEMPT ===\n');

  const remoteVideoEl = document.getElementById('remote-video-el');

  // Fix 1: Make sure it's not hidden
  const remoteBoxEl =
    document.getElementById('remote-video-box') || remoteVideoEl.parentElement;
  if (remoteBoxEl) {
    remoteBoxEl.classList.remove('hidden');
    console.log('✓ Unhid remote video box');
  }

  // Fix 2: Ensure autoplay attributes
  if (!remoteVideoEl.autoplay) {
    remoteVideoEl.autoplay = true;
    console.log('✓ Enabled autoplay');
  }

  if (!remoteVideoEl.playsInline) {
    remoteVideoEl.playsInline = true;
    console.log('✓ Enabled playsinline');
  }

  // Fix 3: Try to play video
  if (remoteVideoEl.srcObject && remoteVideoEl.paused) {
    remoteVideoEl
      .play()
      .then(() => {
        console.log('✓ Started video playback');
      })
      .catch((err) => {
        console.error('✗ Could not play video:', err);
      });
  }

  console.log('\nAuto-fix complete. Check if video appears now.');
}

// Only run if explicitly called:
// autoFixRemoteVideo();

const pc = window.room.getPeerConnection();
const stats = await pc.getStats();
stats.forEach((r) => {
  if (r.type === 'inbound-rtp' && r.kind === 'video') {
    console.log(
      'Video bytes:',
      r.bytesReceived,
      '| Packets lost:',
      r.packetsLost
    );
  }
});
