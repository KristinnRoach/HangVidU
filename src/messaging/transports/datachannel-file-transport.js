// src/messaging/transports/datachannel-file-transport.js
// WebRTC DataChannel implementation of FileTransport

import { FileTransport } from './file-transport.js';
import { FileTransfer } from '../../file-transfer.js';

/**
 * DataChannelFileTransport - WebRTC DataChannel implementation for file transfer
 *
 * Wraps the FileTransfer class to provide a transport-layer abstraction.
 * Handles file transfer over WebRTC DataChannel during active P2P calls.
 *
 * Features:
 * - Chunked file transfer (64KB chunks)
 * - Progress tracking
 * - Backpressure handling
 * - 100MB file size limit
 */
export class DataChannelFileTransport extends FileTransport {
  /**
   * Create a DataChannel file transport
   * @param {RTCDataChannel} dataChannel - WebRTC DataChannel for file transfer
   */
  constructor(dataChannel) {
    super();

    if (!dataChannel) {
      throw new Error('DataChannelFileTransport requires a DataChannel');
    }

    this.dataChannel = dataChannel;
    this.fileTransfer = new FileTransfer(dataChannel);

    // Setup message routing for file transfer protocol
    this._setupMessageHandling();
  }

  /**
   * Setup DataChannel message handling for file transfer
   * Routes file transfer messages to FileTransfer handler
   * @private
   */
  _setupMessageHandling() {
    this.dataChannel.onmessage = (event) => {
      // Check if this is a file transfer message
      if (typeof event.data === 'string') {
        try {
          const msg = JSON.parse(event.data);
          // Handle file transfer protocol messages (FILE_META, FILE_CHUNK)
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
   * Send a file via DataChannel
   * @param {File} file - File object to send
   * @param {Function} [onProgress] - Optional callback(progress) with progress from 0 to 1
   * @returns {Promise<void>}
   */
  async sendFile(file, onProgress) {
    if (!this.isReady()) {
      throw new Error('DataChannel not ready');
    }

    return this.fileTransfer.sendFile(file, onProgress);
  }

  /**
   * Set callback for when a file is received
   * @param {Function} callback - Callback(file) called when file is fully received
   */
  onFileReceived(callback) {
    if (typeof callback !== 'function') {
      throw new Error('onFileReceived callback must be a function');
    }

    this.fileTransfer.onFileReceived = callback;
  }

  /**
   * Check if the DataChannel is ready to send files
   * @returns {boolean} True if ready, false otherwise
   */
  isReady() {
    return this.dataChannel && this.dataChannel.readyState === 'open';
  }

  /**
   * Cleanup resources
   * Removes message handlers and clears references
   */
  cleanup() {
    if (this.dataChannel) {
      this.dataChannel.onmessage = null;
    }

    // Clear FileTransfer references
    if (this.fileTransfer) {
      this.fileTransfer.onFileReceived = null;
      this.fileTransfer.onFileMetaReceived = null;
    }

    this.dataChannel = null;
    this.fileTransfer = null;
  }
}
