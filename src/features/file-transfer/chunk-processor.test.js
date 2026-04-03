import { describe, it, expect } from 'vitest';
import { convertToArrayBuffer, parseEmbeddedChunkPacket } from './chunk-processor.js';

describe('chunk-processor', () => {
  describe('convertToArrayBuffer', () => {
    it('should pass through ArrayBuffer unchanged', async () => {
      const arrayBuffer = new ArrayBuffer(8);
      const result = await convertToArrayBuffer(arrayBuffer);

      expect(result).toBe(arrayBuffer);
      expect(result.byteLength).toBe(8);
    });

    it('should convert Blob to ArrayBuffer', async () => {
      const testData = new Uint8Array([1, 2, 3, 4, 5]);
      const blob = new Blob([testData]);

      const result = await convertToArrayBuffer(blob);

      expect(result).toBeInstanceOf(ArrayBuffer);
      expect(result.byteLength).toBe(5);
      expect(new Uint8Array(result)).toEqual(testData);
    });

    it('should convert Uint8Array to ArrayBuffer', async () => {
      const uint8Array = new Uint8Array([10, 20, 30]);

      const result = await convertToArrayBuffer(uint8Array);

      expect(result).toBeInstanceOf(ArrayBuffer);
      expect(result.byteLength).toBe(3);
      expect(new Uint8Array(result)).toEqual(uint8Array);
    });

    it('should return null for unknown types', async () => {
      const result = await convertToArrayBuffer('not binary data');

      expect(result).toBeNull();
    });
  });

  describe('parseEmbeddedChunkPacket', () => {
    it('should parse valid embedded packet with metadata and chunk data', () => {
      // Create test packet: [4-byte length][JSON metadata][chunk data]
      const metadata = {
        type: 'FILE_CHUNK',
        fileId: 'test-file-123',
        chunkIndex: 0,
        totalChunks: 5,
      };
      const metaBytes = new TextEncoder().encode(JSON.stringify(metadata));
      const chunkData = new Uint8Array([1, 2, 3, 4, 5]);

      // Build packet with little-endian length
      const packet = new ArrayBuffer(4 + metaBytes.length + chunkData.byteLength);
      const view = new Uint8Array(packet);
      const dataView = new DataView(packet);
      dataView.setUint32(0, metaBytes.length, true); // little-endian
      view.set(metaBytes, 4);
      view.set(chunkData, 4 + metaBytes.length);

      const result = parseEmbeddedChunkPacket(packet);

      expect(result).not.toBeNull();
      expect(result.chunkMeta).toEqual(metadata);
      expect(result.chunkData.byteLength).toBe(5);
      expect(new Uint8Array(result.chunkData)).toEqual(chunkData);
    });

    it('should handle Blob input by converting to ArrayBuffer first', async () => {
      // This tests the integration: Blob → ArrayBuffer → parse
      const metadata = {
        type: 'FILE_CHUNK',
        fileId: 'test-file-456',
        chunkIndex: 1,
        totalChunks: 3,
      };
      const metaBytes = new TextEncoder().encode(JSON.stringify(metadata));
      const chunkData = new Uint8Array([10, 20, 30]);

      // Build packet
      const packet = new ArrayBuffer(4 + metaBytes.length + chunkData.byteLength);
      const view = new Uint8Array(packet);
      const dataView = new DataView(packet);
      dataView.setUint32(0, metaBytes.length, true);
      view.set(metaBytes, 4);
      view.set(chunkData, 4 + metaBytes.length);

      // Convert to Blob (simulating Firefox DataChannel behavior)
      const blob = new Blob([packet]);

      // Convert back to ArrayBuffer and parse
      const arrayBuffer = await convertToArrayBuffer(blob);
      expect(arrayBuffer).not.toBeNull();

      const result = parseEmbeddedChunkPacket(arrayBuffer);

      expect(result).not.toBeNull();
      expect(result.chunkMeta.fileId).toBe('test-file-456');
      expect(result.chunkMeta.chunkIndex).toBe(1);
      expect(new Uint8Array(result.chunkData)).toEqual(chunkData);
    });

    it('should return null for packet too small', () => {
      const tinyPacket = new ArrayBuffer(2); // Less than 4 bytes

      const result = parseEmbeddedChunkPacket(tinyPacket);

      expect(result).toBeNull();
    });

    it('should return null for incomplete packet', () => {
      // Claim metadata is 100 bytes but only provide 10
      const packet = new ArrayBuffer(14);
      const dataView = new DataView(packet);
      dataView.setUint32(0, 100, true); // Claims 100 bytes of metadata

      const result = parseEmbeddedChunkPacket(packet);

      expect(result).toBeNull();
    });
  });
});
