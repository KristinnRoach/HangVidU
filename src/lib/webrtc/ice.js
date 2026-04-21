// src/lib/webrtc/ice.js
//
// ICE candidate exchange helper. Signaling-agnostic: takes an IceTransport
// ({ sendCandidate, onRemoteCandidate }) and wires the peer connection to
// it. Queues inbound candidates until the remote description is applied,
// then drains them (auto-drain on signalingstatechange, or manually via
// drainIceCandidateQueue).

import { log } from './logger.js';

/** @typedef {import('./signaling-transport.js').IceTransport} IceTransport */

// WeakMap of queued remote candidates keyed by peer connection.
const pendingRemoteCandidates = new WeakMap();

/**
 * Wire a peer connection's ICE candidate gathering + remote ingestion to a
 * signaling transport.
 *
 * @param {RTCPeerConnection} pc
 * @param {IceTransport} transport
 */
export function setupIceCandidates(pc, transport) {
  if (!pc) {
    throw new Error('setupIceCandidates: pc is required');
  }
  if (
    !transport ||
    typeof transport.sendCandidate !== 'function' ||
    typeof transport.onRemoteCandidate !== 'function'
  ) {
    throw new Error(
      'setupIceCandidates: transport must implement sendCandidate and onRemoteCandidate',
    );
  }

  if (!pendingRemoteCandidates.has(pc)) {
    pendingRemoteCandidates.set(pc, []);
  }

  setupLocalCandidateSender(pc, transport);
  setupRemoteCandidateListener(pc, transport);
}

function setupLocalCandidateSender(pc, transport) {
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      log('❄ Local ICE candidate');
      try {
        const result = transport.sendCandidate(event.candidate.toJSON());
        if (result && typeof result.catch === 'function') {
          result.catch((err) =>
            console.warn('Failed to send ICE candidate:', err),
          );
        }
      } catch (err) {
        console.warn('Failed to send ICE candidate:', err);
      }
    } else {
      log('❄ ICE gathering complete');
    }
  };
}

function setupRemoteCandidateListener(pc, transport) {
  let drainListenerAttached = false;
  const attachAutoDrain = () => {
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

  transport.onRemoteCandidate((candidate) => {
    log('❄ Remote ICE candidate added');

    if (!pc || pc.signalingState === 'closed') {
      log('Skipping ICE candidate: peer connection is closed');
      return;
    }

    if (!candidate) {
      return;
    }

    if (pc.remoteDescription) {
      try {
        pc.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
          log('Error adding ICE candidate:', error);
        });
      } catch (error) {
        log('Error adding ICE candidate:', error);
      }
      return;
    }

    log('📥 Queuing ICE candidate (remote description not yet set)');
    const queue = pendingRemoteCandidates.get(pc);
    if (queue) {
      queue.push(candidate);
      if (queue.length === 1) {
        attachAutoDrain();
      }
    }
  });
}

/**
 * Drain queued remote ICE candidates. Idempotent: safe to call repeatedly.
 * @param {RTCPeerConnection} pc
 */
export function drainIceCandidateQueue(pc) {
  if (!pc || !pendingRemoteCandidates.has(pc)) {
    return;
  }

  const queue = pendingRemoteCandidates.get(pc);
  if (queue.length === 0) {
    return;
  }

  log(`🔄 Draining ${queue.length} queued ICE candidate(s)`);

  for (const candidateInit of queue) {
    try {
      pc.addIceCandidate(new RTCIceCandidate(candidateInit)).catch((error) => {
        log('Error adding queued ICE candidate:', error);
      });
    } catch (error) {
      log('Error adding queued ICE candidate:', error);
    }
  }

  queue.length = 0;
}
