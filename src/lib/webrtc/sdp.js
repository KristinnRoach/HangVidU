// src/lib/webrtc/sdp.js
//
// Pure SDP helpers: offer/answer creation, remote-description setting with
// dedup + signaling-state validation. No I/O, no signaling, no app deps.

/**
 * Deduplication cache for SDP to prevent duplicate processing. Necessary
 * because signaling transports (e.g. Firebase RTDB) can deliver the same
 * payload more than once across reconnects.
 */
const sdpCache = new WeakMap(); // Map<RTCPeerConnection, { lastOffer?, lastAnswer? }>

/**
 * Check if we've already processed this SDP for this peer connection.
 * @param {RTCPeerConnection} pc
 * @param {string} type - 'offer' or 'answer'
 * @param {string} sdp
 * @returns {boolean} True if this is a duplicate.
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
 * Validate that the peer connection is in an expected state before setting
 * a remote description of the given type.
 * @param {RTCPeerConnection} pc
 * @param {string} expectedType - 'offer' or 'answer'
 * @returns {boolean}
 */
export function isValidSignalingState(pc, expectedType) {
  if (!pc) return false;

  if (expectedType === 'offer') {
    // Joiner: should be 'stable' when receiving offer
    return pc.signalingState === 'stable';
  } else {
    // Initiator: answer is only valid while we still have a local offer pending.
    return pc.signalingState === 'have-local-offer';
  }
}

/**
 * Create and set a local SDP offer.
 * @param {RTCPeerConnection} pc
 * @returns {Promise<RTCSessionDescriptionInit>}
 */
export async function createOffer(pc) {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  return offer;
}

/**
 * Create and set a local SDP answer.
 * @param {RTCPeerConnection} pc
 * @returns {Promise<RTCSessionDescriptionInit>}
 */
export async function createAnswer(pc) {
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  return answer;
}

/**
 * Set remote SDP description with dedup + signaling-state validation.
 * Drains any queued remote ICE candidates after successfully applying.
 *
 * @param {RTCPeerConnection} pc
 * @param {RTCSessionDescriptionInit} sdp
 * @param {(pc: RTCPeerConnection) => void} drainQueue
 * @returns {Promise<boolean>} True if applied, false if skipped/failed.
 */
export async function setRemoteDescription(pc, sdp, drainQueue) {
  if (isDuplicateSdp(pc, sdp.type, sdp.sdp)) {
    console.debug(`Ignoring duplicate ${sdp.type} - already processed`);
    return false;
  }

  if (!isValidSignalingState(pc, sdp.type)) {
    console.warn(
      `Ignoring ${sdp.type} - unexpected signaling state:`,
      pc.signalingState,
    );
    return false;
  }

  try {
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    drainQueue(pc);
    console.debug(`Remote description set (${sdp.type})`);
    return true;
  } catch (error) {
    console.error(`Failed to set remote description (${sdp.type}):`, error);
    return false;
  }
}
