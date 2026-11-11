import {
  env,
  evictDurableObject,
  runDurableObjectAlarm,
  runInDurableObject,
} from 'cloudflare:test';
import { describe, expect, it } from 'vite-plus/test';
import type { ServerMessage } from '../../../shared/signaling/protocol';

/** Open a hibernatable WS straight to the DO (bypasses the Worker auth layer). */
async function connect(
  roomId: string,
  ownerUid = 'peer-a',
  includeAcknowledgments = false,
) {
  const stub = env.SIGNALING_ROOM.getByName(roomId);
  const res = await stub.fetch(
    new Request(`https://do/rooms/${roomId}/signal`, {
      headers: { Upgrade: 'websocket', 'X-Hangvidu-Signaling-Uid': ownerUid },
    }),
  );
  const ws = res.webSocket as WebSocket;
  ws.accept();

  const queue: ServerMessage[] = [];
  const waiters: ((m: ServerMessage) => void)[] = [];
  ws.addEventListener('message', (e: MessageEvent) => {
    const msg = JSON.parse(e.data as string) as ServerMessage;
    if (msg.t === 'joined' && !includeAcknowledgments) return;
    const w = waiters.shift();
    if (w) w(msg);
    else queue.push(msg);
  });

  return {
    send: (m: unknown) => ws.send(JSON.stringify(m)),
    close: () => ws.close(),
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

async function nextMembers(
  peer: Awaited<ReturnType<typeof connect>>,
  expected: string[],
): Promise<string[]> {
  for (let i = 0; i < 3; i++) {
    const ids = memberIds(await peer.next());
    if (ids.join() === expected.join()) return ids;
  }
  return [];
}

describe('SignalingRoom', () => {
  it('rejects another owner claiming an occupied peer ID', async () => {
    const victim = await connect('takeover', 'victim');
    await victim.next();
    victim.send({ t: 'join', peerId: 'victim' });
    await victim.next();
    const attacker = await connect('takeover', 'attacker');
    await attacker.next();
    attacker.send({ t: 'join', peerId: 'victim' });
    expect(await attacker.next()).toEqual({
      t: 'error',
      message: 'unauthorized peerId',
    });
    attacker.send({ t: 'relay', to: 'victim', channel: 'ice', data: {} });
    expect(await attacker.next()).toEqual({
      t: 'error',
      message: 'join before relaying',
    });
    victim.send({ t: 'presence', data: { alive: true } });
    expect(await victim.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'victim', data: { alive: true } }],
    });
  });

  it('rejects a vacant victim ID before allowing its owner to join', async () => {
    const attacker = await connect('squatting', 'attacker');
    await attacker.next();
    attacker.send({ t: 'join', peerId: 'victim' });
    expect(await attacker.next()).toEqual({
      t: 'error',
      message: 'unauthorized peerId',
    });
    const victim = await connect('squatting', 'victim');
    expect(await victim.next()).toEqual({ t: 'peers', peers: [] });
    victim.send({ t: 'join', peerId: 'victim' });
    expect(memberIds(await victim.next())).toEqual(['victim']);
  });

  it('keeps two same-owner tabs separate and authorizes IDs after leave', async () => {
    const first = 'owner:11111111-1111-4111-8111-111111111111';
    const second = 'owner:22222222-2222-4222-8222-222222222222';
    const a = await connect('tabs', 'owner');
    await a.next();
    a.send({ t: 'join', peerId: first });
    await a.next();
    a.send({ t: 'presence', data: { muted: true } });
    await a.next();
    const b = await connect('tabs', 'owner');
    await b.next();
    b.send({ t: 'join', peerId: second });
    expect(memberIds(await b.next())).toEqual([first, second]);
    await a.next();
    a.send({ t: 'leave' });
    expect(memberIds(await a.next())).toEqual([second]);
    a.send({ t: 'join', peerId: first });
    expect(memberIds(await a.next())).toEqual([first, second]);
    a.send({ t: 'join', peerId: 'victim' });
    expect(await a.next()).toEqual({
      t: 'error',
      message: 'unauthorized peerId',
    });
  });

  it('requires a trusted owner on upgrade', async () => {
    const response = await env.SIGNALING_ROOM.getByName('missing-owner').fetch(
      new Request('https://do/rooms/missing-owner/signal', {
        headers: { Upgrade: 'websocket' },
      }),
    );
    expect(response.status).toBe(401);
  });

  it('retires silent ownerless sockets on wake before routing or admission', async () => {
    const legacy = await connect('upgrade', 'victim');
    await legacy.next();
    legacy.send({ t: 'join', peerId: 'victim' });
    await legacy.next();
    const sender = await connect('upgrade', 'sender');
    await sender.next();
    sender.send({ t: 'join', peerId: 'sender' });
    await sender.next();
    await legacy.next();
    await runInDurableObject(
      env.SIGNALING_ROOM.getByName('upgrade'),
      (_instance, state) => {
        const old = state
          .getWebSockets()
          .find((ws) => ws.deserializeAttachment()?.peerId === 'victim')!;
        // Model an attachment written by the pre-fix release.
        old.serializeAttachment({ peerId: 'victim', joinedAt: 1 });
      },
    );
    await evictDurableObject(env.SIGNALING_ROOM.getByName('upgrade'));
    const victim = await connect('upgrade', 'victim');
    expect(await victim.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'sender' }],
    });
    expect(await sender.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'sender' }],
    });
    victim.send({ t: 'join', peerId: 'victim' });
    expect(memberIds(await victim.next())).toEqual(['sender', 'victim']);
    await sender.next();
    sender.send({ t: 'relay', to: 'victim', channel: 'sdp', data: 'private' });
    expect(await victim.next()).toEqual({
      t: 'relay',
      from: 'sender',
      channel: 'sdp',
      data: 'private',
    });
  });

  it('acknowledges this socket and request only after broadcasting current presence', async () => {
    const peer = await connect('admission', 'owner', true);
    await peer.next();
    peer.send({ t: 'join', peerId: 'owner', requestId: 'attempt-1' });
    expect(await peer.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'owner' }],
    });
    expect(await peer.next()).toEqual({
      t: 'joined',
      peerId: 'owner',
      requestId: 'attempt-1',
    });
    peer.send({ t: 'join', peerId: 'victim', requestId: 'attempt-2' });
    expect(await peer.next()).toEqual({
      t: 'error',
      message: 'unauthorized peerId',
      requestId: 'attempt-2',
    });
  });

  it('tracks presence and relays signaling between peers', async () => {
    const a = await connect('room-1');
    expect(await a.next()).toEqual({ t: 'peers', peers: [] });
    const b = await connect('room-1', 'peer-b');
    expect(await b.next()).toEqual({ t: 'peers', peers: [] });

    a.send({ t: 'join', peerId: 'peer-a' });
    // Joins broadcast to every socket, watchers included.
    expect(await a.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }],
    });
    expect(await b.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }],
    });

    // A late watcher's connect-time snapshot reflects current occupancy.
    const c = await connect('room-1');
    expect(await c.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }],
    });

    b.send({ t: 'join', peerId: 'peer-b' });
    for (const peer of [a, b, c]) {
      expect(memberIds(await peer.next())).toEqual(['peer-a', 'peer-b']);
    }

    a.send({
      t: 'relay',
      to: 'peer-b',
      channel: 'sdp',
      data: { sdp: 'offer' },
    });
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

    const b = await connect('room-2', 'peer-b');
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

  it('tags an explicit leave as departed on the snapshot where the peer drops out', async () => {
    const a = await connect('room-departed');
    expect(await a.next()).toEqual({ t: 'peers', peers: [] });
    a.send({ t: 'join', peerId: 'peer-a' });
    expect(await a.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }],
    });

    const b = await connect('room-departed', 'peer-b');
    expect(await b.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }],
    });
    b.send({ t: 'join', peerId: 'peer-b' });
    await nextMembers(a, ['peer-a', 'peer-b']);
    await nextMembers(b, ['peer-a', 'peer-b']);

    // Explicit leave → peer gone from `peers` AND listed in `departed`, atomically.
    b.send({ t: 'leave' });
    expect(await a.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }],
      departed: ['peer-b'],
    });
  });

  it('replays a recent explicit leave to a socket that reconnects after missing it', async () => {
    const a = await connect('room-missed-leave');
    await a.next();
    a.send({ t: 'join', peerId: 'peer-a' });
    await nextMembers(a, ['peer-a']);
    const b = await connect('room-missed-leave', 'peer-b');
    await b.next();
    b.send({ t: 'join', peerId: 'peer-b' });
    await nextMembers(b, ['peer-a', 'peer-b']);

    // peer-a's socket died unnoticed; it reconnects only after peer-b left.
    b.send({ t: 'leave' });
    expect(await b.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }],
      departed: ['peer-b'],
    });
    a.close();
    expect(await b.next()).toEqual({ t: 'peers', peers: [] });
    await evictDurableObject(env.SIGNALING_ROOM.getByName('room-missed-leave'));
    const reconnected = await connect('room-missed-leave');
    expect(await reconnected.next()).toEqual({
      t: 'peers',
      peers: [],
      departed: ['peer-b'],
    });

    // Rejoining clears the replay.
    b.send({ t: 'join', peerId: 'peer-b' });
    await nextMembers(b, ['peer-b']);
    await evictDurableObject(env.SIGNALING_ROOM.getByName('room-missed-leave'));
    const later = await connect('room-missed-leave');
    expect(await later.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-b' }],
    });
  });

  it.each(['connect', 'leave', 'alarm'])(
    'prunes expired durable departures on %s',
    async (trigger) => {
      const roomId = `departure-expiry-${trigger}`;
      const stub = env.SIGNALING_ROOM.getByName(roomId);
      const b = await connect(roomId, 'peer-b');
      await b.next();
      b.send({ t: 'join', peerId: 'peer-b' });
      await b.next();
      // Model an expired departure while the current peer remains joined.
      await runInDurableObject(stub, async (_instance, state) => {
        await state.storage.put('recent-departures', [
          ['old-peer', Date.now() - 30_000],
        ]);
        await state.storage.setAlarm(Date.now() + 30_000);
      });
      if (trigger === 'leave') {
        b.send({ t: 'leave' });
        expect(await b.next()).toEqual({
          t: 'peers',
          peers: [],
          departed: ['peer-b'],
        });
      } else if (trigger === 'alarm') {
        await runDurableObjectAlarm(stub);
      } else {
        const watcher = await connect(roomId);
        expect(await watcher.next()).toEqual({
          t: 'peers',
          peers: [{ peerId: 'peer-b' }],
        });
      }
      await runInDurableObject(stub, async (_instance, state) => {
        const stored =
          await state.storage.get<[string, number][]>('recent-departures');
        expect(stored?.map(([id]) => id) ?? []).toEqual(
          trigger === 'leave' ? ['peer-b'] : [],
        );
        expect(await state.storage.getAlarm()).toEqual(
          trigger === 'leave' ? expect.any(Number) : null,
        );
      });
    },
  );

  it('bounds durable replay history during join/leave churn without new sockets', async () => {
    const roomId = 'departure-churn';
    const peer = await connect(roomId, 'owner');
    await peer.next();
    const ids: string[] = [];
    for (let i = 0; i < 257; i++) {
      const peerId = `owner:${crypto.randomUUID()}`;
      ids.push(peerId);
      peer.send({ t: 'join', peerId });
      await peer.next();
      peer.send({ t: 'leave' });
      await peer.next();
    }
    await evictDurableObject(env.SIGNALING_ROOM.getByName(roomId));
    const watcher = await connect(roomId);
    expect(await watcher.next()).toEqual({
      t: 'peers',
      peers: [],
      departed: ids.slice(1),
    });
  });

  it('does not tag a silent socket drop as departed', async () => {
    const a = await connect('room-dropped');
    expect(await a.next()).toEqual({ t: 'peers', peers: [] });
    a.send({ t: 'join', peerId: 'peer-a' });
    expect(await a.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }],
    });

    const b = await connect('room-dropped', 'peer-b');
    expect(await b.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }],
    });
    b.send({ t: 'join', peerId: 'peer-b' });
    await nextMembers(a, ['peer-a', 'peer-b']);

    // Socket close (no `leave`) → member gone, but NO `departed` (strict equality
    // fails if the field is present), so the client treats it as a drop.
    b.close();
    expect(await a.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }],
    });
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

  it('routes relays to the newest socket when a peer rejoins after reload', async () => {
    const oldB = await connect('room-4', 'peer-b');
    expect(await oldB.next()).toEqual({ t: 'peers', peers: [] });
    oldB.send({ t: 'join', peerId: 'peer-b' });
    expect(await oldB.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-b' }],
    });

    const newB = await connect('room-4', 'peer-b');
    expect(await newB.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-b' }],
    });
    newB.send({ t: 'join', peerId: 'peer-b' });
    expect(await newB.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-b' }],
    });

    const a = await connect('room-4');
    expect(await a.next()).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-b' }],
    });
    a.send({ t: 'join', peerId: 'peer-a' });
    expect(memberIds(await a.next())).toEqual(['peer-a', 'peer-b']);
    expect(await nextMembers(newB, ['peer-a', 'peer-b'])).toEqual([
      'peer-a',
      'peer-b',
    ]);

    a.send({
      t: 'relay',
      to: 'peer-b',
      channel: 'sdp',
      data: { sdp: 'offer-for-new-page' },
    });

    expect(await newB.next()).toEqual({
      t: 'relay',
      from: 'peer-a',
      channel: 'sdp',
      data: { sdp: 'offer-for-new-page' },
    });
  });

  // Three members, so neither socket order nor its reverse matches join order.
  async function joinAll(roomId: string, peerIds: string[]) {
    for (const peerId of peerIds) {
      const peer = await connect(roomId, peerId);
      await peer.next();
      peer.send({ t: 'join', peerId });
      await peer.next();
    }
  }

  async function snapshot(roomId: string) {
    return (await connect(roomId, 'watcher')).next();
  }

  it('lists presence in join order, not socket order', async () => {
    const sockets = await Promise.all(
      ['peer-a', 'peer-b', 'peer-c'].map(async (peerId) => {
        const peer = await connect('join-order', peerId);
        await peer.next();
        return { peer, peerId };
      }),
    );
    const joined: string[] = [];
    for (const index of [1, 0, 2]) {
      const { peer, peerId } = sockets[index];
      joined.push(peerId);
      peer.send({ t: 'join', peerId });
      await nextMembers(peer, [...joined].sort());
    }
    expect(await snapshot('join-order')).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-b' }, { peerId: 'peer-a' }, { peerId: 'peer-c' }],
    });
  });

  it('keeps a reconnecting member ahead of later joiners', async () => {
    await joinAll('rejoin-order', ['peer-a', 'peer-b', 'peer-c']);
    const newA = await connect('rejoin-order', 'peer-a');
    await newA.next();
    newA.send({ t: 'join', peerId: 'peer-a' });
    await newA.next();
    expect(await snapshot('rejoin-order')).toEqual({
      t: 'peers',
      peers: [{ peerId: 'peer-a' }, { peerId: 'peer-b' }, { peerId: 'peer-c' }],
    });
  });
});
