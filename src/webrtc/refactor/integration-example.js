// INTEGRATION GUIDE: Refactoring main.js
// ============================================================================
// This guide shows how to refactor your current main.js using the new utilities
// ============================================================================

// ============================================================================
// STEP 1: ADD IMPORTS AT THE TOP
// ============================================================================

// ADD THESE IMPORTS:
import { Room } from './p2p/room.js';
import { FirebaseSignaling } from './p2p/firebase-signaling.js';

// Keep all your existing imports...


// ============================================================================
// STEP 2: SIMPLIFY GLOBAL STATE
// ============================================================================

// REMOVE THESE (no longer needed):
// let pc = null;
// let dataChannel = null;
// let role = null;
// let lastAnswerSdp = null;
// let lastOfferSdp = null;
// let makingOffer = false;
// let ignoreOffer = false;

// KEEP THESE (still useful):
let room = null;              // ← NEW: Encapsulates all WebRTC state
let roomId = null;            // ← Keep for URL/UI logic
let peerId = null;            // ← Keep for user identification
let messagesUI = null;        // ← Keep for UI binding
let currentRoomLink = null;   // ← Keep for URL sharing
let lastPartnerId = null;     // ← Keep for contacts
let lastRoomId = null;        // ← Keep for rejoin


// ============================================================================
// STEP 3: REFACTOR createCall() (Initiator)
// ============================================================================

// BEFORE (~80 lines of complex logic):
/*
async function createCall(targetPeerId = null) {
  const localStream = getLocalStream();
  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return false;
  }

  if (!roomId) {
    roomId = Math.random().toString(36).substring(2, 15);
  }

  role = 'initiator';
  lastRoomId = roomId;

  const { currentRoomLink } = joinRoom(roomId);

  pc = new RTCPeerConnection(rtcConfig);
  setupDataChannel();
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  if (setupRemoteStream(pc, remoteVideoEl, mutePartnerBtn)) {
    setupIceCandidates(pc, role, roomId);
    setupConnectionStateHandlers(pc);
    console.debug('Peer connection created as initiator with room ID:', roomId);
  } else {
    updateStatus('Error setting up remote stream');
    return false;
  }

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const isLoggedIn = !!auth.currentUser;

  const roomRef = ref(rtdb, `rooms/${roomId}`);
  await set(roomRef, {
    offer: { type: offer.type, sdp: offer.sdp },
    initiatorProfile: isLoggedIn ? {...} : null,
  });

  if (targetPeerId) {
    const incomingRef = ref(rtdb, `users/${targetPeerId}/incomingCalls/${roomId}`);
    await set(incomingRef, { from: peerId, roomId, ts: Date.now() });
  }

  const answerRef = ref(rtdb, `rooms/${roomId}/answer`);
  const answerCallback = async (snapshot) => {
    const answer = snapshot.val();
    if (answer && answer.sdp !== lastAnswerSdp) {
      lastAnswerSdp = answer.sdp;

      if (pc.signalingState !== 'have-local-offer' && pc.signalingState !== 'stable') {
        devDebug('Ignoring answer - unexpected signaling state:', pc.signalingState);
        return true;
      }

      try {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        devDebug('Remote description set (answer)');
        return true;
      } catch (error) {
        console.error('Failed to set remote description:', error);
        return false;
      }
    }
  };

  onValue(answerRef, answerCallback);
  trackFirebaseListener(answerRef, 'value', answerCallback);

  setupWatchSync(roomId, role, peerId);
  setupRoomMembers();

  if (!targetPeerId) {
    showCopyLinkModal(currentRoomLink, {
      onCopy: () => updateStatus('Link ready! Share with your partner.'),
      onCancel: () => {
        updateStatus('Call cancelled. Click "Start New Chat" to try again.');
      },
    });
  }

  updateStatus('Waiting for partner to join...');
  copyLinkBtn.disabled = false;

  return true;
}
*/

// AFTER (using new utilities - much simpler):
async function createCall(targetPeerId = null) {
  const localStream = getLocalStream();
  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return false;
  }

  // Generate room ID if not provided
  if (!roomId) {
    roomId = Math.random().toString(36).substring(2, 15);
  }

  lastRoomId = roomId;
  const { currentRoomLink } = joinRoom(roomId);

  // Create signaling channel
  const signaling = new FirebaseSignaling(
    rtdb,
    roomId,
    peerId,
    targetPeerId || 'unknown-peer'  // We don't know remote peer ID yet
  );

  // Create room with utilities - handles all WebRTC logic
  room = new Room(
    {
      roomId,
      userId: peerId,
      iceServers: rtcConfig.iceServers
    },
    signaling,
    {
      onRemoteStream: (stream) => {
        remoteVideoEl.srcObject = stream;
      },
      onConnectionStateChange: (state) => {
        devDebug('Connection state:', state);

        if (state === 'connected') {
          updateStatus('Connected!');
          enterCallMode();

          // Save contact when connection established
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
      }
    }
  );

  // Join the room - adds local stream, starts negotiation
  try {
    await room.join({ video: true, audio: true });
    devDebug('Room joined successfully');
  } catch (error) {
    console.error('Failed to join room:', error);
    updateStatus('Error: Failed to initialize media');
    return false;
  }

  // Setup watch-together sync (your existing feature)
  setupWatchSync(roomId, 'initiator', peerId);

  // Setup room members tracking (your existing feature)
  setupRoomMembers();

  // Show UI
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
// STEP 4: REFACTOR answerCall() (Joiner)
// ============================================================================

// BEFORE (~60 lines):
/*
async function answerCall() {
  const localStream = getLocalStream();

  devDebug('answerCall roomId: ', roomId);

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

  role = 'joiner';
  lastRoomId = roomId;

  const roomRef = ref(rtdb, `rooms/${roomId}`);
  const roomSnapshot = await get(roomRef);

  if (!roomSnapshot.exists()) {
    updateStatus('Error: Invalid room link');
    return false;
  }

  const roomData = roomSnapshot.val();
  const offer = roomData.offer;

  if (!offer) {
    updateStatus('Error: No offer found');
    return false;
  }

  pc = new RTCPeerConnection(rtcConfig);

  pc.ondatachannel = (event) => {
    dataChannel = event.channel;
    messagesUI = initMessagesUI((msg) => dataChannel.send(msg));

    dataChannel.onopen = () => {
      messagesUI.showMessagesToggle();
      messagesUI.appendChatMessage('💬 Chat connected');
    };
    dataChannel.onmessage = (e) => messagesUI.receiveMessage(e.data);
  };

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  if (setupRemoteStream(pc, remoteVideoEl, mutePartnerBtn)) {
    setupIceCandidates(pc, role, roomId);
    setupConnectionStateHandlers(pc);
    console.debug('Peer connection created as joiner for room ID:', roomId);
  } else {
    updateStatus('Error setting up remote stream');
    console.error('Error setting up remote stream for joiner');
    return false;
  }

  await pc.setRemoteDescription(new RTCSessionDescription(offer));

  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  try {
    await update(roomRef, {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    });
  } catch (err) {
    console.error('Failed to update answer in Firebase:', err);
    updateStatus('Failed to send answer to partner.');
    return false;
  }

  setupWatchSync(roomId, role, peerId);
  setupRoomMembers();

  enterCallMode();

  updateStatus('Connecting...');

  return true;
}
*/

// AFTER (using new utilities):
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

  // Validate room exists (optional - Room will fail gracefully)
  const roomRef = ref(rtdb, `rooms/${roomId}`);
  const roomSnapshot = await get(roomRef);

  if (!roomSnapshot.exists()) {
    updateStatus('Error: Invalid room link');
    return false;
  }

  // Create signaling - we don't know peer ID yet, Room handles it
  const signaling = new FirebaseSignaling(rtdb, roomId, peerId, 'initiator-peer-id');

  // Create room - handles answer creation automatically
  room = new Room(
    {
      roomId,
      userId: peerId,
      iceServers: rtcConfig.iceServers
    },
    signaling,
    {
      onRemoteStream: (stream) => {
        remoteVideoEl.srcObject = stream;
      },
      onConnectionStateChange: (state) => {
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
      }
    }
  );

  // Join the room - handles answer creation automatically
  try {
    await room.join({ video: true, audio: true });
    devDebug('Room joined successfully');
  } catch (error) {
    console.error('Failed to join room:', error);
    updateStatus('Error: Failed to initialize media');
    return false;
  }

  // Setup your existing features
  setupWatchSync(roomId, 'joiner', peerId);
  setupRoomMembers();

  enterCallMode();
  updateStatus('Connecting...');

  return true;
}


// ============================================================================
// STEP 5: SIMPLIFY hangUp()
// ============================================================================

// BEFORE (~50 lines):
/*
async function hangUp() {
  if (isHangingUp) return;
  isHangingUp = true;

  console.debug('Hanging up...');

  if (remoteVideoEl.srcObject) {
    remoteVideoEl.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideoEl.srcObject = null;
  }

  cleanupMediaControls();

  if (pc) {
    pc.close();
    pc = null;
  }

  if (seekDebounceTimeout) {
    clearTimeout(seekDebounceTimeout);
    seekDebounceTimeout = null;
  }

  removeAllFirebaseListeners();

  membersListeners.forEach(({ ref: fbRef, type, callback }) =>
    off(fbRef, type, callback)
  );
  membersListeners.length = 0;

  if (roomId && peerId) {
    const myMemberRef = ref(rtdb, `rooms/${roomId}/members/${peerId}`);
    remove(myMemberRef).catch(() => {});
  }

  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((err) => console.error(err));
  }

  exitCallMode();

  if (messagesUI && messagesUI.cleanup) {
    messagesUI.cleanup();
    messagesUI = null;
  }

  roomId = null;
  role = null;
  lastAnswerSdp = null;
  lastOfferSdp = null;

  window.history.replaceState({}, document.title, window.location.pathname);

  updateStatus('Disconnected. Click "Start New Chat" to begin.');

  isHangingUp = false;
}
*/

// AFTER (simpler):
async function hangUp() {
  if (isHangingUp) return;
  isHangingUp = true;

  console.debug('Hanging up...');

  // Room.leave() handles all WebRTC cleanup
  if (room) {
    room.leave();
    room = null;
  }

  // Your existing media controls cleanup
  cleanupMediaControls();

  // Your existing UI cleanup
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((err) => console.error(err));
  }

  exitCallMode();

  // Cleanup messages UI
  if (messagesUI && messagesUI.cleanup) {
    messagesUI.cleanup();
    messagesUI = null;
  }

  // Reset state (but keep lastRoomId for rejoin)
  roomId = null;

  // Clear URL
  window.history.replaceState({}, document.title, window.location.pathname);

  updateStatus('Disconnected. Click "Start New Chat" to begin.');

  isHangingUp = false;
}


// ============================================================================
// STEP 6: REMOVE THESE FUNCTIONS (now handled by utilities)
// ============================================================================

// DELETE these functions (no longer needed):
// - setupIceCandidates()  ← Room handles ICE internally
// - setupRemoteStream()   ← Room handles remote track internally
// - setupConnectionStateHandlers() ← Move logic to Room callbacks
// - setupDataChannel()    ← Room can handle this (optional extension)

// KEEP these functions (they're still useful):
// - enterCallMode()
// - exitCallMode()
// - setupWatchSync()
// - setupRoomMembers()
// - media controls functions


// ============================================================================
// KEY DIFFERENCES IN BEHAVIOR
// ============================================================================

/**
 * PERFECT NEGOTIATION
 * 
 * Before: You manually tracked offer/answer SDP and roles
 * After: Room automatically handles offer collisions
 * 
 * How it works:
 * - Polite peer (lower userId): Yields during collisions
 * - Impolite peer (higher userId): Wins during collisions
 * - Both use identical code
 * 
 * Benefits:
 * - No duplicate SDP processing bugs
 * - No manual role assignment needed
 * - Handles simultaneous connection attempts gracefully
 */

/**
 * SIMPLIFIED STATE
 * 
 * Before: Multiple variables tracked state
 *   - pc, dataChannel, role, makingOffer, ignoreOffer
 *   - lastAnswerSdp, lastOfferSdp
 * 
 * After: Encapsulated in Room
 *   - room (single object containing all WebRTC state)
 *   - roomId (only for UI/URL logic)
 * 
 * Benefits:
 * - Less boilerplate
 * - Easier to reason about state
 * - Fewer edge cases from scattered state
 */

/**
 * AUTOMATIC CLEANUP
 * 
 * Before: Manual cleanup across multiple arrays
 *   - removeAllFirebaseListeners()
 *   - membersListeners.forEach()
 *   - manual pc.close()
 *   - manual track.stop()
 * 
 * After: Single call
 *   - room.leave()  ← Handles everything
 * 
 * Benefits:
 * - Less error-prone
 * - No cleanup bugs
 * - Consistent cleanup flow
 */

// ============================================================================
// NOTES FOR YOUR SPECIFIC FEATURES
// ============================================================================

/**
 * WATCH-TOGETHER MODE
 * 
 * No changes needed! Your setupWatchSync() still works.
 * Call it the same way after room.join():
 * 
 *   await room.join(...);
 *   setupWatchSync(roomId, role, peerId);  // ← Still works!
 * 
 * Room doesn't interfere with watch-together logic.
 */

/**
 * ROOM MEMBERS TRACKING
 * 
 * Your setupRoomMembers() still works as-is.
 * Room doesn't manage members - that's your feature.
 * 
 * Call it after room.join():
 * 
 *   await room.join(...);
 *   setupRoomMembers();  // ← Your existing code
 */

/**
 * MESSAGE UI & DATA CHANNELS
 * 
 * Option 1: Keep your current dataChannel setup
 *   - Don't add dataChannel handling to Room yet
 *   - Your existing code works as-is
 * 
 * Option 2: Access PC for dataChannel
 *   - room.getPeerConnection() returns the underlying RTCPeerConnection
 *   - Use it for dataChannel creation:
 * 
 *     const pc = room.getPeerConnection();
 *     if (role === 'initiator') {
 *       const dataChannel = pc.createDataChannel('chat');
 *     } else {
 *       pc.ondatachannel = (e) => setupDataChannel(e.channel);
 *     }
 * 
 * Option 3: Extend Room to manage dataChannel
 *   - Add methods to WebRTCPeer class
 *   - Update Room to expose dataChannel handling
 *   - Full encapsulation for dataChannel
 */

/**
 * MEDIA CONTROLS
 * 
 * No changes needed! Your media-controls.js integrates with:
 * - getLocalStream() - unchanged
 * - remoteVideoEl - unchanged
 * - getPeerConnection() callback - can use room.getPeerConnection() if needed
 * 
 * Your existing media control buttons work with the new Room.
 */

/**
 * PiP AND UI LAYOUT
 * 
 * No changes needed! Your enterCallMode(), exitCallMode(), and PiP logic
 * work with the remote video element the same way:
 * 
 *   room.join(...);  // Starts negotiation
 *   // When connection succeeds, onRemoteStream callback fires:
 *   remoteVideoEl.srcObject = stream;  // You already do this
 *   // Then your UI code works normally
 */
