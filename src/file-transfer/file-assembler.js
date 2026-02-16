/**
 * Adapted from PrivyDrop by david-bai00
 * Source: https://github.com/david-bai00/PrivyDrop
 * License: MIT
 */

const MAX_SIZE_DIFFERENCE = 1024; // 1KB tolerance for size validation

/**
 * Validate file assembly completeness
 * 
 * @param {Array<ArrayBuffer|null>} chunks - Array of chunks (may contain nulls for missing chunks)
 * @param {number} expectedSize - Expected total file size in bytes
 * @param {number} expectedChunksCount - Expected number of chunks
 * @returns {Object} Validation result with isComplete, validChunks, totalSize, missingChunks, sizeDifference
 */
export function validateAssembly(chunks, expectedSize, expectedChunksCount) {
  let totalSize = 0;
  let validChunks = 0;
  const missingChunks = [];

  chunks.forEach((chunk, index) => {
    if (chunk instanceof ArrayBuffer) {
      validChunks++;
      totalSize += chunk.byteLength;
    } else {
      missingChunks.push(index);
    }
  });

  const sizeDifference = expectedSize - totalSize;
  const isComplete =
    validChunks === expectedChunksCount &&
    Math.abs(sizeDifference) <= MAX_SIZE_DIFFERENCE;

  return {
    isComplete,
    validChunks,
    totalSize,
    missingChunks,
    sizeDifference,
  };
}

