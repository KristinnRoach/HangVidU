// src/features/call/signaling/firebase-call-signaling.js
//
// Firebase RTDB implementation of the SignalingChannel contract for the
// main media-call PeerConnection. Uses `rooms/{roomId}/offer|answer` for
// SDP and reuses createFirebaseIceTransport for ICE candidate exchange.
//
// Room metadata (createdAt, createdBy, audioOnly, members) is handled
// separately by RoomService — this adapter only owns SDP + ICE.

import { set } from 'firebase/database';
import {
  addRTDBListener,
  getRoomOfferRef,
  getRoomAnswerRef,
} from '../../../shared/storage/fb-rtdb/rtdb.js';
import { createFirebaseIceTransport } from './firebase-ice-transport.js';

/** @typedef {import('../../../lib/webrtc/signaling-transport.js').DataSignalingChannel} DataSignalingChannel */

/**
 * Build a SignalingChannel bound to the main-call RTDB paths of a room.
 *
 * @param {string} roomId
 * @param {'initiator'|'joiner'} role
 * @returns {DataSignalingChannel}
 */
export function createFirebaseCallSignaling(roomId, role) {
  if (!roomId) {
    throw new Error('createFirebaseCallSignaling: roomId is required');
  }

  const ice = createFirebaseIceTransport(roomId, role);

  return {
    sendOffer: (offer) => set(getRoomOfferRef(roomId), offer),
    sendAnswer: (answer) => set(getRoomAnswerRef(roomId), answer),
    onOffer: (callback) =>
      addRTDBListener(
        getRoomOfferRef(roomId),
        'value',
        (snapshot) => callback(snapshot.val()),
        roomId,
      ),
    onAnswer: (callback) =>
      addRTDBListener(
        getRoomAnswerRef(roomId),
        'value',
        (snapshot) => callback(snapshot.val()),
        roomId,
      ),
    sendCandidate: ice.sendCandidate,
    onRemoteCandidate: ice.onRemoteCandidate,
  };
}
