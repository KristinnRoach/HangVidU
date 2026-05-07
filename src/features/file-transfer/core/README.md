# File Transfer Core

Reusable chunked file transfer over an injected message transport.

## Core Pieces

- `FileTransferController` owns the protocol: metadata, chunking, progress, validation, and receive completion callbacks.
- `FileTransport` adapters own raw I/O only. A transport implements `send(data)`, `onMessage(callback)`, `isReady()`, optional `getWaitForDrain()`, and `cleanup()`.
- Receive stores own incoming file storage. A store implements optional `init(metadata)`, `writeChunk({ chunk, offset, chunkIndex, metadata })`, `complete()`, and optional `abort(reason)`.

The controller has no UI dependency, no room/session ownership, no OPFS dependency, and no service-worker behavior.

## Basic Usage

```js
import {
  FileTransferController,
  P2PRoomFileTransport,
  createMemoryReceiveStore,
} from './index.js';

const controller = new FileTransferController({
  transport: new P2PRoomFileTransport({ room, memberId }),
  createReceiveStore: createMemoryReceiveStore,
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

## Public API

Import reusable APIs from `./index.js`. Packet helpers, chunk assembly internals, app storage policy, OPFS handling, and service-worker video-serving helpers are not part of the core public API.
