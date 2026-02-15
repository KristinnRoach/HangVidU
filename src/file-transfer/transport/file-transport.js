// src/file-transfer/transport/file-transport.js
// Base class defining the raw file transport I/O interface

/**
 * FileTransport - Base class for file transfer transport implementations
 *
 * Defines the raw I/O contract that transport adapters must implement.
 * Transports handle sending/receiving raw data through a specific channel
 * (WebRTC DataChannel, WebSocket, etc.). Protocol logic (chunking, assembly,
 * progress) lives in FileTransferController.
 *
 * @abstract
 */
export class FileTransport {
  /**
   * Send raw data (string or ArrayBuffer) through the transport
   * @param {string|ArrayBuffer} data
   * @abstract
   */
  send(data) {
    throw new Error('FileTransport.send() must be implemented by subclass');
  }

  /**
   * Set callback for incoming raw data
   * @param {Function} callback - Called with raw data (string or ArrayBuffer)
   * @abstract
   */
  onMessage(callback) {
    throw new Error('FileTransport.onMessage() must be implemented by subclass');
  }

  /**
   * Check if the transport is ready to send
   * @returns {boolean}
   * @abstract
   */
  isReady() {
    throw new Error('FileTransport.isReady() must be implemented by subclass');
  }

  /**
   * Optional backpressure hook. Returns a promise that resolves when
   * the transport is ready to accept more data. Returns null if no
   * backpressure handling is needed.
   * @returns {Function|null} Async function to await, or null
   */
  getWaitForDrain() {
    return null;
  }

  /**
   * Cleanup resources when transport is no longer needed
   * @abstract
   */
  cleanup() {
    throw new Error('FileTransport.cleanup() must be implemented by subclass');
  }
}
