// src/p2p/ice.js

import { push, set } from 'firebase/database';
import {
  addRTDBListener,
  getOfferCandidatesRef,
  getAnswerCandidatesRef,
} from '../storage/fb-rtdb/rtdb';
import { devDebug } from '../utils/dev/dev-utils.js';

// WeakMap to store queued candidates per peer connection
const pendingRemoteCandidates = new WeakMap();

/**
 * @param {RTCPeerConnection} pc
 * @param {'initiator'|'joiner'} role
 * @param {string} roomId
 * @param {Object} [refs] - Optional custom ref getters for data connection signaling
 * @param {Function} [refs.getLocalCandidatesRef] - Ref builder for local candidates
 * @param {Function} [refs.getRemoteCandidatesRef] - Ref builder for remote candidates
 */
export function setupIceCandidates(pc, role, roomId, refs = {}) {
  if (!pc || !roomId) {
    throw new Error('setupIceCandidates: pc and roomId are required');
  }

  // Initialize candidate queue for this peer connection
  if (!pendingRemoteCandidates.has(pc)) {
    pendingRemoteCandidates.set(pc, []);
  }

  // Resolve ref getters — custom refs override defaults
  let localRefGetter, remoteRefGetter;
  if (role === 'initiator') {
    localRefGetter = refs.getLocalCandidatesRef ?? getOfferCandidatesRef;
    remoteRefGetter = refs.getRemoteCandidatesRef ?? getAnswerCandidatesRef;
  } else if (role === 'joiner') {
    localRefGetter = refs.getLocalCandidatesRef ?? getAnswerCandidatesRef;
    remoteRefGetter = refs.getRemoteCandidatesRef ?? getOfferCandidatesRef;
  } else {
    throw new Error(`Invalid role: ${role} specified for ICE candidate setup.`);
  }

  setupLocalCandidateSender(pc, localRefGetter, roomId);
  setupRemoteCandidateListener(pc, remoteRefGetter, roomId);
}

function setupLocalCandidateSender(pc, getLocalRef, roomId) {
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      devDebug('❄ Local ICE candidate');
      const candidateRef = push(getLocalRef(roomId));
      set(candidateRef, event.candidate.toJSON());
    } else {
      devDebug('❄ ICE gathering complete');
    }
  };
}

function setupRemoteCandidateListener(pc, getRemoteRef, roomId) {
  const remoteCandidatesRef = getRemoteRef(roomId);

  // Auto-drain setup: flush queue when remote description is set
  let drainListenerAttached = false;
  const setupAutoDrain = () => {
    if (drainListenerAttached) return;
    drainListenerAttached = true;

    const autoDrain = () => {
      if (pc.remoteDescription) {
        drainIceCandidateQueue(pc);
        pc.removeEventListener('signalingstatechange', autoDrain);
      }
    };

    pc.addEventListener('signalingstatechange', autoDrain);
  };

  const callback = (snapshot) => {
    devDebug('❄ Remote ICE candidate added');

    const candidate = snapshot.val();

    // Guard against attempts to add candidates after the PC has been closed or replaced
    if (!pc || pc.signalingState === 'closed') {
      devDebug('Skipping ICE candidate: peer connection is closed');
      return;
    }

    if (!candidate) {
      return;
    }

    // If remote description is set, add candidate immediately
    if (pc.remoteDescription) {
      try {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        devDebug('Error adding ICE candidate:', error);
      }
    } else {
      // Queue candidate for later when remote description is set
      devDebug(`📥 Queuing ICE candidate (remote description not yet set)`);
      const queue = pendingRemoteCandidates.get(pc);
      if (queue) {
        queue.push(candidate);
        // Setup auto-drain listener only once, when first candidate is queued
        if (queue.length === 1) {
          setupAutoDrain();
        }
      }
    }
  };

  addRTDBListener(remoteCandidatesRef, 'child_added', callback, roomId);
}

/**
 * Drain queued ICE candidates after remote description has been set.
 * This is called automatically via signalingstatechange, but can also
 * be called explicitly for immediate draining.
 */
export function drainIceCandidateQueue(pc) {
  if (!pc || !pendingRemoteCandidates.has(pc)) {
    return;
  }

  const queue = pendingRemoteCandidates.get(pc);
  if (queue.length === 0) {
    return;
  }

  devDebug(`🔄 Draining ${queue.length} queued ICE candidate(s)`);

  // Process each queued candidate
  for (const candidateInit of queue) {
    try {
      pc.addIceCandidate(new RTCIceCandidate(candidateInit)).catch((error) => {
        devDebug('Error adding queued ICE candidate:', error);
      });
    } catch (error) {
      devDebug('Error adding queued ICE candidate:', error);
    }
  }

  // Clear the queue after draining
  queue.length = 0;
}
