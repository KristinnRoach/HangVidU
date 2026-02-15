// src/file-transfer/transport/file-transport.js
// Base class defining the file transport interface

/**
 * FileTransport - Base class for file transfer transport implementations
 *
 * Defines the contract that all file transfer transports must implement.
 * File transports handle sending/receiving files through different channels
 * (WebRTC DataChannel, WebSocket, etc.).
 *
 * @abstract
 */
export class FileTransport {
  /**
   * Send a file to a contact
   * @param {File} file - File object to send
   * @param {Function} [onProgress] - Optional callback(progress) with progress from 0 to 1
   * @returns {Promise<void>}
   * @abstract
   */
  async sendFile(file, onProgress) {
    throw new Error('FileTransport.sendFile() must be implemented by subclass');
  }

  /**
   * Set callback for when a file is received
   * @param {Function} callback - Callback(file) called when file is fully received
   * @abstract
   */
  onFileReceived(callback) {
    throw new Error('FileTransport.onFileReceived() must be implemented by subclass');
  }

  /**
   * Set callback for receive progress updates
   * @param {Function} callback - Callback(progress) with progress from 0 to 1
   * @abstract
   */
  onReceiveProgress(callback) {
    throw new Error('FileTransport.onReceiveProgress() must be implemented by subclass');
  }

  /**
   * Set callback for file transfer errors
   * @param {Function} callback - Callback({fileName, reason, details})
   * @abstract
   */
  onFileError(callback) {
    throw new Error('FileTransport.onFileError() must be implemented by subclass');
  }

  /**
   * Set callback for when file metadata is received (before chunks arrive)
   * @param {Function} callback - Callback(meta) with {fileId, name, size, mimeType, totalChunks}
   * @abstract
   */
  onFileMetaReceived(callback) {
    throw new Error('FileTransport.onFileMetaReceived() must be implemented by subclass');
  }

  /**
   * Check if the transport is ready to send files
   * @returns {boolean} True if ready, false otherwise
   * @abstract
   */
  isReady() {
    throw new Error('FileTransport.isReady() must be implemented by subclass');
  }

  /**
   * Cleanup resources when transport is no longer needed
   * @returns {void}
   * @abstract
   */
  cleanup() {
    throw new Error('FileTransport.cleanup() must be implemented by subclass');
  }
}
