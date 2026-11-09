import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { createRoot } from 'solid-js';
import { P2PRoom, Peer } from '@kidlib/p2p';
import { useP2PRoom } from '@kidlib/p2p/solid';
import { createRoomSignaling } from '../../realtime';
import { CallHandshakeController } from './call-handshake-controller';

vi.mock('../../auth/index.js', async (importOriginal) => ({
  ...(await importOriginal()),
  getLoggedInUserId: () => 'callee-id',
  getLoggedInUserToken: async () => 'test-token',
}));
vi.mock('./call-service.js', () => ({
  initCallService: vi.fn(),
  cleanupCallService: vi.fn(),
  getCallService: () => ({ respondToIncomingCallInvite: async () => {} }),
}));
vi.mock('@sentry/browser', () => ({
  logger: { info: vi.fn() },
  captureMessage: vi.fn(),
  flush: async () => true,
  setTag: vi.fn(),
  getIsolationScope: () => ({ setAttribute() {}, removeAttribute() {} }),
  metrics: { count: vi.fn(), distribution: vi.fn() },
}));

// Only the signaling network/server is simulated. Both native WebRTC rooms,
// the Solid adapter, reconnecting transport, DO adapter and controller are real.
// Worker tests separately verify persistence/expiry of this wire snapshot.
function createNetwork({ replay, autoOpen = true }) {
  const sockets = [];
  const departures = new Set();
  const peers = () =>
    sockets.filter((ws) => ws.peerId).map((ws) => ({ peerId: ws.peerId }));
  const broadcast = (departed) => {
    for (const ws of sockets) {
      ws.receive({
        t: 'peers',
        peers: peers(),
        ...(departed ? { departed } : {}),
      });
    }
  };
  class Socket {
    static OPEN = 1;
    static CLOSED = 3;
    readyState = 0;
    listeners = new Map();
    peerId = null;
    blackholed = false;
    sent = [];

    constructor() {
      sockets.push(this);
      if (autoOpen) setTimeout(() => this.open());
    }
    open() {
      this.readyState = Socket.OPEN;
      // The server sends its connect-time snapshot before handling rejoin.
      const snapshot = {
        t: 'peers',
        peers: peers(),
        ...(replay && departures.size ? { departed: [...departures] } : {}),
      };
      this.dispatch('open');
      this.receive(snapshot);
    }
    addEventListener(type, listener) {
      const listeners = this.listeners.get(type) ?? new Set();
      listeners.add(listener);
      this.listeners.set(type, listeners);
    }
    dispatch(type, event) {
      this.listeners.get(type)?.forEach((listener) => listener(event));
    }
    receive(message) {
      if (this.readyState !== Socket.OPEN || this.blackholed) return;
      this.dispatch('message', { data: JSON.stringify(message) });
    }
    send(raw) {
      if (this.blackholed) return;
      const message = JSON.parse(raw);
      this.sent.push(message);
      queueMicrotask(() => {
        if (message.t === 'join') {
          this.peerId = message.peerId;
          departures.delete(this.peerId);
          broadcast();
          this.receive({
            t: 'joined',
            peerId: this.peerId,
            requestId: message.requestId,
          });
        } else if (message.t === 'leave') {
          const id = this.peerId;
          this.peerId = null;
          if (id) departures.add(id);
          broadcast(id ? [id] : undefined);
        } else if (message.t === 'relay') {
          if (!this.peerId) {
            this.receive({ t: 'error', message: 'join before relaying' });
            return;
          }
          sockets
            .find((ws) => ws.peerId === message.to)
            ?.receive({
              t: 'relay',
              from: this.peerId,
              channel: message.channel,
              data: message.data,
            });
        }
      });
    }
    close() {
      if (this.readyState === Socket.CLOSED) return;
      const hadPresence = this.peerId !== null;
      this.peerId = null;
      this.readyState = Socket.CLOSED;
      if (hadPresence) broadcast();
      this.dispatch('close');
    }
  }
  return { Socket, sockets, departures };
}

describe('call recovery and missed hangups through DO signaling', () => {
  const cleanups = [];
  afterEach(async () => {
    for (const cleanup of cleanups.splice(0).reverse()) await cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it.each(['initiator', 'joiner'])(
    'replays a queued %s recovery message after rejoining',
    async (role) => {
      const network = createNetwork({ replay: false, autoOpen: false });
      vi.stubGlobal('WebSocket', network.Socket);
      const a = createRoomSignaling({ roomId: 'recovery' });
      const b = createRoomSignaling({ roomId: 'recovery' });
      cleanups.push(
        () => a.cleanupSignaling(),
        () => b.cleanupSignaling(),
      );
      await expect.poll(() => network.sockets.length).toBe(2);
      network.sockets.forEach((socket) => socket.open());
      await Promise.all([a.join('a'), b.join('b')]);

      const signalingA = a.createPeerSignaling({ remotePeerId: 'b' });
      const signalingB = b.createPeerSignaling({ remotePeerId: 'a' });
      const options = {
        rtcConfig: { iceServers: [{ urls: 'stun:127.0.0.1:3478' }] },
        iceRecovery: { maxAttempts: 1, attemptTimeoutMs: 3000 },
      };
      const initiator = new Peer({
        ...options,
        role: 'initiator',
        dataChannel: true,
        signaling: signalingA,
      });
      const joiner = new Peer({
        ...options,
        role: 'joiner',
        signaling: signalingB,
      });
      cleanups.push(
        () => initiator.dispose(),
        () => joiner.dispose(),
      );
      await Promise.all([initiator.start(), joiner.start()]);
      await expect.poll(() => initiator.dataChannel?.readyState).toBe('open');
      await expect.poll(() => joiner.dataChannel?.readyState).toBe('open');

      const target = role === 'initiator' ? initiator : joiner;
      const sendRecovery = vi.spyOn(
        role === 'initiator' ? signalingA : signalingB,
        role === 'initiator' ? 'sendOffer' : 'sendIceRestartRequest',
      );
      const recovered = vi.fn();
      target.on('iceReconnected', recovered);
      const initialUfrag =
        initiator.pc.localDescription.sdp.match(/a=ice-ufrag:(.*)/)[1];
      network.sockets[role === 'initiator' ? 0 : 1].close();
      // Trigger the real recovery path without depending on physical ICE loss.
      target._startIceRecovery('failed');
      await expect.poll(() => sendRecovery.mock.calls.length).toBe(1);
      await expect.poll(() => network.sockets.length).toBe(3);
      const reconnected = network.sockets.at(-1);
      reconnected.open();

      await expect
        .poll(() => recovered.mock.calls.length, { timeout: 4000 })
        .toBe(1);
      expect(recovered.mock.calls[0][0]).toMatchObject({ attempt: 1 });
      expect(reconnected.sent[0]).toMatchObject({ t: 'join' });
      expect(
        initiator.pc.localDescription.sdp.match(/a=ice-ufrag:(.*)/)[1],
      ).not.toBe(initialUfrag);
      const message = vi.fn();
      joiner.on('message', message);
      initiator.send('recovered');
      await expect
        .poll(() => message.mock.calls.length, { timeout: 4000 })
        .toBe(1);
      expect(message.mock.calls[0][0]).toEqual({ data: 'recovered' });
    },
    10000,
  );

  it.each(['replayed', 'missing', 'late'])(
    'reconnect after a half-open socket with departure %s',
    async (delivery) => {
      const replay = delivery === 'replayed';
      const network = createNetwork({ replay });
      vi.stubGlobal('WebSocket', network.Socket);
      vi.spyOn(navigator.mediaDevices, 'getUserMedia').mockResolvedValue(
        new MediaStream(),
      );
      vi.stubGlobal(
        'fetch',
        vi.fn(
          async () =>
            new Response(
              JSON.stringify({
                iceServers: [{ urls: 'stun:127.0.0.1:3478' }],
              }),
            ),
        ),
      );
      let disposeRoot;
      const p2p = createRoot((dispose) => {
        disposeRoot = dispose;
        return useP2PRoom();
      });
      cleanups.push(() => disposeRoot());
      cleanups.push(() => p2p.dispose());
      const onReconnectStatus = vi.fn();
      const controller = new CallHandshakeController({
        p2p,
        createSignaling: createRoomSignaling,
        getCallerName: () => 'Callee',
        onStateChange() {},
        onCalleeBusy() {},
        onReconnectStatus,
      });
      const hangUp = vi.spyOn(controller, 'hangUp');
      controller.showIncomingCallFromNotification({
        callInviteId: 'call-1',
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        audioOnly: true,
        startedAt: Date.now(),
      });
      controller.acceptIncoming();
      await expect.poll(() => p2p.state(), { timeout: 5000 }).toBe('joined');
      const calleeSocket = network.sockets.find(
        (ws) => ws.peerId === 'callee-id',
      );
      const remote = new P2PRoom({
        peerId: 'caller-id',
        roomId: 'room-1',
        createSignaling: createRoomSignaling,
        localStream: new MediaStream(),
        dataChannel: true,
        rtcConfig: { iceServers: [] },
      });
      cleanups.push(() => remote.dispose());
      await remote.ready;
      await expect
        .poll(
          () =>
            [...p2p.dataChannels().values()].some(
              (channel) => channel.readyState === 'open',
            ),
          { timeout: 8000 },
        )
        .toBe(true);

      // A network switch can leave the signaling socket apparently OPEN while
      // WebRTC recovers independently. Returning online does not replace it.
      calleeSocket.blackholed = true;
      window.dispatchEvent(new Event('online'));
      expect(network.sockets).toHaveLength(2);
      expect(calleeSocket.readyState).toBe(network.Socket.OPEN);
      await remote.dispose();
      await expect.poll(() => network.departures.has('caller-id')).toBe(true);
      expect(hangUp).not.toHaveBeenCalled();
      expect(onReconnectStatus).not.toHaveBeenCalledWith('reconnecting');

      // Once TCP failure is detected, the real transport reconnects and the
      // first absence snapshot must carry the explicit leave.
      vi.useFakeTimers();
      calleeSocket.close();
      await vi.advanceTimersByTimeAsync(501);
      if (replay) {
        expect(hangUp).toHaveBeenCalledExactlyOnceWith('peer-left');
        expect(onReconnectStatus).not.toHaveBeenCalledWith('reconnecting');
      } else {
        expect(onReconnectStatus).toHaveBeenCalledWith('reconnecting');
        expect(hangUp).not.toHaveBeenCalled();
        if (delivery === 'late') {
          network.sockets.at(-1).receive({
            t: 'peers',
            peers: [{ peerId: 'callee-id' }],
            departed: ['caller-id'],
          });
          // p2p classifies the first disappearance only; a later correction
          // does not upgrade the existing dropped event or end its grace.
          expect(hangUp).not.toHaveBeenCalled();
        }
        await vi.advanceTimersByTimeAsync(12_500);
        expect(hangUp).toHaveBeenCalledExactlyOnceWith('reconnect-timeout');
      }
      await expect.poll(() => p2p.room()).toBeUndefined();
      await expect.poll(() => p2p.state()).toBe('idle');
    },
  );
});
