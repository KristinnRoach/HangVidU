// src/webrtc/call-flow.js

/**
 * High-level call flow orchestration for WebRTC connections.
 * This module provides clear, unambiguous APIs for:
 * - Creating a call (initiator flow)
 * - Answering a call (joiner flow)
 *
 * Each flow is self-contained and easy to follow from top to bottom.
 */

import { ref } from 'firebase/database';
import { onDataChange, rtdb } from '../storage/fb-rtdb/rtdb.js';
import { getUserId } from '../firebase/auth.js';
import { updateStatus } from '../utils/ui/status.js';
import { devDebug } from '../utils/dev/dev-utils.js';

import { drainIceCandidateQueue, setupIceCandidates } from '../webrtc/ice.js';
import { setupConnectionStateHandlers } from '../webrtc/webrtc.js';
import { setupDataChannel } from '../webrtc/data-channel.js';
import {
  rtcConfig,
  addLocalTracks,
  createOffer,
  createAnswer,
  setRemoteDescription,
  generateRoomId,
} from '../webrtc/webrtc-utils.js';

import RoomService from '../room.js';

// ============================================================================
// INITIATOR FLOW: Create a new call and wait for partner to join
// ============================================================================

/**
 * Create a new call as the initiator.
 *
 * Flow:
 * 1. Validate prerequisites (local stream available)
 * 2. Create peer connection with local tracks
 * 3. Setup data channel, remote stream, ICE, and connection handlers
 * 4. Generate offer SDP and save to Firebase
 * 5. Listen for answer from joiner
 * 6. Setup room membership and watch-together sync
 *
 * @param {Object} options - Configuration options
 * @param {MediaStream} options.localStream - Local media stream (required)
 * @param {HTMLVideoElement} options.remoteVideoEl - Remote video element (required)
 * @param {HTMLButtonElement} options.mutePartnerBtn - Mute partner button (required)
 * @param {Function} options.setupRemoteStream - Function to setup remote stream handler
 * @param {Function} options.setupWatchSync - Function to setup watch-together sync
 * @param {Function} options.onMemberJoined - Callback when partner joins
 * @param {Function} options.onMemberLeft - Callback when partner leaves
 * @param {string} [options.targetRoomId] - Specific room ID to use (optional, generates random if not provided)
 *
 * @returns {Promise<{ success: boolean, pc: RTCPeerConnection, roomId: string, roomLink: string, dataChannel: RTCDataChannel, messagesUI: object }>}
 */
export async function createCall({
  localStream,
  remoteVideoEl,
  mutePartnerBtn,
  setupRemoteStream,
  setupWatchSync,
  onMemberJoined,
  onMemberLeft,
  targetRoomId = null,
}) {
  // ─────────────────────────────────────────────────────────────────────────
  // 1. VALIDATE PREREQUISITES
  // ─────────────────────────────────────────────────────────────────────────
  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return { success: false };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. CREATE PEER CONNECTION
  // ─────────────────────────────────────────────────────────────────────────
  const pc = new RTCPeerConnection(rtcConfig);
  const role = 'initiator';
  const roomId = targetRoomId || generateRoomId();
  const userId = getUserId();

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SETUP CONNECTION COMPONENTS
  // ─────────────────────────────────────────────────────────────────────────

  // 3a. Add local media tracks
  addLocalTracks(pc, localStream);

  // 3b. Setup data channel for text chat
  const { dataChannel, messagesUI } = setupDataChannel(pc, role);

  // 3c. Setup remote stream handler
  const remoteStreamSuccess = setupRemoteStream(
    pc,
    remoteVideoEl,
    mutePartnerBtn
  );
  if (!remoteStreamSuccess) {
    updateStatus('Error setting up remote stream');
    console.error('Error setting up remote stream');
    pc.close();
    return { success: false };
  }

  // 3d. Setup ICE candidate gathering and exchange
  setupIceCandidates(pc, role, roomId);

  // 3e. Setup connection state monitoring
  setupConnectionStateHandlers(pc);

  // ─────────────────────────────────────────────────────────────────────────
  // 4. CREATE AND SAVE OFFER
  // ─────────────────────────────────────────────────────────────────────────
  const offer = await createOffer(pc);
  await RoomService.createNewRoom(offer, userId, roomId);

  devDebug('Peer connection created as initiator', { roomId, userId });

  // ─────────────────────────────────────────────────────────────────────────
  // 5. LISTEN FOR ANSWER FROM JOINER
  // ─────────────────────────────────────────────────────────────────────────
  const answerRef = ref(rtdb, `rooms/${roomId}/answer`);
  const answerCallback = async (snapshot) => {
    const answer = snapshot.val();
    if (answer) {
      await setRemoteDescription(pc, answer, drainIceCandidateQueue);
    }
  };
  onDataChange(answerRef, answerCallback);

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SETUP ROOM AND SYNC
  // ─────────────────────────────────────────────────────────────────────────

  // 6a. Setup watch-together sync
  setupWatchSync(roomId, role, userId);

  // 6b. Setup member join/leave listeners
  RoomService.onMemberJoined(roomId, (snapshot) => {
    if (snapshot.key !== userId) {
      onMemberJoined(snapshot.key, roomId);
    }
  });

  RoomService.onMemberLeft(roomId, (snapshot) => {
    if (snapshot.key !== userId && pc?.connectionState === 'connected') {
      onMemberLeft(snapshot.key);
    }
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 7. RETURN SUCCESS WITH CONNECTION ARTIFACTS
  // ─────────────────────────────────────────────────────────────────────────
  const roomLink = `${window.location.origin}${window.location.pathname}?room=${roomId}`;

  updateStatus('Waiting for partner to join...');

  return {
    success: true,
    pc,
    roomId,
    roomLink,
    dataChannel,
    messagesUI,
    role,
  };
}

// ============================================================================
// JOINER FLOW: Answer an existing call
// ============================================================================

/**
 * Answer an existing call as the joiner.
 *
 * Flow:
 * 1. Validate prerequisites (local stream, room exists with offer)
 * 2. Create peer connection with local tracks
 * 3. Setup data channel, remote stream, ICE, and connection handlers
 * 4. Set remote offer, create answer, and save to Firebase
 * 5. Join room as member and setup listeners
 *
 * @param {Object} options - Configuration options
 * @param {string} options.roomId - Room ID to join (required)
 * @param {MediaStream} options.localStream - Local media stream (required)
 * @param {HTMLVideoElement} options.remoteVideoEl - Remote video element (required)
 * @param {HTMLButtonElement} options.mutePartnerBtn - Mute partner button (required)
 * @param {Function} options.setupRemoteStream - Function to setup remote stream handler
 * @param {Function} options.setupWatchSync - Function to setup watch-together sync
 * @param {Function} options.onMemberJoined - Callback when partner joins
 * @param {Function} options.onMemberLeft - Callback when partner leaves
 *
 * @returns {Promise<{ success: boolean, pc: RTCPeerConnection, roomId: string, dataChannel: RTCDataChannel, messagesUI: object }>}
 */
export async function answerCall({
  roomId,
  localStream,
  remoteVideoEl,
  mutePartnerBtn,
  setupRemoteStream,
  setupWatchSync,
  onMemberJoined,
  onMemberLeft,
}) {
  // ─────────────────────────────────────────────────────────────────────────
  // 1. VALIDATE PREREQUISITES
  // ─────────────────────────────────────────────────────────────────────────

  devDebug('answerCall', { roomId });

  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return { success: false };
  }

  if (!roomId) {
    updateStatus('Error: No room ID');
    return { success: false };
  }

  // Check room status
  const roomStatus = await RoomService.checkRoomStatus(roomId);
  if (!roomStatus.exists) {
    updateStatus('Error: Invalid room link');
    return { success: false };
  }
  if (!roomStatus.hasMembers) {
    updateStatus('Error: Room is empty - no one to connect with');
    return { success: false };
  }

  // Get offer from room
  let roomData;
  try {
    roomData = await RoomService.getRoomData(roomId);
  } catch (error) {
    updateStatus('Error: ' + error.message);
    return { success: false };
  }

  const offer = roomData.offer;
  if (!offer) {
    updateStatus('Error: No offer found');
    return { success: false };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. CREATE PEER CONNECTION
  // ─────────────────────────────────────────────────────────────────────────
  const pc = new RTCPeerConnection(rtcConfig);
  const role = 'joiner';
  const userId = getUserId();

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SETUP CONNECTION COMPONENTS
  // ─────────────────────────────────────────────────────────────────────────

  // 3a. Add local media tracks
  addLocalTracks(pc, localStream);

  // 3b. Setup data channel (will receive from initiator)
  const { dataChannel, messagesUI } = setupDataChannel(pc, role);

  // 3c. Setup remote stream handler
  const remoteStreamSuccess = setupRemoteStream(
    pc,
    remoteVideoEl,
    mutePartnerBtn
  );
  if (!remoteStreamSuccess) {
    updateStatus('Error setting up remote stream');
    console.error('Error setting up remote stream for joiner');
    pc.close();
    return { success: false };
  }

  // 3d. Setup ICE candidate gathering and exchange
  setupIceCandidates(pc, role, roomId);

  // 3e. Setup connection state monitoring
  setupConnectionStateHandlers(pc);

  devDebug('Peer connection created as joiner', { roomId });

  // ─────────────────────────────────────────────────────────────────────────
  // 4. EXCHANGE SDP: SET OFFER, CREATE ANSWER
  // ─────────────────────────────────────────────────────────────────────────

  // 4a. Set remote offer
  await setRemoteDescription(pc, offer, drainIceCandidateQueue);

  // 4b. Create and save answer
  const answer = await createAnswer(pc);
  try {
    await RoomService.saveAnswer(roomId, answer);
  } catch (err) {
    console.error('Failed to save answer to Firebase:', err);
    updateStatus('Failed to send answer to partner.');
    pc.close();
    return { success: false };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 5. JOIN ROOM AND SETUP SYNC
  // ─────────────────────────────────────────────────────────────────────────

  // 5a. Setup watch-together sync
  setupWatchSync(roomId, role, userId);

  // 5b. Join as member
  await RoomService.joinRoom(roomId, userId);

  // 5c. Setup member join/leave listeners
  RoomService.onMemberJoined(roomId, (snapshot) => {
    if (snapshot.key !== userId) {
      onMemberJoined(snapshot.key, roomId);
    }
  });

  RoomService.onMemberLeft(roomId, (snapshot) => {
    if (snapshot.key !== userId && pc?.connectionState === 'connected') {
      onMemberLeft(snapshot.key);
    }
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 6. RETURN SUCCESS WITH CONNECTION ARTIFACTS
  // ─────────────────────────────────────────────────────────────────────────
  updateStatus('Connecting...');

  return {
    success: true,
    pc,
    roomId,
    dataChannel,
    messagesUI,
    role,
  };
}

// ============================================================================
// HELPER: Determine if should join or create
// ============================================================================

/**
 * Join an existing room or create a new one if it doesn't exist.
 * This is useful for handling custom room IDs where the user might be
 * either the first or second person to arrive.
 *
 * @param {string} customRoomId - The room ID to join or create
 * @param {Object} createOptions - Options for createCall (used if creating)
 * @param {Object} answerOptions - Options for answerCall (used if joining)
 * @returns {Promise<Object>} Result from either createCall or answerCall
 */
export async function joinOrCreateRoom(
  customRoomId,
  createOptions,
  answerOptions
) {
  const status = await RoomService.checkRoomStatus(customRoomId);

  if (!status.exists) {
    // Room doesn't exist - create it
    updateStatus('Creating room...');
    return await createCall({ ...createOptions, targetRoomId: customRoomId });
  }

  if (!status.hasMembers) {
    // Room exists but empty - create new call with this ID
    updateStatus('Room is empty, creating new call...');
    return await createCall({ ...createOptions, targetRoomId: customRoomId });
  }

  // Room exists with members - join as joiner
  updateStatus('Joining room...');
  return await answerCall({ ...answerOptions, roomId: customRoomId });
}
