// Simple chunking:  64KB chunks
const CHUNK_SIZE = 64 * 1024; // 64KB
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export class FileTransfer {
  constructor(dataChannel) {
    this.dataChannel = dataChannel;
    this.receivedChunks = new Map(); // fileId -> chunks array
    this.fileMetadata = new Map(); // fileId -> metadata
  }

  // Send file
  async sendFile(file, onProgress) {
    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File too large (max 100MB)');
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

    // 2. Send chunks
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = await file.slice(start, end).arrayBuffer();

      // Send chunk with index
      const chunkData = JSON.stringify({
        type: 'FILE_CHUNK',
        fileId,
        chunkIndex: i,
        totalChunks,
      });

      this.dataChannel.send(chunkData);
      this.dataChannel.send(chunk);

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
  handleMessage(data) {
    if (typeof data === 'string') {
      const msg = JSON.parse(data);

      if (msg.type === 'FILE_META') {
        this.fileMetadata.set(msg.fileId, msg);
        this.receivedChunks.set(msg.fileId, []);
        this.onFileMetaReceived?.(msg);
      }

      if (msg.type === 'FILE_CHUNK') {
        this.currentChunk = msg; // Store for next binary message
      }
    } else {
      // Binary data - it's a chunk
      const meta = this.currentChunk;
      const chunks = this.receivedChunks.get(meta.fileId);
      chunks[meta.chunkIndex] = data;

      // Check if complete
      if (chunks.filter((c) => c).length === meta.totalChunks) {
        this.assembleFile(meta.fileId);
      }
    }
  }

  assembleFile(fileId) {
    const meta = this.fileMetadata.get(fileId);
    const chunks = this.receivedChunks.get(fileId);

    const blob = new Blob(chunks, { type: meta.mimeType });
    const file = new File([blob], meta.name, { type: meta.mimeType });

    this.onFileReceived?.(file);

    // Cleanup
    this.receivedChunks.delete(fileId);
    this.fileMetadata.delete(fileId);
  }
}
