import {
  createMemo,
  createEffect,
  createSignal,
  on,
  onCleanup,
  Switch,
  Match,
  Show,
} from 'solid-js';
import { createMediaPlayback } from '@kidlib/p2p/solid';
import { t } from '@shared/i18n';

import styles from './ParticipantMedia.module.css';
import { PhoneCall, PhoneOff, Mic, MicOff } from 'lucide-solid';
import { Spinner } from '@components/Spinner';

type ParticipantMediaProps = {
  stream: MediaStream;
  variant?: 'remote' | 'self-preview';
  videoEnabled?: boolean;
  audioEnabled?: boolean;
  remoteAudioMuted?: boolean;
};

type MediaTrackStatus = 'off' | 'connecting' | 'interrupted' | 'connected';
type MediaStatus = { audio: MediaTrackStatus; video: MediaTrackStatus };

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
  let video!: HTMLVideoElement;
  const variant = () => props.variant ?? 'remote';
  const shouldMutePlayback = () =>
    variant() === 'self-preview' || props.remoteAudioMuted === true;

  // Sticky per-stream: once a track has been live, a later drop reads as
  // 'interrupted' rather than 'connecting'. Reset when props.stream changes.
  let videoWasConnected = isReceivingStreamData(props.stream, 'video');
  let audioWasConnected = isReceivingStreamData(props.stream, 'audio');
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
    const audioOnly = !videoConnected();
    const stream = audioOnly
      ? new MediaStream(props.stream.getAudioTracks())
      : props.stream;

    const syncAudioTracks = (event: MediaStreamTrackEvent) => {
      if (event.track.kind !== 'audio') return;
      if (event.type === 'addtrack') stream.addTrack(event.track);
      else stream.removeTrack(event.track);
    };
    if (audioOnly) {
      props.stream.addEventListener('addtrack', syncAudioTracks);
      props.stream.addEventListener('removetrack', syncAudioTracks);
    }

    const shouldMute = shouldMutePlayback();
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
      if (audioOnly) {
        props.stream.removeEventListener('addtrack', syncAudioTracks);
        props.stream.removeEventListener('removetrack', syncAudioTracks);
      }
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
