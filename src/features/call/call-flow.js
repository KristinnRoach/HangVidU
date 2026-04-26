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
import { devDebug, isDev } from '../../shared/utils/dev/dev-utils.js';
import { showErrorToast } from '../../shared/components/toast.js';
import { t } from '../../shared/i18n/index.js';

import { startP2PSession, joinP2PSession } from '@kidlib/p2p';
import { createFirebaseCallSignaling } from './signaling/index.js';
import { generateRandomId } from '../../shared/utils/gen-random-id.js';
import RoomService from './room.js';
import {
  hasRemoteStream,
  setRemoteStream,
  getRemoteStream,
} from '../../shared/media/state.js';
import { initIcons } from '../../shared/components/ui/icons.js';

function wireSessionAudioErrorToast(session) {
  session.on('error', ({ error, phase }) => {
    if (phase === 'tracks' && /audio/.test(String(error?.message))) {
      showErrorToast(t('media.audio_disconnected'));
    }
  });
}

function bindSessionRemoteStream(session, remoteVideoEl, mutePartnerBtn) {
  if (!session || !remoteVideoEl) return false;

  const handleRemoteStream = ({ stream, track }) => {
    if (!stream) return;

    if (track) {
      devDebug(`REMOTE TRACK RECEIVED: ${track.kind}`);
    }

    const currentRemoteStream = hasRemoteStream() ? getRemoteStream() : null;
    setRemoteStream(stream);
    remoteVideoEl.srcObject = stream;

    if (!track || track.kind === 'video') {
      if (remoteVideoEl.readyState >= 1) {
        remoteVideoEl.style.opacity = '1';
      } else {
        remoteVideoEl.style.opacity = '0';
        remoteVideoEl.addEventListener(
          'loadedmetadata',
          () => {
            remoteVideoEl.style.opacity = '1';
          },
          { once: true },
        );
      }
    }

    if (isDev() && !remoteVideoEl.muted) {
      remoteVideoEl.muted = true;
      const icon = mutePartnerBtn?.querySelector?.('i, svg');
      if (icon) {
        icon.setAttribute('data-lucide', 'volume-x');
        initIcons(mutePartnerBtn);
      }
    }

    if (currentRemoteStream !== stream) {
      devDebug('Connected!');
    } else if (track) {
      devDebug(`Added ${track.kind} track to existing remote stream`);
    }

    try {
      const container =
        document.getElementById('remote-video-box') ||
        remoteVideoEl.parentElement;
      if (container) {
        container.classList?.remove('hidden');
        remoteVideoEl.classList?.remove('hidden');
        container.style.visibility = 'visible';
        container.style.opacity = '1';
        container.style.position = '';
        container.style.left = '';
        container.style.top = '';
        remoteVideoEl.style.visibility = 'visible';
      }
    } catch (e) {
      console.warn('Visibility override failed:', e);
    }
  };

  session.on('remoteStream', handleRemoteStream);
  if (session.remoteStream) {
    handleRemoteStream({ stream: session.remoteStream });
  }

  return true;
}

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
  setupWatchSync,
  targetRoomId = null,
  audioOnly = false,
}) {
  if (!localStream) {
    devDebug('Error: Camera not initialized');
    return { success: false };
  }

  const role = 'initiator';
  const roomId = targetRoomId || generateRandomId();
  const userId = getUserId();

  // Write room metadata first; Peer will write the offer SDP via the adapter.
  await RoomService.createRoomMetadata(userId, roomId, { audioOnly });

  const signaling = createFirebaseCallSignaling(roomId, role);
  let session;

  try {
    session = await startP2PSession({
      signaling,
      localStream,
      audioOnly,
      dataChannel: false,
    });
  } catch (error) {
    console.error('Failed to start P2P session as initiator:', error);
    await RoomService.leaveRoom(userId, roomId).catch((cleanupError) => {
      console.warn('Failed to rollback room creation', cleanupError);
    });
    return { success: false };
  }

  wireSessionAudioErrorToast(session);

  const remoteStreamSuccess = bindSessionRemoteStream(
    session,
    remoteVideoEl,
    mutePartnerBtn,
  );
  if (!remoteStreamSuccess) {
    devDebug('Error setting up remote stream');
    console.error('Error setting up remote stream');
    session.close();
    await RoomService.leaveRoom(userId, roomId).catch((cleanupError) => {
      console.warn('Failed to rollback room creation', cleanupError);
    });
    return { success: false };
  }

  const peer = session.peer;
  const pc = peer.pc;

  devDebug('Peer connection created as initiator', { roomId, userId });

  setupWatchSync(roomId, role, userId);

  const APP_ORIGIN = import.meta.env.VITE_APP_URL || window.location.origin;
  const roomLink = `${APP_ORIGIN}${window.location.pathname}?room=${roomId}`;

  devDebug('Waiting for partner to join...');

  return {
    success: true,
    session,
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
  let session;

  try {
    session = await joinP2PSession({
      signaling,
      localStream,
      audioOnly,
      dataChannel: false,
    });
  } catch (error) {
    console.error('Failed to start P2P session as joiner:', error);
    return { success: false };
  }

  wireSessionAudioErrorToast(session);

  const remoteStreamSuccess = bindSessionRemoteStream(
    session,
    remoteVideoEl,
    mutePartnerBtn,
  );
  if (!remoteStreamSuccess) {
    devDebug('Error setting up remote stream');
    console.error('Error setting up remote stream for joiner');
    session.close();
    return { success: false };
  }

  const peer = session.peer;
  const pc = peer.pc;

  devDebug('Peer connection created as joiner', { roomId });
  try {
    await RoomService.joinRoom(roomId, userId);
  } catch (error) {
    console.error('Failed to join room as member:', error);
    session.close();
    return { success: false };
  }

  setupWatchSync(roomId, role, userId);

  devDebug('Connecting...');

  return {
    success: true,
    session,
    pc,
    peer,
    roomId,
    role,
  };
}
