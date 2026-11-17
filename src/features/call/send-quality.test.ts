import { describe, expect, it, vi } from 'vite-plus/test';
import type { P2PRoom } from '@kidlib/p2p';
import { capVideoSenders } from './send-quality';

function fakeSender(maxBitrate?: number) {
  let parameters: { encodings: { maxBitrate?: number }[] } = {
    encodings: [maxBitrate ? { maxBitrate } : {}],
  };
  return {
    getParameters: () => structuredClone(parameters),
    setParameters: vi.fn(async (next: typeof parameters) => {
      parameters = next;
    }),
    maxBitrate: () => parameters.encodings[0]?.maxBitrate,
  };
}

function fakeRoom(senders: ReturnType<typeof fakeSender>[]) {
  const connections = new Map(
    senders.map((sender, i) => [
      `peer-${i}`,
      {
        connectionState: 'connected',
        getTransceivers: () => [
          { receiver: { track: { kind: 'audio' } }, sender: null },
          { receiver: { track: { kind: 'video' } }, sender },
        ],
      },
    ]),
  );
  return { peerConnections: () => connections } as unknown as P2PRoom;
}

describe('capVideoSenders', () => {
  it('splits the upload budget across mesh peers', async () => {
    const senders = [fakeSender(), fakeSender(), fakeSender()];
    await capVideoSenders(fakeRoom(senders));
    expect(senders.map((sender) => sender.maxBitrate())).toEqual([
      500_000, 500_000, 500_000,
    ]);
  });

  it('removes the cap when the call is back to one peer', async () => {
    const sender = fakeSender(500_000);
    await capVideoSenders(fakeRoom([sender]));
    expect(sender.maxBitrate()).toBeUndefined();
  });
});
