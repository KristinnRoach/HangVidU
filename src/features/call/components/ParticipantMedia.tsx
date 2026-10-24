import {
  createMemo,
  createEffect,
  createSignal,
  on,
  onCleanup,
  onMount,
  Switch,
  Match,
  Show,
  type JSX,
} from 'solid-js';
import { createMediaPlayback } from '@kidlib/p2p/solid';
import { t } from '@shared/i18n';
import { isIOSDevice } from '@lib/utils/detect-device.js';

import styles from './ParticipantMedia.module.css';
import { PhoneCall, PhoneOff, Mic, MicOff } from 'lucide-solid';
import { Spinner } from '@components/Spinner';

type ParticipantMediaProps = {
  stream: MediaStream;
  children?: JSX.Element;
  overlay?: (aspect: number) => JSX.Element;
  previewUncropped?: boolean;
  variant?: 'remote' | 'self-preview';
  videoEnabled?: boolean;
  audioEnabled?: boolean;
  remoteAudioMuted?: boolean;
  screenShare?: boolean;
};

type MediaTrackStatus = 'off' | 'connecting' | 'interrupted' | 'connected';
type MediaStatus = { audio: MediaTrackStatus; video: MediaTrackStatus };

// Matches --gap, the preview's inset from the frame edge.
const GAP = 12;

// Only NotAllowedError means playback needs a user gesture; other
// rejections (e.g. AbortError from re-attach/pause races) are transient
// and must not surface the prompt.
function isAutoplayBlockedError(error: unknown): boolean {
  return (error as { name?: string } | undefined)?.name === 'NotAllowedError';
}

function trackStatus(
  expected: boolean,
  connected: boolean,
  wasConnected: boolean,
): MediaTrackStatus {
  if (!expected) return 'off';
  if (connected) return 'connected';
  return wasConnected ? 'interrupted' : 'connecting';
}

function isReceivingStreamData(
  stream: MediaStream,
  mediaType: 'audio' | 'video',
): boolean {
  const tracks =
    mediaType === 'video' ? stream.getVideoTracks() : stream.getAudioTracks();

  // NOTE: track.muted does NOT mean intentionally muted, that is done via track.enabled == false
  return tracks.some((track) => track.readyState !== 'ended' && !track.muted);
}

export function ParticipantMedia(props: ParticipantMediaProps) {
  // oxlint-disable-next-line no-unassigned-vars
  let video!: HTMLVideoElement;
  let surface!: HTMLDivElement;
  const [bounds, setBounds] = createSignal({ width: 0, height: 0 });
  const variant = () => props.variant ?? 'remote';
  // Remote surfaces fill their own grid cell, which is what videoScale needs.
  // The self-preview is sized from these bounds, so it must measure the parent
  // instead or it would feed back. Either way this relies on the call container
  // being height-bounded (MainContent's .callView min-height: 0).
  onMount(() => {
    const target =
      variant() === 'self-preview' ? surface.parentElement : surface;
    if (!target || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry)
        setBounds({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
    });
    observer.observe(target);
    onCleanup(() => observer.disconnect());
  });
  const [videoAspect, setVideoAspect] = createSignal(4 / 3);
  // Fit the preview box to the source aspect so it has no empty bands. Mirrors
  // the .selfPreview clamps, which stay as the fallback until first measurement.
  const previewSize = createMemo(() => {
    const { width, height } = bounds();
    if (!width || !height) return undefined;
    const maxWidth = props.previewUncropped
      ? 300
      : Math.min(300, Math.max(120, width * 0.25));
    const maxHeight = props.previewUncropped
      ? height * 0.4
      : Math.min(200, height * 0.3);
    const w = Math.min(maxWidth, width - 2 * GAP, maxHeight * videoAspect());
    return { width: `${w}px`, height: `${w / videoAspect()}px` };
  });
  // The video is always object-fit: contain, then scaled up toward a full
  // fill. max(r, 1/r) is exactly the scale that makes contain cover the frame;
  // capping it at 1.35 (~26% source cropping) keeps the remainder letterboxed
  // instead of chopping the sides off a landscape source on a portrait screen.
  // ponytail: 1.35 is the one tuning knob, adjust from real-device feedback.
  const videoScale = createMemo(() => {
    if (
      props.screenShare ||
      props.previewUncropped ||
      variant() === 'self-preview'
    )
      return 1;
    const { width, height } = bounds();
    if (!width || !height) return 1;
    const frameAspect = width / height;
    const scale = Math.min(
      1.35,
      Math.max(frameAspect / videoAspect(), videoAspect() / frameAspect),
    );
    // Rounded: raw floats rewrite the inline style on every resize pixel.
    return Math.round(scale * 100) / 100;
  });
  const shouldMutePlayback = () =>
    variant() === 'self-preview' || props.remoteAudioMuted === true;

  // TODO: Check whether videoElement.load() is enough to fix the iOS 27 blackscreen videostream issue:
  // https://webkit.org/blog/17967/news-from-wwdc26-webkit-in-safari-27-beta/
  // https://developer.apple.com/videos/play/wwdc2026/204/
  // https://developer.apple.com/forums/thread/739368

  // Sticky per-stream: once a track has been live, a later drop reads as
  // 'interrupted' rather than 'connecting'. Reset when props.stream changes.
  let videoWasConnected = isReceivingStreamData(props.stream, 'video');
  let audioWasConnected = isReceivingStreamData(props.stream, 'audio');
  let rebuiltVideoLayerForStream: MediaStream | undefined;
  const [status, setStatus] = createSignal<MediaStatus>({
    video: trackStatus(
      props.videoEnabled ?? true,
      videoWasConnected,
      videoWasConnected,
    ),
    audio: trackStatus(true, audioWasConnected, audioWasConnected),
  });
  const videoConnected = createMemo(() => status().video === 'connected');

  const updateStatus = (stream: MediaStream) => {
    const videoConnected = isReceivingStreamData(stream, 'video');
    const audioConnected = isReceivingStreamData(stream, 'audio');
    if (videoConnected) videoWasConnected = true;
    if (audioConnected) audioWasConnected = true;
    setStatus({
      video: trackStatus(
        props.videoEnabled ?? true,
        videoConnected,
        videoWasConnected,
      ),
      audio: trackStatus(true, audioConnected, audioWasConnected),
    });
  };

  const playback = createMediaPlayback({
    playsInline: true,
    onPlaybackBlocked: (err) => {
      const error = err as { name?: string; message?: string };
      if (import.meta.env.DEV && error?.name !== 'AbortError') {
        console.warn('[ParticipantMedia] play() rejected', {
          variant: variant(),
          name: error?.name,
          message: error?.message,
        });
      }
    },
  });

  createEffect(
    on(
      () => props.stream,
      (stream) => {
        // New stream instance: sticky "was connected" flags reset with it.
        videoWasConnected = false;
        audioWasConnected = false;
        let removeTrackListeners = () => {};

        const observeTracks = () => {
          removeTrackListeners();

          const tracks = stream.getTracks();
          const update = () => updateStatus(stream);
          tracks.forEach((track) => {
            track.addEventListener('mute', update);
            track.addEventListener('unmute', update);
            track.addEventListener('ended', update);
          });
          removeTrackListeners = () => {
            tracks.forEach((track) => {
              track.removeEventListener('mute', update);
              track.removeEventListener('unmute', update);
              track.removeEventListener('ended', update);
            });
          };
          update();
        };

        stream.addEventListener('addtrack', observeTracks);
        stream.addEventListener('removetrack', observeTracks);
        observeTracks();

        onCleanup(() => {
          stream.removeEventListener('addtrack', observeTracks);
          stream.removeEventListener('removetrack', observeTracks);
          removeTrackListeners();
        });
      },
    ),
  );

  createEffect(
    on(
      () => props.videoEnabled,
      () => updateStatus(props.stream),
      { defer: true },
    ),
  );

  createEffect(() => {
    if (!video) return;

    // Chromium won't fire loadedmetadata (and outputs no audio) while a
    // muted video track — the reserved camera slot of an audio-only call —
    // is in srcObject and produces no frames. Attach only the audio tracks
    // until usable video exists.
    const sourceStream = props.stream;
    const audioOnly = !videoConnected();
    const stream = audioOnly
      ? new MediaStream(sourceStream.getAudioTracks())
      : sourceStream;

    const syncAudioTracks = (event: MediaStreamTrackEvent) => {
      if (event.track.kind !== 'audio') return;
      if (event.type === 'addtrack') stream.addTrack(event.track);
      else stream.removeTrack(event.track);
    };
    if (audioOnly) {
      sourceStream.addEventListener('addtrack', syncAudioTracks);
      sourceStream.addEventListener('removetrack', syncAudioTracks);
    }

    const shouldMute = shouldMutePlayback();
    // One signal covers the original element and the iOS replacement below.
    const listeners = new AbortController();
    const replay = () => {
      if (video.videoWidth && video.videoHeight)
        setVideoAspect(video.videoWidth / video.videoHeight);
      if (video.paused) void playback.resumePlayback();
    };
    const configureVideo = (element: HTMLVideoElement) => {
      // 'resize' fires when the source dimensions change, e.g. on rotation.
      for (const event of ['loadedmetadata', 'canplay', 'pause', 'resize'])
        element.addEventListener(event, replay, { signal: listeners.signal });
      element.defaultMuted = shouldMute;
      if (shouldMute) element.setAttribute('muted', '');
      else element.removeAttribute('muted');
      element.autoplay = true;
      element.setAttribute('playsinline', 'true');
    };
    configureVideo(video);

    const attachedVideo = video;
    let disposed = false;
    void playback
      .attach(attachedVideo, stream, { muted: shouldMute })
      .then((started) => {
        if (
          !started ||
          disposed ||
          props.stream !== sourceStream ||
          video !== attachedVideo ||
          audioOnly ||
          !isIOSDevice() ||
          rebuiltVideoLayerForStream === sourceStream
        ) {
          return;
        }

        // iOS 27 can decode live frames but paint a black video layer; replacing
        // the element after playback starts forces WebKit to create a working one.
        rebuiltVideoLayerForStream = sourceStream;
        const replacement = attachedVideo.cloneNode(false) as HTMLVideoElement;
        attachedVideo.replaceWith(replacement);
        video = replacement;
        configureVideo(replacement);
        void playback.attach(replacement, stream, { muted: shouldMute });
      });

    onCleanup(() => {
      disposed = true;
      playback.detach();
      if (audioOnly) {
        sourceStream.removeEventListener('addtrack', syncAudioTracks);
        sourceStream.removeEventListener('removetrack', syncAudioTracks);
      }
      listeners.abort();
    });
  });

  return (
    <div
      ref={surface}
      class={styles.surface}
      style={{
        ...(variant() === 'self-preview' ? previewSize() : {}),
        '--video-scale': videoScale(),
      }}
      classList={{
        [styles.selfPreview!]: variant() === 'self-preview',
        [styles.screenShare!]: props.screenShare,
        [styles.uncropped!]: props.previewUncropped,
      }}
    >
      <video
        ref={video}
        class={styles.media}
        hidden={status().video !== 'connected'}
        autoplay
        muted={shouldMutePlayback()}
      />

      <Show when={status().video !== 'connected'}>
        <Switch
          fallback={
            <div class={styles.spinner}>
              <Spinner />
            </div>
          }
        >
          <Match
            when={
              status().audio === 'connected' &&
              status().video === 'off' &&
              variant() === 'remote'
            }
          >
            <div class={styles.audioOnly}>
              {props.audioEnabled ? (
                <PhoneCall size={64} />
              ) : (
                <PhoneOff size={64} />
              )}
            </div>
          </Match>

          <Match
            when={
              status().audio === 'connected' &&
              status().video === 'off' &&
              variant() === 'self-preview'
            }
          >
            <div class={styles.audioOnly}>
              {props.audioEnabled ? <Mic size={32} /> : <MicOff size={32} />}
            </div>
          </Match>

          <Match
            when={
              status().video === 'connecting' ||
              status().video === 'interrupted'
            }
          >
            <p class={styles.videoStatus} role='status'>
              {status().video === 'connecting'
                ? t('call.connecting')
                : t('call.interrupted')}
            </p>
          </Match>
        </Switch>
      </Show>

      {props.children}
      {props.overlay?.(videoAspect())}
      <Show
        when={
          playback.playbackBlocked() &&
          isAutoplayBlockedError(playback.playbackError())
        }
      >
        <button
          type='button'
          class={styles.playbackPrompt}
          onClick={() => void playback.resumePlayback()}
        >
          {t('call.continue_prompt')}
        </button>
      </Show>
    </div>
  );
}
