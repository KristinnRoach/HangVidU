// src/realtime/signaling/index.js
//
// Room-signaling factory behind the stable `@kidlib/p2p` `P2PRoomSignaling`
// port. WebRTC signaling runs on the Cloudflare Durable Object worker.
//
// The legacy RTDB adapter (`firebase-room-signaling.js`) is kept in-tree as a
// dormant, self-contained reference — it is intentionally NOT imported here.
// Re-wire it (and re-add the `rooms/{roomId}/p2pSignaling` RTDB rules) only if a
// fallback is ever needed.

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
