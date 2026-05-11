import { For, Show } from 'solid-js';
import VideoStream from '../media/VideoStream';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';

type Props = {
  p2p: SolidP2PRoom;
};

export default function RoomMembers(props: Props) {
  return (
    <div class='video-grid'>
      <Show when={props.p2p.localStream()}>
        {(stream) => (
          <section class='local-stream-container'>
            <VideoStream class='local-stream' stream={stream()} />
          </section>
        )}
      </Show>
      <For each={props.p2p.remoteMemberStreams()}>
        {(remote) => (
          <section class='remote-stream-container'>
            <VideoStream class='remote-stream' stream={remote.stream} />
          </section>
        )}
      </For>
    </div>
  );
}
