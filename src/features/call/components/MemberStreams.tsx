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
            previewUncropped={props.media.faceMaskCapturing?.()}
            overlay={(aspect) => (
              <Show
                when={
                  props.media.faceMaskCapturing?.() &&
                  props.media.faceMaskOutline()
                }
              >
                <svg
                  class={styles.captureOutline}
                  viewBox={`0 0 ${aspect} 1`}
                  preserveAspectRatio='xMidYMid meet'
                  aria-hidden='true'
                >
                  <polygon points={captureOutline(aspect)} />
                </svg>
              </Show>
            )}
          >
            <Show when={props.media.faceMaskCapturing?.()}>
              <div class={styles.captureOverlay}>
                <span role='status'>
                  {props.media.faceMaskCaptureReady()
                    ? props.media.faceMaskOutline()
                      ? 'Position your image, then capture'
                      : 'Adjust your face, then capture'
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
                  <button
                    type='button'
                    disabled={!props.media.faceSwapAvailable()}
                    onClick={props.media.swapFaceMask}
                  >
                    Face Swap
                  </button>
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
          />
        )}
      </For>
    </div>
  );
}
