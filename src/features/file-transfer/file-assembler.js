/**
 * Adapted from PrivyDrop by david-bai00
 * Source: https://github.com/david-bai00/PrivyDrop
 * License: MIT
 */

// No tolerance (changed from 1KB to prevent corrupt files, currently must match expected byte size exactly)
const MAX_SIZE_DIFFERENCE = 0;

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
    validChunks === expectedChunksCount && sizeDifference === 0; // Change to <== MAX_SIZE_DIFFERENCE if using tolerance

  return {
    isComplete,
    validChunks,
    totalSize,
    missingChunks,
    sizeDifference,
  };
}
