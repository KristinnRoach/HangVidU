// src/features/call/signaling/firebase-data-signaling.js
//
// Firebase RTDB implementation of the DataSignalingChannel contract for
// the dedicated data-only PeerConnection (file transfer channel). Uses a
// distinct set of RTDB paths so data signaling doesn't collide with the
// main media-call offer/answer.

import { set } from 'firebase/database';
import {
  onDataChange,
  getDataOfferRef,
  getDataAnswerRef,
  getDataOfferCandidatesRef,
  getDataAnswerCandidatesRef,
} from '../../../shared/storage/fb-rtdb/rtdb.js';
import { createFirebaseIceTransport } from './firebase-ice-transport.js';

/** @typedef {import('../../../lib/webrtc/signaling-transport.js').DataSignalingChannel} DataSignalingChannel */

/**
 * Build a DataSignalingChannel bound to the data-* RTDB paths of a room.
 *
 * @param {string} roomId
 * @param {'initiator'|'joiner'} role
 * @returns {DataSignalingChannel}
 */
export function createFirebaseDataSignaling(roomId, role) {
  if (!roomId) {
    throw new Error('createFirebaseDataSignaling: roomId is required');
  }

  const ice = createFirebaseIceTransport(roomId, role, {
    getLocalCandidatesRef: getDataOfferCandidatesRef,
    getRemoteCandidatesRef: getDataAnswerCandidatesRef,
  });

  return {
    sendOffer: (offer) => set(getDataOfferRef(roomId), offer),
    sendAnswer: (answer) => set(getDataAnswerRef(roomId), answer),
    onOffer: (callback) =>
      onDataChange(
        getDataOfferRef(roomId),
        (snapshot) => callback(snapshot.val()),
        roomId,
      ),
    onAnswer: (callback) =>
      onDataChange(
        getDataAnswerRef(roomId),
        (snapshot) => callback(snapshot.val()),
        roomId,
      ),
    sendCandidate: ice.sendCandidate,
    onRemoteCandidate: ice.onRemoteCandidate,
  };
}
