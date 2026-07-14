// Regression coverage for audio-only calls over reserved media slots:
// two real P2PRooms (native WebRTC) over in-memory signaling, mic slot
// filled, video slot null. Guards against the muted camera-slot video track
// blocking Chromium audio output (no audio until camera toggled).
import { afterEach, describe, expect, it } from 'vite-plus/test';
import { userEvent } from 'vite-plus/test/browser/context';
import { render } from '@solidjs/testing-library';
import { P2PRoom } from '@kidlib/p2p';

import { ParticipantMedia } from './components/ParticipantMedia';

function createHub() {
  const clients = new Map(); // peerId -> { onMessage: Set, present: bool, data }
  const peersListeners = new Set();
  const pendingMessages = new Map(); // toPeerId -> Array<[from, msg]>

  const deliver = (toPeerId, from, msg) => {
    const to = clients.get(toPeerId);
    if (to && to.onMessage.size > 0) {
      to.onMessage.forEach((cb) => cb(from, msg));
    } else {
      const queue = pendingMessages.get(toPeerId) ?? [];
      queue.push([from, msg]);
      pendingMessages.set(toPeerId, queue);
    }
  };

  const snapshot = () =>
    [...clients.entries()]
      .filter(([, c]) => c.present)
      .map(([peerId, c]) => ({ memberId: peerId, data: c.data }));

  const broadcastPeers = () => {
    const peers = snapshot();
    peersListeners.forEach((cb) => cb(peers));
  };

  return {
    createClient() {
      let selfId = null;
      return {
        join(peerId, data) {
          selfId = peerId;
          const existing = clients.get(peerId) ?? { onMessage: new Set() };
          existing.present = true;
          existing.data = data;
          clients.set(peerId, existing);
          broadcastPeers();
        },
        leave() {
          const c = selfId && clients.get(selfId);
          if (c) c.present = false;
          broadcastPeers();
        },
        onPeers(cb) {
          peersListeners.add(cb);
          queueMicrotask(() => cb(snapshot()));
          return () => peersListeners.delete(cb);
        },
        setPresenceData(peerId, data) {
          const c = clients.get(peerId);
          if (c) c.data = data;
          broadcastPeers();
        },
        createPeerSignaling({ localPeerId, remotePeerId }) {
          const local = clients.get(localPeerId) ?? { onMessage: new Set() };
          clients.set(localPeerId, local);
          const listeners = {
            offer: new Set(),
            answer: new Set(),
            candidate: new Set(),
          };
          const handler = (from, msg) => {
            if (from !== remotePeerId) return;
            listeners[msg.kind]?.forEach((cb) => cb(msg.payload));
          };
          local.onMessage.add(handler);
          const queued = pendingMessages.get(localPeerId);
          pendingMessages.delete(localPeerId);
          queued?.forEach(([from, msg]) =>
            queueMicrotask(() => handler(from, msg)),
          );
          const send = (kind) => (payload) => {
            queueMicrotask(() =>
              deliver(remotePeerId, localPeerId, { kind, payload }),
            );
          };
          const on = (kind) => (cb) => {
            listeners[kind].add(cb);
            return () => listeners[kind].delete(cb);
          };
          return {
            sendOffer: send('offer'),
            sendAnswer: send('answer'),
            sendCandidate: send('candidate'),
            onOffer: on('offer'),
            onAnswer: on('answer'),
            onRemoteCandidate: on('candidate'),
            close() {
              local.onMessage.delete(handler);
            },
          };
        },
      };
    },
  };
}

function createAudioTrack(ctx) {
  const osc = ctx.createOscillator();
  const dest = ctx.createMediaStreamDestination();
  osc.connect(dest);
  osc.start();
  return dest.stream.getAudioTracks()[0];
}

const waitFor = async (predicate, timeoutMs = 8000) => {
  const start = Date.now();
  while (!predicate()) {
    if (Date.now() - start > timeoutMs) return false;
    await new Promise((r) => setTimeout(r, 100));
  }
  return true;
};

describe('audio-only call over reserved slots', () => {
  const cleanups = [];
  afterEach(async () => {
    for (const fn of cleanups.splice(0)) await fn();
  });

  it('delivers audio without any camera toggle', async () => {
    const hub = createHub();
    const ctx = new AudioContext();
    cleanups.push(() => ctx.close());
    // Real user gesture (CDP input) unlocks the AudioContext in headless.
    await userEvent.click(document.body);
    await ctx.resume();

    const log = [];
    const makeRoom = (peerId) => {
      const track = createAudioTrack(ctx);
      const stream = new MediaStream([track]);
      const remoteStreams = [];
      const room = new P2PRoom({
        signaling: hub.createClient(),
        roomId: 'repro',
        peerId,
        getLocalStream: () => Promise.resolve(stream),
        localTrackSlots: [
          { id: 'microphone', kind: 'audio', track },
          { id: 'primary-video', kind: 'video', track: null },
        ],
        memberCapacity: 2,
        onMemberStream: ({ stream: s }) => {
          log.push(
            `[${peerId}] memberStream tracks=${s
              .getTracks()
              .map((t) => t.kind)
              .join(',')}`,
          );
          remoteStreams.push(s);
        },
        onMemberJoined: ({ memberId }) =>
          log.push(`[${peerId}] memberJoined ${memberId}`),
        onStateChange: ({ state }) => log.push(`[${peerId}] state=${state}`),
        onError: ({ error }) =>
          log.push(`[${peerId}] error: ${error?.message ?? error}`),
      });
      cleanups.push(() => room.close());
      return { room, remoteStreams };
    };

    const a = makeRoom('a');
    const b = makeRoom('b');

    // Both sides surface a remote stream containing an audio track.
    expect(
      await waitFor(
        () =>
          a.remoteStreams.some((s) => s.getAudioTracks().length > 0) &&
          b.remoteStreams.some((s) => s.getAudioTracks().length > 0),
      ),
      `remote audio track surfaced on both sides; log:\n${log.join('\n')}`,
    ).toBe(true);

    // RTP actually flows: receiver audio track unmutes on first packet.
    const remoteAudioUnmuted = (streams) =>
      streams.some((s) => s.getAudioTracks().some((t) => t.muted === false));
    const bothUnmuted = () =>
      remoteAudioUnmuted(a.remoteStreams) &&
      remoteAudioUnmuted(b.remoteStreams);
    expect(
      await waitFor(bothUnmuted, 5000),
      `remote audio receiving RTP (unmuted) on both sides; log:\n${log.join('\n')}`,
    ).toBe(true);

    // The regression condition needs the reserved camera slot's muted video
    // track alongside the audio track — require it, don't pass on audio alone.
    const isRegressionStream = (stream) =>
      stream.getAudioTracks().length > 0 &&
      stream
        .getVideoTracks()
        .some((track) => track.readyState !== 'ended' && track.muted);
    expect(
      await waitFor(() => b.remoteStreams.some(isRegressionStream), 5000),
      `reserved muted video slot surfaced; log:\n${log.join('\n')}`,
    ).toBe(true);

    // Full UI path: remote audio-only stream rendered through ParticipantMedia
    // (camera-off presence → videoEnabled false) must still audibly play.
    const remoteStream = b.remoteStreams.find(isRegressionStream);
    const { container, unmount } = render(() => (
      <ParticipantMedia stream={remoteStream} videoEnabled={false} />
    ));
    cleanups.push(unmount);
    const videoEl = container.querySelector('video');
    // Regression: with the remote's muted camera-slot video track in
    // srcObject, Chromium never fires loadedmetadata and outputs no audio.
    const playing = await waitFor(
      () => !videoEl.paused && videoEl.currentTime > 0,
      5000,
    );
    expect(
      playing,
      `hidden audio-fallback video element plays; paused=${videoEl.paused} ` +
        `currentTime=${videoEl.currentTime} readyState=${videoEl.readyState}`,
    ).toBe(true);
  });
});
