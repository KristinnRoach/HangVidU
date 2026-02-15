// src/file-transfer/transport/webrtc-file-transport.js
// WebRTC DataChannel adapter for FileTransport

import { FileTransport } from './file-transport.js';

const BACKPRESSURE_THRESHOLD = 256 * 1024; // 256KB

/**
 * WebRTCFileTransport - DataChannel adapter implementing the raw FileTransport I/O interface.
 *
 * Owns DataChannel-specific concerns: send, message routing, readiness,
 * and backpressure. Protocol logic lives in FileTransferController.
 */
export class WebRTCFileTransport extends FileTransport {
  /**
   * @param {RTCDataChannel} dataChannel
   */
  constructor(dataChannel) {
    super();

    if (!dataChannel) {
      throw new Error('WebRTCFileTransport requires a DataChannel');
    }

    this.dataChannel = dataChannel;
    this._messageCallback = null;

    this._setupMessageHandling();
  }

  /** @private */
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

  send(data) {
    this.dataChannel.send(data);
  }

  onMessage(callback) {
    this._messageCallback = callback;
  }

  isReady() {
    return this.dataChannel?.readyState === 'open';
  }

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

  cleanup() {
    if (this.dataChannel) {
      this.dataChannel.onmessage = null;
    }
    this._messageCallback = null;
    this.dataChannel = null;
  }
}
