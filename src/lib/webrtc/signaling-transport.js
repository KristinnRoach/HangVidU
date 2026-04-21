// src/lib/webrtc/signaling-transport.js
//
// JSDoc typedefs describing the signaling interfaces that the WebRTC lib
// depends on. The lib itself is signaling-agnostic — consumers implement
// these contracts against any transport (Firebase RTDB, WebSocket, etc.).

/**
 * Minimal interface for exchanging ICE candidates with the remote peer.
 *
 * @typedef {Object} IceTransport
 * @property {(candidate: RTCIceCandidateInit) => void|Promise<void>} sendCandidate
 *   Publish a local ICE candidate to the remote peer.
 * @property {(callback: (candidate: RTCIceCandidateInit) => void) => void} onRemoteCandidate
 *   Subscribe to incoming remote ICE candidates. The callback may be invoked
 *   many times. The transport is responsible for listener lifetime/cleanup.
 */

/**
 * Full signaling channel needed to bring up a data-only PeerConnection.
 * Extends {@link IceTransport} with SDP offer/answer exchange.
 *
 * @typedef {Object} DataSignalingChannel
 * @property {(offer: RTCSessionDescriptionInit) => void|Promise<void>} sendOffer
 * @property {(answer: RTCSessionDescriptionInit) => void|Promise<void>} sendAnswer
 * @property {(callback: (offer: RTCSessionDescriptionInit) => void) => void} onOffer
 * @property {(callback: (answer: RTCSessionDescriptionInit) => void) => void} onAnswer
 * @property {(candidate: RTCIceCandidateInit) => void|Promise<void>} sendCandidate
 * @property {(callback: (candidate: RTCIceCandidateInit) => void) => void} onRemoteCandidate
 */

export {};
