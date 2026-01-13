/**
 * Adapted from PrivyDrop by david-bai00
 * Source: https://github.com/david-bai00/PrivyDrop
 * License: MIT
 */

/**
 * Convert various binary data formats to ArrayBuffer
 * Supports Blob, Uint8Array, and other formats for Firefox compatibility
 */
export async function convertToArrayBuffer(data) {
  if (data instanceof ArrayBuffer) {
    return data;
  } else if (data instanceof Blob) {
    try {
      const arrayBuffer = await data.arrayBuffer();
      return arrayBuffer;
    } catch (error) {
      console.error('[ChunkProcessor] Blob conversion failed:', error);
      return null;
    }
  } else if (data instanceof Uint8Array || ArrayBuffer.isView(data)) {
    try {
      const uint8Array =
        data instanceof Uint8Array
          ? data
          : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
      const newArrayBuffer = new ArrayBuffer(uint8Array.length);
      new Uint8Array(newArrayBuffer).set(uint8Array);
      return newArrayBuffer;
    } catch (error) {
      console.error('[ChunkProcessor] TypedArray conversion failed:', error);
      return null;
    }
  } else {
    console.error(
      '[ChunkProcessor] Unknown data type:',
      Object.prototype.toString.call(data)
    );
    return null;
  }
}

/**
 * Parse embedded chunk packet
 * Format: [4 bytes length] + [JSON metadata] + [actual chunk data]
 * 
 * @param {ArrayBuffer} arrayBuffer - The binary packet to parse
 * @returns {{chunkMeta: Object, chunkData: ArrayBuffer} | null} Parsed packet or null if invalid
 */
export function parseEmbeddedChunkPacket(arrayBuffer) {
  try {
    const MIN_PACKET_SIZE = 4; // Minimum packet size (just the length header)

    // 1. Check minimum packet length
    if (arrayBuffer.byteLength < MIN_PACKET_SIZE) {
      console.error(
        '[ChunkProcessor] Invalid embedded packet - too small:',
        arrayBuffer.byteLength
      );
      return null;
    }

    // 2. Read metadata length (4 bytes)
    const lengthView = new Uint32Array(arrayBuffer, 0, 1);
    const metaLength = lengthView[0];

    // 3. Verify packet integrity
    const expectedTotalLength = 4 + metaLength;
    if (arrayBuffer.byteLength < expectedTotalLength) {
      console.error(
        '[ChunkProcessor] Incomplete embedded packet - expected:',
        expectedTotalLength,
        'got:',
        arrayBuffer.byteLength
      );
      return null;
    }

    // 4. Extract metadata section
    const metaBytes = new Uint8Array(arrayBuffer, 4, metaLength);
    const metaJson = new TextDecoder().decode(metaBytes);
    const chunkMeta = JSON.parse(metaJson);

    // 5. Extract actual chunk data section
    const chunkDataStart = 4 + metaLength;
    const chunkData = arrayBuffer.slice(chunkDataStart);

    return { chunkMeta, chunkData };
  } catch (error) {
    console.error('[ChunkProcessor] Failed to parse embedded packet:', error);
    return null;
  }
}

/**
 * Validate chunk metadata
 * 
 * @param {Object} chunkMeta - Chunk metadata to validate
 * @param {string} expectedFileId - Expected file ID
 * @param {number} expectedTotalChunks - Expected total number of chunks
 * @returns {boolean} True if valid, false otherwise
 */
export function validateChunk(chunkMeta, expectedFileId, expectedTotalChunks) {
  if (!chunkMeta) {
    console.error('[ChunkProcessor] Missing chunk metadata');
    return false;
  }

  if (chunkMeta.fileId !== expectedFileId) {
    console.error(
      '[ChunkProcessor] File ID mismatch - expected:',
      expectedFileId,
      'got:',
      chunkMeta.fileId
    );
    return false;
  }

  if (
    chunkMeta.chunkIndex < 0 ||
    chunkMeta.chunkIndex >= expectedTotalChunks
  ) {
    console.error(
      '[ChunkProcessor] Invalid chunk index:',
      chunkMeta.chunkIndex,
      'total:',
      expectedTotalChunks
    );
    return false;
  }

  return true;
}
