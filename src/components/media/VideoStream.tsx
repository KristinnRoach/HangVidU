import { createEffect, createSignal, onCleanup, Show } from 'solid-js';
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

  createEffect(() => {
    const stream = props.stream;
    if (!video) return;

    // Set playback-affecting flags before assigning the stream. Some browsers
    // evaluate autoplay eligibility as soon as srcObject changes.
    const muted = shouldMute();
    video.muted = muted;
    video.defaultMuted = muted;
    if (muted) video.setAttribute('muted', '');
    else video.removeAttribute('muted');
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.srcObject = stream ?? null;
    video.muted = muted;
    const play = () => {
      if (!stream || !video.paused) return;
      video.play().catch((err) => {
        if (import.meta.env.DEV) {
          console.warn('[VideoStream] play() rejected', {
            isLocal: !!props.local,
            name: err?.name,
            message: err?.message,
          });
        }
        requestPlaybackPrompt(video);
      });
    };
    play();

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
    video.addEventListener('loadedmetadata', play);
    video.addEventListener('canplay', play);
    video.addEventListener('pause', play);

    onCleanup(() => {
      if (playbackPromptOwner === video) {
        playbackPromptOwner = null;
        setShowPlaybackPrompt(false);
      }
      video.srcObject = null;
      import.meta.env.DEV &&
        video.removeEventListener('resize', debugVideoResize);
      video.removeEventListener('loadedmetadata', play);
      video.removeEventListener('canplay', play);
      video.removeEventListener('pause', play);
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
