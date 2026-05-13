import { For, Show } from 'solid-js';
import VideoStream from '../../../components/media/VideoStream';
import { useP2P } from '../../../shared/p2p-context.js';

export default function MemberStreams() {
  const p2p = useP2P();

  return (
    <div
      class={`room-members ${p2p.memberCount() > 2 ? 'group' : 'direct'}`}
    >
      <Show when={p2p.localStream()}>
        {(stream) => (
          <section class='local-stream-container'>
            <VideoStream class='local-stream' stream={stream()} />
          </section>
        )}
      </Show>
      <For each={p2p.remoteMemberStreams()}>
        {(remote) => (
          <section class='remote-stream-container'>
            <VideoStream class='remote-stream' stream={remote.stream} />
          </section>
        )}
      </For>
    </div>
  );
}
