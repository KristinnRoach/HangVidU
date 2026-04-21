// src/lib/webrtc/peer.js
//
// High-level Peer abstraction over RTCPeerConnection. Wraps the sdp/ice/
// tracks primitives with a single cohesive lifecycle and an EventTarget-
// based event surface.
//
// Signaling-agnostic: callers inject a SignalingChannel implementation
// (see signaling-transport.js). Works for both initiator and joiner roles
// and optionally carries a data channel alongside media tracks.

import { rtcConfig as defaultRtcConfig } from './config.js';
import { createOffer, createAnswer, setRemoteDescription } from './sdp.js';
import { setupIceCandidates, drainIceCandidateQueue } from './ice.js';
import { addLocalTracks } from './tracks.js';
import { log } from './logger.js';

/** @typedef {import('./signaling-transport.js').DataSignalingChannel} SignalingChannel */

const PEER_STATES = Object.freeze({
  IDLE: 'idle',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  FAILED: 'failed',
  CLOSED: 'closed',
});

/**
 * Events dispatched on Peer (via EventTarget):
 *   - 'statechange'   → detail: { state: PeerState, previous: PeerState }
 *   - 'connected'     → fired once when pc.connectionState becomes 'connected'
 *   - 'disconnected'  → fired when connection drops ('disconnected' | 'failed')
 *   - 'track'         → detail: { track, streams } (native RTCTrackEvent fields)
 *   - 'datachannel'   → detail: { channel } (initiator: on create; joiner: on ondatachannel)
 *   - 'open'          → data channel opened
 *   - 'message'       → detail: { data } (data channel message)
 *   - 'close'         → data channel closed
 *   - 'error'         → detail: { error, phase }
 *
 * Sugar `on/off/once` methods exist alongside the standard
 * `addEventListener/removeEventListener` API.
 */
export class Peer extends EventTarget {
  /**
   * @param {Object} options
   * @param {'initiator'|'joiner'} options.role
   * @param {SignalingChannel} options.signaling
   * @param {MediaStream}  [options.localStream]
   * @param {boolean}      [options.audioOnly=false]
   * @param {boolean}      [options.dataChannel=false]
   *   Initiator: create a data channel up-front. Joiner: forward the remote
   *   channel when it arrives.
   * @param {string}       [options.dataChannelLabel='data']
   * @param {RTCConfiguration} [options.rtcConfig]
   */
  constructor(options) {
    super();
    const {
      role,
      signaling,
      localStream = null,
      audioOnly = false,
      dataChannel = false,
      dataChannelLabel = 'data',
      rtcConfig = defaultRtcConfig,
    } = options ?? {};

    if (role !== 'initiator' && role !== 'joiner') {
      throw new Error(`Peer: invalid role "${role}"`);
    }
    assertSignaling(signaling);

    this._role = role;
    this._signaling = signaling;
    this._localStream = localStream;
    this._audioOnly = audioOnly;
    this._wantsDataChannel = dataChannel;
    this._dataChannelLabel = dataChannelLabel;
    this._rtcConfig = rtcConfig;

    this._pc = null;
    this._dataChannel = null;
    this._state = PEER_STATES.IDLE;
    this._started = false;
    this._startPromise = null;
    this._closed = false;
    this._pendingStartReject = null;
    this._listenerMap = new Map();
  }

  // ─── Public API ───────────────────────────────────────────────────────

  get role() {
    return this._role;
  }
  get state() {
    return this._state;
  }
  get pc() {
    return this._pc;
  }
  get dataChannel() {
    return this._dataChannel;
  }

  /**
   * Kick off the connection. Idempotent: repeat calls return the same promise.
   * Resolves after SDP + local signaling complete (peers may still be
   * negotiating ICE; listen for 'connected' to know when media is flowing).
   */
  start() {
    if (this._state === PEER_STATES.CLOSED) return Promise.resolve();
    if (this._started) return this._startPromise;
    this._started = true;
    this._setState(PEER_STATES.CONNECTING);

    this._startPromise =
      this._role === 'initiator' ? this._startInitiator() : this._startJoiner();

    // Don't leak rejections — caller can still await start() to see them.
    this._startPromise.catch((error) => {
      this._emit('error', { error, phase: 'start' });
      if (this._state !== PEER_STATES.CLOSED) {
        this._setState(PEER_STATES.FAILED);
      }
    });

    return this._startPromise;
  }

  /**
   * Send data through the data channel. Throws if no channel or not open.
   * @param {string|Blob|ArrayBuffer|ArrayBufferView} data
   */
  send(data) {
    if (!this._dataChannel) {
      throw new Error('Peer.send: no data channel');
    }
    if (this._dataChannel.readyState !== 'open') {
      throw new Error(
        `Peer.send: data channel not open (state=${this._dataChannel.readyState})`,
      );
    }
    this._dataChannel.send(data);
  }

  /**
   * Close the peer connection and any associated data channel.
   * Safe to call multiple times.
   */
  close() {
    if (this._closed) return;
    this._closed = true;

    try {
      this._dataChannel?.close();
    } catch (_) {}

    try {
      this._pc?.close();
    } catch (err) {
      log('[Peer] Error closing peer connection:', err);
    }

    this._setState(PEER_STATES.CLOSED);

    if (this._pendingStartReject) {
      const reject = this._pendingStartReject;
      this._pendingStartReject = null;
      reject(new Error('Peer: closed before start completed'));
    }
  }

  // ─── on/off/once sugar (thin wrappers over EventTarget) ───────────────

  /**
   * Subscribe to an event. Returns an unsubscribe function.
   * @param {string} type
   * @param {(detail: any, event: CustomEvent) => void} callback
   */
  on(type, callback) {
    const handler = (event) => callback(event.detail, event);
    if (!this._listenerMap.has(type)) {
      this._listenerMap.set(type, new Map());
    }
    const callbacks = this._listenerMap.get(type);
    if (!callbacks.has(callback)) {
      callbacks.set(callback, new Set());
    }
    callbacks.get(callback).add(handler);
    this.addEventListener(type, handler);
    return () => {
      this.removeEventListener(type, handler);
      const handlers = this._listenerMap.get(type)?.get(callback);
      handlers?.delete(handler);
      if (handlers?.size === 0) {
        this._listenerMap.get(type)?.delete(callback);
      }
    };
  }

  /**
   * Subscribe once; auto-unsubscribes after first fire.
   * @param {string} type
   * @param {(detail: any, event: CustomEvent) => void} callback
   */
  once(type, callback) {
    if (!this._listenerMap.has(type)) {
      this._listenerMap.set(type, new Map());
    }
    const callbacks = this._listenerMap.get(type);
    if (!callbacks.has(callback)) {
      callbacks.set(callback, new Set());
    }
    const handlers = callbacks.get(callback);

    const forget = () => {
      handlers.delete(handler);
      if (handlers.size === 0) callbacks.delete(callback);
    };
    const handler = (event) => {
      this.removeEventListener(type, handler);
      forget();
      callback(event.detail, event);
    };
    handlers.add(handler);
    this.addEventListener(type, handler);

    return () => {
      this.removeEventListener(type, handler);
      forget();
    };
  }

  /**
   * Remove a previously-registered listener. Callers using `on`/`once` should
   * prefer the returned unsubscribe function; this is here for parity with
   * other emitter APIs.
   * @param {string} type
   * @param {Function} callback
   */
  off(type, callback) {
    const handlers = this._listenerMap.get(type)?.get(callback);
    if (handlers) {
      for (const handler of handlers) {
        this.removeEventListener(type, handler);
      }
      this._listenerMap.get(type)?.delete(callback);
      return;
    }
    this.removeEventListener(type, callback);
  }

  // ─── Private: role-specific flows ─────────────────────────────────────

  async _startInitiator() {
    this._initPc();

    if (this._wantsDataChannel) {
      const channel = this._pc.createDataChannel(this._dataChannelLabel);
      this._bindDataChannel(channel);
    }

    this._signaling.onAnswer(async (answer) => {
      if (!answer || this._closed) return;
      try {
        const applied = await setRemoteDescription(
          this._pc,
          answer,
          drainIceCandidateQueue,
        );
        if (!applied) return;
        log('[Peer] Remote answer applied');
      } catch (err) {
        this._emit('error', { error: err, phase: 'answer' });
      }
    });

    const offer = await createOffer(this._pc);
    await this._signaling.sendOffer({ type: offer.type, sdp: offer.sdp });
    log('[Peer] Offer sent (initiator)');
  }

  async _startJoiner() {
    this._initPc();

    if (this._closed) {
      throw new Error('Peer: closed before start completed');
    }

    let offerHandled = false;
    await new Promise((resolve, reject) => {
      this._pendingStartReject = reject;
      const settle = (fn, value) => {
        if (this._pendingStartReject === reject) {
          this._pendingStartReject = null;
        }
        fn(value);
      };
      this._signaling.onOffer(async (offer) => {
        if (offerHandled || !offer || this._closed) return;
        try {
          const applied = await setRemoteDescription(
            this._pc,
            offer,
            drainIceCandidateQueue,
          );
          if (!applied) return;

          const answer = await createAnswer(this._pc);
          await this._signaling.sendAnswer({
            type: answer.type,
            sdp: answer.sdp,
          });
          log('[Peer] Answer sent (joiner)');
          offerHandled = true;
          settle(resolve);
        } catch (err) {
          this._emit('error', { error: err, phase: 'offer' });
          settle(reject, err);
        }
      });
    });
  }

  // ─── Private: PC setup + event wiring ─────────────────────────────────

  _initPc() {
    const pc = new RTCPeerConnection(this._rtcConfig);
    this._pc = pc;

    if (this._localStream) {
      const health = addLocalTracks(pc, this._localStream, {
        audioOnly: this._audioOnly,
      });
      if (!health.allHealthy) {
        this._emit('error', {
          error: new Error(
            `Unhealthy local tracks: ${health.unhealthyKinds.join(', ')}`,
          ),
          phase: 'tracks',
        });
      }
    }

    setupIceCandidates(pc, this._signaling);

    pc.addEventListener('track', (event) => {
      this._emit('track', { track: event.track, streams: event.streams });
    });

    pc.addEventListener('connectionstatechange', () => {
      const connState = pc.connectionState;
      log(`[Peer] connectionState → ${connState}`);
      if (connState === 'connected') {
        this._setState(PEER_STATES.CONNECTED);
        this._emit('connected', {});
      } else if (connState === 'disconnected') {
        this._setState(PEER_STATES.DISCONNECTED);
        this._emit('disconnected', { reason: 'disconnected' });
      } else if (connState === 'failed') {
        this._setState(PEER_STATES.FAILED);
        this._emit('disconnected', { reason: 'failed' });
      } else if (connState === 'closed') {
        this._setState(PEER_STATES.CLOSED);
      }
    });

    pc.addEventListener('datachannel', (event) => {
      // Joiner path: remote created the channel.
      if (this._wantsDataChannel || this._role === 'joiner') {
        this._bindDataChannel(event.channel);
      }
    });
  }

  _bindDataChannel(channel) {
    this._dataChannel = channel;
    this._emit('datachannel', { channel });

    channel.addEventListener('open', () => {
      this._emit('open', {});
    });
    channel.addEventListener('message', (event) => {
      this._emit('message', { data: event.data });
    });
    channel.addEventListener('close', () => {
      this._emit('close', {});
    });
    channel.addEventListener('error', (event) => {
      this._emit('error', { error: event.error, phase: 'datachannel' });
    });
  }

  // ─── Private: emit + state helpers ────────────────────────────────────

  _setState(next) {
    if (this._state === next) return;
    const previous = this._state;
    this._state = next;
    this._emit('statechange', { state: next, previous });
  }

  _emit(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  }
}

export { PEER_STATES };

function assertSignaling(signaling) {
  if (!signaling) {
    throw new Error('Peer: signaling channel is required');
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
      throw new Error(`Peer: signaling channel missing method "${name}"`);
    }
  }
}
