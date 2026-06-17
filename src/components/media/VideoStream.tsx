import { createEffect, createSignal, onCleanup, Show } from 'solid-js';
import { createMediaPlayback } from '@kidlib/p2p/solid';
import styles from './VideoStream.module.css';

type Props = {
  stream?: MediaStream;
  id?: string;
  muted?: boolean;
  baseClass?: string;
  classList?: Record<string, boolean | undefined>;
  local?: boolean;
  preview?: boolean;
};

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

export default function VideoStream(props: Props) {
  let video!: HTMLVideoElement;
  const shouldMute = () =>
    props.muted ??
    props.local ??
    props.preview ??
    (props.stream?.getAudioTracks().length === 0);

  // Library-owned attach + autoplay/resume core. Surfaces blocked playback
  // through the shared "Continue call" prompt below.
  const playback = createMediaPlayback({
    playsInline: true,
    onPlaybackBlocked: (err) => {
      if (import.meta.env.DEV) {
        const e = err as { name?: string; message?: string };
        console.warn('[VideoStream] play() rejected', {
          isLocal: !!props.local,
          name: e?.name,
          message: e?.message,
        });
      }
      requestPlaybackPrompt(video);
    },
  });

  createEffect(() => {
    const stream = props.stream;
    if (!video) return;

    // Set playback-affecting flags before assigning the stream. Some browsers
    // evaluate autoplay eligibility as soon as srcObject changes. attach() sets
    // muted/playsInline (as properties); the attribute forms below are iOS
    // belt-and-suspenders the library does not set.
    const muted = shouldMute();
    video.defaultMuted = muted;
    if (muted) video.setAttribute('muted', '');
    else video.removeAttribute('muted');
    video.autoplay = true;
    video.setAttribute('playsinline', 'true');

    // Attaches the stream and runs the initial play() (autoplay defaults on).
    playback.attach(video, stream ?? null, { muted });

    // Re-attempt playback once the stream produces frames / on spurious pause.
    const replay = () => {
      if (stream && video.paused) playback.resumePlayback();
    };

    function debugVideoResize() {
      {
        console.info(
          '[VIDEO RESIZE DEBUG]',
          video.videoWidth,
          video.videoHeight,
          'isLocal:',
          !!props.local,
        );
      }
    }

    import.meta.env.DEV && video.addEventListener('resize', debugVideoResize);
    video.addEventListener('loadedmetadata', replay);
    video.addEventListener('canplay', replay);
    video.addEventListener('pause', replay);

    onCleanup(() => {
      if (playbackPromptOwner === video) {
        playbackPromptOwner = null;
        setShowPlaybackPrompt(false);
      }
      playback.detach();
      import.meta.env.DEV &&
        video.removeEventListener('resize', debugVideoResize);
      video.removeEventListener('loadedmetadata', replay);
      video.removeEventListener('canplay', replay);
      video.removeEventListener('pause', replay);
    });
  });

  return (
    <Show when={props.stream && props.stream.getVideoTracks().length > 0}>
      <>
        <video
          id={props.id}
          class={props.baseClass ?? styles.videoStream}
          classList={{
            [styles.local]: props.local,
            [styles.preview]: props.preview,
            ...props.classList,
          }}
          ref={video}
          autoplay
          muted={shouldMute()}
        />
        <Show when={showPlaybackPrompt() && playbackPromptOwner === video}>
          <button
            type="button"
            class={styles.playbackPrompt}
            onClick={retryCallPlayback}
          >
            Continue call
          </button>
        </Show>
      </>
    </Show>
  );
}
