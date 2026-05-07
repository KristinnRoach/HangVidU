// src/features/file-transfer/transport/file-transport.js
// Base class defining the raw file transport I/O interface

/**
 * Base class for file-transfer transport adapters.
 *
 * Transports move raw strings and binary chunks. Protocol concerns such as
 * metadata, chunking, validation, and progress live in FileTransferController.
 *
 * @abstract
 */
export class FileTransport {
  /**
   * Send one raw protocol payload.
   * @param {string|ArrayBuffer|ArrayBufferView|Blob} data
   * @returns {void}
   * @abstract
   */
  send(data) {
    throw new Error('FileTransport.send() must be implemented by subclass');
  }

  /**
   * Register the incoming payload callback.
   * @param {(data: string|ArrayBuffer|ArrayBufferView|Blob) => void} callback
   * @returns {void}
   * @abstract
   */
  onMessage(callback) {
    throw new Error('FileTransport.onMessage() must be implemented by subclass');
  }

  /**
   * Return whether the transport can send immediately.
   * @returns {boolean}
   * @abstract
   */
  isReady() {
    throw new Error('FileTransport.isReady() must be implemented by subclass');
  }

  /**
   * Return a wait function for send-buffer backpressure, if supported.
   * @returns {(() => Promise<void>)|null}
   */
  getWaitForDrain() {
    return null;
  }

  /**
   * Release transport-owned resources and listeners.
   * @returns {void}
   * @abstract
   */
  cleanup() {
    throw new Error('FileTransport.cleanup() must be implemented by subclass');
  }
}
