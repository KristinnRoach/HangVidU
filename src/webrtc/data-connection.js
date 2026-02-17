// src/webrtc/data-connection.js
//
// Dedicated data-only PeerConnection for file transfer.
// Isolates DataChannel traffic from the media PeerConnection so large
// file transfers don't compete with video/audio for SCTP bandwidth.

import { set } from 'firebase/database';
import {
  getDataOfferRef,
  getDataAnswerRef,
  getDataOfferCandidatesRef,
  getDataAnswerCandidatesRef,
  onDataChange,
} from '../storage/fb-rtdb/rtdb.js';
import {
  rtcConfig,
  createOffer,
  createAnswer,
  setRemoteDescription,
} from './webrtc-utils.js';
import { setupIceCandidates, drainIceCandidateQueue } from './ice.js';
import { devDebug } from '../utils/dev/dev-utils.js';

const DATA_CHANNEL_LABEL = 'files';

/**
 * Initiator side: create a data-only PeerConnection and DataChannel,
 * write the offer to RTDB, and listen for the joiner's answer.
 *
 * @param {string} roomId
 * @returns {Promise<{ pc: RTCPeerConnection, dataChannel: RTCDataChannel }>}
 */
export async function createDataConnection(roomId) {
  const pc = new RTCPeerConnection(rtcConfig);
  const dataChannel = pc.createDataChannel(DATA_CHANNEL_LABEL);

  setupIceCandidates(pc, 'initiator', roomId, {
    getLocalCandidatesRef: getDataOfferCandidatesRef,
    getRemoteCandidatesRef: getDataAnswerCandidatesRef,
  });

  const offer = await createOffer(pc);
  await set(getDataOfferRef(roomId), { type: offer.type, sdp: offer.sdp });

  // Listen for joiner's answer — tracked so room cleanup removes it automatically
  onDataChange(
    getDataAnswerRef(roomId),
    async (snapshot) => {
      const answer = snapshot.val();
      if (!answer) return;
      try {
        await setRemoteDescription(pc, answer, drainIceCandidateQueue);
      } catch (err) {
        console.warn('[DataConnection] Failed to set data answer:', err);
      }
    },
    roomId,
  );

  devDebug('[DataConnection] Created (initiator)', { roomId });
  return { pc, dataChannel };
}

/**
 * Joiner side: wait for the data offer in RTDB, create a data-only
 * PeerConnection, set the remote offer, create an answer, and write it back.
 *
 * @param {string} roomId
 * @returns {Promise<{ pc: RTCPeerConnection, dataChannel: RTCDataChannel }>}
 */
export function joinDataConnection(roomId) {
  return new Promise((resolve, reject) => {
    const pc = new RTCPeerConnection(rtcConfig);
    let dataChannel = null;

    pc.ondatachannel = (event) => {
      dataChannel = event.channel;
      devDebug('[DataConnection] DataChannel received (joiner)', {
        label: dataChannel.label,
      });
    };

    setupIceCandidates(pc, 'joiner', roomId, {
      getLocalCandidatesRef: getDataAnswerCandidatesRef,
      getRemoteCandidatesRef: getDataOfferCandidatesRef,
    });

    // Listen for initiator's data offer — tracked so room cleanup removes it
    onDataChange(
      getDataOfferRef(roomId),
      async (snapshot) => {
        const offer = snapshot.val();
        if (!offer) return;
        try {
          await setRemoteDescription(pc, offer, drainIceCandidateQueue);
          const answer = await createAnswer(pc);
          await set(getDataAnswerRef(roomId), {
            type: answer.type,
            sdp: answer.sdp,
          });
          devDebug('[DataConnection] Joined (joiner)', { roomId });
          resolve({ pc, dataChannel });
        } catch (err) {
          console.warn('[DataConnection] Failed to complete data join:', err);
          pc.close();
          reject(err);
        }
      },
      roomId,
    );
  });
}

/**
 * Close a data-only PeerConnection.
 * @param {RTCPeerConnection|null} pc
 */
export function closeDataConnection(pc) {
  if (!pc) return;
  try {
    pc.close();
  } catch (_) {}
}
