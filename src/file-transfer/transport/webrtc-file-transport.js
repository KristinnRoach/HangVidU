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
      while (this.dataChannel.bufferedAmount > BACKPRESSURE_THRESHOLD) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
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
