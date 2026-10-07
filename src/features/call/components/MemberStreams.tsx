import { captureOutline } from '../../experimental/capture-template';
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

  const memberMicOn = (memberId: string) =>
    p2p.memberPresence().find((member) => member.memberId === memberId)?.data
      ?.micOn === true;

  const memberScreenShare = (memberId: string) =>
    p2p.memberPresence().find((member) => member.memberId === memberId)?.data
      ?.screenShare === true;

  const capturingLocal = () =>
    props.media.faceMaskCapturing?.() && !props.media.faceMaskCaptureTrack();
  const capturingRemote = (stream: MediaStream) =>
    props.media.faceMaskCapturing?.() &&
    stream
      .getVideoTracks()
      .some((track) => track === props.media.faceMaskCaptureTrack());
  const outline = (aspect: number, active: boolean, mirrored = false) => (
    <Show when={active && props.media.faceMaskOutline()}>
      <svg
        class={styles.captureOutline}
        style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
        viewBox={`0 0 ${aspect} 1`}
        preserveAspectRatio='xMidYMid meet'
        aria-hidden='true'
      >
        <polygon points={captureOutline(aspect)} />
      </svg>
    </Show>
  );

  return (
    <div
      classList={{
        [styles.roomMembers!]: true,
        [styles.direct!]: p2p.memberCount() <= 2,
        [styles.group!]: p2p.memberCount() > 2,
      }}
    >
      <Show when={p2p.localStream()}>
        {(_) => (
          <ParticipantMedia
            stream={p2p.localStream()!}
            variant='self-preview'
            videoEnabled={props.media.cameraOn() || props.media.screenSharing()}
            audioEnabled={props.media.micOn()}
            screenShare={props.media.screenSharing()}
            previewUncropped={capturingLocal()}
            overlay={(aspect) => outline(aspect, !!capturingLocal(), true)}
          >
            <Show when={props.media.faceMaskCapturing?.()}>
              <div class={styles.captureOverlay}>
                <span role='status'>
                  {props.media.faceMaskCaptureReady()
                    ? props.media.faceMaskOutline()
                      ? 'Position image, then capture'
                      : 'Adjust face, then capture'
                    : 'Preparing capture…'}
                </span>
                <div>
                  <button
                    type='button'
                    disabled={!props.media.faceMaskCaptureReady()}
                    onClick={props.media.captureFaceMask}
                  >
                    Capture
                  </button>
                  <Show when={props.media.faceMaskOutline()}>
                    <button type='button' onClick={props.media.detectFaceMask}>
                      Detect face
                    </button>
                  </Show>
                  <span role='group' aria-label='Capture source'>
                    <button
                      type='button'
                      aria-pressed={!props.media.faceMaskCaptureTrack()}
                      onClick={() => props.media.setFaceMaskSource(false)}
                    >
                      Local
                    </button>
                    <button
                      type='button'
                      aria-pressed={!!props.media.faceMaskCaptureTrack()}
                      disabled={!props.media.remoteCaptureAvailable()}
                      onClick={() => props.media.setFaceMaskSource(true)}
                    >
                      Remote
                    </button>
                  </span>
                  <button
                    type='button'
                    onClick={props.media.cancelFaceMaskCapture}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Show>
            <Show when={props.media.faceMaskError?.()}>
              <div class={styles.captureOverlay} role='alert'>
                {props.media.faceMaskError()}
              </div>
            </Show>
          </ParticipantMedia>
        )}
      </Show>
      <For each={p2p.remoteMemberStreams()}>
        {(stream) => (
          <ParticipantMedia
            stream={stream.stream}
            videoEnabled={memberCameraOn(stream.memberId)}
            audioEnabled={memberMicOn(stream.memberId)}
            screenShare={memberScreenShare(stream.memberId)}
            remoteAudioMuted={props.remoteAudioMuted}
            previewUncropped={!!capturingRemote(stream.stream)}
            overlay={(aspect) =>
              outline(aspect, !!capturingRemote(stream.stream))
            }
          />
        )}
      </For>
    </div>
  );
}
