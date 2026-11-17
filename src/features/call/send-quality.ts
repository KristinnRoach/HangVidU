import type { P2PRoom } from '@kidlib/p2p';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import { metrics } from '@sentry/browser';
import { createEffect, onCleanup } from 'solid-js';

/** Camera upload shared by a mesh call's remote peers. Each peer gets its own
 * encode, so an uncapped group call multiplies upload and encoder load. A 1:1
 * call keeps the browser's own rate control. */
const MESH_VIDEO_UPLOAD_BPS = 1_500_000;
const STATS_INTERVAL_MS = 30_000;

/** A listed connection can already be closed before its member leaves. */
function openPeerConnections(room: P2PRoom): RTCPeerConnection[] {
  return [...room.peerConnections().values()].filter(
    (pc) => pc.connectionState !== 'closed',
  );
}

function videoSenders(pc: RTCPeerConnection): RTCRtpSender[] {
  return pc
    .getTransceivers()
    .filter((transceiver) => transceiver.receiver.track.kind === 'video')
    .map((transceiver) => transceiver.sender);
}

/** Splits the camera upload budget across connected peers. Under the cap the
 * browser lowers resolution or frame rate itself, so screen shares keep full
 * resolution when they fit. */
export async function capVideoSenders(room: P2PRoom): Promise<void> {
  const pcs = openPeerConnections(room);
  const maxBitrate =
    pcs.length > 1 ? Math.round(MESH_VIDEO_UPLOAD_BPS / pcs.length) : undefined;
  const updates = pcs.flatMap(videoSenders).flatMap((sender) => {
    const parameters = sender.getParameters();
    const [encoding] = parameters.encodings ?? [];
    if (!encoding || encoding.maxBitrate === maxBitrate) return [];
    if (maxBitrate === undefined) delete encoding.maxBitrate;
    else encoding.maxBitrate = maxBitrate;
    return [sender.setParameters(parameters)];
  });
  const results = await Promise.allSettled(updates);
  for (const result of results) {
    if (result.status === 'rejected') {
      console.warn('[call] video bitrate cap failed:', result.reason);
    }
  }
}

/** Samples what limits outgoing video, so group-call lag can be attributed to
 * CPU or bandwidth before choosing a fix such as an SFU. */
async function reportSendQuality(room: P2PRoom): Promise<void> {
  const pcs = openPeerConnections(room);
  const remotePeers = pcs.length;
  for (const pc of pcs) {
    const stats = await pc.getStats();
    stats.forEach((report) => {
      if (report.type !== 'outbound-rtp' || report.kind !== 'video') return;
      metrics.count('call.video_send_sample', 1, {
        attributes: {
          remote_peers: remotePeers,
          limitation: report.qualityLimitationReason ?? 'unknown',
        },
      });
      if (report.frameHeight) {
        metrics.distribution('call.video_send_height', report.frameHeight, {
          attributes: { remote_peers: remotePeers },
        });
      }
    });
  }
}

/** Keeps outgoing video within the mesh budget for the owning call's lifetime. */
export function trackSendQuality(p2p: SolidP2PRoom): void {
  // The budget depends on the peer count, so rebalance on every connection
  // change. Sender parameters survive track replacement.
  createEffect(() => {
    const room = p2p.room();
    if (!room) return;
    const rebalance = () => void capVideoSenders(room);
    rebalance();
    const unsubscribers = [
      room.on('peerConnection', rebalance),
      room.on('memberLeft', rebalance),
    ];
    onCleanup(() => unsubscribers.forEach((unsubscribe) => unsubscribe()));
  });
  const timer = setInterval(() => {
    const room = p2p.room();
    if (room) {
      reportSendQuality(room).catch((error: unknown) =>
        console.warn('[call] send stats failed:', error),
      );
    }
  }, STATS_INTERVAL_MS);
  onCleanup(() => clearInterval(timer));
}
