import { TransferConfig } from './config.js';
import {
  parseEmbeddedChunkPacket,
  createEmbeddedChunkPacket,
  isValidChunkIndex,
  convertToArrayBuffer,
} from './chunk-processor.js';
import { WebRTCFileTransport } from './transport/webrtc-file-transport.js';
import { createMemoryReceiveStore } from './receive-stores/memory-receive-store.js';
import { devDebug } from '../../../shared/utils/dev/dev-utils.js';

const CHUNK_SIZE = TransferConfig.FILE_CONFIG.NETWORK_CHUNK_SIZE; // 64KB
const CHUNK_YIELD_INTERVAL = TransferConfig.CHUNK_YIELD_INTERVAL; // null = disabled
const MAX_FILE_SIZE_MB = 5000;

/**
 * @typedef {Object} FileTransferControllerOptions
 * @property {import('./transport/file-transport.js').FileTransport} [transport]
 * Transport used for raw file-transfer packets.
 * @property {{ pc: RTCPeerConnection, dataChannel: RTCDataChannel }} [webrtc]
 * Legacy convenience input used to create a WebRTCFileTransport.
 * @property {(metadata: Object) => Object} [createReceiveStore]
 * Creates storage for one incoming file.
 * @property {() => void|Promise<void>} [cleanupReceiveStores]
 * Optional app-level storage cleanup hook.
 */

/**
 * FileTransferController — orchestrates the chunked file transfer protocol.
 *
 * Owns: file slicing, chunk assembly, progress tracking, validation, callbacks.
 * Delegates all I/O to an injected transport.
 *
 * Receive storage is delegated to a receive-store factory.
 */
export class FileTransferController {
  /**
   * Create a controller over a transport or legacy WebRTC data channel.
   * @param {FileTransferControllerOptions} [options]
   */
  constructor({
    transport,
    webrtc,
    createReceiveStore = createMemoryReceiveStore,
    cleanupReceiveStores = null,
  } = {}) {
    if (transport) {
      validateTransport(transport);
      this.transport = transport;
    } else {
      const { pc, dataChannel } = webrtc || {};
      if (!pc || !dataChannel) {
        throw new Error(
          'FileTransferController requires a transport or peerConnection and dataChannel',
        );
      }

      this.transport = new WebRTCFileTransport(pc, dataChannel);
    }

    if (!this.transport) {
      throw new Error(
        'FileTransferController requires a transport or peerConnection and dataChannel',
      );
    }

    if (typeof createReceiveStore !== 'function') {
      throw new Error(
        'FileTransferController createReceiveStore must be a function',
      );
    }

    this.createReceiveStore = createReceiveStore;
    this.cleanupReceiveStores = cleanupReceiveStores;
    this.receiveTransfers = new Map();

    // Public callbacks
    this.onFileSent = null;
    this.onFileReceived = null;
    this.onFileMetaReceived = null;
    this.onFileError = null;
    this.onReceiveProgress = null;

    // Wire incoming transport messages to protocol handler
    this.transport.onMessage((data) => this._handleMessage(data));
  }

  /**
   * Send a file as metadata plus binary chunks.
   * @param {File} file - Browser File/Blob-like object to send.
   * @param {(progress: number) => void} [onProgress] - Called with 0..1 send progress.
   * @returns {Promise<void>}
   */
  async sendFile(file, onProgress) {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      throw new Error(`File too large (max ${MAX_FILE_SIZE_MB} MB)`);
    }

    if (!this.transport.isReady()) {
      throw new Error('Transport not ready');
    }

    const fileId = `${file.name}-${file.size}-${Date.now()}`;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const waitForDrain = this.transport.getWaitForDrain?.();
    const sendStartMs = performance.now();

    if (!file.type) {
      console.warn(
        '[FileTransferController] file.type is empty, browser may not recognize this format:',
        { name: file.name, size: file.size },
      );
    }

    // 1. Send metadata
    this.transport.send(
      JSON.stringify({
        type: 'FILE_META',
        fileId,
        name: file.name,
        size: file.size,
        mimeType: file.type,
        totalChunks,
      }),
    );

    // 2. Send chunks with embedded metadata
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = await file.slice(start, end).arrayBuffer();

      if (i === 0) {
        devDebug('[FileTransferController][SendTrace] First chunk ready', {
          elapsedMs: Math.round(performance.now() - sendStartMs),
          chunkBytes: chunk.byteLength,
        });
      }

      const packet = createEmbeddedChunkPacket(
        { type: 'FILE_CHUNK', fileId, chunkIndex: i, totalChunks },
        chunk,
      );

      this.transport.send(packet);

      if (onProgress) {
        onProgress((i + 1) / totalChunks);
      }

      if (waitForDrain) {
        await waitForDrain();
      }

      // Yield event loop periodically so media packets aren't starved.
      // CHUNK_YIELD_INTERVAL=null disables this for max throughput.
      if (
        CHUNK_YIELD_INTERVAL !== null &&
        (i + 1) % CHUNK_YIELD_INTERVAL === 0
      ) {
        await new Promise((r) => setTimeout(r, 0));
      }
    }

    this.onFileSent?.({
      file,
      fileId,
      name: file.name,
      mimeType: file.type,
    });
  }

  /**
   * Return whether the underlying transport can send immediately.
   * @returns {boolean}
   */
  isReady() {
    return this.transport.isReady();
  }

  /**
   * Abort active receives, clear callbacks, cleanup storage, and close transport.
   * @returns {void}
   */
  cleanup() {
    this.onFileSent = null;
    this.onFileReceived = null;
    this.onFileMetaReceived = null;
    this.onFileError = null;
    this.onReceiveProgress = null;
    for (const transfer of this.receiveTransfers.values()) {
      transfer.store.abort?.('controller_cleanup').catch?.(() => {});
    }
    this.receiveTransfers.clear();
    this.cleanupReceiveStores?.();
    this.transport.cleanup();
  }

  /**
   * Route one raw incoming transport payload through the file protocol.
   * @param {string|Blob|ArrayBuffer|ArrayBufferView} data
   * @returns {Promise<void>}
   * @private
   */
  async _handleMessage(data) {
    if (typeof data === 'string') {
      let msg;
      try {
        msg = JSON.parse(data);
      } catch (e) {
        console.warn(
          '[FileTransferController] Ignoring invalid JSON message',
          e,
        );
        return;
      }

      if (msg.type === 'FILE_META') {
        if (!this._isValidFileMeta(msg)) {
          console.warn(
            '[FileTransferController] Ignoring invalid FILE_META payload',
            msg,
          );
          return;
        }

        await this._startReceiveTransfer(msg);
        this.onFileMetaReceived?.(msg);

        if (msg.totalChunks === 0) {
          this._completeReceiveTransfer(msg.fileId);
          return;
        }
      }
    } else {
      const arrayBuffer = await convertToArrayBuffer(data);
      if (!arrayBuffer) {
        console.error(
          '[FileTransferController] Failed to convert binary data to ArrayBuffer',
        );
        return;
      }

      const parsed = parseEmbeddedChunkPacket(arrayBuffer);
      if (!parsed) {
        console.error(
          '[FileTransferController] Failed to parse embedded chunk packet',
        );
        return;
      }

      const { chunkMeta, chunkData } = parsed;
      const transfer = this.receiveTransfers.get(chunkMeta.fileId);
      const meta = transfer?.metadata;

      if (!meta) {
        console.error(
          '[FileTransferController] Received chunk for unknown file:',
          chunkMeta.fileId,
        );
        return;
      }

      if (!isValidChunkIndex(chunkMeta.chunkIndex, meta.totalChunks)) {
        console.error(
          '[FileTransferController] Invalid chunk index:',
          chunkMeta.chunkIndex,
          'for file:',
          chunkMeta.fileId,
        );
        return;
      }

      this._writeReceiveChunk(transfer, chunkMeta.chunkIndex, chunkData);
    }
  }

  /**
   * Create and initialize receive state for one incoming file.
   * @param {Object} metadata - Validated FILE_META payload.
   * @returns {Promise<void>}
   * @private
   */
  async _startReceiveTransfer(metadata) {
    const store = this.createReceiveStore(metadata);
    validateReceiveStore(store);

    const transfer = {
      metadata,
      store,
      receivedChunkIndexes: new Set(),
      receivedCount: 0,
      writeChain: Promise.resolve(),
      initPromise: Promise.resolve(store.init?.(metadata)),
    };

    this.receiveTransfers.set(metadata.fileId, transfer);
  }

  /**
   * Queue one received chunk into the transfer's receive store.
   * @param {Object} transfer - Internal receive transfer state.
   * @param {number} chunkIndex - Zero-based chunk index.
   * @param {ArrayBuffer} chunkData - Raw chunk bytes.
   * @returns {void}
   * @private
   */
  _writeReceiveChunk(transfer, chunkIndex, chunkData) {
    if (transfer.receivedChunkIndexes.has(chunkIndex)) return;
    transfer.receivedChunkIndexes.add(chunkIndex);

    const { metadata, store } = transfer;
    const offset = chunkIndex * CHUNK_SIZE;

    transfer.writeChain = transfer.writeChain
      .then(() => transfer.initPromise)
      .then(() =>
        store.writeChunk({
          chunk: chunkData,
          offset,
          chunkIndex,
          metadata,
        }),
      )
      .then(() => {
        transfer.receivedCount += 1;

        this.onReceiveProgress?.(transfer.receivedCount / metadata.totalChunks);

        if (transfer.receivedCount === metadata.totalChunks) {
          return this._completeReceiveTransfer(metadata.fileId);
        }
      })
      .catch((err) => {
        console.error(
          '[FileTransferController] Receive store write failed:',
          err,
        );
        this.onFileError?.({
          fileName: metadata.name,
          reason: err.reason || 'receive_store_write_failed',
          details: err.details || { error: err.message },
        });
      });
  }

  /**
   * Finalize an incoming transfer and emit onFileReceived.
   * @param {string} fileId
   * @returns {Promise<void>}
   * @private
   */
  async _completeReceiveTransfer(fileId) {
    const transfer = this.receiveTransfers.get(fileId);
    if (!transfer) return;

    const { metadata, store } = transfer;

    try {
      await transfer.initPromise;
      const result = await store.complete();

      this._emitFileReceived({
        file: result.file,
        fileId,
        name: metadata.name,
        mimeType: metadata.mimeType,
        isOpfsBacked: !!result.isOpfsBacked,
        result,
      });
    } catch (err) {
      console.error('[FileTransferController] File receive failed:', err);
      this.onFileError?.({
        fileName: metadata.name,
        reason: err.reason || 'receive_store_complete_failed',
        details: err.details || { error: err.message },
      });
    } finally {
      this.receiveTransfers.delete(fileId);
    }
  }

  /**
   * Emit a normalized file-received payload for all assembly paths.
   * @param {Object} payload
   * @param {File|undefined} payload.file - Completed browser File, when available.
   * @param {string} payload.fileId - Transfer id from FILE_META.
   * @param {string} payload.name - Original file name.
   * @param {string} payload.mimeType - Original MIME type.
   * @param {boolean} payload.isOpfsBacked - Whether storage is OPFS-backed.
   * @param {Object} payload.result - Raw receive-store completion result.
   * @returns {void}
   * @private
   */
  _emitFileReceived({ file, fileId, name, mimeType, isOpfsBacked, result }) {
    this.onFileReceived?.({
      file,
      fileId,
      name,
      mimeType,
      isOpfsBacked,
      result,
    });
  }

  /**
   * Validate the minimal FILE_META contract before mutating controller state.
   * @param {Object} msg - Parsed FILE_META payload.
   * @returns {boolean}
   * @private
   */
  _isValidFileMeta(msg) {
    return (
      !!msg &&
      typeof msg.fileId === 'string' &&
      msg.fileId.length > 0 &&
      typeof msg.name === 'string' &&
      msg.name.length > 0 &&
      Number.isFinite(msg.size) &&
      msg.size >= 0 &&
      Number.isInteger(msg.totalChunks) &&
      msg.totalChunks >= 0 &&
      typeof msg.mimeType === 'string'
    );
  }
}

/**
 * Assert that a transport implements the FileTransport contract.
 * @param {Object} transport
 * @returns {void}
 */
function validateTransport(transport) {
  for (const method of ['send', 'onMessage', 'isReady', 'cleanup']) {
    if (typeof transport?.[method] !== 'function') {
      throw new Error(`FileTransferController transport missing ${method}()`);
    }
  }
}

/**
 * Assert that a receive store implements the required storage contract.
 * @param {Object} store
 * @returns {void}
 */
function validateReceiveStore(store) {
  for (const method of ['writeChunk', 'complete']) {
    if (typeof store?.[method] !== 'function') {
      throw new Error(
        `FileTransferController receive store missing ${method}()`,
      );
    }
  }
}
