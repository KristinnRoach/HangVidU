import { describe, expect, it, vi } from 'vitest';
import { createEmbeddedChunkPacket } from '../chunk-processor.js';
import { P2PRoomFileTransport } from './p2p-room-file-transport.js';

function createRoom() {
  const listeners = new Map();
  return {
    state: 'joined',
    members: ['local', 'remote'],
    dataChannels: new Map([
      [
        'remote',
        {
          readyState: 'open',
          bufferedAmount: 0,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        },
      ],
    ]),
    send: vi.fn(),
    close: vi.fn(),
    on(type, callback) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(callback);
      return () => listeners.get(type)?.delete(callback);
    },
    emit(type, detail) {
      listeners.get(type)?.forEach((callback) => callback(detail));
    },
    listenerCount(type) {
      return listeners.get(type)?.size ?? 0;
    },
  };
}

describe('P2PRoomFileTransport', () => {
  it('sends outbound data through room.send', () => {
    const room = createRoom();
    const transport = new P2PRoomFileTransport({ room, memberId: 'remote' });
    const payload = JSON.stringify({ type: 'FILE_META' });

    transport.send(payload);

    expect(room.send).toHaveBeenCalledWith('remote', payload);
  });

  it('routes only file-transfer payloads from the configured member', async () => {
    const room = createRoom();
    const transport = new P2PRoomFileTransport({ room, memberId: 'remote' });
    const onMessage = vi.fn();
    const meta = JSON.stringify({
      type: 'FILE_META',
      fileId: 'file-1',
      name: 'file.txt',
      size: 3,
      mimeType: 'text/plain',
      totalChunks: 1,
    });
    const chunk = createEmbeddedChunkPacket(
      { type: 'FILE_CHUNK', fileId: 'file-1', chunkIndex: 0, totalChunks: 1 },
      new Uint8Array([1, 2, 3]).buffer,
    );

    transport.onMessage(onMessage);
    room.emit('dataChannelMessage', { memberId: 'someone-else', data: meta });
    room.emit('dataChannelMessage', { memberId: 'remote', data: 'plain text' });
    room.emit('dataChannelMessage', { memberId: 'remote', data: meta });
    room.emit('dataChannelMessage', { memberId: 'remote', data: chunk });
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(onMessage).toHaveBeenCalledTimes(2);
    expect(onMessage).toHaveBeenNthCalledWith(1, meta);
    expect(onMessage).toHaveBeenNthCalledWith(2, chunk);
  });

  it('cleans up its listener without closing the room', () => {
    const room = createRoom();
    const transport = new P2PRoomFileTransport({ room, memberId: 'remote' });
    transport.onMessage(vi.fn());

    expect(room.listenerCount('dataChannelMessage')).toBe(1);

    transport.cleanup();

    expect(room.listenerCount('dataChannelMessage')).toBe(0);
    expect(room.close).not.toHaveBeenCalled();
  });
});
