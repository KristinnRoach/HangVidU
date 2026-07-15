import {
  createEffect,
  createSignal,
  onCleanup,
  Switch,
  Match,
  Show,
} from 'solid-js';
import { createMediaPlayback } from '@kidlib/p2p/solid';
import { t } from '@shared/i18n';

import styles from './ParticipantMedia.module.css';
import { PhoneCall, Mic, MicOff } from 'lucide-solid'; // PhoneOff,
import { Spinner } from '@components/Spinner';

type ParticipantMediaProps = {
  stream: MediaStream;
  variant?: 'remote' | 'self-preview';
  videoEnabled?: boolean;
  audioEnabled?: boolean;
  remoteAudioMuted?: boolean;
};

type TrackStatus = 'off' | 'connecting' | 'interrupted' | 'connected';
type MediaStatus = { audio: TrackStatus; video: TrackStatus };

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
): TrackStatus {
  if (!expected) return 'off';
  if (connected) return 'connected';
  return wasConnected ? 'interrupted' : 'connecting';
}

function isVideoConnected(stream: MediaStream): boolean {
  return stream
    .getVideoTracks()
    .some((track) => track.readyState !== 'ended' && !track.muted);
}

function isAudioConnected(stream: MediaStream): boolean {
  return stream.getAudioTracks().some((track) => track.readyState !== 'ended');
}

export function ParticipantMedia(props: ParticipantMediaProps) {
  let video!: HTMLVideoElement;
  const variant = () => props.variant ?? 'remote';
  const muted = () =>
    variant() === 'self-preview' || props.remoteAudioMuted === true;

  // Sticky per-stream: once a track has been live, a later drop reads as
  // 'interrupted' rather than 'connecting'. Reset when props.stream changes.
  let videoWasConnected = isVideoConnected(props.stream);
  let audioWasConnected = isAudioConnected(props.stream);
  const [status, setStatus] = createSignal<MediaStatus>({
    video: trackStatus(
      props.videoEnabled ?? true,
      videoWasConnected,
      videoWasConnected,
    ),
    audio: trackStatus(true, audioWasConnected, audioWasConnected),
  });

  const playback = createMediaPlayback({
    playsInline: true,
    onPlaybackBlocked: (err) => {
      if (import.meta.env.DEV) {
        const error = err as { name?: string; message?: string };
        console.warn('[ParticipantMedia] play() rejected', {
          variant: variant(),
          name: error?.name,
          message: error?.message,
        });
      }
    },
  });

  createEffect(() => {
    const stream = props.stream;
    const videoEnabled = props.videoEnabled ?? true;
    // New stream instance: sticky "was connected" flags reset with it.
    videoWasConnected = false;
    audioWasConnected = false;
    let removeTrackListeners = () => {};

    const observeTracks = () => {
      removeTrackListeners();

      const tracks = stream.getTracks();
      const update = () => {
        const videoConnected = isVideoConnected(stream);
        const audioConnected = isAudioConnected(stream);
        if (videoConnected) videoWasConnected = true;
        if (audioConnected) audioWasConnected = true;
        setStatus({
          video: trackStatus(videoEnabled, videoConnected, videoWasConnected),
          audio: trackStatus(true, audioConnected, audioWasConnected),
        });
      };
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
  });

  createEffect(() => {
    // Chromium won't fire loadedmetadata (and outputs no audio) while a
    // muted video track — the reserved camera slot of an audio-only call —
    // is in srcObject and produces no frames. Attach only the audio tracks
    // until usable video exists.
    // ponytail: audio tracks snapshotted per attach; fine while the mic slot
    // is fixed at join — revisit if audio tracks can be added mid-call.
    const stream =
      status().video === 'connected'
        ? props.stream
        : new MediaStream(props.stream.getAudioTracks());
    if (!video) return;

    const shouldMute = muted();
    video.defaultMuted = shouldMute;
    if (shouldMute) video.setAttribute('muted', '');
    else video.removeAttribute('muted');
    video.autoplay = true;
    video.setAttribute('playsinline', 'true');

    void playback.attach(video, stream, { muted: shouldMute });

    const replay = () => {
      if (video.paused) void playback.resumePlayback();
    };

    video.addEventListener('loadedmetadata', replay);
    video.addEventListener('canplay', replay);
    video.addEventListener('pause', replay);

    onCleanup(() => {
      playback.detach();
      video.removeEventListener('loadedmetadata', replay);
      video.removeEventListener('canplay', replay);
      video.removeEventListener('pause', replay);
    });
  });

  return (
    <div
      class={styles.surface}
      classList={{ [styles.selfPreview]: variant() === 'self-preview' }}
    >
      <video
        ref={video}
        class={styles.media}
        hidden={status().video !== 'connected'}
        autoplay
        muted={muted()}
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
              <PhoneCall size={64} />
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
                ? t('call.video.connecting')
                : t('call.video.interrupted')}
            </p>
          </Match>
        </Switch>
      </Show>

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
