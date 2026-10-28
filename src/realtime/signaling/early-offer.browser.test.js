import { afterEach, expect, it, vi } from 'vite-plus/test';
import { server } from 'vite-plus/test/browser/context';
import { Peer } from '@kidlib/p2p';

const sockets = vi.hoisted(() => []);
vi.mock('../signaling-socket', () => ({
  createSignalingSocket: () => {
    const index = sockets.length;
    const handlers = new Set();
    const socket = {
      sent: [],
      emit: (message) => handlers.forEach((handler) => handler(message)),
      send(message) {
        socket.sent.push(message);
        if (message.t === 'relay') {
          sockets[1 - index]?.emit({
            ...message,
            from: index === 0 ? 'peer-a' : 'peer-b',
          });
        }
      },
      onMessage(handler) {
        handlers.add(handler);
        return () => handlers.delete(handler);
      },
      onOpen() {
        return () => {};
      },
      close() {
        handlers.clear();
      },
    };
    sockets.push(socket);
    return socket;
  },
}));
vi.mock('../../auth/index.js', () => ({
  getLoggedInUserToken: async () => 'test-token',
}));

import { createDoRoomSignaling } from './do-room-signaling';

let peers = [];
let adapters = [];
afterEach(() => {
  peers.forEach((peer) => peer.dispose());
  adapters.forEach((adapter) => adapter.cleanupSignaling());
  peers = [];
  adapters = [];
  sockets.length = 0;
  vi.restoreAllMocks();
});

it.skipIf(server.browser === 'firefox')(
  'negotiates through the real HangVidU adapter with offer and ICE arriving before credentials',
  async () => {
    const a = createDoRoomSignaling({ roomId: 'early-offer' });
    const b = createDoRoomSignaling({ roomId: 'early-offer' });
    adapters = [a, b];
    let resolveCredentials;
    const pending = new Promise((resolve) => {
      resolveCredentials = resolve;
    });
    const provider = vi.fn(() => pending);
    const initiator = new Peer({
      role: 'initiator',
      dataChannel: true,
      rtcConfig: { iceServers: [] },
      signaling: a.createPeerSignaling({
        localPeerId: 'peer-a',
        remotePeerId: 'peer-b',
      }),
    });
    const joiner = new Peer({
      role: 'joiner',
      iceServersProvider: provider,
      signaling: b.createPeerSignaling({
        localPeerId: 'peer-b',
        remotePeerId: 'peer-a',
      }),
    });
    peers = [initiator, joiner];
    const addedCandidates = vi.spyOn(
      RTCPeerConnection.prototype,
      'addIceCandidate',
    );
    const outcome = joiner
      .start({ startTimeoutMs: 3000, connectedTimeoutMs: 3000 })
      .then(
        () => null,
        (error) => error,
      );
    await vi.waitFor(() => expect(provider).toHaveBeenCalledOnce());
    await initiator.start();
    await vi.waitFor(() =>
      expect(sockets[0].sent.some((message) => message.channel === 'ice')).toBe(
        true,
      ),
    );
    expect(joiner.pc).toBeNull();
    expect(
      sockets[0].sent.filter((message) => message.data?.kind === 'offer'),
    ).toHaveLength(1);
    expect(sockets[1].sent).toHaveLength(0);
    resolveCredentials({ iceServers: [{ urls: 'stun:127.0.0.1:9' }] });
    expect(await outcome).toBeNull();
    await vi.waitFor(() => expect(initiator.state).toBe('connected'));
    expect(joiner.state).toBe('connected');
    expect(
      sockets[1].sent.filter((message) => message.data?.kind === 'answer'),
    ).toHaveLength(1);
    for (const message of sockets[0].sent.filter(
      (message) => message.channel === 'ice',
    )) {
      expect(addedCandidates).toHaveBeenCalledWith(
        expect.objectContaining({ candidate: message.data.candidate }),
      );
    }
  },
  10000,
);
