import { For, Show } from 'solid-js';
import LocalStream from './LocalStream';
import RemoteStream from './RemoteStream';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';

type Props = {
  p2p: SolidP2PRoom;
};

export default function RoomMembers(props: Props) {
  return (
    <div class='video-grid'>
      <Show when={props.p2p.localStream()}>
        {(stream) => <LocalStream stream={stream()} />}
      </Show>
      <For each={props.p2p.remoteMemberStreams()}>
        {(remote) => (
          <RemoteStream memberId={remote.memberId} stream={remote.stream} />
        )}
      </For>
    </div>
  );
}
