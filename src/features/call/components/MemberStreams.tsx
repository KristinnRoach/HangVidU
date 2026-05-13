import { For, Show } from 'solid-js';
import VideoStream from '../../../components/media/VideoStream';
import { useP2PContext } from '../../../shared/p2p-context.js';
import styles from './MemberStreams.module.css';

export default function MemberStreams() {
  const p2p = useP2PContext();

  return (
    <div
      classList={{
        [styles.roomMembers]: true,
        [styles.direct]: p2p.memberCount() <= 2,
        [styles.group]: p2p.memberCount() > 2,
      }}
    >
      <Show when={p2p.localStream()}>
        {(stream) => (
          <section class={styles.localStreamContainer}>
            <VideoStream stream={stream()} />
          </section>
        )}
      </Show>
      <For each={p2p.remoteMemberStreams()}>
        {(remote) => (
          <section class={styles.remoteStreamContainer}>
            <VideoStream stream={remote.stream} />
          </section>
        )}
      </For>
    </div>
  );
}
