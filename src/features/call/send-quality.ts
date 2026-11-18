import type { P2PRoom } from '@kidlib/p2p';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';
import { metrics } from '@sentry/browser';
import { createEffect, onCleanup, type Accessor } from 'solid-js';

/** Camera upload shared by a mesh call's remote peers. Each peer gets its own
 * encode, so an uncapped group call multiplies upload and encoder load. A 1:1
 * call keeps the browser's own rate control. */
const MESH_VIDEO_UPLOAD_BPS = 1_500_000;
const FOUR_PERSON_CAMERA_FPS = 20;
const STATS_INTERVAL_MS = 10_000;

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

/** Splits the upload budget across peers and limits camera work at capacity. */
export async function capVideoSenders(
  room: P2PRoom,
  screenSharing: boolean,
): Promise<void> {
  const pcs = openPeerConnections(room);
  const maxBitrate =
    pcs.length > 1 ? Math.round(MESH_VIDEO_UPLOAD_BPS / pcs.length) : undefined;
  const maxFramerate =
    pcs.length >= 3 && !screenSharing ? FOUR_PERSON_CAMERA_FPS : undefined;
  const updates = pcs.flatMap(videoSenders).map(async (sender) => {
    const parameters = sender.getParameters();
    const [encoding] = parameters.encodings ?? [];
    if (
      !encoding ||
      (encoding.maxBitrate === maxBitrate &&
        encoding.maxFramerate === maxFramerate)
    )
      return;

    if (maxBitrate === undefined) delete encoding.maxBitrate;
    else encoding.maxBitrate = maxBitrate;
    if (maxFramerate === undefined) delete encoding.maxFramerate;
    else encoding.maxFramerate = maxFramerate;
    await sender.setParameters(parameters);
  });
  const results = await Promise.allSettled(updates);
  for (const result of results) {
    if (result.status === 'rejected') {
      console.warn('[call] video send limits failed:', result.reason);
    }
  }
}

/** Samples what limits outgoing video and how each peer is reached, so
 * group-call lag can be attributed to CPU, bandwidth or a TURN relay before
 * choosing a fix such as an SFU. */
async function reportSendQuality(room: P2PRoom): Promise<void> {
  const pcs = openPeerConnections(room);
  for (const pc of pcs) {
    const stats = await pc.getStats();
    const reports = [...stats.values()];
    // Firefox has no selectedCandidatePairId; fall back to its selected pair,
    // then to a nominated one.
    const transport = reports.find((report) => report.type === 'transport');
    const pair =
      stats.get(transport?.selectedCandidatePairId) ??
      reports.find(
        (report) =>
          report.type === 'candidate-pair' && report.selected === true,
      ) ??
      reports.find(
        (report) =>
          report.type === 'candidate-pair' &&
          report.nominated &&
          report.state === 'succeeded',
      );
    const attributes = {
      remote_peers: pcs.length,
      route: stats.get(pair?.localCandidateId)?.candidateType ?? 'unknown',
    };
    if (pair?.currentRoundTripTime !== undefined) {
      metrics.distribution('call.peer_rtt', pair.currentRoundTripTime * 1000, {
        unit: 'millisecond',
        attributes,
      });
    }
    if (pair?.availableOutgoingBitrate !== undefined) {
      metrics.distribution(
        'call.peer_send_estimate',
        pair.availableOutgoingBitrate,
        { attributes },
      );
    }
    const maxFramerate =
      videoSenders(pc)[0]?.getParameters().encodings?.[0]?.maxFramerate;
    for (const report of reports) {
      if (report.type !== 'outbound-rtp' || report.kind !== 'video') continue;
      metrics.count('call.video_send_sample', 1, {
        attributes: {
          ...attributes,
          limitation: report.qualityLimitationReason ?? 'unknown',
          max_fps: maxFramerate ?? 'none',
        },
      });
      if (report.frameHeight) {
        metrics.distribution('call.video_send_height', report.frameHeight, {
          attributes,
        });
      }
    }
  }
}

/** Keeps outgoing video within the mesh budget for the owning call's lifetime. */
export function trackSendQuality(
  p2p: SolidP2PRoom,
  screenSharing: Accessor<boolean>,
): void {
  // The budget depends on the peer count, so rebalance on every connection
  // change. Passes run in order, so a slow update can't overwrite a newer cap.
  // Sender parameters survive track replacement.
  createEffect(() => {
    const room = p2p.room();
    if (!room) return;
    let passes = Promise.resolve();
    const rebalance = () => {
      passes = passes
        .then(() => {
          if (p2p.room() === room)
            return capVideoSenders(room, screenSharing());
        })
        .catch((error: unknown) =>
          console.warn('[call] video send limits failed:', error),
        );
    };
    createEffect(() => {
      screenSharing();
      rebalance();
    });
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
