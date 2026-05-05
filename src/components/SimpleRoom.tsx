import { For, Show, createEffect, createSignal, onCleanup } from 'solid-js';
import { useP2PRoom } from '@kidlib/p2p/solid';
import { createFirebaseRoomSignaling } from '../features/call/signaling/firebase-room-signaling';

const MAX_MEMBERS = 6;

export default function SimpleRoom() {
  const p2p = useP2PRoom();
  const [roomId, setRoomId] = createSignal('demo-room');

  const isJoining = () =>
    p2p.state() === 'creating' || p2p.state() === 'joining';
  const isJoined = () => p2p.state() === 'joined';

  async function joinRoom() {
    const id = roomId().trim();
    if (!id) return;

    await p2p.join({
      roomId: id,
      peerId: crypto.randomUUID(),
      createSignaling: createFirebaseRoomSignaling,
      getLocalStream: () =>
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }),
      memberCapacity: MAX_MEMBERS,
    });
  }

  onCleanup(p2p.close);

  return (
    <main class='room'>
      <form
        class='lobby-form'
        onSubmit={(event) => {
          event.preventDefault();
          void joinRoom();
        }}
      >
        <input
          class='room-id-input'
          value={roomId()}
          onInput={(event) => setRoomId(event.currentTarget.value)}
          placeholder='Room ID'
          aria-label='Room ID'
          disabled={isJoining() || isJoined()}
        />
        <button
          class='primary-button'
          type='submit'
          disabled={isJoining() || isJoined()}
        >
          {isJoining() ? 'Joining...' : 'Join room'}
        </button>
        <button type='button' onClick={p2p.close} disabled={!isJoined()}>
          Leave
        </button>
      </form>

      <div class='room-status'>
        <p>Status: {p2p.state()}</p>
        <p>
          Members: {p2p.memberCount()} / {p2p.memberCapacity() ?? MAX_MEMBERS}
        </p>
        <Show when={p2p.errorKind()}>
          {(kind) => <p>Room error: {kind()}</p>}
        </Show>
      </div>

      <div class='video-grid'>
        <Show when={p2p.localStream()}>
          {(stream) => (
            <section class='peer-tile'>
              <h2>Local</h2>
              <Video stream={stream()} muted />
            </section>
          )}
        </Show>

        <For each={p2p.remoteMemberStreams()}>
          {(remote) => (
            <section class='peer-tile'>
              <h2>Remote {remote.memberId.slice(0, 8)}</h2>
              <Video stream={remote.stream} />
            </section>
          )}
        </For>
      </div>
    </main>
  );
}

function Video(props: { stream: MediaStream; muted?: boolean }) {
  let video!: HTMLVideoElement;

  createEffect(() => {
    video.srcObject = props.stream;
    video.play().catch(() => {});
  });

  onCleanup(() => {
    video.srcObject = null;
  });

  return (
    <video
      class='video-stream'
      ref={video}
      autoplay
      muted={props.muted}
      playsinline
    />
  );
}
