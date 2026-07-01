// src/realtime/signaling/index.js
//
// Room-signaling factory behind the stable `@kidlib/p2p` `P2PRoomSignaling`
// port. WebRTC signaling runs on the Cloudflare Durable Object worker.

import { createDoRoomSignaling } from './do-room-signaling.js';

export { createDoRoomSignaling };

/** @typedef {import('@kidlib/p2p').CreateRoomSignalingOptions} CreateRoomSignalingOptions */
/** @typedef {import('@kidlib/p2p').P2PRoomSignaling} P2PRoomSignaling */

/**
 * @param {CreateRoomSignalingOptions} options
 * @returns {P2PRoomSignaling}
 */
export function createRoomSignaling(options) {
  return createDoRoomSignaling(options);
}
