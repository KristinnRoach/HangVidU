/**
 * Adapted from PrivyDrop by david-bai00
 * Source: https://github.com/david-bai00/PrivyDrop
 * License: MIT
 */

/**
 * Transfer configuration management
 * Centrally manages all file transfer related configuration parameters
 */
export const TransferConfig = {
  // File I/O related configuration
  FILE_CONFIG: {
    CHUNK_SIZE: 4194304, // 4MB - File reading chunk size, reduces FileReader calls
    BATCH_SIZE: 8, // 8 chunks batch processing - 32MB batch processing improves performance
    NETWORK_CHUNK_SIZE: 65536, // 64KB - WebRTC safe sending size, fixes sendData failed
  },

  // Files above this size use OPFS streaming; below stays in-memory.
  STREAMING_THRESHOLD: 1000 * 1024 * 1024, // TODO: Find optimal threshold after testing in-memory vs OPFS streaming performance and reliability (current low threshold is for testing, actual could be up to 1.25GB)
};
