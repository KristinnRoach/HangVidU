import { TransferConfig } from '../../core/config.js';
import { createMemoryReceiveStore } from '../../core/receive-stores/memory-receive-store.js';
import {
  createOpfsReceiveStore,
  StreamingFileWriter,
} from './opfs-receive-store.js';

/**
 * Probe whether the default receive-store policy can use OPFS.
 * @returns {Promise<boolean>}
 */
export function probeDefaultReceiveStore() {
  return StreamingFileWriter.probeOPFS();
}

/**
 * Remove default receive-store temporary OPFS files.
 * @returns {Promise<void>}
 */
export async function cleanupDefaultReceiveStore() {
  await StreamingFileWriter.cleanup();
}

/**
 * Choose OPFS for large files when available, otherwise memory.
 * @param {Object} metadata - Incoming FILE_META payload.
 * @returns {Object} Receive store.
 */
export function createDefaultReceiveStore(metadata) {
  if (
    StreamingFileWriter.isOPFSAvailable() === true &&
    metadata.size >= TransferConfig.STREAMING_THRESHOLD
  ) {
    return createOpfsReceiveStore();
  }

  return createMemoryReceiveStore();
}
