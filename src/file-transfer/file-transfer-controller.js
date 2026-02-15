import { TransferConfig } from './config.js';
import {
  parseEmbeddedChunkPacket,
  createEmbeddedChunkPacket,
  isValidChunkIndex,
  convertToArrayBuffer,
} from './chunk-processor.js';
import { validateAssembly } from './file-assembler.js';

const CHUNK_SIZE = TransferConfig.FILE_CONFIG.NETWORK_CHUNK_SIZE; // 64KB
const MAX_FILE_SIZE_MB = 5000;

/**
 * FileTransferController — orchestrates the chunked file transfer protocol.
 *
 * Owns: file slicing, chunk assembly, progress tracking, validation, callbacks.
 * Delegates all I/O to an injected FileTransport.
 */
export class FileTransferController {
  /**
   * @param {FileTransport} transport - Raw I/O transport (WebRTCFileTransport, etc.)
   */
  constructor(transport) {
    if (!transport) {
      throw new Error('FileTransferController requires a transport');
    }

    this.transport = transport;
    this.receivedChunks = new Map(); // fileId -> chunks array
    this.fileMetadata = new Map(); // fileId -> metadata

    // Public callbacks
    this.onFileReceived = null;
    this.onFileMetaReceived = null;
    this.onFileError = null;
    this.onReceiveProgress = null;

    // Wire incoming transport messages to protocol handler
    this.transport.onMessage((data) => this._handleMessage(data));
  }

  /**
   * Send a file by slicing it into chunks.
   * @param {File} file
   * @param {Function} [onProgress] - Called with 0–1 progress
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
    const waitForDrain = this.transport.getWaitForDrain();

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
    }
  }

  /**
   * Check if the transport is ready to send files
   * @returns {boolean}
   */
  isReady() {
    return this.transport.isReady();
  }

  /**
   * Cleanup the controller and its transport
   */
  cleanup() {
    this.onFileReceived = null;
    this.onFileMetaReceived = null;
    this.onFileError = null;
    this.onReceiveProgress = null;
    this.receivedChunks.clear();
    this.fileMetadata.clear();
    this.transport.cleanup();
  }

  /** @private */
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
        this.fileMetadata.set(msg.fileId, msg);
        this.receivedChunks.set(msg.fileId, []);
        this.onFileMetaReceived?.(msg);
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
      const chunks = this.receivedChunks.get(chunkMeta.fileId);

      if (!chunks) {
        console.error(
          '[FileTransferController] Received chunk for unknown file:',
          chunkMeta.fileId,
        );
        return;
      }

      const meta = this.fileMetadata.get(chunkMeta.fileId);
      if (!isValidChunkIndex(chunkMeta.chunkIndex, meta.totalChunks)) {
        console.error(
          '[FileTransferController] Invalid chunk index:',
          chunkMeta.chunkIndex,
          'for file:',
          chunkMeta.fileId,
        );
        return;
      }

      chunks[chunkMeta.chunkIndex] = chunkData;

      if (this.onReceiveProgress) {
        const receivedCount = chunks.filter((c) => c).length;
        this.onReceiveProgress(receivedCount / chunkMeta.totalChunks);
      }

      if (chunks.filter((c) => c).length === chunkMeta.totalChunks) {
        this._assembleFile(chunkMeta.fileId);
      }
    }
  }

  /** @private */
  _assembleFile(fileId) {
    const meta = this.fileMetadata.get(fileId);
    const chunks = this.receivedChunks.get(fileId);

    const validation = validateAssembly(chunks, meta.size, meta.totalChunks);

    if (!validation.isComplete) {
      console.error('[FileTransferController] File assembly failed:', {
        fileId,
        fileName: meta.name,
        ...validation,
      });

      if (this.onFileError) {
        this.onFileError({
          fileName: meta.name,
          reason: 'incomplete',
          details: validation,
        });
      }
      return;
    }

    const blob = new Blob(chunks, { type: meta.mimeType });
    const file = new File([blob], meta.name, { type: meta.mimeType });

    this.onFileReceived?.(file);

    this.receivedChunks.delete(fileId);
    this.fileMetadata.delete(fileId);
  }
}
