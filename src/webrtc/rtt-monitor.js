/**
 * RTT Monitoring for WebRTC connections
 *
 * Detects high-latency connections and logs warnings.
 * Useful for diagnosing slow file transfers and call quality issues.
 */

const RTT_WARNING_THRESHOLD = 250; // 250ms

/**
 * Get the current round-trip time for a WebRTC peer connection
 * @param {RTCPeerConnection} pc
 * @returns {Promise<number|null>} RTT in milliseconds, or null if unavailable
 */
export async function getRTT(pc) {
  if (!pc) return null;

  try {
    const stats = await pc.getStats();
    for (const report of stats) {
      if (report.type === 'candidate-pair' && report.state === 'succeeded') {
        return Math.round(report.currentRoundTripTime * 1000); // convert to ms
      }
    }
  } catch (e) {
    console.warn('[RTTMonitor] Failed to get RTT:', e.message);
  }
  return null;
}

/**
 * Check RTT and warn if it exceeds threshold
 * @param {RTCPeerConnection} pc
 * @param {string} env - 'DEV_ONLY' to log only in development, 'DEV_AND_PROD' to log in all environments
 * @param {string} [label] - Optional label for logging
 */
export async function checkAndWarnRTT(
  pc,
  label = 'WebRTC Connection',
  env = 'DEV_AND_PROD', // 'DEV_ONLY' or 'DEV_AND_PROD''
) {
  if (env === 'DEV_ONLY' && !import.meta.env.DEV) return;

  const rtt = await getRTT(pc);
  if (rtt === null) return;

  if (rtt > RTT_WARNING_THRESHOLD) {
    console.warn(
      `[RTTMonitor] ⚠️ ${label} has high latency: ${rtt}ms. File transfers may be slow.`,
    );
  } else {
    console.info(`[RTTMonitor] ${label} RTT: ${rtt}ms (OK)`);
  }
}
