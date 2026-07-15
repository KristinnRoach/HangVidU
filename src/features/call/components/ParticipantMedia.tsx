import { createEffect, createSignal, onCleanup, Show } from 'solid-js';
import { createMediaPlayback } from '@kidlib/p2p/solid';
import { t } from '@shared/i18n';

import styles from './ParticipantMedia.module.css';
import { Phone } from 'lucide-solid';

type ParticipantMediaProps = {
  stream: MediaStream;
  variant?: 'remote' | 'self-preview';
  videoEnabled?: boolean;
  videoExpected?: boolean;
  remoteAudioMuted?: boolean;
};

type MediaState = 'audio' | 'video' | 'empty';
type VideoStatus = 'connecting' | 'interrupted' | null;

// Only NotAllowedError means playback needs a user gesture; other
// rejections (e.g. AbortError from re-attach/pause races) are transient
// and must not surface the prompt.
function isAutoplayBlockedError(error: unknown): boolean {
  return (error as { name?: string } | undefined)?.name === 'NotAllowedError';
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
  const muted = () =>
    variant() === 'self-preview' || props.remoteAudioMuted === true;
  const [mediaState, setMediaState] = createSignal<MediaState>(
    getMediaState(props.stream, props.videoEnabled),
  );
  const [videoStatus, setVideoStatus] = createSignal<VideoStatus>(null);
  const [hasShownVideo, setHasShownVideo] = createSignal(
    mediaState() === 'video',
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
    },
  });

  createEffect(() => {
    const stream = props.stream;
    const videoEnabled = props.videoEnabled ?? true;
    let removeTrackListeners = () => {};

    const observeTracks = () => {
      removeTrackListeners();

      const tracks = stream.getTracks();
      const update = () => {
        const nextMediaState = getMediaState(stream, videoEnabled);
        setMediaState(nextMediaState);
        if (nextMediaState === 'video') setHasShownVideo(true);
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
    if (mediaState() === 'video' || !props.videoExpected) {
      setVideoStatus(null);
      return;
    }
    setVideoStatus(hasShownVideo() ? 'interrupted' : 'connecting');
  });

  createEffect(() => {
    // Chromium won't fire loadedmetadata (and outputs no audio) while a
    // muted video track — the reserved camera slot of an audio-only call —
    // is in srcObject and produces no frames. Attach only the audio tracks
    // until usable video exists.
    // ponytail: audio tracks snapshotted per attach; fine while the mic slot
    // is fixed at join — revisit if audio tracks can be added mid-call.
    const stream =
      mediaState() === 'video'
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
      data-media-state={mediaState()}
      data-variant={variant()}
    >
      <div class={styles.placeholder} aria-hidden='true' />

      <div class={styles.audioOnly} aria-hidden='true'>
        <Phone size={variant() === 'self-preview' ? 32 : 64} />
      </div>

      <Show when={videoStatus()}>
        {(status) => (
          <p class={styles.videoStatus} role='status'>
            {status() === 'connecting'
              ? t('call.video.connecting')
              : t('call.video.interrupted')}
          </p>
        )}
      </Show>

      <video
        ref={video}
        class={styles.media}
        hidden={mediaState() !== 'video'}
        autoplay
        muted={muted()}
      />
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
          Continue call
        </button>
      </Show>
    </div>
  );
}
