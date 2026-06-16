import { env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import type { ServerMessage } from '../../../shared/signaling/protocol';

/** Open a hibernatable WS straight to the DO (bypasses the Worker auth layer). */
async function connect(roomId: string) {
  const stub = (env as any).SIGNALING_ROOM.getByName(roomId);
  const res = await stub.fetch(
    new Request(`https://do/rooms/${roomId}/signal`, {
      headers: { Upgrade: 'websocket' },
    }),
  );
  const ws = res.webSocket as WebSocket;
  ws.accept();

  const queue: ServerMessage[] = [];
  const waiters: ((m: ServerMessage) => void)[] = [];
  ws.addEventListener('message', (e: MessageEvent) => {
    const msg = JSON.parse(e.data as string) as ServerMessage;
    const w = waiters.shift();
    if (w) w(msg);
    else queue.push(msg);
  });

  return {
    send: (m: unknown) => ws.send(JSON.stringify(m)),
    next: () =>
      new Promise<ServerMessage>((resolve) => {
        const m = queue.shift();
        if (m) resolve(m);
        else waiters.push(resolve);
      }),
  };
}

/** peerIds from a `peers` message, sorted (presence members → ids). */
function memberIds(msg: ServerMessage): string[] {
  return msg.t === 'peers' ? msg.peers.map((m) => m.peerId).sort() : [];
}

describe('SignalingRoom', () => {
  it('tracks presence and relays signaling between peers', async () => {
    const a = await connect('room-1');
    expect(await a.next()).toEqual({ t: 'peers', peers: [] });
    const b = await connect('room-1');
    expect(await b.next()).toEqual({ t: 'peers', peers: [] });

    a.send({ t: 'join', peerId: 'peer-a' });
    // Joins broadcast to every socket, watchers included.
    expect(await a.next()).toEqual({ t: 'peers', peers: [{ peerId: 'peer-a' }] });
    expect(await b.next()).toEqual({ t: 'peers', peers: [{ peerId: 'peer-a' }] });

    // A late watcher's connect-time snapshot reflects current occupancy.
    const c = await connect('room-1');
    expect(await c.next()).toEqual({ t: 'peers', peers: [{ peerId: 'peer-a' }] });

    b.send({ t: 'join', peerId: 'peer-b' });
    for (const peer of [a, b, c]) {
      expect(memberIds(await peer.next())).toEqual(['peer-a', 'peer-b']);
    }

    a.send({ t: 'relay', to: 'peer-b', channel: 'sdp', data: { sdp: 'offer' } });
    expect(await b.next()).toEqual({
      t: 'relay',
      from: 'peer-a',
      channel: 'sdp',
      data: { sdp: 'offer' },
    });
  });

  it('carries presence data on join and re-broadcasts data-only updates', async () => {
    const a = await connect('room-2');
    expect(await a.next()).toEqual({ t: 'peers', peers: [] });

    // Join with presence data — echoed back in the snapshot.
    a.send({ t: 'join', peerId: 'peer-a', data: { muted: false } });
    expect(await a.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a', data: { muted: false } }],
    });

    const b = await connect('room-2');
    expect(await b.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a', data: { muted: false } }],
    });

    // Same members, only data changes (mute toggle) → both sockets re-notified.
    a.send({ t: 'presence', data: { muted: true } });
    for (const peer of [a, b]) {
      expect(await peer.next()).toEqual({
        t: 'peers',
        peers: [{ peerId: 'peer-a', data: { muted: true } }],
      });
    }
  });

  it('rejects presence before join', async () => {
    const a = await connect('room-3');
    expect(await a.next()).toEqual({ t: 'peers', peers: [] });
    a.send({ t: 'presence', data: { muted: true } });
    expect(await a.next()).toEqual({
      t: 'error',
      message: 'join before setting presence',
    });
  });
});
