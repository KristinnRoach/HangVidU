// src/lib/webrtc/tracks.js

/**
 * Add local media tracks to a peer connection. Skips tracks that are not
 * live to avoid permanently silent/black senders.
 *
 * @param {RTCPeerConnection} pc
 * @param {MediaStream} localStream
 * @param {Object} [options]
 * @param {boolean} [options.audioOnly=false] - Only add audio tracks.
 * @returns {{ allHealthy: boolean, unhealthyKinds: string[] }}
 */
export function addLocalTracks(pc, localStream, { audioOnly = false } = {}) {
  if (!pc || typeof pc.addTrack !== 'function') {
    throw new TypeError(
      'addLocalTracks: pc must be an RTCPeerConnection-like object with addTrack()',
    );
  }
  if (
    !localStream ||
    typeof localStream.getTracks !== 'function' ||
    typeof localStream.getAudioTracks !== 'function'
  ) {
    throw new TypeError(
      'addLocalTracks: localStream must be a MediaStream-like object with getTracks() and getAudioTracks()',
    );
  }

  const unhealthyKinds = [];

  const tracks = audioOnly
    ? localStream.getAudioTracks()
    : localStream.getTracks();

  tracks.forEach((track) => {
    if (track.readyState !== 'live') {
      console.warn(
        `[WebRTC] ${track.kind} track is not live at addLocalTracks:`,
        track.readyState,
      );
      unhealthyKinds.push(track.kind);
      return;
    }
    pc.addTrack(track, localStream);
  });

  return {
    allHealthy: unhealthyKinds.length === 0,
    unhealthyKinds,
  };
}
