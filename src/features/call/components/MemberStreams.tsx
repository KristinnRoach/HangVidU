import { captureOutline } from '../../experimental/capture-template';
import { For, Show } from 'solid-js';
import {
  Camera,
  Check,
  LoaderCircle,
  RotateCcw,
  ScanFace,
  SwitchCamera,
  X,
} from 'lucide-solid';
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
  const preview = () => props.media.faceMaskPreview?.();
  const controls = () => (
    <div
      class={styles.captureOverlay}
      classList={{
        [styles.remoteCapture!]:
          !!props.media.faceMaskCaptureTrack() && !preview(),
      }}
    >
      <Show
        when={!preview()}
        fallback={
          <>
            <button
              type='button'
              class={styles.primary}
              title='Apply mask'
              aria-label='Apply mask'
              onClick={props.media.applyFaceMask}
            >
              <Check />
            </button>
            <button
              type='button'
              title='Retake'
              aria-label='Retake'
              onClick={props.media.retakeFaceMask}
            >
              <RotateCcw />
            </button>
          </>
        }
      >
        <Show when={!props.media.faceMaskCaptureReady()}>
          <span role='status' aria-label='Looking for a face'>
            <LoaderCircle class={styles.spinner} />
          </span>
        </Show>
        <Show when={props.media.faceMaskOutline()}>
          <span class={styles.hint}>Align face</span>
        </Show>
        <button
          type='button'
          class={styles.primary}
          disabled={!props.media.faceMaskCaptureReady()}
          title='Capture face'
          aria-label='Capture face'
          onClick={props.media.captureFaceMask}
        >
          <Camera />
        </button>
        <Show when={props.media.remoteCaptureAvailable()}>
          <button
            type='button'
            title={
              props.media.faceMaskCaptureTrack()
                ? 'Use my camera'
                : 'Use other camera'
            }
            aria-label={
              props.media.faceMaskCaptureTrack()
                ? 'Use my camera'
                : 'Use other camera'
            }
            onClick={() =>
              props.media.setFaceMaskSource(!props.media.faceMaskCaptureTrack())
            }
          >
            <SwitchCamera />
          </button>
        </Show>
        <button
          type='button'
          title='Manual alignment'
          aria-label='Manual alignment'
          aria-pressed={props.media.faceMaskOutline()}
          onClick={props.media.toggleFaceMaskOutline}
        >
          <ScanFace />
        </button>
      </Show>
      <button
        type='button'
        title='Cancel'
        aria-label='Cancel mask'
        onClick={props.media.cancelFaceMaskCapture}
      >
        <X />
      </button>
    </div>
  );
  const overlay = (aspect: number, active: boolean, mirrored = false) => (
    <Show when={active}>
      <svg
        classList={{
          [styles.captureOutline!]: true,
          [styles.ready!]: props.media.faceMaskCaptureReady(),
        }}
        style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
        viewBox={`0 0 ${aspect} 1`}
        preserveAspectRatio='xMidYMid meet'
        aria-hidden='true'
      >
        <Show
          when={props.media.faceMaskOutline()}
          fallback={<ellipse cx={aspect / 2} cy='0.5' rx='0.23' ry='0.38' />}
        >
          <polygon points={captureOutline(aspect)} />
        </Show>
      </svg>
      {controls()}
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
            stream={preview() ?? p2p.localStream()!}
            variant='self-preview'
            videoEnabled={props.media.cameraOn() || props.media.screenSharing()}
            audioEnabled={props.media.micOn()}
            screenShare={props.media.screenSharing()}
            previewUncropped={capturingLocal() || !!preview()}
            overlay={(aspect) =>
              overlay(aspect, !!capturingLocal() && !preview(), true)
            }
          >
            <Show when={preview()}>{controls()}</Show>
            <Show when={props.media.faceMaskError?.()}>
              <div class={styles.captureOverlay} role='alert'>
                <span title={props.media.faceMaskError()}>
                  Mask unavailable
                </span>
                <button
                  type='button'
                  title='Retry'
                  aria-label='Retry mask'
                  disabled={props.media.cameraPending()}
                  onClick={() => void props.media.toggleFaceMask()}
                >
                  <RotateCcw />
                </button>
                <button
                  type='button'
                  title='Dismiss'
                  aria-label='Dismiss mask error'
                  onClick={props.media.dismissFaceMaskError}
                >
                  <X />
                </button>
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
              overlay(aspect, !!capturingRemote(stream.stream) && !preview())
            }
          />
        )}
      </For>
    </div>
  );
}
