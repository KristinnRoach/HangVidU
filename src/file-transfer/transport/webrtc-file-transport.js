// src/file-transfer/transport/webrtc-file-transport.js
// WebRTC DataChannel implementation of FileTransport

import { FileTransport } from './file-transport.js';
import { FileTransfer } from '../file-transfer.js';

const BACKPRESSURE_THRESHOLD = 256 * 1024; // 256KB

/**
 * WebRTCFileTransport - WebRTC DataChannel implementation for file transfer
 *
 * Owns all DataChannel-specific concerns (send, readiness, backpressure,
 * message routing) and delegates chunking protocol to FileTransfer.
 */
export class WebRTCFileTransport extends FileTransport {
  /**
   * @param {RTCDataChannel} dataChannel - WebRTC DataChannel for file transfer
   */
  constructor(dataChannel) {
    super();

    if (!dataChannel) {
      throw new Error('WebRTCFileTransport requires a DataChannel');
    }

    this.dataChannel = dataChannel;
    this.fileTransfer = new FileTransfer(
      (data) => this.dataChannel.send(data),
    );

    this._setupMessageHandling();
  }

  /**
   * Route incoming DataChannel messages to the FileTransfer protocol handler.
   * @private
   */
  _setupMessageHandling() {
    this.dataChannel.onmessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'FILE_META' || msg.type === 'FILE_CHUNK') {
            this.fileTransfer.handleMessage(event.data);
            return;
          }
        } catch (e) {
          // Not JSON or not our message format - ignore
        }
      } else {
        // Binary data - assume it's a file chunk
        this.fileTransfer.handleMessage(event.data);
      }
    };
  }

  /**
   * Wait until DataChannel bufferedAmount drops below threshold.
   * Passed to FileTransfer.sendFile as the backpressure callback.
   * @private
   */
  async _waitForDrain() {
    while (this.dataChannel.bufferedAmount > BACKPRESSURE_THRESHOLD) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  async sendFile(file, onProgress) {
    if (!this.isReady()) {
      throw new Error('DataChannel not ready');
    }

    return this.fileTransfer.sendFile(
      file,
      onProgress,
      () => this._waitForDrain(),
    );
  }

  onFileReceived(callback) {
    this.fileTransfer.onFileReceived = callback;
  }

  onReceiveProgress(callback) {
    this.fileTransfer.onReceiveProgress = callback;
  }

  onFileError(callback) {
    this.fileTransfer.onFileError = callback;
  }

  onFileMetaReceived(callback) {
    this.fileTransfer.onFileMetaReceived = callback;
  }

  isReady() {
    return this.dataChannel?.readyState === 'open';
  }

  cleanup() {
    if (this.dataChannel) {
      this.dataChannel.onmessage = null;
    }

    if (this.fileTransfer) {
      this.fileTransfer.onFileReceived = null;
      this.fileTransfer.onFileMetaReceived = null;
      this.fileTransfer.onFileError = null;
      this.fileTransfer.onReceiveProgress = null;
    }

    this.dataChannel = null;
    this.fileTransfer = null;
  }
}
