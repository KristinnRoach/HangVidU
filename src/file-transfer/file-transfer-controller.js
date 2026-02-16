import { TransferConfig } from './config.js';
import {
  parseEmbeddedChunkPacket,
  createEmbeddedChunkPacket,
  isValidChunkIndex,
  convertToArrayBuffer,
} from './chunk-processor.js';
import { validateAssembly } from './file-assembler.js';
import { WebRTCFileTransport } from './transport/webrtc-file-transport.js';
import { StreamingFileWriter } from './streaming-file-writer.js';

const CHUNK_SIZE = TransferConfig.FILE_CONFIG.NETWORK_CHUNK_SIZE; // 64KB
const MAX_FILE_SIZE_MB = 5000;

/**
 * FileTransferController — orchestrates the chunked file transfer protocol.
 *
 * Owns: file slicing, chunk assembly, progress tracking, validation, callbacks.
 * Delegates all I/O to an internal WebRTCFileTransport.
 *
 * For large files (above STREAMING_THRESHOLD), streams chunks to OPFS via
 * StreamingFileWriter instead of accumulating them in RAM.
 */
export class FileTransferController {
  /**
   * @param {RTCDataChannel} dataChannel - WebRTC DataChannel for file transfer
   */
  constructor(dataChannel) {
    if (!dataChannel) {
      throw new Error('FileTransferController requires a dataChannel');
    }

    this.transport = new WebRTCFileTransport(dataChannel);
    this.receivedChunks = new Map(); // fileId -> chunks array (in-memory path)
    this.fileMetadata = new Map(); // fileId -> metadata

    // OPFS streaming state
    this.streamWriters = new Map(); // fileId -> StreamingFileWriter
    this.streamChunkCounts = new Map(); // fileId -> received count
    this.pendingInit = new Map(); // fileId -> Promise (writer init in progress)
    this.earlyChunks = new Map(); // fileId -> [{chunkIndex, chunkData}] (chunks before init)
    this.writeChains = new Map(); // fileId -> Promise (serializes OPFS writes)

    // Public callbacks
    this.onFileReceived = null;
    this.onFileMetaReceived = null;
    this.onFileError = null;
    this.onReceiveProgress = null;

    // Wire incoming transport messages to protocol handler
    this.transport.onMessage((data) => this._handleMessage(data));

    // Start OPFS probe early so isOPFSAvailable() is ready by FILE_META time
    StreamingFileWriter.probeOPFS();
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
    this.streamWriters.clear();
    this.streamChunkCounts.clear();
    this.pendingInit.clear();
    this.earlyChunks.clear();
    this.writeChains.clear();
    StreamingFileWriter.cleanup();
    this.transport.cleanup();
  }

  /**
   * Decide whether to use OPFS streaming for this file.
   * @private
   */
  _shouldUseOPFS(fileSize) {
    return (
      StreamingFileWriter.isOPFSAvailable() === true &&
      fileSize >= TransferConfig.STREAMING_THRESHOLD
    );
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
        this.onFileMetaReceived?.(msg);

        if (msg.totalChunks === 0) {
          this._assembleFile(msg.fileId);
          return;
        }

        // Decide path synchronously — probeOPFS() already ran in constructor
        if (this._shouldUseOPFS(msg.size)) {
          // OPFS streaming path
          this.streamChunkCounts.set(msg.fileId, 0);
          this.earlyChunks.set(msg.fileId, []);
          this._initStreamWriter(msg.fileId, msg.name);
        } else {
          // In-memory path
          this.receivedChunks.set(msg.fileId, []);
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
      const meta = this.fileMetadata.get(chunkMeta.fileId);

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

      // Route to OPFS or in-memory path
      if (this.streamWriters.has(chunkMeta.fileId) || this.pendingInit.has(chunkMeta.fileId)) {
        this._writeStreamChunk(chunkMeta.fileId, chunkMeta.chunkIndex, chunkData, meta);
      } else {
        // In-memory path
        const chunks = this.receivedChunks.get(chunkMeta.fileId);
        if (!chunks) {
          console.error(
            '[FileTransferController] No chunks array for file:',
            chunkMeta.fileId,
          );
          return;
        }

        const wasMissing = !chunks[chunkMeta.chunkIndex];
        chunks[chunkMeta.chunkIndex] = chunkData;

        if (wasMissing) {
          meta.receivedCount = (meta.receivedCount ?? 0) + 1;
        }

        const receivedCount = meta.receivedCount ?? 0;

        if (this.onReceiveProgress) {
          this.onReceiveProgress(receivedCount / meta.totalChunks);
        }

        if (receivedCount === meta.totalChunks) {
          this._assembleFile(chunkMeta.fileId);
        }
      }
    }
  }

  /**
   * Initialize a StreamingFileWriter for a file.
   * @private
   */
  _initStreamWriter(fileId, fileName) {
    const writer = new StreamingFileWriter(fileId, fileName);
    const initPromise = writer.init().then(() => {
      this.streamWriters.set(fileId, writer);
      this.pendingInit.delete(fileId);

      // Flush any chunks that arrived before init completed
      const queued = this.earlyChunks.get(fileId) || [];
      this.earlyChunks.delete(fileId);
      for (const { chunkIndex, chunkData } of queued) {
        const meta = this.fileMetadata.get(fileId);
        if (meta) {
          this._writeStreamChunk(fileId, chunkIndex, chunkData, meta);
        }
      }
    }).catch((err) => {
      console.error('[FileTransferController] OPFS writer init failed:', err);
      this.pendingInit.delete(fileId);
      this.earlyChunks.delete(fileId);
      this.streamChunkCounts.delete(fileId);

      // Fallback to in-memory
      this.receivedChunks.set(fileId, []);
      this.onFileError?.({
        fileName,
        reason: 'opfs_init_failed',
        details: { error: err.message },
      });
    });

    this.pendingInit.set(fileId, initPromise);
  }

  /**
   * Write a chunk to the OPFS stream writer.
   * @private
   */
  _writeStreamChunk(fileId, chunkIndex, chunkData, meta) {
    const writer = this.streamWriters.get(fileId);

    if (!writer) {
      // Writer still initializing — queue chunk
      const queue = this.earlyChunks.get(fileId);
      if (queue) {
        queue.push({ chunkIndex, chunkData });
      }
      return;
    }

    const offset = chunkIndex * CHUNK_SIZE;
    const isOrdered = chunkIndex === (this.streamChunkCounts.get(fileId) ?? 0);

    const prev = this.writeChains.get(fileId) ?? Promise.resolve();
    const next = prev.then(() => writer.writeChunk(chunkData, offset, isOrdered)).then(() => {
      const count = (this.streamChunkCounts.get(fileId) ?? 0) + 1;
      this.streamChunkCounts.set(fileId, count);

      if (this.onReceiveProgress) {
        this.onReceiveProgress(count / meta.totalChunks);
      }

      if (count === meta.totalChunks) {
        this._finalizeStream(fileId);
      }
    }).catch((err) => {
      console.error('[FileTransferController] OPFS chunk write failed:', err);
      this.onFileError?.({
        fileName: meta.name,
        reason: 'opfs_write_failed',
        details: { chunkIndex, error: err.message },
      });
    });
    this.writeChains.set(fileId, next);
  }

  /**
   * Finalize an OPFS-streamed file and deliver result via onFileReceived.
   * @private
   */
  async _finalizeStream(fileId) {
    const writer = this.streamWriters.get(fileId);
    const meta = this.fileMetadata.get(fileId);

    if (!writer || !meta) return;

    try {
      const file = await writer.finalize();

      this.onFileReceived?.({
        file,
        name: meta.name,
        mimeType: meta.mimeType,
        opfsId: fileId,
      });
    } catch (err) {
      console.error('[FileTransferController] OPFS finalize failed:', err);
      this.onFileError?.({
        fileName: meta.name,
        reason: 'opfs_finalize_failed',
        details: { error: err.message },
      });
    } finally {
      // Clean up tracking state (but keep OPFS file for SW serving)
      this.streamWriters.delete(fileId);
      this.streamChunkCounts.delete(fileId);
      this.writeChains.delete(fileId);
      this.fileMetadata.delete(fileId);
    }
  }

  /**
   * Assemble file from in-memory chunks and deliver result via onFileReceived.
   * @private
   */
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

    this.onFileReceived?.({
      file,
      name: meta.name,
      mimeType: meta.mimeType,
      opfsId: null,
    });

    this.receivedChunks.delete(fileId);
    this.fileMetadata.delete(fileId);
  }
}
