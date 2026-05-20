import {
  FileTransferController,
  P2PRoomFileTransport,
  cleanupDefaultReceiveStore,
  createDefaultReceiveStore,
} from './index.js';

export type FileTransferEvent =
  | { type: 'incoming'; peerId: string; meta: any }
  | { type: 'progress'; peerId: string; progress: number }
  | { type: 'complete'; peerId: string; payload: any }
  | { type: 'error'; peerId: string; error: any };

export type FileTransferListener = (event: FileTransferEvent) => void;

// Module-level state (completely detached from the UI tree)
const controllers = new Map<string, FileTransferController>();
const listeners = new Set<FileTransferListener>();

/**
 * Global subscription for UI elements to react to transfers (e.g. toasts, chat history).
 * Returns a cleanup function.
 */
export const subscribeToFiles = (cb: FileTransferListener) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const notify = (event: FileTransferEvent) =>
  listeners.forEach((cb) => cb(event));

/**
 * Link a peer to the file transfer system.
 * Call this exactly once when a peer's data channel officially opens.
 */
export const initPeerTransfer = (room: any, memberId: string) => {
  if (controllers.has(memberId)) return;

  const controller = new FileTransferController({
    transport: new P2PRoomFileTransport({ room, memberId }),
    createReceiveStore: createDefaultReceiveStore,
    cleanupReceiveStores: cleanupDefaultReceiveStore,
  });

  // Pipe all controller callbacks into the global event bus
  controller.onFileMetaReceived = (meta) =>
    notify({ type: 'incoming', peerId: memberId, meta });
  controller.onReceiveProgress = (progress) =>
    notify({ type: 'progress', peerId: memberId, progress });
  controller.onFileReceived = (payload) =>
    notify({ type: 'complete', peerId: memberId, payload });
  controller.onFileError = (error) =>
    notify({ type: 'error', peerId: memberId, error });

  controllers.set(memberId, controller);
};

/**
 * Unlink a peer. Call when a peer disconnects or the channel closes.
 */
export const teardownPeerTransfer = (memberId: string) => {
  controllers.get(memberId)?.cleanup();
  controllers.delete(memberId);
};

/**
 * Send a file. This is the simple, stateless entry point for the UI to use.
 */
export const sendFile = async (
  memberId: string,
  file: File,
  onProgress?: (progress: number) => void,
) => {
  const controller = controllers.get(memberId);
  if (!controller || !controller.isReady()) {
    throw new Error(`Data channel not ready for peer: ${memberId}`);
  }
  await controller.sendFile(file, onProgress);
};
