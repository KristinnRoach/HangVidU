// src/lib/webrtc/config.js

/**
 * Default RTCConfiguration with Google's public STUN server.
 * Consumers can override per call by passing their own rtcConfig into
 * createDataChannel / joinDataChannel, or by constructing RTCPeerConnection
 * directly.
 */
export const rtcConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // Add TURN servers here if needed for restrictive NATs.
  ],
};
