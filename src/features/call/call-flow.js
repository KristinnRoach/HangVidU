// src/call/call-flow.js

/**
 * High-level call flow orchestration for WebRTC connections.
 * This module provides clear, unambiguous APIs for:
 * - Creating a call (initiator flow)
 * - Answering a call (joiner flow)
 *
 * Each flow is self-contained and easy to follow from top to bottom.
 */

import { getUserId } from '../../auth/index.js';
import { devDebug } from '../../shared/utils/dev/dev-utils.js';
import { showErrorToast } from '../../shared/components/toast.js';
import { t } from '../../shared/i18n/index.js';

import { Peer, generateRoomId } from '../../lib/webrtc/index.js';
import { setupConnectionStateHandlers } from './webrtc.js';
import { createFirebaseCallSignaling } from './signaling/index.js';

import RoomService from './room.js';

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
 * @param {string} [options.targetRoomId] - Specific room ID to use (optional, generates random if not provided)
 *
 * @returns {Promise<{ success: boolean, pc: RTCPeerConnection, roomId: string, roomLink: string, role: string }>}
 */
export async function createCall({
  localStream,
  remoteVideoEl,
  mutePartnerBtn,
  setupRemoteStream,
  setupWatchSync,
  targetRoomId = null,
  audioOnly = false,
}) {
  if (!localStream) {
    devDebug('Error: Camera not initialized');
    return { success: false };
  }

  const role = 'initiator';
  const roomId = targetRoomId || generateRoomId();
  const userId = getUserId();

  // Write room metadata first; Peer will write the offer SDP via the adapter.
  await RoomService.createRoomMetadata(userId, roomId, { audioOnly });

  const signaling = createFirebaseCallSignaling(roomId, role);
  const peer = new Peer({ role, signaling, localStream, audioOnly });

  // Attach before start(): Peer emits 'tracks' errors synchronously inside
  // _initPc, so the listener must be live before the connection spins up.
  peer.on('error', ({ error, phase }) => {
    if (phase === 'tracks' && /audio/.test(String(error?.message))) {
      showErrorToast(t('media.audio_disconnected'));
    }
  });

  // peer.start() creates the RTCPeerConnection synchronously (in _initPc)
  // before any await, so peer.pc is available immediately after the call.
  const startPromise = peer.start();
  const pc = peer.pc;

  const remoteStreamSuccess = setupRemoteStream(
    pc,
    remoteVideoEl,
    mutePartnerBtn,
  );
  if (!remoteStreamSuccess) {
    devDebug('Error setting up remote stream');
    console.error('Error setting up remote stream');
    peer.close();
    return { success: false };
  }

  setupConnectionStateHandlers(pc);

  try {
    await startPromise;
  } catch (error) {
    console.error('Failed to start peer as initiator:', error);
    peer.close();
    return { success: false };
  }

  devDebug('Peer connection created as initiator', { roomId, userId });

  setupWatchSync(roomId, role, userId);

  const APP_ORIGIN = import.meta.env.VITE_APP_URL || window.location.origin;
  const roomLink = `${APP_ORIGIN}${window.location.pathname}?room=${roomId}`;

  devDebug('Waiting for partner to join...');

  return {
    success: true,
    pc,
    peer,
    roomId,
    roomLink,
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
 *
 * @returns {Promise<{ success: boolean, pc: RTCPeerConnection, roomId: string, role: string }>}
 */
export async function answerCall({
  roomId,
  localStream,
  remoteVideoEl,
  mutePartnerBtn,
  setupRemoteStream,
  setupWatchSync,
  audioOnly = false,
}) {
  devDebug('answerCall', { roomId });

  if (!localStream) {
    devDebug('Error: Camera not initialized');
    return { success: false };
  }

  if (!roomId) {
    devDebug('Error: No room ID');
    return { success: false };
  }

  const roomStatus = await RoomService.checkRoomStatus(roomId);
  if (!roomStatus.exists) {
    devDebug('Error: Invalid room link');
    return { success: false };
  }
  if (!roomStatus.hasMembers) {
    devDebug('Error: Room is empty - no one to connect with');
    return { success: false };
  }

  const role = 'joiner';
  const userId = getUserId();

  const signaling = createFirebaseCallSignaling(roomId, role);
  const peer = new Peer({ role, signaling, localStream, audioOnly });

  peer.on('error', ({ error, phase }) => {
    if (phase === 'tracks' && /audio/.test(String(error?.message))) {
      showErrorToast(t('media.audio_disconnected'));
    }
  });

  // peer.start() creates the RTCPeerConnection synchronously (in _initPc)
  // before any await; the offer already in RTDB fires immediately via the
  // adapter's value listener.
  const startPromise = peer.start();
  const pc = peer.pc;

  const remoteStreamSuccess = setupRemoteStream(
    pc,
    remoteVideoEl,
    mutePartnerBtn,
  );
  if (!remoteStreamSuccess) {
    devDebug('Error setting up remote stream');
    console.error('Error setting up remote stream for joiner');
    peer.close();
    return { success: false };
  }

  setupConnectionStateHandlers(pc);

  devDebug('Peer connection created as joiner', { roomId });

  try {
    await startPromise;
  } catch (error) {
    console.error('Failed to start peer as joiner:', error);
    peer.close();
    return { success: false };
  }

  setupWatchSync(roomId, role, userId);
  await RoomService.joinRoom(roomId, userId);

  devDebug('Connecting...');

  return {
    success: true,
    pc,
    peer,
    roomId,
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
  answerOptions,
) {
  const status = await RoomService.checkRoomStatus(customRoomId);

  if (!status.exists) {
    // Room doesn't exist - create it
    devDebug('Creating room...');
    return await createCall({ ...createOptions, targetRoomId: customRoomId });
  }

  if (!status.hasMembers) {
    // Room exists but empty - create new call with this ID
    devDebug('Room is empty, creating new call...');
    return await createCall({ ...createOptions, targetRoomId: customRoomId });
  }

  // Room exists with members - join as joiner
  devDebug('Joining room...');
  return await answerCall({ ...answerOptions, roomId: customRoomId });
}
