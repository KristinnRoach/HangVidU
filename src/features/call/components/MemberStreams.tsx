import { For, Show } from 'solid-js';
import { useP2PContext } from '@shared/p2p-context.js';
import { ParticipantMedia } from './ParticipantMedia';
import type { CallMedia } from '../call-media';
import styles from './MemberStreams.module.css';

type MemberStreamsProps = {
  media: CallMedia;
  remoteAudioMuted: boolean;
};

export function MemberStreams(props: MemberStreamsProps) {
  const p2p = useP2PContext();
  // cameraOn flag published by that member via room member data
  // (undefined until their first publish → treated as camera off).
  const memberCameraOn = (memberId: string) =>
    p2p.memberPresence().find((member) => member.memberId === memberId)?.data
      ?.cameraOn === true;

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
            videoEnabled={props.media.cameraOn() || props.media.screenSharing()}
            audioEnabled={props.media.micOn()}
          />
        )}
      </Show>
      <For each={p2p.remoteMemberStreams()}>
        {(remote) => (
          <ParticipantMedia
            stream={remote.stream}
            videoEnabled={memberCameraOn(remote.memberId)}
            remoteAudioMuted={props.remoteAudioMuted}
          />
        )}
      </For>
    </div>
  );
}
