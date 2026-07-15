import { For, Show } from 'solid-js';
import { useP2PContext } from '@shared/p2p-context.js';
import { ParticipantMedia } from './ParticipantMedia';
import styles from './MemberStreams.module.css';

type MemberStreamsProps = {
  remoteAudioMuted: boolean;
};

export function MemberStreams(props: MemberStreamsProps) {
  const p2p = useP2PContext();
  const remoteCameraEnabled = (memberId: string) =>
    p2p.memberPresence().find((member) => member.memberId === memberId)?.data
      ?.cameraOn !== false;

  return (
    <div
      classList={{
        [styles.roomMembers]: true,
        [styles.direct]: p2p.memberCount() <= 2,
        [styles.group]: p2p.memberCount() > 2,
      }}
    >
      <Show when={p2p.localStream()}>
        {(_) => (
          <ParticipantMedia
            stream={p2p.localStream()!}
            variant='self-preview'
          />
        )}
      </Show>
      <For each={p2p.remoteMemberStreams()}>
        {(remote) => (
          <ParticipantMedia
            stream={remote.stream}
            videoEnabled={remoteCameraEnabled(remote.memberId)}
            videoExpected={
              p2p
                .memberPresence()
                .find((member) => member.memberId === remote.memberId)?.data
                ?.cameraOn === true
            }
            remoteAudioMuted={props.remoteAudioMuted}
          />
        )}
      </For>
    </div>
  );
}
