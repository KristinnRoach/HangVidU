// src/features/call/signaling/firebase-room-signaling.js

import {
  ref,
  set,
  remove,
  push,
  onValue,
  onChildAdded,
  onDisconnect,
} from 'firebase/database';
import { rtdb } from '../../shared/storage/fb-rtdb/rtdb.js';

/** @typedef {import('@kidlib/p2p').P2PRoomSignaling} P2PRoomSignaling */
/** @typedef {import('@kidlib/p2p').CreateRoomSignalingOptions} CreateRoomSignalingOptions */

function sortedPairId(a, b) {
  return [a, b].sort().join(':');
}

/**
 * Firebase RTDB P2PRoomSignaling for watchP2PRoom() / joinP2PRoom().
 *
 * Structure:
 *   rooms/{roomId}/presence/{peerId}              → true  (server-removed on disconnect)
 *   rooms/{roomId}/pairs/{pairId}/sdp/offer       → RTCSessionDescriptionInit
 *   rooms/{roomId}/pairs/{pairId}/sdp/answer      → RTCSessionDescriptionInit
 *   rooms/{roomId}/pairs/{pairId}/ice/{peerId}/   → pushed RTCIceCandidateInit entries
 *
 * @param {CreateRoomSignalingOptions} options
 * @returns {P2PRoomSignaling}
 */
export function createFirebaseRoomSignaling({ roomId }) {
  if (!roomId)
    throw new Error('createFirebaseRoomSignaling: roomId is required');

  return {
    async join(peerId) {
      const presenceRef = ref(rtdb, `rooms/${roomId}/presence/${peerId}`);
      await set(presenceRef, true);
      await onDisconnect(presenceRef).remove();
    },

    async leave(peerId) {
      const presenceRef = ref(rtdb, `rooms/${roomId}/presence/${peerId}`);
      await onDisconnect(presenceRef).cancel();
      await remove(presenceRef);
    },

    onPeers(callback) {
      const presenceRef = ref(rtdb, `rooms/${roomId}/presence`);
      return onValue(presenceRef, (snapshot) => {
        const data = snapshot.val();
        callback(data ? Object.keys(data) : []);
      });
    },

    createPeerSignaling({ localPeerId, remotePeerId }) {
      const pairId = sortedPairId(localPeerId, remotePeerId);
      const basePath = `rooms/${roomId}/pairs/${pairId}`;

      const offerRef = ref(rtdb, `${basePath}/sdp/offer`);
      const answerRef = ref(rtdb, `${basePath}/sdp/answer`);
      const localIceRef = ref(rtdb, `${basePath}/ice/${localPeerId}`);
      const remoteIceRef = ref(rtdb, `${basePath}/ice/${remotePeerId}`);

      return {
        sendOffer: (offer) => set(offerRef, offer),
        sendAnswer: (answer) => set(answerRef, answer),

        onOffer(callback) {
          return onValue(offerRef, (snapshot) => {
            const val = snapshot.val();
            if (val) callback(val);
          });
        },

        onAnswer(callback) {
          return onValue(answerRef, (snapshot) => {
            const val = snapshot.val();
            if (val) callback(val);
          });
        },

        sendCandidate: (candidate) => set(push(localIceRef), candidate),

        onRemoteCandidate(callback) {
          return onChildAdded(remoteIceRef, (snapshot) => {
            const candidate = snapshot.val();
            if (candidate) callback(candidate);
          });
        },
      };
    },
  };
}
