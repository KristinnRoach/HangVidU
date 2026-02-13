import { TransferConfig } from './config.js';
import {
  parseEmbeddedChunkPacket,
  convertToArrayBuffer,
} from './chunk-processor.js';
import { validateAssembly } from './file-assembler.js';
import { StreamingFileWriter } from './streaming-file-writer.js';
import {
  isSwServingSupported,
  registerVideoForServing,
} from './video-serving.js';

const CHUNK_SIZE = TransferConfig.FILE_CONFIG.NETWORK_CHUNK_SIZE; // 64KB
const MAX_FILE_SIZE_MB = 5000;

export class FileTransfer {
  constructor(dataChannel) {
    this.dataChannel = dataChannel;
    this.receivedChunks = new Map(); // fileId -> chunks array (in-memory path)
    this.fileMetadata = new Map(); // fileId -> metadata
    this.streamWriters = new Map(); // fileId -> StreamingFileWriter (OPFS path)
    this.streamChunkCounts = new Map(); // fileId -> number of chunks received
    this.pendingInit = new Map(); // fileId -> Promise (OPFS init in progress)
    this.earlyChunks = new Map(); // fileId -> [{chunkData, chunkIndex, totalChunks}]
    this.onFileError = null; // Optional callback for file transfer errors
    this.onReceiveProgress = null; // Optional callback for receive progress

    this.ensuredChannelOrdered = false; // Flag to track if DataChannel has .ordered checked (ensures ordered delivery)
  }

  // Send file
  async sendFile(file, onProgress) {
    // Validate size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      throw new Error(`File too large (max ${MAX_FILE_SIZE_MB} MB)`);
    }

    // Validate DataChannel state
    if (this.dataChannel.readyState !== 'open') {
      throw new Error('DataChannel not ready');
    }

    const fileId = `${file.name}-${file.size}-${Date.now()}`;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    // 1. Send metadata
    this.dataChannel.send(
      JSON.stringify({
        type: 'FILE_META',
        fileId,
        name: file.name,
        size: file.size,
        mimeType: file.type,
        totalChunks,
      }),
    );

    // 2. Send chunks with embedded metadata (atomic send)
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = await file.slice(start, end).arrayBuffer();

      // Create embedded packet: [4-byte length][JSON metadata][chunk data]
      const metadata = {
        type: 'FILE_CHUNK',
        fileId,
        chunkIndex: i,
        totalChunks,
      };
      const metaBytes = new TextEncoder().encode(JSON.stringify(metadata));

      // Use DataView for consistent endianness (little-endian)
      const packet = new ArrayBuffer(4 + metaBytes.length + chunk.byteLength);
      const view = new Uint8Array(packet);
      const dataView = new DataView(packet);
      dataView.setUint32(0, metaBytes.length, true); // true = little-endian
      view.set(metaBytes, 4);
      view.set(new Uint8Array(chunk), 4 + metaBytes.length);

      // Send single atomic packet
      this.dataChannel.send(packet);

      if (onProgress) {
        onProgress((i + 1) / totalChunks);
      }

      // Simple backpressure: wait if buffer too full
      while (this.dataChannel.bufferedAmount > 256 * 1024) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }
  }

  // Receive handler
  async handleMessage(data) {
    if (!this.ensuredChannelOrdered) {
      console.debug('DataChannel ordered:', this.dataChannel.ordered);
      this.ensuredChannelOrdered = true;
    }

    if (typeof data === 'string') {
      const msg = JSON.parse(data);

      if (msg.type === 'FILE_META') {
        this.fileMetadata.set(msg.fileId, msg);

        // Decide: OPFS streaming vs in-memory based on size + support + quota
        const opfsCapable =
          msg.size >= TransferConfig.STREAMING_THRESHOLD &&
          StreamingFileWriter.isSupported();
        const useStreaming =
          opfsCapable && (await StreamingFileWriter.hasEnoughQuota(msg.size));

        if (opfsCapable && !useStreaming) {
          console.warn(
            '[FileTransfer] OPFS quota insufficient, using in-memory transfer for',
            msg.name,
          );
        }

        if (useStreaming) {
          this.earlyChunks.set(msg.fileId, []);
          const initPromise = this._initStreamWriter(msg.fileId, msg.name);
          this.pendingInit.set(msg.fileId, initPromise);
        } else {
          this.receivedChunks.set(msg.fileId, []);
        }

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
      const { fileId, chunkIndex, totalChunks } = chunkMeta;

      // --- OPFS streaming path ---

      // If init is still in progress, queue the chunk
      if (this.pendingInit.has(fileId)) {
        this.earlyChunks
          .get(fileId)
          ?.push({ chunkData, chunkIndex, totalChunks });
        return;
      }

      const writer = this.streamWriters.get(fileId);
      if (writer) {
        await this._writeStreamChunk(
          fileId,
          writer,
          chunkData,
          chunkIndex,
          totalChunks,
        );
        return;
      }

      // --- In-memory path (unchanged) ---
      const chunks = this.receivedChunks.get(fileId);

      if (!chunks) {
        console.error(
          '[FileTransfer] Received chunk for unknown file:',
          fileId,
        );
        return;
      }

      chunks[chunkIndex] = chunkData;

      // Report receive progress
      if (this.onReceiveProgress) {
        const receivedCount = chunks.filter((c) => c).length;
        this.onReceiveProgress(receivedCount / totalChunks);
      }

      // Check if complete
      if (chunks.filter((c) => c).length === totalChunks) {
        this.assembleFile(fileId);
      }
    }
  }

  /** Initialize OPFS writer and flush any chunks that arrived during init. */
  async _initStreamWriter(fileId, fileName) {
    const writer = new StreamingFileWriter(fileId, fileName);
    try {
      await writer.init();
      this.streamWriters.set(fileId, writer);
      this.streamChunkCounts.set(fileId, 0);
    } catch (err) {
      console.warn(
        '[FileTransfer] OPFS init failed, falling back to in-memory:',
        err,
      );
      this.receivedChunks.set(fileId, []);
    }
    this.pendingInit.delete(fileId);

    // Flush early chunks
    const queued = this.earlyChunks.get(fileId);
    this.earlyChunks.delete(fileId);
    if (queued) {
      for (const { chunkData, chunkIndex, totalChunks } of queued) {
        const w = this.streamWriters.get(fileId);
        if (w) {
          await this._writeStreamChunk(
            fileId,
            w,
            chunkData,
            chunkIndex,
            totalChunks,
          );
        } else {
          // Fell back to in-memory
          const chunks = this.receivedChunks.get(fileId);
          if (chunks) {
            chunks[chunkIndex] = chunkData;
            if (chunks.filter((c) => c).length === totalChunks) {
              this.assembleFile(fileId);
            }
          }
        }
      }
    }
  }

  /** Write a single chunk via OPFS and check for completion. */
  async _writeStreamChunk(fileId, writer, chunkData, chunkIndex, totalChunks) {
    try {
      await writer.writeChunk(chunkData, chunkIndex * CHUNK_SIZE);
    } catch (err) {
      console.warn(
        '[FileTransfer] OPFS write failed, aborting streaming transfer:',
        err.name,
      );
      await writer.abort();
      this.streamWriters.delete(fileId);
      this.streamChunkCounts.delete(fileId);
      this.onFileError?.({
        fileName: this.fileMetadata.get(fileId)?.name,
        reason: 'opfs_write_failed',
        details: err,
      });
      return;
    }

    const count = this.streamChunkCounts.get(fileId) + 1;
    this.streamChunkCounts.set(fileId, count);

    if (this.onReceiveProgress) {
      this.onReceiveProgress(count / totalChunks);
    }

    if (count === totalChunks) {
      await this._finalizeStream(fileId);
    }
  }

  /** Finalize an OPFS-streamed file and deliver it. */
  async _finalizeStream(fileId) {
    const writer = this.streamWriters.get(fileId);
    const meta = this.fileMetadata.get(fileId);
    try {
      const opfsFile = await writer.finalize();
      console.debug(
        '[FileTransfer] OPFS finalize ok, size:',
        opfsFile.size,
        'mimeType:',
        meta.mimeType,
      );

      // For video files with an active SW, serve via SW virtual URL
      // instead of blob URL — enables range requests for streaming playback
      if (meta.mimeType?.startsWith('video/') && isSwServingSupported()) {
        const swUrl = await registerVideoForServing(fileId, meta.mimeType);
        console.debug('[FileTransfer] SW video URL:', swUrl);
        // Deliver a thin object so the receiver can distinguish SW-served video
        this.onFileReceived?.({
          name: meta.name,
          type: meta.mimeType,
          swUrl,
        });
      } else {
        // Non-video or no SW — fall back to blob wrapping
        const typed = new Blob([opfsFile], { type: meta.mimeType });
        Object.defineProperty(typed, 'name', { value: meta.name });
        this.onFileReceived?.(typed);
      }
    } catch (err) {
      console.error('[FileTransfer] OPFS finalize failed:', err);
      this.onFileError?.({
        fileName: meta?.name,
        reason: 'opfs_finalize_failed',
        details: err,
      });
    }
    this.streamWriters.delete(fileId);
    this.streamChunkCounts.delete(fileId);
    this.fileMetadata.delete(fileId);
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

      // Notify user of error if callback is provided
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
