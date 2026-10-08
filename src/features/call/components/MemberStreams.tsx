import {
  captureOutline,
  captureFeatureContours,
} from '../../experimental/capture-template';
import { For, Show } from 'solid-js';
import { Camera, Check, Frame, RotateCcw, SwitchCamera, X } from 'lucide-solid';
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
              <>
                <FaceMaskOutline media={props.media} aspect={aspect} mirrored />
                <FaceMaskFeedback media={props.media} />
              </>
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
              <>
                <FaceMaskOutline
                  media={props.media}
                  aspect={aspect}
                  stream={stream.stream}
                />
              </>
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
        <For each={captureFeatureContours}>
          {(contour) => (
            <polygon points={captureOutline(props.aspect, contour)} />
          )}
        </For>
      </svg>
    </Show>
  );
}

function FaceMaskControls(props: { media: CallMedia }) {
  const preview = () => props.media.faceMaskPreview?.();
  const statusLabel = () => {
    if (preview()) return 'Ready to apply';
    const status = props.media.faceMaskCaptureStatus?.() ?? 'searching';
    if (status === 'captured') return 'Preparing preview…';
    if (props.media.faceMaskOutline())
      return props.media.faceMaskCaptureReady() ? 'Align face' : 'Preparing…';
    if (typeof status === 'number') return 'Hold still';
    return status === 'preparing' ? 'Preparing…' : 'Looking for a face';
  };
  const captureLabel = () => (preview() ? 'Retake' : 'Capture face');
  return (
    <>
      <Show when={props.media.faceMaskCapturing?.()}>
        <div class={styles.captureOverlay}>
          <span class={styles.hint} role='status'>
            {statusLabel()}
          </span>
          <button
            type='button'
            class={styles.primary}
            disabled={!preview()}
            title='Apply mask'
            aria-label='Apply mask'
            onClick={props.media.applyFaceMask}
          >
            <Check />
          </button>
          <button
            type='button'
            title={captureLabel()}
            aria-label={captureLabel()}
            disabled={
              !preview() &&
              (!props.media.faceMaskOutline() ||
                !props.media.faceMaskCaptureReady())
            }
            onClick={() =>
              preview()
                ? props.media.retakeFaceMask()
                : props.media.captureFaceMask()
            }
          >
            {preview() ? <RotateCcw /> : <Camera />}
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
            disabled={
              (!props.media.mediaFlowing() && !props.media.faceMaskOn()) ||
              props.media.cameraPending() ||
              props.media.screenSharing() ||
              !props.media.cameraOn()
            }
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

function FaceMaskFeedback(props: { media: CallMedia }) {
  const status = () => props.media.faceMaskCaptureStatus?.();
  return (
    <Show when={capturingFrom(props.media)}>
      <Show when={typeof status() === 'number'}>
        <span
          class={styles.captureCountdown}
          role='status'
          aria-label={`Capture in ${status()}`}
        >
          {status()}
        </span>
      </Show>
      <Show when={status() === 'captured'}>
        <div class={styles.captureFlash} aria-hidden='true' />
      </Show>
    </Show>
  );
}
