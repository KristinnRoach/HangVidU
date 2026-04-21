// src/lib/webrtc/tests/peer.browser.test.js
//
// Browser-mode tests for the Peer class. Uses real RTCPeerConnection APIs.
// Two Peer instances are wired through an in-memory loopback signaling
// channel so offers/answers/ICE candidates flow between them end-to-end.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Peer, PEER_STATES } from '../peer.js';

/**
 * Build a pair of loopback SignalingChannels that wire two Peers together.
 * Whatever side A sends, side B receives, and vice-versa.
 */
function createLoopbackPair() {
  const offerListeners = { a: null, b: null };
  const answerListeners = { a: null, b: null };
  const candidateListeners = { a: [], b: [] };

  const makeSide = (self, other) => ({
    sendOffer: async (offer) => offerListeners[other]?.(offer),
    sendAnswer: async (answer) => answerListeners[other]?.(answer),
    onOffer: (cb) => {
      offerListeners[self] = cb;
    },
    onAnswer: (cb) => {
      answerListeners[self] = cb;
    },
    sendCandidate: async (candidate) => {
      for (const cb of candidateListeners[other]) cb(candidate);
    },
    onRemoteCandidate: (cb) => {
      candidateListeners[self].push(cb);
    },
  });

  return { a: makeSide('a', 'b'), b: makeSide('b', 'a') };
}

describe('Peer', () => {
  let peers;

  afterEach(() => {
    peers?.forEach((p) => {
      try {
        p.close();
      } catch (_) {}
    });
    peers = null;
  });

  describe('construction', () => {
    it('throws on invalid role', () => {
      const { a } = createLoopbackPair();
      expect(() => new Peer({ role: 'observer', signaling: a })).toThrow(
        /invalid role/,
      );
    });

    it('throws when signaling is missing', () => {
      expect(() => new Peer({ role: 'initiator' })).toThrow(
        /signaling channel is required/,
      );
    });

    it('throws when signaling is incomplete', () => {
      expect(
        () =>
          new Peer({
            role: 'initiator',
            signaling: { sendOffer: () => {} },
          }),
      ).toThrow(/missing method/);
    });

    it('starts in idle state', () => {
      const { a } = createLoopbackPair();
      const peer = new Peer({ role: 'initiator', signaling: a });
      expect(peer.state).toBe(PEER_STATES.IDLE);
      expect(peer.role).toBe('initiator');
      peer.close();
    });
  });

  describe('data-only peer negotiation', () => {
    it('exchanges offer/answer and opens a data channel', async () => {
      const { a, b } = createLoopbackPair();

      const initiator = new Peer({
        role: 'initiator',
        signaling: a,
        dataChannel: true,
      });
      const joiner = new Peer({ role: 'joiner', signaling: b });
      peers = [initiator, joiner];

      const joinerChannel = new Promise((resolve) => {
        joiner.once('datachannel', ({ channel }) => resolve(channel));
      });
      const initiatorOpen = new Promise((resolve) => {
        initiator.once('open', () => resolve());
      });

      await Promise.all([initiator.start(), joiner.start()]);

      const channel = await joinerChannel;
      expect(channel).toBeDefined();
      expect(channel.label).toBe('data');

      await initiatorOpen;
      expect(initiator.dataChannel).toBeDefined();
      expect(initiator.dataChannel.readyState).toBe('open');
    });

    it('delivers messages from initiator to joiner', async () => {
      const { a, b } = createLoopbackPair();

      const initiator = new Peer({
        role: 'initiator',
        signaling: a,
        dataChannel: true,
      });
      const joiner = new Peer({ role: 'joiner', signaling: b });
      peers = [initiator, joiner];

      const received = new Promise((resolve) => {
        joiner.once('message', ({ data }) => resolve(data));
      });
      const initiatorOpen = new Promise((resolve) => {
        initiator.once('open', () => resolve());
      });

      await Promise.all([initiator.start(), joiner.start()]);
      await initiatorOpen;

      initiator.send('hello from initiator');

      expect(await received).toBe('hello from initiator');
    });

    it('emits statechange and connected events', async () => {
      const { a, b } = createLoopbackPair();

      const initiator = new Peer({
        role: 'initiator',
        signaling: a,
        dataChannel: true,
      });
      const joiner = new Peer({ role: 'joiner', signaling: b });
      peers = [initiator, joiner];

      const stateChanges = [];
      initiator.on('statechange', ({ state }) => stateChanges.push(state));

      const connected = new Promise((resolve) => {
        initiator.once('connected', () => resolve());
      });

      await Promise.all([initiator.start(), joiner.start()]);
      await connected;

      expect(stateChanges).toContain(PEER_STATES.CONNECTING);
      expect(stateChanges).toContain(PEER_STATES.CONNECTED);
      expect(initiator.state).toBe(PEER_STATES.CONNECTED);
    });

    it('start() is idempotent — returns the same promise on repeat calls', () => {
      const { a } = createLoopbackPair();
      const peer = new Peer({
        role: 'initiator',
        signaling: a,
        dataChannel: true,
      });
      peers = [peer];

      const p1 = peer.start();
      const p2 = peer.start();
      expect(p1).toBe(p2);
    });

    it('start() resolves without starting after close()', async () => {
      const { a } = createLoopbackPair();
      const peer = new Peer({
        role: 'initiator',
        signaling: a,
        dataChannel: true,
      });
      peers = [peer];
      peer._startInitiator = vi.fn();

      peer.close();
      await expect(peer.start()).resolves.toBeUndefined();

      expect(peer._startInitiator).not.toHaveBeenCalled();
      expect(peer.state).toBe(PEER_STATES.CLOSED);
    });

    it('keeps closed state when start() fails after close()', async () => {
      const { a } = createLoopbackPair();
      const peer = new Peer({
        role: 'initiator',
        signaling: a,
        dataChannel: true,
      });
      peers = [peer];
      const startError = new Error('start failed');
      const onError = vi.fn();
      peer._startInitiator = vi.fn(
        () =>
          new Promise((_, reject) => {
            setTimeout(() => reject(startError), 0);
          }),
      );
      peer.on('error', onError);

      const startPromise = peer.start();
      peer.close();
      await expect(startPromise).rejects.toThrow(startError);

      expect(onError).toHaveBeenCalledWith(
        { error: startError, phase: 'start' },
        expect.any(CustomEvent),
      );
      expect(peer.state).toBe(PEER_STATES.CLOSED);
    });
  });

  describe('send()', () => {
    it('throws if no data channel was configured', () => {
      const { a } = createLoopbackPair();
      const peer = new Peer({ role: 'initiator', signaling: a });
      peers = [peer];
      expect(() => peer.send('nope')).toThrow(/no data channel/);
    });

    it('throws if channel is not open yet', () => {
      const { a } = createLoopbackPair();
      const peer = new Peer({
        role: 'initiator',
        signaling: a,
        dataChannel: true,
      });
      peers = [peer];
      // Data channel is created synchronously in start(); invoke lifecycle
      // so _dataChannel is bound but still 'connecting'.
      peer.start();
      expect(() => peer.send('early')).toThrow(/not open/);
    });
  });

  describe('close()', () => {
    it('transitions to closed state and is safe to call twice', () => {
      const { a } = createLoopbackPair();
      const peer = new Peer({ role: 'initiator', signaling: a });

      peer.close();
      expect(peer.state).toBe(PEER_STATES.CLOSED);

      // Second call is a no-op
      peer.close();
      expect(peer.state).toBe(PEER_STATES.CLOSED);
    });
  });

  describe('on/once sugar', () => {
    it('on() returns an unsubscribe function', () => {
      const { a } = createLoopbackPair();
      const peer = new Peer({ role: 'initiator', signaling: a });
      peers = [peer];

      const handler = vi.fn();
      const off = peer.on('statechange', handler);

      peer.close();
      expect(handler).toHaveBeenCalled();

      handler.mockClear();
      off();
      peer.dispatchEvent(new CustomEvent('statechange', { detail: {} }));
      expect(handler).not.toHaveBeenCalled();
    });

    it('off() removes a listener added with on()', () => {
      const { a } = createLoopbackPair();
      const peer = new Peer({ role: 'initiator', signaling: a });
      peers = [peer];

      const handler = vi.fn();
      peer.on('statechange', handler);
      peer.off('statechange', handler);

      peer.dispatchEvent(new CustomEvent('statechange', { detail: {} }));
      expect(handler).not.toHaveBeenCalled();
    });

    it('once() auto-unsubscribes after the first fire', () => {
      const { a } = createLoopbackPair();
      const peer = new Peer({ role: 'initiator', signaling: a });
      peers = [peer];

      const handler = vi.fn();
      peer.once('statechange', handler);

      peer.dispatchEvent(new CustomEvent('statechange', { detail: {} }));
      peer.dispatchEvent(new CustomEvent('statechange', { detail: {} }));

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
