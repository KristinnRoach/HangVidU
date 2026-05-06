// src/features/call/signaling/firebase-ice-transport.js
//
// Firebase RTDB implementation of the IceTransport contract defined in
// @kidlib/p2p/signaling-transport. Lets the signaling-agnostic ICE
// helper exchange candidates through RTDB candidate ref buckets.

import { push, set } from 'firebase/database';
import {
  addRTDBListener,
  getOfferCandidatesRef,
  getAnswerCandidatesRef,
} from '../../shared/storage/fb-rtdb/rtdb.js';

/** @typedef {import('@kidlib/p2p/signaling-transport').IceTransport} IceTransport */

/**
 * Build an IceTransport bound to a room's RTDB candidate buckets.
 *
 * For the main call PeerConnection, the initiator publishes to
 * `offerCandidates` and listens on `answerCandidates` (and vice-versa for
 * the joiner). Callers may override the bucket refs — this is how the data
 * connection reuses the same ICE logic against dedicated data-* buckets.
 *
 * @param {string} roomId
 * @param {'initiator'|'joiner'} role
 * @param {Object} [overrides]
 * @param {(roomId: string) => import('firebase/database').DatabaseReference} [overrides.getLocalCandidatesRef]
 * @param {(roomId: string) => import('firebase/database').DatabaseReference} [overrides.getRemoteCandidatesRef]
 * @returns {IceTransport}
 */
export function createFirebaseIceTransport(roomId, role, overrides = {}) {
  if (!roomId) {
    throw new Error('createFirebaseIceTransport: roomId is required');
  }

  let localRefGetter;
  let remoteRefGetter;
  if (role === 'initiator') {
    localRefGetter = overrides.getLocalCandidatesRef ?? getOfferCandidatesRef;
    remoteRefGetter =
      overrides.getRemoteCandidatesRef ?? getAnswerCandidatesRef;
  } else if (role === 'joiner') {
    localRefGetter = overrides.getLocalCandidatesRef ?? getAnswerCandidatesRef;
    remoteRefGetter = overrides.getRemoteCandidatesRef ?? getOfferCandidatesRef;
  } else {
    throw new Error(`createFirebaseIceTransport: invalid role: ${role}`);
  }

  return {
    sendCandidate(candidateInit) {
      const candidateRef = push(localRefGetter(roomId));
      return set(candidateRef, candidateInit);
    },
    onRemoteCandidate(callback) {
      const remoteCandidatesRef = remoteRefGetter(roomId);
      addRTDBListener(
        remoteCandidatesRef,
        'child_added',
        (snapshot) => {
          const candidate = snapshot.val();
          callback(candidate);
        },
        roomId,
      );
    },
  };
}
