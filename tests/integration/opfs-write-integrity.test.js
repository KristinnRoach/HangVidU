/**
 * OPFS Write Integrity Test
 *
 * Tests whether StreamingFileWriter produces correct output.
 * Isolates the storage layer from WebRTC transport.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StreamingFileWriter } from '../../src/file-transfer/streaming-file-writer.js';

const CHUNK_SIZE = 64 * 1024; // 64KB — matches TransferConfig

/**
 * Create deterministic test data where each chunk has a unique pattern.
 * Chunk i fills with byte value (i % 256) so we can verify ordering.
 */
function makeChunks(totalSize) {
  const numChunks = Math.ceil(totalSize / CHUNK_SIZE);
  const chunks = [];
  for (let i = 0; i < numChunks; i++) {
    const size = Math.min(CHUNK_SIZE, totalSize - i * CHUNK_SIZE);
    const data = new Uint8Array(size);
    data.fill(i % 256);
    chunks.push(data.buffer);
  }
  return chunks;
}

/** Read back the full file content as Uint8Array */
async function readFile(file) {
  return new Uint8Array(await file.arrayBuffer());
}

describe('OPFS Write Integrity', () => {
  const FILE_SIZE = 1 * 1024 * 1024; // 1MB — small enough to be fast
  const fileId = `test-integrity-${Date.now()}`;
  let probeOk;

  beforeEach(async () => {
    // Bypass the 200MB probe — just check if OPFS is available at all
    StreamingFileWriter.resetProbeCache();
    try {
      const root = await navigator.storage.getDirectory();
      await root.getDirectoryHandle('file-transfers', { create: true });
      probeOk = true;
    } catch {
      probeOk = false;
    }
  });

  afterEach(async () => {
    await StreamingFileWriter.cleanup();
  });

  it('sequential writes produce correct file', async () => {
    if (!probeOk) return; // skip if OPFS unavailable

    const chunks = makeChunks(FILE_SIZE);
    const writer = new StreamingFileWriter(fileId + '-seq', 'test.bin');
    await writer.init();

    // Write chunks one at a time, awaiting each
    for (let i = 0; i < chunks.length; i++) {
      const offset = i * CHUNK_SIZE;
      const isOrdered = true;
      await writer.writeChunk(chunks[i], offset, isOrdered);
    }

    const file = await writer.finalize();
    expect(file.size).toBe(FILE_SIZE);

    // Verify every byte
    const result = await readFile(file);
    for (let i = 0; i < chunks.length; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, FILE_SIZE);
      const expectedByte = i % 256;
      for (let j = start; j < end; j++) {
        if (result[j] !== expectedByte) {
          expect.fail(
            `Byte mismatch at offset ${j}: expected ${expectedByte} (chunk ${i}), got ${result[j]}`
          );
        }
      }
    }
  });

  it('serialized-promise-chain writes produce correct file', async () => {
    if (!probeOk) return;

    // This tests the FIX: chain each write onto the previous one's promise
    const chunks = makeChunks(FILE_SIZE);
    const writer = new StreamingFileWriter(fileId + '-chained', 'test.bin');
    await writer.init();

    let chain = Promise.resolve();
    for (let i = 0; i < chunks.length; i++) {
      const offset = i * CHUNK_SIZE;
      const isOrdered = true;
      chain = chain.then(() => writer.writeChunk(chunks[i], offset, isOrdered));
    }
    await chain;

    const file = await writer.finalize();
    expect(file.size).toBe(FILE_SIZE);

    const result = await readFile(file);
    for (let i = 0; i < chunks.length; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, FILE_SIZE);
      const expectedByte = i % 256;
      for (let j = start; j < end; j++) {
        if (result[j] !== expectedByte) {
          expect.fail(
            `Byte mismatch at offset ${j}: expected ${expectedByte} (chunk ${i}), got ${result[j]}`
          );
        }
      }
    }
  });
});
