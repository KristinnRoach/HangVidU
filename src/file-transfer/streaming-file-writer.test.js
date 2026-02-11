import { describe, it, expect, afterEach } from 'vitest';
import { StreamingFileWriter } from './streaming-file-writer.js';

// Helper: read a File back into a Uint8Array
async function fileToBytes(file) {
  return new Uint8Array(await file.arrayBuffer());
}

describe('StreamingFileWriter', () => {
  afterEach(async () => {
    await StreamingFileWriter.cleanup();
  });

  it('isSupported() returns a boolean', () => {
    const result = StreamingFileWriter.isSupported();
    expect(typeof result).toBe('boolean');
  });

  it('writes a small file and finalizes with correct name, size, content', async () => {
    if (!StreamingFileWriter.isSupported()) return;

    const writer = new StreamingFileWriter('test-1', 'hello.bin');
    await writer.init();

    // 1MB of 0xAA
    const chunk = new ArrayBuffer(1024 * 1024);
    new Uint8Array(chunk).fill(0xaa);
    await writer.writeChunk(chunk, 0);

    const file = await writer.finalize();

    // OPFS file name is the fileId, not the original filename
    expect(file.name).toBe('test-1');
    expect(file.size).toBe(1024 * 1024);

    const bytes = await fileToBytes(file);
    expect(bytes.every((b) => b === 0xaa)).toBe(true);
  });

  it('handles out-of-order chunks and produces correct content', async () => {
    if (!StreamingFileWriter.isSupported()) return;

    const writer = new StreamingFileWriter('test-ooo', 'out-of-order.bin');
    await writer.init();

    const chunkSize = 1024;
    // Write chunk 2 first, then chunk 0, then chunk 1
    const c2 = new ArrayBuffer(chunkSize);
    new Uint8Array(c2).fill(0x03);
    await writer.writeChunk(c2, 2 * chunkSize);

    const c0 = new ArrayBuffer(chunkSize);
    new Uint8Array(c0).fill(0x01);
    await writer.writeChunk(c0, 0);

    const c1 = new ArrayBuffer(chunkSize);
    new Uint8Array(c1).fill(0x02);
    await writer.writeChunk(c1, 1 * chunkSize);

    const file = await writer.finalize();
    expect(file.size).toBe(3 * chunkSize);

    const bytes = await fileToBytes(file);
    expect(bytes.slice(0, chunkSize).every((b) => b === 0x01)).toBe(true);
    expect(bytes.slice(chunkSize, 2 * chunkSize).every((b) => b === 0x02)).toBe(true);
    expect(bytes.slice(2 * chunkSize).every((b) => b === 0x03)).toBe(true);
  });

  it('abort() removes the temp file', async () => {
    if (!StreamingFileWriter.isSupported()) return;

    const writer = new StreamingFileWriter('test-abort', 'aborted.bin');
    await writer.init();

    const chunk = new ArrayBuffer(512);
    await writer.writeChunk(chunk, 0);
    await writer.abort();

    // Verify file is gone by trying to get it
    const root = await navigator.storage.getDirectory();
    const dir = await root.getDirectoryHandle('file-transfers', { create: false }).catch(() => null);
    if (dir) {
      await expect(
        dir.getFileHandle('test-abort', { create: false }),
      ).rejects.toThrow();
    }
  });

  it('cleanup() removes all temp files', async () => {
    if (!StreamingFileWriter.isSupported()) return;

    // Create two writers
    const w1 = new StreamingFileWriter('clean-1', 'a.bin');
    const w2 = new StreamingFileWriter('clean-2', 'b.bin');
    await w1.init();
    await w2.init();

    await w1.writeChunk(new ArrayBuffer(64), 0);
    await w2.writeChunk(new ArrayBuffer(64), 0);
    await w1.finalize();
    await w2.finalize();

    await StreamingFileWriter.cleanup();

    // Directory should be gone
    const root = await navigator.storage.getDirectory();
    await expect(
      root.getDirectoryHandle('file-transfers', { create: false }),
    ).rejects.toThrow();
  });

  it('supports multiple concurrent writers with different fileIds', async () => {
    if (!StreamingFileWriter.isSupported()) return;

    const w1 = new StreamingFileWriter('concurrent-1', 'file1.bin');
    const w2 = new StreamingFileWriter('concurrent-2', 'file2.bin');
    await w1.init();
    await w2.init();

    const c1 = new ArrayBuffer(256);
    new Uint8Array(c1).fill(0x11);
    const c2 = new ArrayBuffer(256);
    new Uint8Array(c2).fill(0x22);

    await w1.writeChunk(c1, 0);
    await w2.writeChunk(c2, 0);

    const f1 = await w1.finalize();
    const f2 = await w2.finalize();

    expect(f1.name).toBe('concurrent-1');
    expect(f2.name).toBe('concurrent-2');

    const b1 = await fileToBytes(f1);
    const b2 = await fileToBytes(f2);
    expect(b1.every((b) => b === 0x11)).toBe(true);
    expect(b2.every((b) => b === 0x22)).toBe(true);
  });
});
