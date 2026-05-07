import { validateAssembly } from '../file-assembler.js';

/**
 * Create a receive store that buffers all chunks in memory.
 * @returns {{ init(metadata: Object): Promise<void>, writeChunk(input: Object): Promise<void>, complete(): Promise<{file: File, isOpfsBacked: boolean}>, abort(): Promise<void> }}
 */
export function createMemoryReceiveStore() {
  const chunks = [];
  let metadata = null;

  return {
    async init(nextMetadata) {
      metadata = nextMetadata;
    },

    async writeChunk({ chunk, chunkIndex }) {
      chunks[chunkIndex] = chunk;
    },

    async complete() {
      const validation = validateAssembly(
        chunks,
        metadata.size,
        metadata.totalChunks,
      );

      if (!validation.isComplete) {
        const error = new Error('Memory receive store assembly incomplete');
        error.reason = 'incomplete';
        error.details = validation;
        throw error;
      }

      const blob = new Blob(chunks, { type: metadata.mimeType });
      const file = new File([blob], metadata.name, { type: metadata.mimeType });

      return {
        file,
        isOpfsBacked: false,
      };
    },

    async abort() {
      chunks.length = 0;
    },
  };
}
