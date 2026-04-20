// src/lib/webrtc/index.js
//
// Public API for the WebRTC helper library. Signaling-agnostic building
// blocks for media + data-only peer connections.
//
// Design notes:
// - No I/O. No Firebase or network deps. Consumers inject signaling via
//   the IceTransport / DataSignalingChannel contracts (see
//   signaling-transport.js).
// - Pure helpers (sdp, tracks, utils, rtt) can be consumed directly.
// - Logging defaults to no-op; wire via setLogger() if desired.

export { rtcConfig } from './config.js';
export { generateRoomId } from './utils.js';
export { setLogger } from './logger.js';

export {
  isDuplicateSdp,
  isValidSignalingState,
  createOffer,
  createAnswer,
  setRemoteDescription,
} from './sdp.js';

export { addLocalTracks } from './tracks.js';

export { setupIceCandidates, drainIceCandidateQueue } from './ice.js';

export {
  createDataChannel,
  joinDataChannel,
  closeDataConnection,
} from './data-channel.js';

export { getRTT, checkAndWarnRTT } from './rtt.js';
