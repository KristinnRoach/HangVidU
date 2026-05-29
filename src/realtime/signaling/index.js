// src/realtime/signaling/index.js
//
// Room-signaling factory. Selects the realtime backend behind the stable
// `@kidlib/p2p` `P2PRoomSignaling` port:
//   - 'do'   → Cloudflare Durable Object worker (default)
//   - 'rtdb' → legacy Firebase RTDB (fallback during migration)
//
// Controlled by VITE_SIGNALING_BACKEND. Both adapters are kept in tree until
// the DO path is verified in production; then the RTDB adapter is removed.

import { createFirebaseRoomSignaling } from './firebase-room-signaling.js';
import { createDoRoomSignaling } from './do-room-signaling.js';

export { createFirebaseRoomSignaling, createDoRoomSignaling };

/** @typedef {import('@kidlib/p2p').CreateRoomSignalingOptions} CreateRoomSignalingOptions */
/** @typedef {import('@kidlib/p2p').P2PRoomSignaling} P2PRoomSignaling */

/**
 * @param {CreateRoomSignalingOptions} options
 * @returns {P2PRoomSignaling}
 */
export function createRoomSignaling(options) {
  const backend = import.meta.env.VITE_SIGNALING_BACKEND ?? 'do';
  return backend === 'rtdb'
    ? createFirebaseRoomSignaling(options)
    : createDoRoomSignaling(options);
}
