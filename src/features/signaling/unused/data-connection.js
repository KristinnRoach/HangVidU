// src/features/call/signaling/data-connection.js
//
// App-specific facade around @kidlib/p2p's data-channel helpers bound
// to the Firebase RTDB data-* paths. Call-controller talks to this rather
// than poking the lib + signaling adapter by hand.

import {
  createDataChannel,
  joinDataChannel,
} from '@kidlib/p2p';
import { createFirebaseDataSignaling } from './firebase-data-signaling.js';

/**
 * Initiator: create a data-only PeerConnection for a given room.
 * @param {string} roomId
 * @returns {Promise<{ pc: RTCPeerConnection, dataChannel: RTCDataChannel }>}
 */
export function createDataConnection(roomId) {
  const signaling = createFirebaseDataSignaling(roomId, 'initiator');
  return createDataChannel(signaling);
}

/**
 * Joiner: wait for a data-only PeerConnection offer and answer it.
 * @param {string} roomId
 * @returns {Promise<{ pc: RTCPeerConnection, dataChannel: RTCDataChannel }>}
 */
export function joinDataConnection(roomId) {
  const signaling = createFirebaseDataSignaling(roomId, 'joiner');
  return joinDataChannel(signaling);
}
