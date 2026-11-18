import { describe, expect, it, vi } from 'vite-plus/test';
import type { P2PRoom } from '@kidlib/p2p';
import { capVideoSenders } from './send-quality';

function fakeSender(maxBitrate?: number) {
  let parameters: { encodings: RTCRtpEncodingParameters[] } = {
    encodings: [maxBitrate ? { maxBitrate } : {}],
  };
  return {
    getParameters: () => structuredClone(parameters),
    setParameters: vi.fn(async (next: typeof parameters) => {
      parameters = next;
    }),
    maxBitrate: () => parameters.encodings[0]?.maxBitrate,
    maxFramerate: () => parameters.encodings[0]?.maxFramerate,
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
    await capVideoSenders(fakeRoom(senders), false);
    expect(senders.map((sender) => sender.maxBitrate())).toEqual([
      500_000, 500_000, 500_000,
    ]);
  });

  it('removes the cap when the call is back to one peer', async () => {
    const sender = fakeSender(500_000);
    await capVideoSenders(fakeRoom([sender]), false);
    expect(sender.maxBitrate()).toBeUndefined();
  });

  it('caps camera frame rate at four people and restores it for smaller calls', async () => {
    const senders = [fakeSender(), fakeSender(), fakeSender()];
    await capVideoSenders(fakeRoom(senders), false);
    expect(senders.map((sender) => sender.maxFramerate())).toEqual([
      20, 20, 20,
    ]);

    await capVideoSenders(fakeRoom(senders.slice(0, 2)), false);
    expect(senders[0]?.maxFramerate()).toBeUndefined();
    expect(senders[0]?.maxBitrate()).toBe(750_000);
  });

  it('removes the frame-rate cap during screen sharing and reapplies it on return', async () => {
    const senders = [fakeSender(), fakeSender(), fakeSender()];
    const room = fakeRoom(senders);
    await capVideoSenders(room, false);
    await capVideoSenders(room, true);
    expect(senders.map((sender) => sender.maxFramerate())).toEqual([
      undefined,
      undefined,
      undefined,
    ]);
    expect(senders[0]?.maxBitrate()).toBe(500_000);

    await capVideoSenders(room, false);
    expect(senders[0]?.maxFramerate()).toBe(20);
  });
});
