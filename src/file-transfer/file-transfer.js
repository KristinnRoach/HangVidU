import { TransferConfig } from './config.js';
import {
  parseEmbeddedChunkPacket,
  convertToArrayBuffer,
} from './chunk-processor.js';
import { validateAssembly } from './file-assembler.js';

// Use PrivyDrop's network chunk size for WebRTC safe transmission
const CHUNK_SIZE = TransferConfig.FILE_CONFIG.NETWORK_CHUNK_SIZE; // 64KB
const MAX_FILE_SIZE = 9000 * 1024 * 1024; // X * 1024 * 1024 = X MB

export class FileTransfer {
  constructor(dataChannel) {
    this.dataChannel = dataChannel;
    this.receivedChunks = new Map(); // fileId -> chunks array
    this.fileMetadata = new Map(); // fileId -> metadata
    this.onFileError = null; // Optional callback for file transfer errors
    this.onReceiveProgress = null; // Optional callback for receive progress
  }

  // Send file
  async sendFile(file, onProgress) {
    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `File too large (max ${MAX_FILE_SIZE / (1024 * 1024)} MB)`
      );
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
      })
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
          '[FileTransfer] Failed to convert binary data to ArrayBuffer'
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
          chunkMeta.fileId
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
