// src/features/file-transfer/core/transport/webrtc-file-transport.js
// WebRTC DataChannel adapter for FileTransport

import { FileTransport } from './file-transport.js';
import { TransferConfig } from '../config.js';

const BACKPRESSURE_THRESHOLD = TransferConfig.BACKPRESSURE_THRESHOLD;

/**
 * FileTransport adapter for a caller-owned WebRTC DataChannel.
 *
 * This legacy adapter also owns the peer connection cleanup path. Use
 * P2PRoomFileTransport when the media room owns the peer connection.
 */
export class WebRTCFileTransport extends FileTransport {
  /**
   * Create an adapter around an RTCDataChannel.
   * @param {RTCPeerConnection} pc
   * @param {RTCDataChannel} dataChannel
   */
  constructor(pc, dataChannel) {
    super();

    if (!pc || !dataChannel) {
      throw new Error('WebRTCFileTransport requires a DataChannel');
    }

    this.pc = pc;
    this.dataChannel = dataChannel;
    this._messageCallback = null;

    this._setupMessageHandling();
  }

  /**
   * Forward file-transfer payloads from the data channel.
   * @returns {void}
   * @private
   */
  _setupMessageHandling() {
    this.dataChannel.onmessage = (event) => {
      if (!this._messageCallback) return;

      if (typeof event.data === 'string') {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'FILE_META' || msg.type === 'FILE_CHUNK') {
            this._messageCallback(event.data);
            return;
          }
        } catch (e) {
          // Not JSON or not our message format - ignore
        }
      } else {
        // Binary data - assume file chunk
        this._messageCallback(event.data);
      }
    };
  }

  /**
   * Send one raw protocol payload over the data channel.
   * @param {string|ArrayBuffer|ArrayBufferView|Blob} data
   * @returns {void}
   */
  send(data) {
    this.dataChannel.send(data);
  }

  /**
   * Register the incoming file-transfer payload callback.
   * @param {(data: string|ArrayBuffer|ArrayBufferView|Blob) => void} callback
   * @returns {void}
   */
  onMessage(callback) {
    this._messageCallback = callback;
  }

  /**
   * Return whether the data channel is open.
   * @returns {boolean}
   */
  isReady() {
    return this.dataChannel?.readyState === 'open';
  }

  /**
   * Return a wait function that resolves after bufferedAmount drains.
   * @returns {() => Promise<void>}
   */
  getWaitForDrain() {
    return async () => {
      const dc = this.dataChannel;
      if (
        !dc ||
        dc.readyState !== 'open' ||
        dc.bufferedAmount <= BACKPRESSURE_THRESHOLD
      )
        return;

      // Prefer event-driven waiting when supported (`bufferedamountlow`).
      // Fall back to polling for environments that don't support the event
      // (old WebViews, test mocks, etc.). Restore any previous threshold
      // where possible.
      let prevThreshold;
      try {
        prevThreshold = dc.bufferedAmountLowThreshold;
        dc.bufferedAmountLowThreshold = BACKPRESSURE_THRESHOLD;
      } catch (e) {
        // Ignore if not supported or not writable.
      }

      const useEvent = typeof dc.addEventListener === 'function';

      await new Promise((resolve) => {
        let resolved = false;
        let pollId = null;

        const cleanup = () => {
          try {
            if (useEvent) dc.removeEventListener('bufferedamountlow', onLow);
            else dc.onbufferedamountlow = null;
          } catch (e) {
            // ignore
          }
          if (pollId !== null) clearInterval(pollId);
        };

        const onLow = () => {
          if (resolved) return;
          if (
            !dc ||
            dc.readyState !== 'open' ||
            dc.bufferedAmount <= BACKPRESSURE_THRESHOLD
          ) {
            resolved = true;
            cleanup();
            resolve();
          }
        };

        try {
          if (useEvent) dc.addEventListener('bufferedamountlow', onLow);
          else dc.onbufferedamountlow = onLow;
        } catch (e) {
          // ignore and rely on poll
        }

        // immediate check in case it's already drained
        onLow();

        // polling fallback (modest interval to avoid busy spin)
        pollId = setInterval(() => {
          if (
            !dc ||
            dc.readyState !== 'open' ||
            dc.bufferedAmount <= BACKPRESSURE_THRESHOLD
          ) {
            if (!resolved) {
              resolved = true;
              cleanup();
              resolve();
            }
          }
        }, 50);
      }).finally(() => {
        try {
          if (prevThreshold !== undefined)
            dc.bufferedAmountLowThreshold = prevThreshold;
        } catch (e) {
          // ignore
        }
      });
    };
  }

  /**
   * Close the peer connection owned by this legacy transport.
   * @returns {void}
   */
  closePeerConnection() {
    // Close the data PeerConnection
    try {
      if (this.pc) {
        this.pc.close();
      }
    } catch (e) {
      console.warn(
        '[WebRTCFileTransport] Error closing data PC during cleanup:',
        e,
      );
    }
    this.pc = null;
  }

  /**
   * Remove handlers and close owned WebRTC resources.
   * @returns {void}
   */
  cleanup() {
    if (this.dataChannel) {
      this.dataChannel.onmessage = null;
    }

    this.closePeerConnection();

    this._messageCallback = null;
    this.dataChannel = null;
  }
}
