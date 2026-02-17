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

  // Yield the event loop every N chunks during sendFile to let media packets through.
  // Prevents file transfer from monopolizing the NIC send queue during a call.
  // Set to null to disable (max throughput, may cause video lag during transfers).
  CHUNK_YIELD_INTERVAL: 4, // yield every 4 chunks (~256KB burst before yield)

  // DataChannel backpressure threshold. Sender pauses when bufferedAmount exceeds this.
  // Higher = fewer pauses = more throughput but more queue saturation.
  // Was 128KB when DataChannel shared the media PC; now on its own PC can be higher.
  BACKPRESSURE_THRESHOLD: 256 * 1024, // 256KB
};
