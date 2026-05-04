import { createSignal, createEffect, onCleanup, For, Show } from 'solid-js';
import LocalStream from './LocalStream';
import RemoteStream from './RemoteStream';
import type { P2PRoom, RemoteMemberStream } from '@kidlib/p2p';

type Props = {
  room: P2PRoom;
};

export default function RoomMembers(props: Props) {
  if (!props.room) {
    console.error('VideoGrid rendered without a room');
    return null;
  }

  const [localStream, setLocalStream] = createSignal<MediaStream>();
  const [remoteStreams, setRemoteStreams] = createSignal<RemoteMemberStream[]>(
    [],
  );

  createEffect(() => {
    const room = props.room;

    setLocalStream(room.localStream ?? undefined);
    setRemoteStreams(room.remoteMemberStreams);

    const updateRemoteStreams = () =>
      setRemoteStreams(room.remoteMemberStreams);

    const cleanups = [
      room.on('localStream', ({ stream }) => setLocalStream(stream)),
      room.on('memberStream', updateRemoteStreams),
      room.on('memberLeft', updateRemoteStreams),
      room.on('membersChanged', updateRemoteStreams),
    ];

    onCleanup(() => cleanups.forEach((cleanup) => cleanup()));
  });

  return (
    <div class='video-grid'>
      <Show when={localStream()}>
        {(stream) => <LocalStream stream={stream()} />}
      </Show>
      <For each={remoteStreams()}>
        {(remote) => (
          <RemoteStream memberId={remote.memberId} stream={remote.stream} />
        )}
      </For>
    </div>
  );
}
