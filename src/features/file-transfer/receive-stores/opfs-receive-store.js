import { StreamingFileWriter } from '../streaming-file-writer.js';

/**
 * Create a receive store that streams chunks into OPFS.
 * @returns {{ init(metadata: Object): Promise<void>, writeChunk(input: Object): Promise<void>, complete(): Promise<{file: File, isOpfsBacked: boolean}>, abort(): Promise<void> }}
 */
export function createOpfsReceiveStore() {
  let writer = null;
  let metadata = null;

  return {
    async init(nextMetadata) {
      metadata = nextMetadata;
      writer = new StreamingFileWriter(metadata.fileId, metadata.name);
      await writer.init();
    },

    async writeChunk({ chunk, offset, chunkIndex }) {
      await writer.writeChunk(chunk, offset, chunkIndex === 0);
    },

    async complete() {
      const file = await writer.finalize();
      return {
        file,
        isOpfsBacked: true,
      };
    },

    async abort() {
      await writer?.abort();
    },
  };
}

export { StreamingFileWriter };
