// src/lib/webrtc/rtt.js
//
// Round-trip-time diagnostics for WebRTC peer connections.

import { log } from './logger.js';

const RTT_WARNING_THRESHOLD_MS = 250;

/**
 * Get the current round-trip time for a WebRTC peer connection.
 * @param {RTCPeerConnection} pc
 * @returns {Promise<number|null>} RTT in milliseconds, or null if unavailable.
 */
export async function getRTT(pc) {
  if (!pc) return null;

  try {
    const stats = await pc.getStats();
    for (const report of stats.values()) {
      if (report.type === 'candidate-pair' && report.state === 'succeeded') {
        return Math.round(report.currentRoundTripTime * 1000);
      }
    }
  } catch (e) {
    log('[RTTMonitor] Failed to get RTT:', e.message);
  }
  return null;
}

/**
 * Check RTT and warn if it exceeds {@link RTT_WARNING_THRESHOLD_MS}.
 * @param {RTCPeerConnection} pc
 * @param {string} [label='WebRTC Connection']
 * @param {number} [thresholdMs]
 * @returns {Promise<number|null>} Measured RTT, or null if unavailable.
 */
export async function checkAndWarnRTT(
  pc,
  label = 'WebRTC Connection',
  thresholdMs = RTT_WARNING_THRESHOLD_MS,
) {
  const rtt = await getRTT(pc);
  if (rtt === null) return null;

  if (rtt > thresholdMs) {
    log(
      `[RTTMonitor] ⚠️ ${label} has high latency. WebRTC peerConnection round trip time (RTT): ${rtt}ms. File transfers may be slow.`,
    );
  } else {
    log(
      `[RTTMonitor] ${label} WebRTC peerConnection round trip time (RTT): ${rtt}ms (OK)`,
    );
  }
  return rtt;
}
