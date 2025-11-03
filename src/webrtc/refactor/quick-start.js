// QUICK-START CHECKLIST
// ============================================================================
// Copy-paste ready implementation steps
// ============================================================================

// ============================================================================
// ✓ STEP 1: Create New Files (5 min)
// ============================================================================

// Create these three files in your src/p2p/ folder:
//
// 1. src/p2p/webrtc.js
//    → Copy from webrtc-peer.js artifact
//
// 2. src/p2p/room.js
//    → Copy from room.js artifact
//
// 3. src/p2p/firebase-signaling.js
//    → Copy from firebase-signaling.js artifact

// ============================================================================
// ✓ STEP 2: Update Imports in main.js (2 min)
// ============================================================================

// Add at top of main.js:
import { Room } from './p2p/room.js';
import { FirebaseSignaling } from './p2p/firebase-signaling.js';

// ============================================================================
// ✓ STEP 3: Update Global State (3 min)
// ============================================================================

// REMOVE these lines from main.js:
// let pc = null;
// let dataChannel = null;
// let role = null;
// let lastAnswerSdp = null;
// let lastOfferSdp = null;
// let makingOffer = false;
// let ignoreOffer = false;

// ADD this line to main.js:
let room = null;

// KEEP everything else in global state

// ============================================================================
// ✓ STEP 4: Refactor createCall() (15 min)
// ============================================================================

// Replace entire createCall() function with:

async function createCall(targetPeerId = null) {
  const localStream = getLocalStream();
  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return false;
  }

  if (!roomId) {
    roomId = Math.random().toString(36).substring(2, 15);
  }

  lastRoomId = roomId;
  const { currentRoomLink } = joinRoom(roomId);

  const signaling = new FirebaseSignaling(
    rtdb,
    roomId,
    peerId,
    targetPeerId || 'unknown'
  );

  room = new Room(
    {
      roomId,
      userId: peerId,
      iceServers: rtcConfig.iceServers,
    },
    signaling,
    {
      onRemoteStream: (stream) => {
        remoteVideoEl.srcObject = stream;
      },
      onConnectionStateChange: async (state) => {
        devDebug('Connection state:', state);

        if (state === 'connected') {
          updateStatus('Connected!');
          enterCallMode();

          if (lastPartnerId && roomId && auth.currentUser) {
            try {
              await saveContact(roomId, {
                uid: lastPartnerId,
                displayName: null,
                photoURL: null,
              });
              console.log('Contact saved:', lastPartnerId);
            } catch (error) {
              console.warn('Failed to save contact:', error);
            }
          }
        } else if (state === 'disconnected') {
          updateStatus('Partner disconnected');
          exitCallMode();
          clearUrlParam();
          hangUp();
        } else if (state === 'failed') {
          updateStatus('Connection failed');
          clearUrlParam();
        }
      },
      onError: (error) => {
        console.error('WebRTC error:', error);
        updateStatus(`Error: ${error.message}`);
      },
    }
  );

  try {
    await room.join({ video: true, audio: true });
    devDebug('Room joined successfully');
  } catch (error) {
    console.error('Failed to join room:', error);
    updateStatus('Error: Failed to initialize media');
    return false;
  }

  setupWatchSync(roomId, 'initiator', peerId);
  setupRoomMembers();

  if (!targetPeerId) {
    showCopyLinkModal(currentRoomLink, {
      onCopy: () => updateStatus('Link ready! Share with your partner.'),
      onCancel: () => {
        updateStatus('Call cancelled. Click "Start New Chat" to try again.');
        hangUp();
      },
    });
  }

  updateStatus('Waiting for partner to join...');
  copyLinkBtn.disabled = false;

  return true;
}

// ============================================================================
// ✓ STEP 5: Refactor answerCall() (15 min)
// ============================================================================

// Replace entire answerCall() function with:

async function answerCall() {
  const localStream = getLocalStream();

  devDebug('answerCall roomId:', roomId);

  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return false;
  }

  if (!roomId) {
    if (lastRoomId) {
      roomId = lastRoomId;
      devDebug('Using lastRoomId for answerCall:', roomId);
    } else {
      updateStatus('Error: No room ID to join');
      return false;
    }
  }

  lastRoomId = roomId;

  // Validate room exists
  const roomRef = ref(rtdb, `rooms/${roomId}`);
  const roomSnapshot = await get(roomRef);

  if (!roomSnapshot.exists()) {
    updateStatus('Error: Invalid room link');
    return false;
  }

  const signaling = new FirebaseSignaling(
    rtdb,
    roomId,
    peerId,
    'initiator-peer-id'
  );

  room = new Room(
    {
      roomId,
      userId: peerId,
      iceServers: rtcConfig.iceServers,
    },
    signaling,
    {
      onRemoteStream: (stream) => {
        remoteVideoEl.srcObject = stream;
      },
      onConnectionStateChange: async (state) => {
        devDebug('Connection state:', state);

        if (state === 'connected') {
          updateStatus('Connected!');
          enterCallMode();

          if (lastPartnerId && roomId && auth.currentUser) {
            try {
              await saveContact(roomId, {
                uid: lastPartnerId,
                displayName: null,
                photoURL: null,
              });
            } catch (error) {
              console.warn('Failed to save contact:', error);
            }
          }
        } else if (state === 'disconnected') {
          updateStatus('Partner disconnected');
          exitCallMode();
          clearUrlParam();
          hangUp();
        } else if (state === 'failed') {
          updateStatus('Connection failed');
          clearUrlParam();
        }
      },
      onError: (error) => {
        console.error('WebRTC error:', error);
        updateStatus(`Error: ${error.message}`);
      },
    }
  );

  try {
    await room.join({ video: true, audio: true });
    devDebug('Room joined successfully');
  } catch (error) {
    console.error('Failed to join room:', error);
    updateStatus('Error: Failed to initialize media');
    return false;
  }

  setupWatchSync(roomId, 'joiner', peerId);
  setupRoomMembers();

  enterCallMode();
  updateStatus('Connecting...');

  return true;
}

// ============================================================================
// ✓ STEP 6: Simplify hangUp() (10 min)
// ============================================================================

// Replace entire hangUp() function with:

async function hangUp() {
  if (isHangingUp) return;
  isHangingUp = true;

  console.debug('Hanging up...');

  if (room) {
    room.leave();
    room = null;
  }

  cleanupMediaControls();

  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((err) => console.error(err));
  }

  exitCallMode();

  if (messagesUI && messagesUI.cleanup) {
    messagesUI.cleanup();
    messagesUI = null;
  }

  roomId = null;

  window.history.replaceState({}, document.title, window.location.pathname);

  updateStatus('Disconnected. Click "Start New Chat" to begin.');

  isHangingUp = false;
}

// ============================================================================
// ✓ STEP 7: Remove Unnecessary Functions (5 min)
// ============================================================================

// DELETE these functions from main.js (no longer needed):
//
// - setupIceCandidates()
// - setupRemoteStream()
// - setupConnectionStateHandlers() [move logic to Room callbacks above]

// KEEP all other functions (they still work fine)

// ============================================================================
// ✓ STEP 8: Remove OLD ICE handling imports (2 min)
// ============================================================================

// REMOVE this import line (if present):
// import { setupIceCandidates } from './p2p/ice.js';

// REMOVE this call (if present):
// setupIceCandidates(pc, role, roomId);

// ============================================================================
// ✓ STEP 9: Test It! (30-45 min)
// ============================================================================

// 1. Run: npm run dev
//
// 2. Open browser console and check for errors
//
// 3. Test initiator flow:
//    - Click "Start New Chat"
//    - Should see room ID generated
//    - Copy link button should work
//    - Should see "Waiting for partner to join..." status
//
// 4. Test joiner flow:
//    - Open link in another browser/window
//    - Should connect after initiator joins
//    - Should see "Connected!" status
//    - Remote video should appear
//
// 5. Test disconnect:
//    - Close one browser tab
//    - Other peer should show "Partner disconnected"
//    - Should be able to start new call
//
// 6. Test rejoin:
//    - Create new call
//    - Partner joins
//    - Disconnect
//    - Click "Rejoin" button
//    - Should reconnect to same room

// ============================================================================
// ✓ STEP 10: Verify Existing Features Still Work (15 min)
// ============================================================================

// Test these features still work:
// - [ ] Watch-together mode (W key)
// - [ ] Media controls (Mute, Camera, Camera switch)
// - [ ] Chat messages (M key)
// - [ ] Picture-in-Picture
// - [ ] Mobile orientation changes
// - [ ] Share video by URL

// ============================================================================
// TROUBLESHOOTING DURING TESTING
// ============================================================================

// Problem: "Cannot read property 'pc' of null"
// Solution: Make sure you're not accessing room.pc before room.join() completes
//           Room might not be fully initialized yet

// Problem: Connection fails immediately
// Solution: Check console for errors, usually:
//           - Network/firewall blocking WebRTC
//           - Invalid Firebase references
//           - Missing ICE servers for NAT traversal

// Problem: Remote video doesn't appear
// Solution: Check that onRemoteStream callback is firing:
//           devDebug('Remote stream received:', stream);
//           Make sure remoteVideoEl.srcObject = stream; is executed

// Problem: Perfect negotiation errors
// Solution: These are rare - Room handles collisions automatically
//           Check console.error() output for specific error messages
//           Try refreshing and reconnecting

// Problem: Firebase listener errors
// Solution: Make sure Firebase credentials in .env are correct
//           Check that roomId is a valid path
//           Check that userId (peerId) is set correctly

// ============================================================================
// COMMON GOTCHAS
// ============================================================================

// ❌ Gotcha 1: Accessing room.pc.connectionState directly
// ✓ Instead: Use room.getConnectionState()

// ❌ Gotcha 2: Not awaiting room.join()
// ✓ Instead: await room.join({ video: true, audio: true });

// ❌ Gotcha 3: Creating multiple Room instances for same room
// ✓ Instead: Create one Room per user, reuse it or call room.leave() before new Room

// ❌ Gotcha 4: Not handling onRemoteStream callback
// ✓ Instead: Always provide callback to attach remote video:
//            onRemoteStream: (stream) => { remoteVideoEl.srcObject = stream; }

// ❌ Gotcha 5: Forgetting to call room.leave() in hangUp()
// ✓ Instead: Always clean up: room.leave(); room = null;

// ============================================================================
// TIME ESTIMATES
// ============================================================================

// Setup & Copy Files: 5 min
// Add Imports: 2 min
// Update Global State: 3 min
// Refactor createCall(): 15 min
// Refactor answerCall(): 15 min
// Simplify hangUp(): 10 min
// Remove Old Code: 5 min
// Remove Old Imports: 2 min
// Testing & Debugging: 30-45 min
// ────────────────────────────
// Total: 2-3 hours

// ============================================================================
// SUCCESS INDICATORS
// ============================================================================

// After refactor, you should see:
//
// ✓ Fewer lines of WebRTC boilerplate (50% reduction)
// ✓ Same Firebase structure (no migration needed)
// ✓ All existing features working
// ✓ No perfect negotiation collision bugs
// ✓ Cleaner, more maintainable code
// ✓ Easier to debug (everything in Room)
// ✓ Easier to add features (extend WebRTCPeer/Room)

// ============================================================================
// NEXT STEPS
// ============================================================================

// After successful refactor:
//
// 1. Commit changes: git commit -m "refactor: migrate to WebRTC utilities"
//
// 2. Optional enhancements:
//    - Add dataChannel support to WebRTCPeer
//    - Add statistics monitoring
//    - Add screen sharing
//    - Add voice activity detection
//
// 3. Consider adding tests with Playwright
//
// 4. Monitor for any edge cases in production
//
// 5. Clean up any remaining technical debt
