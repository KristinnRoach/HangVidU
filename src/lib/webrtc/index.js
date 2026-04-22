// src/lib/webrtc/index.js
//
// Public API for the WebRTC helper library. Signaling-agnostic building
// blocks for media + data-only peer connections.
//
// Design notes:
// - No I/O. No Firebase or network deps. Consumers inject signaling via
//   the IceTransport / DataSignalingChannel contracts (see
//   signaling-transport.js).
// - Only high-level entry points are exposed here. Internals (sdp/ice/
//   tracks/rtt/config helpers) remain importable from their own modules
//   for in-lib tests and future evolution.
// - Logging defaults to no-op; wire via setLogger() if desired.

export { generateRoomId } from './utils.js';
export { setLogger } from './logger.js';

export {
  createDataChannel,
  joinDataChannel,
  closeDataConnection,
} from './data-channel.js';

export { Peer, PEER_STATES } from './peer.js';
