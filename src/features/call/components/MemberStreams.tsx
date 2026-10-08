import { captureOutline } from '../../experimental/capture-template';
import { For, Show } from 'solid-js';
import {
  Camera,
  Check,
  Frame,
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
            stream={props.media.faceMaskPreview?.() ?? p2p.localStream()!}
            variant='self-preview'
            videoEnabled={props.media.cameraOn() || props.media.screenSharing()}
            audioEnabled={props.media.micOn()}
            screenShare={props.media.screenSharing()}
            previewUncropped={!!props.media.faceMaskCapturing?.()}
            overlay={(aspect) => (
              <FaceMaskOutline media={props.media} aspect={aspect} mirrored />
            )}
          >
            <FaceMaskControls media={props.media} />
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
            previewUncropped={capturingFrom(props.media, stream.stream)}
            overlay={(aspect) => (
              <FaceMaskOutline
                media={props.media}
                aspect={aspect}
                stream={stream.stream}
              />
            )}
          />
        )}
      </For>
    </div>
  );
}

// Face mask capture UI (experimental). Kept here until the feature settles.

// Whether the mask is capturing from `stream`; omit `stream` for the local camera.
function capturingFrom(media: CallMedia, stream?: MediaStream) {
  if (!media.faceMaskCapturing?.()) return false;
  const track = media.faceMaskCaptureTrack();
  return stream ? stream.getVideoTracks().some((t) => t === track) : !track;
}

function FaceMaskOutline(props: {
  media: CallMedia;
  aspect: number;
  stream?: MediaStream;
  mirrored?: boolean;
}) {
  return (
    <Show
      when={
        capturingFrom(props.media, props.stream) &&
        !props.media.faceMaskPreview?.() &&
        props.media.faceMaskOutline()
      }
    >
      <svg
        classList={{
          [styles.captureOutline!]: true,
          [styles.ready!]: props.media.faceMaskCaptureReady(),
        }}
        style={props.mirrored ? { transform: 'scaleX(-1)' } : undefined}
        viewBox={`0 0 ${props.aspect} 1`}
        preserveAspectRatio='xMidYMid meet'
        aria-hidden='true'
      >
        <polygon points={captureOutline(props.aspect)} />
      </svg>
    </Show>
  );
}

function FaceMaskControls(props: { media: CallMedia }) {
  const preview = () => props.media.faceMaskPreview?.();
  const primaryLabel = () =>
    preview()
      ? 'Apply mask'
      : props.media.faceMaskOutline()
        ? 'Capture face'
        : 'Looking for a face';
  return (
    <>
      <Show when={props.media.faceMaskCapturing?.()}>
        <div class={styles.captureOverlay}>
          <Show when={props.media.faceMaskOutline() && !preview()}>
            <span class={styles.hint}>Align face</span>
          </Show>
          <button
            type='button'
            class={styles.primary}
            disabled={
              !preview() &&
              (!props.media.faceMaskOutline() ||
                !props.media.faceMaskCaptureReady())
            }
            title={primaryLabel()}
            aria-label={primaryLabel()}
            onClick={() =>
              preview()
                ? props.media.applyFaceMask()
                : props.media.captureFaceMask()
            }
          >
            {preview() ? (
              <Check />
            ) : props.media.faceMaskOutline() ? (
              <Camera />
            ) : (
              <ScanFace />
            )}
          </button>
          <button
            type='button'
            title='Retake'
            aria-label='Retake'
            disabled={!preview()}
            onClick={props.media.retakeFaceMask}
          >
            <RotateCcw />
          </button>
          <button
            type='button'
            title='Manual alignment'
            aria-label='Manual alignment'
            aria-pressed={props.media.faceMaskOutline()}
            onClick={props.media.toggleFaceMaskOutline}
          >
            <Frame />
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
                props.media.setFaceMaskSource(
                  !props.media.faceMaskCaptureTrack(),
                )
              }
            >
              <SwitchCamera />
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
      </Show>
      <Show when={props.media.faceMaskError?.()}>
        <div class={styles.captureOverlay} role='alert'>
          <span title={props.media.faceMaskError()}>Mask unavailable</span>
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
    </>
  );
}
