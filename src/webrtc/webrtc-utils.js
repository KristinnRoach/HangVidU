// src/webrtc/webrtc-utils.js

/**
 * Utilities for WebRTC connection setup and SDP handling.
 * These are low-level operations extracted to keep call flow logic clean.
 */

/**
 * RTC configuration with STUN servers.
 * Add TURN servers here if needed for better connectivity behind restrictive NATs.
 */
export const rtcConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // Add TURN servers here if needed
  ],
};

/**
 * Deduplication cache for SDP to prevent duplicate processing.
 * This is necessary because Firebase RTDB can trigger multiple callbacks
 * for the same data due to network conditions or reconnections.
 */
const sdpCache = new WeakMap(); // Map<RTCPeerConnection, { lastOffer?, lastAnswer? }>

/**
 * Check if we've already processed this SDP for this peer connection.
 * @param {RTCPeerConnection} pc - The peer connection
 * @param {string} type - 'offer' or 'answer'
 * @param {string} sdp - The SDP string
 * @returns {boolean} True if this is a duplicate
 */
export function isDuplicateSdp(pc, type, sdp) {
  if (!sdpCache.has(pc)) {
    sdpCache.set(pc, {});
  }
  const cache = sdpCache.get(pc);
  const key = type === 'offer' ? 'lastOffer' : 'lastAnswer';

  if (cache[key] === sdp) {
    return true;
  }

  cache[key] = sdp;
  return false;
}

/**
 * Validate that the peer connection is in an expected state before setting remote description.
 * @param {RTCPeerConnection} pc - The peer connection
 * @param {string} expectedType - 'offer' or 'answer'
 * @returns {boolean} True if the state is valid
 */
export function isValidSignalingState(pc, expectedType) {
  if (!pc) return false;

  if (expectedType === 'offer') {
    // Joiner: should be 'stable' when receiving offer
    return pc.signalingState === 'stable';
  } else {
    // Initiator: should be 'have-local-offer' or 'stable' when receiving answer
    return (
      pc.signalingState === 'have-local-offer' || pc.signalingState === 'stable'
    );
  }
}

/**
 * Add local media tracks to peer connection.
 * @param {RTCPeerConnection} pc - The peer connection
 * @param {MediaStream} localStream - The local media stream
 */
export function addLocalTracks(pc, localStream) {
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });
}

/**
 * Create and set local SDP offer.
 * @param {RTCPeerConnection} pc - The peer connection
 * @returns {Promise<RTCSessionDescriptionInit>} The offer SDP
 */
export async function createOffer(pc) {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  return offer;
}

/**
 * Create and set local SDP answer.
 * @param {RTCPeerConnection} pc - The peer connection
 * @returns {Promise<RTCSessionDescriptionInit>} The answer SDP
 */
export async function createAnswer(pc) {
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  return answer;
}

/**
 * Set remote SDP description with validation and deduplication.
 * @param {RTCPeerConnection} pc - The peer connection
 * @param {RTCSessionDescriptionInit} sdp - The remote SDP (offer or answer)
 * @param {Function} drainQueue - Function to drain queued ICE candidates after setting remote description
 * @returns {Promise<boolean>} True if successful, false if skipped/failed
 */
export async function setRemoteDescription(pc, sdp, drainQueue) {
  // Check for duplicate
  if (isDuplicateSdp(pc, sdp.type, sdp.sdp)) {
    console.debug(`Ignoring duplicate ${sdp.type} - already processed`);
    return false;
  }

  // Validate signaling state
  if (!isValidSignalingState(pc, sdp.type)) {
    console.warn(
      `Ignoring ${sdp.type} - unexpected signaling state:`,
      pc.signalingState
    );
    return false;
  }

  try {
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    drainQueue(pc); // Process any queued ICE candidates
    console.debug(`Remote description set (${sdp.type})`);
    return true;
  } catch (error) {
    console.error(`Failed to set remote description (${sdp.type}):`, error);
    return false;
  }
}

/**
 * Generate a random room ID.
 * @returns {string} Random room ID
 */
export function generateRoomId() {
  return Math.random().toString(36).substring(2, 9);
}
