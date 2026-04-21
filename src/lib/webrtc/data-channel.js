// src/lib/webrtc/data-channel.js
//
// Dedicated data-only PeerConnection helpers. Keeps file-transfer/data
// traffic isolated from a media PeerConnection so large transfers don't
// compete with video/audio for SCTP bandwidth.
//
// Signaling-agnostic: callers provide a DataSignalingChannel implementation.

import { rtcConfig as defaultRtcConfig } from './config.js';
import { createOffer, createAnswer, setRemoteDescription } from './sdp.js';
import { setupIceCandidates, drainIceCandidateQueue } from './ice.js';
import { checkAndWarnRTT } from './rtt.js';
import { log } from './logger.js';

/** @typedef {import('./signaling-transport.js').DataSignalingChannel} DataSignalingChannel */

const DEFAULT_LABEL = 'data';
const DEFAULT_RTT_CHECK_DELAY_MS = 1000;

/**
 * Initiator side: create a data-only PeerConnection and DataChannel, send
 * the offer through `signaling`, and wait for the remote answer.
 *
 * @param {DataSignalingChannel} signaling
 * @param {Object} [options]
 * @param {string} [options.label='data'] - DataChannel label.
 * @param {RTCConfiguration} [options.rtcConfig] - Override RTCConfiguration.
 * @param {boolean} [options.monitorRtt=true] - Log RTT once connected.
 * @param {string} [options.rttLabel='Data Connection']
 * @returns {Promise<{ pc: RTCPeerConnection, dataChannel: RTCDataChannel }>}
 */
export async function createDataChannel(signaling, options = {}) {
  const {
    label = DEFAULT_LABEL,
    rtcConfig = defaultRtcConfig,
    monitorRtt = true,
    rttLabel = 'Data Connection',
  } = options;

  assertSignaling(signaling);

  const pc = new RTCPeerConnection(rtcConfig);
  const dataChannel = pc.createDataChannel(label);

  setupIceCandidates(pc, signaling);

  const offer = await createOffer(pc);
  await signaling.sendOffer({ type: offer.type, sdp: offer.sdp });

  signaling.onAnswer(async (answer) => {
    if (!answer) return;
    try {
      const applied = await setRemoteDescription(
        pc,
        answer,
        drainIceCandidateQueue,
      );
      if (!applied) return;
      if (monitorRtt) {
        setTimeout(
          () => checkAndWarnRTT(pc, rttLabel),
          DEFAULT_RTT_CHECK_DELAY_MS,
        );
      }
    } catch (err) {
      console.warn('[DataChannel] Failed to apply remote answer:', err);
    }
  });

  log('[DataChannel] Created (initiator)');
  return { pc, dataChannel };
}

/**
 * Joiner side: wait for the remote offer via `signaling`, create a
 * data-only PeerConnection, apply the offer, and send back an answer.
 *
 * @param {DataSignalingChannel} signaling
 * @param {Object} [options] - See {@link createDataChannel}.
 * @returns {Promise<{ pc: RTCPeerConnection, dataChannel: RTCDataChannel }>}
 */
export function joinDataChannel(signaling, options = {}) {
  const {
    rtcConfig = defaultRtcConfig,
    monitorRtt = true,
    rttLabel = 'Data Connection',
  } = options;

  assertSignaling(signaling);

  return new Promise((resolve, reject) => {
    const pc = new RTCPeerConnection(rtcConfig);
    let resolved = false;

    let resolveDataChannel;
    const dataChannelReady = new Promise((r) => {
      resolveDataChannel = r;
    });

    pc.ondatachannel = (event) => {
      log('[DataChannel] DataChannel received (joiner)', {
        label: event.channel.label,
      });
      resolveDataChannel(event.channel);
    };

    setupIceCandidates(pc, signaling);

    signaling.onOffer(async (offer) => {
      if (resolved || !offer) return;
      try {
        const applied = await setRemoteDescription(
          pc,
          offer,
          drainIceCandidateQueue,
        );
        if (!applied) return;

        const answer = await createAnswer(pc);
        await signaling.sendAnswer({ type: answer.type, sdp: answer.sdp });
        log('[DataChannel] Joined (joiner)');

        const dataChannel = await dataChannelReady;

        if (monitorRtt) {
          setTimeout(
            () => checkAndWarnRTT(pc, rttLabel),
            DEFAULT_RTT_CHECK_DELAY_MS,
          );
        }

        resolved = true;
        resolve({ pc, dataChannel });
      } catch (err) {
        console.warn('[DataChannel] Failed to complete data join:', err);
        try {
          pc.close();
        } catch (_) {}
        reject(err);
      }
    });
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
  } catch (err) {
    console.error('[DataChannel] Error closing data PC:', err);
  }
}

function assertSignaling(signaling) {
  if (!signaling) {
    throw new Error('DataChannel: signaling channel is required');
  }
  const required = [
    'sendOffer',
    'sendAnswer',
    'onOffer',
    'onAnswer',
    'sendCandidate',
    'onRemoteCandidate',
  ];
  for (const name of required) {
    if (typeof signaling[name] !== 'function') {
      throw new Error(
        `DataChannel: signaling channel missing method "${name}"`,
      );
    }
  }
}
