import { createEffect, createSignal, onCleanup, Show } from 'solid-js';
import { createMediaPlayback } from '@kidlib/p2p/solid';

import styles from './ParticipantMedia.module.css';
import { Phone } from 'lucide-solid';

type ParticipantMediaProps = {
  stream: MediaStream;
  variant?: 'remote' | 'self-preview';
  videoEnabled?: boolean;
};

type MediaState = 'audio' | 'video' | 'empty';

const [showPlaybackPrompt, setShowPlaybackPrompt] = createSignal(false);
let playbackPromptOwner: HTMLVideoElement | null = null;

function requestPlaybackPrompt(video: HTMLVideoElement) {
  if (!playbackPromptOwner) playbackPromptOwner = video;
  setShowPlaybackPrompt(true);
}

function retryCallPlayback() {
  setShowPlaybackPrompt(false);
  playbackPromptOwner = null;
  document
    .querySelectorAll<HTMLVideoElement>('video')
    .forEach((video) => video.play().catch(() => {}));
}

function getMediaState(stream: MediaStream, videoEnabled = true): MediaState {
  const hasUsableVideo = stream
    .getVideoTracks()
    .some(
      (track) => videoEnabled && track.readyState !== 'ended' && !track.muted,
    );
  if (hasUsableVideo) return 'video';

  const hasLiveAudio = stream
    .getAudioTracks()
    .some((track) => track.readyState !== 'ended');
  return hasLiveAudio ? 'audio' : 'empty';
}

export function ParticipantMedia(props: ParticipantMediaProps) {
  let video!: HTMLVideoElement;
  const variant = () => props.variant ?? 'remote';
  const muted = () => variant() === 'self-preview';
  const [mediaState, setMediaState] = createSignal<MediaState>(
    getMediaState(props.stream, props.videoEnabled),
  );

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
      requestPlaybackPrompt(video);
    },
  });

  createEffect(() => {
    const stream = props.stream;
    const videoEnabled = props.videoEnabled ?? true;
    let removeTrackListeners = () => {};

    const observeTracks = () => {
      removeTrackListeners();

      const tracks = stream.getTracks();
      const update = () => setMediaState(getMediaState(stream, videoEnabled));
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
    const stream = props.stream;
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
      if (playbackPromptOwner === video) {
        playbackPromptOwner = null;
        setShowPlaybackPrompt(false);
      }
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
      data-media-state={mediaState()}
      data-variant={variant()}
    >
      <div class={styles.placeholder} aria-hidden='true' />

      <div class={styles.audioOnly} aria-hidden='true'>
        <Phone size={variant() === 'self-preview' ? 32 : 64} />
      </div>

      <video
        ref={video}
        class={styles.media}
        hidden={mediaState() !== 'video'}
        autoplay
        muted={muted()}
      />
      <Show when={showPlaybackPrompt() && playbackPromptOwner === video}>
        <button
          type='button'
          class={styles.playbackPrompt}
          onClick={retryCallPlayback}
        >
          Continue call
        </button>
      </Show>
    </div>
  );
}
