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

describe('SignalingRoom', () => {
  it('tracks presence and relays signaling between peers', async () => {
    const a = await connect('room-1');
    const b = await connect('room-1');

    a.send({ t: 'join', peerId: 'peer-a' });
    expect(await a.next()).toEqual({ t: 'peers', peers: ['peer-a'] });

    b.send({ t: 'join', peerId: 'peer-b' });
    for (const peer of [a, b]) {
      const msg = await peer.next();
      expect(msg.t).toBe('peers');
      expect(msg.t === 'peers' && [...msg.peers].sort()).toEqual([
        'peer-a',
        'peer-b',
      ]);
    }

    a.send({ t: 'relay', to: 'peer-b', channel: 'sdp', data: { sdp: 'offer' } });
    expect(await b.next()).toEqual({
      t: 'relay',
      from: 'peer-a',
      channel: 'sdp',
      data: { sdp: 'offer' },
    });
  });
});
