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
 * FileTransfer — transport-agnostic chunking protocol engine.
 *
 * Handles slicing files into chunks, reassembling incoming chunks,
 * progress tracking and validation. All I/O goes through the
 * `send` function provided at construction.
 */
export class FileTransfer {
  /**
   * @param {Function} send - Function to send data (string or ArrayBuffer).
   *   The transport layer provides this (e.g. dataChannel.send.bind(dataChannel)).
   */
  constructor(send) {
    if (typeof send !== 'function') {
      throw new Error('FileTransfer requires a send function');
    }
    this._send = send;
    this.receivedChunks = new Map(); // fileId -> chunks array
    this.fileMetadata = new Map(); // fileId -> metadata
    this.onFileReceived = null;
    this.onFileMetaReceived = null;
    this.onFileError = null;
    this.onReceiveProgress = null;
  }

  /**
   * Send a file by slicing it into chunks.
   * @param {File} file
   * @param {Function} [onProgress] - Called with 0–1 progress
   * @param {Function} [waitForDrain] - Optional async function the transport
   *   can provide to handle backpressure. Called after each chunk send.
   */
  async sendFile(file, onProgress, waitForDrain) {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      throw new Error(`File too large (max ${MAX_FILE_SIZE_MB} MB)`);
    }

    const fileId = `${file.name}-${file.size}-${Date.now()}`;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    // 1. Send metadata
    this._send(
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

      this._send(packet);

      if (onProgress) {
        onProgress((i + 1) / totalChunks);
      }

      if (waitForDrain) {
        await waitForDrain();
      }
    }
  }

  // Receive handler
  async handleMessage(data) {
    if (typeof data === 'string') {
      const msg = JSON.parse(data);

      if (msg.type === 'FILE_META') {
        this.fileMetadata.set(msg.fileId, msg);
        this.receivedChunks.set(msg.fileId, []);
        this.onFileMetaReceived?.(msg);
      }
    } else {
      // Binary data - convert to ArrayBuffer (handles Blob for Firefox compatibility)
      const arrayBuffer = await convertToArrayBuffer(data);
      if (!arrayBuffer) {
        console.error(
          '[FileTransfer] Failed to convert binary data to ArrayBuffer',
        );
        return;
      }

      // Parse embedded packet
      const parsed = parseEmbeddedChunkPacket(arrayBuffer);
      if (!parsed) {
        console.error('[FileTransfer] Failed to parse embedded chunk packet');
        return;
      }

      const { chunkMeta, chunkData } = parsed;
      const chunks = this.receivedChunks.get(chunkMeta.fileId);

      if (!chunks) {
        console.error(
          '[FileTransfer] Received chunk for unknown file:',
          chunkMeta.fileId,
        );
        return;
      }

      const meta = this.fileMetadata.get(chunkMeta.fileId);
      if (!isValidChunkIndex(chunkMeta.chunkIndex, meta.totalChunks)) {
        console.error(
          '[FileTransfer] Invalid chunk index:',
          chunkMeta.chunkIndex,
          'for file:',
          chunkMeta.fileId,
        );
        return;
      }

      chunks[chunkMeta.chunkIndex] = chunkData;

      // Report receive progress
      if (this.onReceiveProgress) {
        const receivedCount = chunks.filter((c) => c).length;
        this.onReceiveProgress(receivedCount / chunkMeta.totalChunks);
      }

      // Check if complete
      if (chunks.filter((c) => c).length === chunkMeta.totalChunks) {
        this.assembleFile(chunkMeta.fileId);
      }
    }
  }

  assembleFile(fileId) {
    const meta = this.fileMetadata.get(fileId);
    const chunks = this.receivedChunks.get(fileId);

    // Validate assembly before creating file
    const validation = validateAssembly(chunks, meta.size, meta.totalChunks);

    if (!validation.isComplete) {
      console.error('[FileTransfer] File assembly failed:', {
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

    // Validation passed - assemble file
    const blob = new Blob(chunks, { type: meta.mimeType });
    const file = new File([blob], meta.name, { type: meta.mimeType });

    this.onFileReceived?.(file);

    // Cleanup
    this.receivedChunks.delete(fileId);
    this.fileMetadata.delete(fileId);
  }
}
