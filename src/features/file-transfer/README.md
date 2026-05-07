# File Transfer

Reusable chunked file transfer over an injected message transport.

## Core Pieces

- `FileTransferController` owns the protocol: metadata, chunking, progress, validation, and receive completion callbacks.
- `FileTransport` adapters own raw I/O only. A transport implements `send(data)`, `onMessage(callback)`, `isReady()`, optional `getWaitForDrain()`, and `cleanup()`.
- Receive stores own incoming file storage. A store implements optional `init(metadata)`, `writeChunk({ chunk, offset, chunkIndex, metadata })`, `complete()`, and optional `abort(reason)`.

The controller has no UI dependency and no room/session ownership. Cleanup should remove only resources owned by the controller, its transport adapter, and its receive stores.

## Basic Usage

```js
import { FileTransferController } from './file-transfer-controller.js';
import { P2PRoomFileTransport } from './transport/p2p-room-file-transport.js';
import {
  cleanupDefaultReceiveStore,
  createDefaultReceiveStore,
  probeDefaultReceiveStore,
} from './receive-stores/default-receive-store.js';

await probeDefaultReceiveStore();

const controller = new FileTransferController({
  transport: new P2PRoomFileTransport({ room, memberId }),
  createReceiveStore: createDefaultReceiveStore,
  cleanupReceiveStores: cleanupDefaultReceiveStore,
});

controller.onReceiveProgress = (progress) => {
  console.log('receive progress', progress);
};

controller.onFileReceived = ({ file, result, isOpfsBacked }) => {
  console.log('received file', file, result, isOpfsBacked);
};

controller.onFileError = (error) => {
  console.error('file transfer failed', error);
};

await controller.sendFile(file, (progress) => {
  console.log('send progress', progress);
});

controller.cleanup();
```

## Transports

- `P2PRoomFileTransport` sends through `room.send(memberId, data)` and listens to the room `dataChannelMessage` event. It filters messages to this protocol and only removes its own listener during cleanup.
- `WebRTCFileTransport` is the legacy adapter for a direct `RTCDataChannel`. It owns its peer connection cleanup path and should not be used for p2p rooms where the room owns the connection.

## Receive Stores

- `createMemoryReceiveStore()` buffers the whole file in memory and returns `{ file, isOpfsBacked: false }`.
- `createOpfsReceiveStore()` streams chunks into OPFS and returns `{ file, isOpfsBacked: true }`.
- `createDefaultReceiveStore(metadata)` uses OPFS for large files when OPFS probing has succeeded, otherwise memory.

UI, message-list state, watch-together behavior, and service-worker video serving are app concerns layered on top of the reusable controller.
